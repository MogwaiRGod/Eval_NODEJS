/******************************************************************** VARIABLES *********************************************************************/

const menu = './src/model/menu.json';   // chemin du fichier du menu
const erreurs = // messages de statuts de requête (je ne sais pas comment les mettre dans un autre fichier
{               // et y accéder localement...)
    // erreurs 404
    "404_id": "Aucun objet trouvé avec cet id",
    "404_nom": "Aucun objet trouvé avec ce nom",
    "404_tab": "Le jeu de données est vide",
    // erreurs 500
    "500_lecture": "Une erreur est survenue lors de la lecture des données",
    "500_ecriture": "Une erreur est survenue lors de l'écriture des données",
    // codes 200
    "200_ajout": "Donnée ajoutée avec succès !",
    "200_maj": "Donnée mise à jour avec succès !",
    "200_suppr": "Donnée supprimée avec succès !",
    // erreurs 400
    "400_vide": "Corps de requête vide",
    "400_deja_existant": "Il y a déjà un objet avec cet ID dans le tableau",
    "400_invalide": "Propriété(s) invalide(s)",
    "400_val_invalide": "Valeur(s) invalides"
};


/********************************************************************* IMPORTS ******************************************************************** */

const fs = require('fs'); // import du module file system dans la constante fs
const manip_files = require('../utils/manipulateFiles.js'); // contient des fonctions utiles à tous les controllers



/************************************************************************* CRUD ********************************************************************/

/*********************************** C (CREATE) ****************************************************/
// Fonction permettant d'ajouter une nouvelle entrée dans le menu (l'id sera calculée automatiquement
// selon l'id le plus élevé du tableau)
exports.ajoutEntree = (requete, reponse) => { // exports. autorise l'exportation de la fonction
    // on lit dans un premier temps le jeu de données ; cela va nous permettre de vérifier qu'il n'y a pas d'erreur
    // dedans ou dans son accès, et également d'évaluer les données déjà présentes afin de pouvoir en ajouter
    // en toute sécurité
    fs.readFile(menu, (erreur, donnees) => {
        // si une erreur se produit
        if (erreur) {
            reponse.status(500).send({ // on envoie un code d'erreur 500 (erreur interne)
                message: erreurs['500_lecture'], // message à l'utilisateur
                error: erreur // affiche également l'erreur système
            });
        } else {
            console.log("ok")
            // on ne veut pas ajouter d'objets vides ou mal instanciés dans la BDD
            const liste_props = Object.getOwnPropertyNames(requete.body); // on stocke toutes les propriétés
                                                                            // de l'objet de la requête
            if (!liste_props.length) { // <=> si le corps de la requête est vide <=> si elle n'a pas de propriétés
                reponse.status(400).send( // on envoie une erreur 400 (= impossibilité de traiter la requête)
                    erreurs["400_vide"]); // et on ne fait rien
            } else {
                // on évalue ensuite cette liste afin de vérifier que les propriétés correspondent à celles attendues
                if (liste_props.length !== 2 || liste_props.find( e => e.toLowerCase() === "nom") == undefined || liste_props.find( e => e.toLowerCase() === "prix") == undefined){
                    reponse.status(400).send(erreurs["400_invalide"]);
                    // si les propriétés sont ok, on vérifie que les valeurs soient correctes
                } else if (liste_props.find( e => e.toLowerCase() === "prix") && parseFloat(requete.body.prix) != requete.body.prix){
                    reponse.status(400).send(erreurs["400_val_invalide"]);
                    return;
                } else { 
                    // si tout va bien, on peut procéder à l'ajout de la donnée
                    let new_id = 0; // new_id <=> id de l'élément que l'on va créer
                    // on stocke toutes les données du menu dans une variable
                    const donnees_existantes = JSON.parse(donnees);
                    // on vérifie s'il y a déjà des données dans la BDD ; si non, on va pouvoir ajouter l'item avec l'ID de base
                    // on part du principe que les objets ne sont pas entrés dans l'ordre croissant de leur id
                    if (donnees_existantes.entrees.length !== 0) { // s'il ya déjà des données
                        let tmp = [];
                        donnees_existantes.entrees.forEach(e => tmp.push(parseInt(e.id))); // toutes les ids attribuées
                        new_id = Math.max(...tmp) +1; // on sélectionne le plus grand déjà attribués et on ajoute 1
                    }
                    // on y ajoute, dans le tableau "entrees", la donnée demandée
                    donnees_existantes.entrees.push({
                        "id": parseInt(new_id),
                        "nom": requete.body.nom.toString().toLowerCase(),
                        "prix": Number(requete.body.prix)
                    });
                    // puis on réécrit le fichier source avec les données mises à jour
                    fs.writeFile(menu, 
                    JSON.stringify(donnees_existantes), // on convertit la donnée en chaîne car fs ne peut récrire qu'avec
                    (erreur_write) => {                       // des données de ce type
                        if (erreur_write) {
                            reponse.status(500).json({
                                message: erreurs["500_ecriture"],
                                error: erreur_write
                            });
                        } else {
                            reponse.status(200).send(erreurs["200_ajout"]);
                        } // FIN SI                      
                    }); // FIN WRITE FILE                                        
                } // FIN SI
            } // FIN SI
        } // FIN SI
    }); // FIN READFILE
} // FIN AJOUTER ENTREE

// fonction qui crée et ajoute une donnée au tableau entrees selon une id passée en argument de la requête
exports.ajoutEntreeId = (requete, reponse) => {
    // cette fonction va faire la même chose que la précédente ; la différence va se situer au niveau
    // du traitement de l'ID
    fs.readFile(menu, (erreur, donnees) => {
        if (erreur) {
            reponse.status(500).send({
                message: erreurs["500_lecture"],
                error: erreur
            });
        } else {
            // on parcourt le tableau d'entrees pour vérifier qu'aucun item n'ait déjà l'id entré en argument dans la requête
            if (JSON.parse(donnees).entrees.find(e => e.id === parseInt(requete.params.id)) !== undefined){
                // si c'est le cas, on affiche un message d'erreur et on quitte la fonction
                reponse.status(400).send(erreurs["400_deja_existant"]);
            } else { // si l'ID est disponible, on va vérifier la validé de la requête, comme précedemment
                const liste_props = Object.getOwnPropertyNames(requete.body);
                if (!liste_props.length) {
                    reponse.status(400).send(erreurs["400_vide"]);
                } else {
                    if (liste_props.length !== 2 || liste_props.find( e => e.toLowerCase() === "nom") === undefined || liste_props.find( e => e.toLowerCase() === "prix") === undefined){
                        reponse.status(400).send(erreurs["400_invalide"]);
                    } else if (parseFloat(requete.body.prix) != requete.body.prix){
                        // on vérifie que les valeurs soient valides
                        reponse.status(400).send(erreurs["400_val_invalide"]);
                        return;
                    } else { // on peut ajouter la donnée
                        const donnees_existantes = JSON.parse(donnees);
                        donnees_existantes.entrees.push({
                            "id": parseInt(requete.params.id),
                            "nom": requete.body.nom.toString().toLowerCase(),
                            "prix": Number(requete.body.prix)
                        }); // FIN PUSH
                        fs.writeFile(menu, 
                        JSON.stringify(donnees_existantes),
                        (erreur_write) => {
                            if (erreur_write) {
                                reponse.status(500).json({
                                    message: erreurs["500_ecriture"],
                                    error: erreur_write
                                });
                            } else {
                                reponse.status(200).send(erreurs["200_ajout"]);
                            }
                        }); // FIN WRITE FILE
                    } // FIN SI
                } // FIN SI
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN AJOUTER ENTREE PAR ID


/****************************************** R (READ) ****************************************************/

// Fonction permettant de lire l'intégralité des entrées
exports.lireEntrees = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {    // readFile va automatique prendre en argument : le cas échéant, l'erreur système (erreur),
                                                // ou les données récupérées (donnees) dans le fichier passé en argument (menu)
        if (erreur) {
            reponse.status(500).send({
                message: erreurs["500_lecture"],
                error: erreur
            });
        } else {
            const donnee_entrees = JSON.parse(donnees).entrees; // fs lit et retourne et des chaînes de caractères ;
                                                            // on utilise JSON.parse() pour les transformer en objet JSON
                                                            // et ainsi accéder à la clef 'entrees'
            reponse.status(200).send(donnee_entrees); // affichage des entrées dans le corps de la réponse
        }// FIN SI
    }); // FIN READ FILE
} // FIN LIRE ENTREES

// On crée une fonction permettant de lire une entrée du menu via son ID
exports.lireEntreeId = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (erreur) {
            reponse.status(500).send({
                message: erreurs["500_lecture"],
                error: erreur
            });
        } else { // même chose que plus haut mais on filtre également par l'ID
            const donnee_entree_id = JSON.parse(donnees).entrees.filter( // on va chercher l'objet ayant l'id requêté,
                                                                        // dans le tableau entrées
                obj => obj.id === parseInt(requete.params.id)   // "params" sélectionne les paramètres de la requête
                                                                // (e.g : "/:array/:id"). Ici, on sélectionne le paramètre nommé id
            );
            if (!donnee_entree_id[0]){ // s'il n'y a pas de donnée avec l'id requêté ([0] car filter retourne une liste)
                reponse.status(404).send(erreurs["404_id"]); // erreur
            } else {
                reponse.status(200).send(donnee_entree_id[0]); // succès
            } // FIN SI
        }// FIN SI
    }); // FIN READFILE
} // FIN LIRE ENTREES PAR ID

// Fonction qui affiche toutes les entrées du menu contenant un nom entré dans la requête
exports.rechercheEntree = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (erreur) {
            reponse.status(500).send({
                message: erreurs["500_lecture"],
                error: erreur
            });
        } else { 
            const donnees_existantes = JSON.parse(donnees).entrees;
            // on vérifie que le tableau est non-vide 
            if (!donnees_existantes.length) {
                reponse.status(404).send(erreurs["404_tab"]);
                return;
            }
            // on crée un tableau qui va contenir tous les items correspondants à la recherche
            let recherche_obj = [];
            // on boucle dans le tableau entrées
            donnees_existantes.forEach( e => {
                if(manip_files.chercherRegex(e.nom.toLowerCase(), requete.params.nom.toLowerCase())) {
                    recherche_obj.push(e);
                }
            }); // FIN FOR EACH
            // si on n'a rien trouvé -> erreur 404; sinon : on affiche tous les items trouvés
            (!recherche_obj.length) ? reponse.status(404).send(erreurs["404_nom"]) : reponse.status(200).send(recherche_obj);
        }// FIN SI
    }); // FIN READFILE
} // FIN LIRE ENTREES PAR NOM


/**************************************************** U (UPDATE) ****************************************************/

// On crée une fonction permettant de modifier une entrée du menu via le body de la requête en l'ayant sélectionnée
// par son ID dans le header de la requête.
// On peut modifier une seule, ou bien deux propriétés d'un item du tableau entrées
exports.updateEntree = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (erreur) {
            reponse.status(500).send({
                message: erreurs["500_lecture"],
                error: erreur
            });
        } else {
            // on vérifie qu'il existe bel et bien une donnée avec l'ID entré en argument
            if (JSON.parse(donnees).entrees.find(e => e.id === parseInt(requete.params.id)) === undefined) {
                // si ce n'est pas le cas, on affiche un message d'erreur et on quitte la fonction
                reponse.status(404).send(erreurs["404_id"]); // erreur 404 car donnée non trouvée
            } else { // sinon on vérifie la validité de la requête
                if (requete.body == {}) { // vérification que le champ n'est pas vide
                    reponse.status(400).send(erreurs["400_vide"]);
                } else {
                    const liste_props = Object.getOwnPropertyNames(requete.body); // vérification de la validité de l'objet
                    // s'il y a deux propriétés dans le corps de la requête mais que l'une n'est pas conforme
                    if ((liste_props.length === 2  && 
                    (liste_props.find( e => e.toLowerCase() === "nom") === undefined || liste_props.find( e => e.toLowerCase() === "prix") === undefined)) ||
                    // ou s'il n'y a qu'une propriété à changer mais qu'elle n'est pas conforme
                    ((liste_props.length === 1) && (liste_props.find( e => e.toLowerCase() === "nom" || e.toLowerCase() === "prix") === undefined))){
                        // on renvoie une erreur
                        reponse.status(400).send(erreurs["400_invalide"]);
                    } else if (liste_props.find( e => e.toLowerCase() === "prix") && parseFloat(requete.body.prix) != requete.body.prix) {
                        reponse.status(400).send(erreurs["400_val_invalide"]);
                        return;   
                    } else {   // si tout est bon, on peut procéder à la màj
                        // on stocke l'intégralité des données dans une variable
                        let donnees_existantes = JSON.parse(donnees);
                        // on cherche l'index de l'item recherché dans le tableau
                        const index = donnees_existantes.entrees.findIndex( obj => obj.id === parseInt(requete.params.id)); 
                        let donnee_update = donnees_existantes.entrees[index];
                        // on met à jour la donnée selon les propriétés entrées dans la requête <=> s'il n'y a que le
                        // prix à modifier, va garder le nom initial et mettre à jour seulement le prix
                        liste_props.forEach( e => // pour chaque propriété de la requête
                            donnee_update[e] = requete.body[e] // on met à jour la propriété de l'item correspondante
                        ); // FIN FOREACH
                        // on remet l'item mis à jour dans le tableau
                        donnees_existantes.entrees[index] = donnee_update;
                        // puis on réécrit dans le fichier json avec les données mises à jour
                        fs.writeFile(menu, 
                        JSON.stringify(donnees_existantes),
                        (erreur_write) => {                       
                            if (erreur_write) {
                                reponse.status(500).json({
                                    message: erreurs["500_ecriture"],
                                    error: erreur_write
                                });
                            } else {
                                reponse.status(200).send(erreurs["200_maj"]);
                            } // FIN SI                      
                        }); // FIN WRITE FILE
                    } // FIN SI
                } // FIN SI
            }// FIN SI
        } // FIN SI
    }); // FIN READFILE
} // FIN UPDATE ENTREE


/**************************************************** D (DELETE) *********************************************************************/

// On crée une fonction permettant de supprimer une entrée du menu selon son ID
 exports.supprimerEntree = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (erreur) {
            reponse.status(500).send({
                message: erreurs["500_lecture"],
                error: erreur
            });
        } else {
            // on cherche un objet ayant l'ID entré en argument
            if (JSON.parse(donnees).entrees.find(e => e.id === parseInt(requete.params.id)) === undefined) {
                // si ce n'est pas le cas, on affiche un message d'erreur et on quitte la fonction
                reponse.status(404).send(erreurs["404_id"]);
            } else { // si la donnée est trouvée, on va pouvoir procéder à la suppression
                // sélection de l'intégralité des données
                let donnees_existantes = JSON.parse(donnees);
                // on trouve l'index de l'item à supprimer
                const index = donnees_existantes.entrees.findIndex(obj => obj.id === parseInt(requete.params.id));
                // on utilise splice pour supprimer l'item dans le tableau
                donnees_existantes.entrees.splice(index, 1);
                // puis on réécrit le fichier de la BDD
                fs.writeFile(menu, 
                JSON.stringify(donnees_existantes),
                (erreur_write) => {                       
                    if (erreur_write) {
                        reponse.status(500).json({
                            message: erreurs["500_ecriture"],
                            error: erreur_write
                        });
                    } else {
                        reponse.status(200).send(erreurs["200_suppr"]);
                    } // FIN SI                      
                }); // FIN WRITE FILE
            }// FIN SI
        } // FIN SI
    }) // FIN READ FILE
} // FIN SUPPRIMER ENTREE
