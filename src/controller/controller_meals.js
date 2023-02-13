/*
* VARIABLES
*/
// chemin du fichier du menu
const menu = './src/model/menu.json';


/*
* IMPORTS
*/
// file system
const fs = require('fs'); 
// fonctions du controller
const manip_files = require('../utils/manipulateFiles');


/*
* CRUD
*/

/*
* CREATE
*/

// fonction qui ajoute un plat en calculant automatiquement son ID
exports.ajouterPlat = (requete, reponse) => {
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
            } else if (manip_files.checkValeurs(requete.body.prix, reponse)) {  // si les propriétés ont OK, on vérifie que les valeurs le sont également
                return;
            } else {
                let id; let donnees_existantes = JSON.parse(donnees);
                // sinon, on détermine l'ID du nouveau plat
                // si le tableau est vide -> id = 0             // sinon calcule l'ID selon l'ID le plus élevé attribué
                (!donnees_existantes.plats.length) ? id = 0 : id = manip_files.defineId(donnees_existantes.plats);
                // création de l'objet
                const item = manip_files.creerItem(id, requete.body.nom, requete.body.prix);
                // ajout au tableau
                donnees_existantes.plats.push(item);
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
} // FIN AJOUTER 

// fonction qui ajoute un plat à la BDD en spécifiant son ID
exports.ajouterPlatId = (requete, reponse) => {
    // lecture BDD
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')){
            return;
        } else {
            const liste_props = Object.getOwnPropertyNames(requete.body);
            let donnees_existantes = JSON.parse(donnees);
            if (manip_files.checkId(requete.params.id, donnees_existantes.plats, reponse)) { // vérification que l'ID demandé n'est pas 
                                                                                                // déjà attribué
                // sinon erreur + fin
                return;
            } else if (manip_files.checkBodyAjout(liste_props, reponse)) { 
                // vérificatoin de l'intégrité des données à entrer ; si non-intègres : erreur + fin
                return;
            } else if (manip_files.checkValeurs(requete.body.prix, reponse)) {  // si les propriétés ont OK, on vérifie que les valeurs le sont également
                return;
            } else {
                // détermination de l'ID selon que le tableau est vide ou non
                let id;
                (!donnees_existantes.plats.length) ? id=0 : id=manip_files.defineId(donnees_existantes.plats);
                // création de l'item
                const item = manip_files.creerItem(id, requete.body.nom, requete.body.prix);
                // ajout de l'item au tableau
                donnees_existantes.plats.push(item);
                // réécriture du fichier
                fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur_write) => {
                    // cas d'erreur
                    if (manip_files.casErreurs(erreur_write, reponse, 'ecriture')) {
                        return;
                    } // cas de succès
                    manip_files.succesReq(reponse, 'ajout');
                });
            }// FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN AJOUTER ID



/*
* READ
*/

// fonction permettant d'afficher tous les plats
exports.afficherPlats = (requete, reponse) => {
    // lecture du fichier de données
    fs.readFile(menu, (erreur, donnees) => {
        // si erreur
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // stockage des données demandées
            const donnees_existantes = JSON.parse(donnees).plats;
            // s'il n'y a pas de données
            if (manip_files.checkTab(donnees_existantes, reponse)) {
                return;
            }
            // sinon, affichage des données
            manip_files.requeteStatut(200, donnees_existantes, reponse);
        }
    }); // FIN READ FILE
} // FIN AFFICHER plats

// fonction qui permet d'afficher un plat selon son id
exports.afficherPlatId = (requete, reponse) => {
    // lecture du fichier de données
    fs.readFile(menu, (erreur, donnees) => {
        // si erreur
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // stockage des données demandées
            const donnees_existantes = JSON.parse(donnees).plats;
            // s'il n'y a pas de données
            if (manip_files.checkTab(donnees_existantes, reponse)) {
                return;
            } else if (manip_files.existeId(requete.params.id, donnees_existantes, reponse)) { 
                // vérification que l'item demandé existe ; si oui :
                // on affiche l'item selon l'ID demandé
                manip_files.afficherItemId(requete.params.id, donnees_existantes, reponse);
            } else {
                // sinon, si aucun item n'a été trouvé, un message d'erreur a été envoyé et maintenant on quitte la fonction
                return;
            }// FIN SI
        } // FIN SI
    }); // FIN READ FILE

} // FIN AFFICHER DESSERT PAR ID

// fonction qui recherche les plats dont le nom correspond à une expression entrée dans la requête
exports.recherchePlats = (requete, reponse) => {
    // lecture du fichier de données
    fs.readFile(menu, (erreur, donnees) => {
        // si erreur
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // stockage du tableau
            const donnees_existantes = JSON.parse(donnees).plats;
            // vérification que le tableau est non-vide
            if (manip_files.checkTab(donnees_existantes, reponse)) {
                // si non, errerur + on quitte
                return;
            } else {
                // on cherche dans le tableau les occurrences correspondantes
                // si on en trouve, la fonction les affiche, sinon, message d'erreur
                manip_files.rechercheItem(donnees_existantes, "nom", requete.params.recherche, reponse);
                return;
            }// FIN SI           
        }// FIN SI
    }); // FIN READ FILE
} // FIN RECHERCHE 



/*
* UPDATE
*/

// fonction qui permet de màj un plat sélectionné par son ID
exports.udpatePlat = (requete, reponse) => {
    // lecture du fichier de données
    fs.readFile(menu, (erreur, donnees) => {
        // cas d'erreur
        if (manip_files.casErreurs(erreur, reponse, 'lecture')){
            return;
        } else {
            // sélection des données
            let donnees_existantes = JSON.parse(donnees);
            // vérification que le tableau est non-vide
            if (manip_files.checkTab(donnees_existantes.plats, reponse)) {
                return;
                // vérification que l'item existe
            } else if (manip_files.existeId(requete.params.id, donnees_existantes.plats, reponse)) {
                // sélection des propriétés dans le corps de requête
                const liste_props = Object.getOwnPropertyNames(requete.body);
                // vérification que les propriétés demandées sont correctes
                if (manip_files.checkPropsUpdate(liste_props, reponse)) {
                    return;
                    // on vérifie que les valeurs sont OK
                } else if (liste_props.find(p => p.toString().toLowerCase() === "prix") && manip_files.checkValeurs(requete.body.prix, reponse)) {
                    return;
                } else {
                    // on sélectionne l'item dans le tableau
                    let item = donnees_existantes.plats.find( e => e.id === parseInt(requete.params.id));
                    console.log(item)
                    // on boucle dans les propriétés
                    liste_props.forEach( p => {
                        // on màj l'item selon elles
                        item[p] = requete.body[p];
                    }); // FIN FOR EACH
                    // // réécriture du fichier de données
                    fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur_write) => {
                        // si erreur
                        if (manip_files.casErreurs(erreur_write, reponse, 'ecriture')){
                            return;
                        } else {
                            // si succès
                            manip_files.succesReq(reponse, 'maj');
                            return;
                        }
                    }); // FIN WRITE FILE
                } // FI SI
            } // FIN SI
            return;
        } // FIN SI
    }); // FIN WRITE FILE
} // FIN UPDATE 



/*
* DELETE
*/

// fonction permettant de supprimer un plat sélectionné par son ID
exports.supprimerPlat = (requete, reponse) => {
    // lecture du fichier de données
    fs.readFile(menu, (erreur, donnees) => {
        // cas d'erreur
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // sélection des données
            let donnees_existantes = JSON.parse(donnees);
            // vérification que le tableau de plats n'est pas vide
            if (manip_files.checkTab(donnees_existantes.plats, reponse)){
                return;
            } else if (manip_files.existeId(requete.params.id, donnees_existantes.plats, reponse)) {
                // vérification que l'item demandé existe 
                // si oui, on cherche son index dans le tableau
                const index = donnees_existantes.plats.findIndex(obj => obj.id === parseInt(requete.params.id));
                // suppression de l'item
                donnees_existantes.plats.splice(index, 1);
                // on réécrit les données
                fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur_write) => {
                    // cas d'erreur
                    if (manip_files.casErreurs(erreur_write, reponse, 'ecriture')) {
                        return;
                    } // cas de succès
                    manip_files.succesReq(reponse, 'suppr');
                }); // FIN WRITE FILE
            } // FIN SI
        } //FIN SI
    }); // FIN READ FILE
} // FIN SUPPRIMER 
