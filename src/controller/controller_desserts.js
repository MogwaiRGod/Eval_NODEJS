/*************************************************** VARIABLES *********************************/
const menu = './src/model/menu.json';   // chemin du fichier du menu


/*************************************************** IMPORTS *********************************/
const fs = require('fs'); 
const manip_files = require('../utils/manipulateFiles');



/******************************************************** CRUD ******************************************************/

/********************************* CREATE *****************************/
// fonction qui ajoute un dessert à la BDD sans avoir l'ID précisé dans la requête => la fonction calcule l'ID selon ceux
// déjà attribués
exports.ajouterDessert = (requete, reponse) => {
    // lecture des données
    fs.readFile(menu, (erreur, donnees) => {
        // si erreur
        if(manip_files.casErreurs(erreur, reponse, "lecture")){
            // message + fin
            return;
        } else { 
            // stockage des propriétés de la requête
            const liste_props = Object.getOwnPropertyNames(requete.body);
            // vérification de l'intégrité de la requête 
            // = que le corps n'est pas vide et que les propriétés sont correctes
            if (manip_files.checkBodyAjout(liste_props, reponse)) {
                // si non-intègres -> erreur + fin
                return;
            } else {
                let id; let donnees_existantes = JSON.parse(donnees);
                // sinon, on détermine l'ID du nouveau dessert
                // si le tableau est vide -> id = 0             // sinon calcule l'ID selon l'ID le plus élevé attribué
                (!donnees_existantes.desserts.length) ? id = 0 : id = manip_files.defineId(donnees_existantes.desserts);
                // création de l'objet
                const item = manip_files.creerItem(id, requete.body.nom, requete.body.prix);
                // ajout au tableau
                donnees_existantes.desserts.push(item);
                // réécriture de la BDD
                fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur_write) => {
                    // si erreur
                    if(manip_files.casErreurs(erreur_write, reponse, 'ecriture')){
                        // message + fin
                        return;
                    } else { // si succès
                       // message + fin
                        manip_files.succesReq(reponse, 'ajout');
                        return;
                    }// FIN SI
                }); // FIN WRITE FILE
            }// FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN AJOUTER DESSERT

// fonction qui ajoute un dessert à la BDD en spécifiant son ID
exports.ajouterDessertId = (requete, reponse) => {
    // lecture BDD
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')){
            return;
        } else {
            let donnees_existantes = JSON.parse(donnees);
            if (manip_files.checkId(requete.params.id, donnees_existantes.desserts, reponse)) { // vérification que l'ID demandé n'est pas 
                                                                                                        // déjà attribué
                // sinon erreur + fin
                return;
            } else if (manip_files.checkBodyAjout(liste_props, reponse)) { 
                // vérificatoin de l'intégrité des données à entrer ; si non-intègres : erreur + fin
                return;
            }// FIN SI

        } // FIN SI
    }); // FIN READ FILE
} // FIN AJOUTER DESSERT ID
/********************************* READ *****************************/
/********************************* UPDATE *****************************/
/********************************* DELETE *****************************/