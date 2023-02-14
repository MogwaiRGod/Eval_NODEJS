/* Pour le controller des entrées, je n'ai pas utilisé les fonctions de manipulate_files ; tout est écrit sans les fonctions (sauf pour la fonction
de recherche) */

/*
 * VARIABLES
 */
// chemin du fichier du menu
const menu = './src/model/menu.json';

// messages de statuts de requête (je ne sais pas comment les mettre dans un autre fichier et y accéder localement...)
const errorsArray = 
{
    // erreur 404
    "404_id": "Aucun objet trouvé avec cet id",
    "404_nom": "Aucun objet trouvé avec ce nom",
    "404_tab": "Le jeu de données est vide",
    // erreur 500
    "500_lecture": "Une error Lest survenue lors de la lecture des données",
    "500_ecriture": "Une error Lest survenue lors de l'écriture des données",
    // codes 200
    "200_ajout": "Donnée ajoutée avec succès !",
    "200_maj": "Donnée mise à jour avec succès !",
    "200_suppr": "Donnée supprimée avec succès !",
    // erreur 400
    "400_vide": "Corps de requête vide",
    "400_deja_existant": "Il y a déjà un objet avec cet ID dans le tableau",
    "400_invalide": "Propriété(s) invalide(s)",
    "400_val_invalide": "Valeur(s) invalides"
};


/*
* IMPORTS
*/
// import du module file system dans la constante fs
const fs = require('fs'); 
// contient des fonctions utiles à tous les controllers
const manipFiles = require('../utils/manipulate_files.js'); 



/*
 * CRUD
 */

/*
 * (C) CREATE
 */

/*
 * Fonction permettant d'ajouter une nouvelle entrée dans le menu (l'id sera calculée automatiquement
 * selon l'id le plus élevé du tableau)
 */
exports.addStarter = (request, response) => { // exports. autorise l'exportation de la fonction
    // on lit dans un premier temps le jeu de données ; cela va nous permettre de vérifier qu'il n'y a pas d'erreur
    // dedans ou dans son accès, et également d'évaluer les données déjà présentes afin de pouvoir en ajouter
    // en toute sécurité
    fs.readFile(menu, (error, data) => {
        // si une erreur se produit
        if (error) {
            response.status(500).send({ // on envoie un code d'erreur 500 (erreur interne)
                message: errorsArray['500_lecture'], // message à l'utilisateur
                error: error// affiche également l'erreur Lsystème
            });
        } else {
            // on ne veut pas ajouter d'objets vides ou mal instanciés dans la BDD =>
            // on stocke toutes les propriétés de l'objet de la requête
            const propsList = Object.getOwnPropertyNames(request.body); 
            // <=> si le corps de la requête est vide <=> si elle n'a pas de propriétés
            if (!propsList.length) {
                // on envoie une erreur 400 (= impossibilité de traiter la requête)
                response.status(400).send({message: errorsArray["400_vide"]}); 
                // et on ne fait rien
            } else {
                // on évalue ensuite cette liste afin de vérifier que les propriétés correspondent à celles attendues
                if (propsList.length !== 2 || propsList.find( e => e.toString().toLowerCase() === "nom") == undefined || 
                    propsList.find( e => e.toString().toLowerCase() === "prix") == undefined){
                    response.status(400).send({message: errorsArray["400_invalide"]});
                    // si les propriétés sont ok, on vérifie que les valeurs soient correctes
                } else if (propsList.find( e => e.toLowerCase() === "prix") && parseFloat(request.body.prix) != request.body.prix){
                    response.status(400).send({message: errorsArray["400_val_invalide"]});
                    return;
                } else { 
                    // si tout va bien, on peut procéder à l'ajout de la donnée
                    // new_id <=> id de l'élément que l'on va créer
                    let new_id = 0;
                    // on stocke toutes les données du menu dans une variable
                    const existingData = JSON.parse(data);
                    // on vérifie s'il y a déjà des données dans la BDD ; si non, on va pouvoir ajouter l'item avec l'ID de base
                    // on part du principe que les objets ne sont pas entrés dans l'ordre croissant de leur id
                    if (existingData.starters.length !== 0) { // s'il ya déjà des données
                        let tmp = [];
                        // on récolte toutes les ids attribuées
                        existingData.starters.forEach(e => tmp.push(parseInt(e.id))); 
                        // on sélectionne le plus grand déjà attribués et on ajoute 1
                        new_id = Math.max(...tmp) +1; 
                    }
                    // on y ajoute, dans le tableau "starters", la donnée demandée
                    existingData.starters.push({
                        "id": parseInt(new_id),
                        "nom": request.body.nom.toString().toLowerCase(),
                        "prix": Number(request.body.prix)
                    });
                    // puis on réécrit le fichier source avec les données mises à jour
                    fs.writeFile(menu,
                    /* on convertit la donnée en chaîne car fs ne peut récrire qu'avec des données de ce type */
                    JSON.stringify(existingData), 
                    (error_write) => {
                        if (error_write) {
                            response.status(500).json({
                                message: errorsArray["500_ecriture"],
                                error: error_write
                            });
                        } else {
                            response.status(200).send({message: errorsArray["200_ajout"]});
                        } // FIN SI                      
                    }); // FIN WRITE FILE                                        
                } // FIN SI
            } // FIN SI
        } // FIN SI
    }); // FIN READFILE
} // FIN ADD STARTER

// fonction qui crée et ajoute une donnée au tableau entrees selon une id passée en argument de la requête
exports.addStarterId = (request, response) => {
    // cette fonction va faire la même chose que la précédente ; la différence va se situer au niveau
    // du traitement de l'ID
    fs.readFile(menu, (error, data) => {
        if (error) {
            response.status(500).send({
                message: errorsArray["500_lecture"],
                error: error
            });
        } else {
            // on parcourt le tableau d'entrees pour vérifier qu'aucun item n'ait déjà l'id entré en argument dans la requête
            if (JSON.parse(data).starters.find(e => e.id === parseInt(request.params.id)) !== undefined){
                // si c'est le cas, on affiche un message d'error Let on quitte la fonction
                response.status(400).send({message: errorsArray["400_deja_existant"]});
            } else { // si l'ID est disponible, on va vérifier la validé de la requête, comme précedemment
                const propsList = Object.getOwnPropertyNames(request.body);
                if (!propsList.length) {
                    response.status(400).send({message: errorsArray["400_vide"]});
                } else {
                    if (propsList.length !== 2 || propsList.find( e => e.toString().toLowerCase() === "nom") === undefined || propsList.find( e => e.toString().toLowerCase() === "prix") === undefined){
                        response.status(400).send({message: errorsArray["400_invalide"]});
                    } else if (parseFloat(request.body.prix) != request.body.prix){
                        // on vérifie que les valeurs soient valides
                        response.status(400).send({message: errorsArray["400_val_invalide"]});
                        return;
                    } else { // on peut ajouter la donnée
                        const existingData = JSON.parse(data);
                        existingData.starters.push({
                            "id": parseInt(request.params.id),
                            "nom": request.body.nom.toString().toLowerCase(),
                            "prix": Number(request.body.prix)
                        }); // FIN PUSH
                        fs.writeFile(menu, 
                        JSON.stringify(existingData),
                        (error_write) => {
                            if (error_write) {
                                response.status(500).json({
                                    message: errorsArray["500_ecriture"],
                                    error: error_write
                                });
                            } else {
                                response.status(200).send({message: errorsArray["200_ajout"]});
                            }
                        }); // FIN WRITE FILE
                    } // FIN SI
                } // FIN SI
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN ADD STARTER ID


/*
 * (R) READ
 */

// Fonction permettant de lire l'intégralité des entrées
exports.readStarters = (request, response) => {
    fs.readFile(menu, (error /* readFile va automatique prendre en argument : le cas échéant, l'erreur système */, data /* ou les données récupérée */) => {                                
        if (error) {
            response.status(500).send({
                message: errorsArray["500_lecture"],
                error: error
            });
        } else {
            /*
            * fs lit et retourne et des chaînes de caractères ;
            * on utilise JSON.parse() pour les transformer en objet JSON
            * et ainsi accéder à la clef 'entrees'
            */
            const existingData = JSON.parse(data).starters; 
            // affichage des entrées dans le corps de la réponse
            response.status(200).send({message: existingData}); 
        }// FIN SI
    }); // FIN READ FILE
} // FIN READ STARTERS

// On crée une fonction permettant de lire une entrée du menu via son ID
exports.readStarterId = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (error) {
            response.status(500).send({
                message: errorsArray["500_lecture"],
                error: error
            });
        } else { 
            // même chose que plus haut mais on filtre également par l'ID
            // on va chercher l'objet ayant l'id requêté dans le tableau starters
            const dataId = JSON.parse(data).starters.filter( 
                obj => obj.id === parseInt(request.params.id /* "params" sélectionne les paramètres de la requête : (e.g : "/:array/:id"). 
                Ici, on sélectionne le paramètre nommé id*/)
            );
            // s'il n'y a pas de donnée avec l'id requêté ([0] car filter retourne une liste)
            if (!dataId[0]){
                // erreur
                response.status(404).send({message: errorsArray["404_id"]}); 
            } else {
                // succès
                response.status(200).send({message: dataId[0]}); 
            } // FIN SI
        }// FIN SI
    }); // FIN READFILE
} // FIN READ STARTERS ID

// Fonction qui affiche toutes les entrées du menu contenant un nom entré dans la requête
exports.searchStarter = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (error) {
            response.status(500).send({
                message: errorsArray["500_lecture"],
                error: error
            });
        } else { 
            const existingData = JSON.parse(data).starters;
            // on vérifie que le tableau est non-vide 
            if (!existingData.length) {
                response.status(404).send({message: errorsArray["404_tab"]});
                return;
            }
            // on crée un tableau qui va contenir tous les items correspondants à la recherche
            let searchObj = [];
            // on boucle dans le tableau entrées
            existingData.forEach( e => {
                if(manipFiles.searchRegex(e.nom, request.params.nom)) {
                    searchObj.push(e);
                }
            }); // FIN FOR EACH
            // si on n'a rien trouvé -> erreur 404; sinon : on affiche tous les items trouvés
            (!searchObj.length) ? response.status(404).send({message: errorsArray["404_nom"]}) : response.status(200).send({message: searchObj});
        }// FIN SI
    }); // FIN READFILE
} // FIN SEARCH STARTER


/*
 * (U) UPDATE
 */

/*
 * On crée une fonction permettant de modifier une entrée du menu via le body de la requête en l'ayant sélectionnée
 * par son ID dans le header de la requête.
 * On peut modifier une seule, ou bien deux propriétés d'un item du tableau entrées
 */
exports.updateStarter = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (error) {
            response.status(500).send({
                message: errorsArray["500_lecture"],
                error: error
            });
        } else {
            // on vérifie qu'il existe bel et bien une donnée avec l'ID entré en argument
            if (JSON.parse(data).starters.find(e => e.id === parseInt(request.params.id)) === undefined) {
                // si ce n'est pas le cas, on affiche un message d'error Let on quitte la fonction
                response.status(404).send({message: errorsArray["404_id"]}); // erreur 404 car donnée non trouvée
            } else { 
                // sinon on vérifie la validité de la requête
                // vérification que le champ n'est pas vide
                if (request.body == {}) { 
                    response.status(400).send({message: errorsArray["400_vide"]});
                } else {
                    const propsList = Object.getOwnPropertyNames(request.body); 
                    // vérification de la validité de l'objet
                    if (!propsList.length) {
                        response.status(400).send({message: errorsArray["400_vide"]});
                        return;
                    // s'il y a deux propriétés dans le corps de la requête mais que l'une n'est pas conforme
                    } else if ((propsList.length === 2  && (propsList.find( e => e.toLowerCase() === "nom") === undefined || propsList.find( e => e.toLowerCase() === "prix") === undefined)) ||
                    // ou s'il n'y a qu'une propriété à changer mais qu'elle n'est pas conforme
                    ((propsList.length === 1) && (propsList.find( e => e.toLowerCase() === "nom" || e.toLowerCase() === "prix") === undefined))){
                        // on renvoie une erreur
                        response.status(400).send({message: errorsArray["400_invalide"]});
                    } else if (propsList.find( e => e.toLowerCase() === "prix") && parseFloat(request.body.prix) != request.body.prix) {
                        response.status(400).send({message: errorsArray["400_val_invalide"]});
                        return;   
                    } else {   // si tout est bon, on peut procéder à la màj
                        // on stocke l'intégralité des données dans une variable
                        let existingData = JSON.parse(data);
                        // on cherche l'index de l'item recherché dans le tableau
                        const index = existingData.starters.findIndex( obj => obj.id === parseInt(request.params.id)); 
                        let updatedItem = existingData.starters[index];
                        // on met à jour la donnée selon les propriétés entrées dans la requête <=> s'il n'y a que le
                        // prix à modifier, va garder le nom initial et mettre à jour seulement le prix
                        propsList.forEach( e => // pour chaque propriété de la requête
                              // on met à jour la propriété de l'item correspondante
                            updatedItem[e] = request.body[e] 
                        ); // FIN FOREACH
                        // on remet l'item mis à jour dans le tableau
                        existingData.starters[index] = updatedItem;
                        // puis on réécrit dans le fichier json avec les données mises à jour
                        fs.writeFile(menu, 
                        JSON.stringify(existingData),
                        (error_write) => {                       
                            if (error_write) {
                                response.status(500).json({
                                    message: errorsArray["500_ecriture"],
                                    error: error_write
                                });
                            } else {
                                response.status(200).send({message: errorsArray["200_maj"]});
                            } // FIN SI                      
                        }); // FIN WRITE FILE
                    } // FIN SI
                } // FIN SI
            }// FIN SI
        } // FIN SI
    }); // FIN READFILE
} // FIN UPDATE STARTER


/*
 * (D) DELETE
 */

// On crée une fonction permettant de supprimer une entrée du menu selon son ID
 exports.deleteStarter = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (error) {
            response.status(500).send({
                message: errorsArray["500_lecture"],
                error: error
            });
        } else {
            // on cherche un objet ayant l'ID entré en argument
            if (JSON.parse(data).starters.find(e => e.id === parseInt(request.params.id)) === undefined) {
                // si ce n'est pas le cas, on affiche un message d'error Let on quitte la fonction
                response.status(404).send({message: errorsArray["404_id"]});
            } else { 
                // si la donnée est trouvée, on va pouvoir procéder à la suppression
                // sélection de l'intégralité des données
                let existingData = JSON.parse(data);
                // on trouve l'index de l'item à supprimer
                const index = existingData.starters.findIndex(obj => obj.id === parseInt(request.params.id));
                // on utilise splice pour supprimer l'item dans le tableau
                existingData.starters.splice(index, 1);
                // puis on réécrit le fichier de la BDD
                fs.writeFile(menu, 
                JSON.stringify(existingData),
                (error_write) => {                       
                    if (error_write) {
                        response.status(500).json({
                            message: errorsArray["500_ecriture"],
                            error: error_write
                        });
                    } else {
                        response.status(200).send({message: errorsArray["200_suppr"]});
                    } // FIN SI                      
                }); // FIN WRITE FILE
            }// FIN SI
        } // FIN SI
    }) // FIN READ FILE
} // FIN DELETE STARTER
