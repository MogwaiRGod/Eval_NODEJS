/*********************************** VARIABLES */
const menu = './src/model/menu.json';   // chemin du fichier du menu

/*********************************** IMPORTS */
const fs = require('fs'); // import du module file system dans la constante fs



/******************************************************** CRUD */

/*********************************** C (CREATE) */
// Fonction permettant d'ajouter une nouvelle entrée dans le menu (l'id sera calculée automatiquement
// selon l'id le plus élevé du tableau)
exports.ajoutEntree = (requete, reponse) => { // exports. autorise l'exportation de la fonction
    fs.readFile(menu, (erreur, donnees) => {
        // si une erreur se produit
        if (erreur) {
            reponse.status(500).send({ // on envoie un code d'erreur 500 (erreur interne)
                message: "Une erreur est survenue lors de la lecture des données", // message à l'utilisateur
                error: erreur // affiche également l'erreur système
            });
        } else {
            // on ne veut pas ajouter d'objets vides ou mal instanciés dans la BDD
            if (requete.body == {}) { // <=> si le corps de la requête est vide
                reponse.status(400).send( // on envoie une erreur 400 (= impossibilité de traiter la requête)
                    "Corps de requête vide"); // et on ne fait rien
            } else {
                const liste_props = Object.getOwnPropertyNames(requete.body); // on stocke toutes les propriétés
                                                                            // de l'objet de la requête
                // on évalue ensuite cette liste afin de vérifier que les propriétés correspondent à celles attendues
                if (liste_props.length !== 2 || liste_props.find( e => e === "nom") === undefined || liste_props.find( e => e === "prix") === undefined){
                    reponse.status(400).send("Propriété(s) invalide(s)");
                } else { // si tout va bien, on peut procéder à l'ajout de la donnée
                    // on part du principe que les objets ne sont pas entrés dans l'ordre croissant de leur id
                    let new_id = 0; // new_id <=> id de l'élément que l'on va créer
                    JSON.parse(donnees).entrees.forEach(e => { // pour chaque élément du tableau
                        if (e.id >= new_id) {  // si son id est supérieur ou égal à celui du nouvel elément
                            new_id = e.id + 1;  // on va prendre l'id de l'élément évalué et lui ajouter 1
                        }
                    }); // FIN FOREACH
                    // on stocke toutes les données du menu dans une variable
                    const donnees_existantes = JSON.parse(donnees);
                    // on y ajoute, dans le tableau "entrees", la donnée demandée
                    donnees_existantes.entrees.push({
                        "id": new_id,
                        "nom": requete.body.nom,
                        "prix": requete.body.prix
                    });
                    // puis on réécrit le fichier source avec les données mises à jour
                    fs.writeFile(menu, 
                    JSON.stringify(donnees_existantes), // on convertit la donnée en chaîne car fs ne peut récrire qu'avec
                    (erreur) => {                       // des données de ce type
                        if (erreur) {
                            reponse.status(500).json({
                                message: "Une erreur est survenue lors de l'écriture des données",
                                error: erreur
                            });
                        } else {
                            reponse.status(200).send("Donnée ajoutée avec succès !");
                        } // FIN SI                      
                    }); // FIN WRITE FILE                                        
                } // FIN SI
            } // FIN SI
            
        } // FIN SI
    }); // FIN READFILE
}

// fonction qui crée et ajoute une donnée au tableau entrees selon une id passée en argument de la requête
exports.ajoutEntreeId = (requete, reponse) => {
    // cette fonction va faire la même chose que la précédente ; la différence va se situer au niveau
    // du traitement de l'ID
    fs.readFile(menu, (erreur, donnees) => {
        if (erreur) {
            reponse.status(500).send({
                message: "Une erreur est survenue lors de la lecture des données",
                error: erreur
            });
        } else {
            // on parcourt le tableau d'entrees pour vérifier qu'aucun item n'ait déjà l'id entré en argument dans la requête
            if (JSON.parse(donnees).entrees.find(e => e.id === parseInt(requete.params.id)) !== undefined){
                // si c'est le cas, on affiche un message d'erreur et on quitte la fonction
                reponse.status(400).send("Il y a déjà un objet avec cet ID dans le tableau");
            } else { // si l'ID est disponible, on va vérifier la validé de la requête, comme précedemment
                if (requete.body == {}) {
                    reponse.status(400).send("Corps de requête vide");
                } else {
                    const liste_props = Object.getOwnPropertyNames(requete.body);
                    if (liste_props.length !== 2 || liste_props.find( e => e === "nom") === undefined || liste_props.find( e => e === "prix") === undefined){
                        reponse.status(400).send("Propriété(s) invalide(s)");
                    } else { // on peut ajouter la donnée
                        const donnees_existantes = JSON.parse(donnees);
                        donnees_existantes.entrees.push({
                            "id": requete.params.id,
                            "nom": requete.body.nom,
                            "prix": requete.body.prix
                        }); // FIN PUSH
                        fs.writeFile(menu, 
                        JSON.stringify(donnees_existantes),
                        (erreur) => {
                            if (erreur) {
                                reponse.status(500).json({
                                    message: "Une erreur est survenue lors de l'écriture des données",
                                    error: erreur
                                });
                            } else {
                                reponse.status(200).send("Donnée ajoutée avec succès !");
                            }
                        }); // FIN WRITE FILE
                    } // FIN SI
                } // FIN SI
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN FONCTION


/************************* R (READ) */
// Fonction permettant de lire l'intégralité des entrées
exports.lireEntrees = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {    // readFile va automatique prendre en argument : le cas échéant, l'erreur système (erreur),
                                                // ou les données récupérées (donnees) dans le fichier passé en argument (menu)
        if (erreur) {
            reponse.status(500).send({
                message: "Une erreur est survenue lors de la lecture des données",
                error: erreur
            });
        } else {
            const donnee_entrees = JSON.parse(donnees).entrees; // fs lit et retourne et des chaînes de caractères ;
                                                            // on utilise JSON.parse() pour les transformer en objet JSON
                                                            // et ainsi accéder à la clef 'entrees'
            reponse.status(200).send(donnee_entrees); // affichage des entrées dans le corps de la réponse
        }// FIN SI
    });
}

// On crée une fonction permettant de lire une entrée du menu via son ID
exports.lireEntreeId = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (erreur) {
            reponse.status(500).send({
                message: "Une erreur est survenue lors de la lecture des données",
                error: erreur
            });
        } else { // même chose que plus haut mais on filtre également par l'ID
            const donnee_entree_id = JSON.parse(donnees).entrees.filter( // on va chercher l'objet ayant l'id requêté,
                                                                        // dans le tableau entrées
                obj => obj.id === parseInt(requete.params.id)   // "params" sélectionne les paramètres de la requête
                                                                // (e.g : "/:array/:id"). Ici, on sélectionne le paramètre nommé id
            );
            if (!donnee_entree_id[0]){ // s'il n'y a pas de donnée avec l'id requêté ([0] car filter retourne une liste)
                reponse.status(404).send("Aucun objet avec cet ID trouvé"); // erreur
            } else {
                reponse.status(200).send(donnee_entree_id[0]); // succès
            } // FIN SI
        }// FIN SI
    });
}


/*********************************** U (UPDATE) */
 // On crée une fonction permettant de modifier une entrée du menu, dans le body de la requête,
 // et selon son id 
//  exports.updateEntree = (requete, reponse) => {
// }


/*********************************** D (DELETE) */
 // On crée une fonction permettant de supprimer une entrée du menu
//  exports.deleteEntree = (requete, reponse) => {
// }