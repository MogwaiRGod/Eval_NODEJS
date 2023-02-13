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
const manip_files = require('../utils/manipulateFiles'); // import des fonctions nécessaires



/*
* CRUD
*/

/*
* CREATE
*/

// fonction qui permet d'ajouter un petit-déjaûner à la BDD en calculant son ID
exports.ajouterPetitDej = (requete, reponse) => {
    // lecture du fichier de données
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')){
            // cas d'erreur à la lecture
            return;
        } else {
            // vérification des données à entrer
            if (manip_files.checkBodyAjout(Object.getOwnPropertyNames(requete.body), reponse)) {
                // cas de données non-intègres
                return;
            } else if (manip_files.checkValeurs(requete.body.prix, reponse)) {
                // on vérirife que les valeurs soient OK sinon on envoie une erreur et on quitte
                return;
            } else {
                // stockage des données du tableau
                let donnees_existantes = JSON.parse(donnees); let id;
                // évaluation : tableau vide ou non pour déterminer l'id de l'item à ajouter
                (!donnees_existantes.petits_dejeuners.length) ? id=0 : id=manip_files.defineId(donnees_existantes.petits_dejeuners);
                // création de l'item avec les valeurs voulues
                const item = manip_files.creerItem(id, requete.body.nom, requete.body.prix);
                // ajout de l'item dans le tableau
                donnees_existantes.petits_dejeuners.push(item);
                // réécriture du fichier de données
                fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur_write) => {
                    // cas d'erreur
                    if (manip_files.casErreurs(erreur_write, reponse, 'ecriture')){
                        return;
                    }
                    // cas de succès
                    manip_files.succesReq(reponse, 'ajout');
                    return;
                }); // FIN WRITE FILE
            } // FIN SI            
        } // FIN SI
    }); // FIN READ FILE
} // FIN AJOUTER MENU

// fonction qui ajoute un petit dejeuner avec son ID entré en paramètre de la requête
exports.ajouterPetitDejId = (requete, reponse) => {
    // lecture du fichier
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')){
            return;
        } else {
            // stockage des données
            let donnees_existantes = JSON.parse(donnees);
            // vérification que l'ID demandé n'est pas déjà attribué
            if (manip_files.checkId(requete.params.id, donnees_existantes.petits_dejeuners, reponse)) {
                return;
            } else if (manip_files.checkBodyAjout(Object.getOwnPropertyNames(requete.body), reponse)){
                // vérification des propriétés
                return;
                // vérification des valeurs
            } else if (manip_files.checkValeurs(requete.body.prix, reponse)) {
                return;
            } else {
                // détermination de l'id de l'item
                let id;
                (!donnees_existantes.petits_dejeuners.length) ? id=0 : id=manip_files.defineId(donnees_existantes.petits_dejeuners);
                // création de l'item
                const item = manip_files.creerItem(id, requete.body.nom, requete.body.prix);
                // ajout de l'item au tableau
                donnees_existantes.petits_dejeuners.push(item);
                // réécriture du fichier de données
                fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur_write) => {
                    if (manip_files.casErreurs(erreur_write, reponse, 'ecriture')){
                        return;
                    } else {
                        manip_files.succesReq(reponse, 'ajout');
                    } // FIN SI
                }); // FIN WRITE FILE
            } // FIN SI
        }// FIN SI
    }); // FIN READ FILE
} // FIN AJOUTER MENU PAR ID



/*
* READ
*/

// fonction qui affiche tous les petits dejs de la BDD
exports.afficherPetitsDejs = (requete, reponse) => {
    // lecture du fichier
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')){
            return;
        } else {
            // sélection des données
            const donnees_existantes = JSON.parse(donnees).petits_dejeuners;
            // vérification qu'il y a des données à afficher
            if (manip_files.checkTab(donnees_existantes, reponse)) {
                return;
            } else {
                // affichage des données
                manip_files.requeteStatut(200, donnees_existantes, reponse);
                return;
            }
        }
    }); // FIN READ FILE
} 

// fonction qui affiche un petit dejeuner dont l'ID est passé en paramètre de la requête
exports.afficherPetitDejId = (requete, reponse) => {
    // lecture du fichier
    fs.readFile(menu, (erreur, donnees) => {
        // si erreur lecture
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // stockage données
            const donnees_existantes = JSON.parse(donnees).petits_dejeuners;
            // vérification que le jeu de données n'est pas vide
            if (manip_files.checkTab(donnees_existantes, reponse)) {
                return; 
                // vérification que l'ID est bien attribué
            } else if (manip_files.existeId(requete.params.id, donnees_existantes, reponse)) {
                // on affiche l'item en question
                manip_files.afficherItemId(requete.params.id, donnees_existantes, reponse);
                return;
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN AFFICHER MENU PAR ID

// fonction qui cherche un petit dejeuner dans la BDD
exports.chercherPetitDej = (requete, reponse) => {
    // lecture fichier
    fs.readFile(menu, (erreur, donnees) => {
        // si erreur
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            const donnees_existantes = JSON.parse(donnees).petits_dejeuners;
            // vérification que le tableau n'est pas vide
            if (manip_files.checkTab(donnees_existantes, reponse)) {
                return;
            } else {
                // recherche de items correspondants et affichage le cas échéant
                manip_files.rechercheItem(donnees_existantes, "nom", requete.params.recherche, reponse);
                return;
            }
        } // FIN SI
    }); // FIN READ FILE
} // FIN CHERCHER MENU


/*
* UPDATE
*/

// fonction qui màj un petit dej selon son ID
exports.updatePetitDej = (requete, reponse) => {
    // lecture du fichier
    fs.readFile(menu, (erreur, donnees) => {
        // si erreur dans la lecture
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            let donnees_existantes = JSON.parse(donnees);
            // vérification que le tableau n'est pas vide
            if (manip_files.checkTab(donnees_existantes.petits_dejeuners, reponse)) {
                return;
                // vérification que l'ID demandé est attribué
            } else if (manip_files.existeId(requete.params.id, donnees_existantes.petits_dejeuners, reponse)) {
                // vérification de l'intégrité des entrées
                const liste_props = Object.getOwnPropertyNames(requete.body);
                // vérification des propriétés
                if (manip_files.checkPropsUpdate(liste_props, reponse)) {
                    return;
                    // vérification des valeurs
                } else if (liste_props.find(p => p.toString().toLowerCase() === "prix") && manip_files.checkValeurs(requete.body.prix, reponse)) {
                    return;
                } else {
                    // on cherche son index
                    const index = donnees_existantes.petits_dejeuners.findIndex(obj => obj.id === parseInt(requete.params.id));
                    // sélection de l'item
                    let item = donnees_existantes.petits_dejeuners[index];
                    // màj de l'item
                    liste_props.forEach(p => {
                        item[p] = requete.body[p];
                    });
                    // on remet le petit-déjeûner modifié à sa place dans le tableau
                    donnees_existantes.petits_dejeuners[index] = item;
                    // réécriture du fichier
                    fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur_write) => {
                        // si erreur
                        if (manip_files.casErreurs(erreur_write, reponse, 'ecriture')) {
                            return;
                        } else {
                            // si succès
                            manip_files.succesReq(reponse, 'maj');
                            return;
                        }
                    });
                }
            }
        } // FIN SI
    }); // FIN READ FILE
} // FIN UPDATE PETIT-DEJ



/*
* DELETE
*/

// fonction qui supprime un petit dej selon son ID
exports.supprPetitDej = (requete, reponse) => {
    // lecture du fichier
    fs.readFile(menu, (erreur, donnees) => {
        // si erreur dans la lecture
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            let donnees_existantes = JSON.parse(donnees);
            // vérification que le tableau n'est pas vide
            if (manip_files.checkTab(donnees_existantes.petits_dejeuners, reponse)) {
                return;
                // vérification que l'item demandé existe
            } else if (manip_files.existeId(requete.params.id, donnees_existantes.petits_dejeuners, reponse)) {
                // si oui, on cherche son index dans le tableau
                const index = donnees_existantes.petits_dejeuners.findIndex(obj => obj.id === parseInt(requete.params.id));
                // on supprime l'item
                donnees_existantes.petits_dejeuners.splice(index, 1);
                // réécriture du fichier de données
                fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur_write) => {
                    // si erreur
                    if (manip_files.casErreurs(erreur_write, reponse, 'ecriture')) {
                        return;
                    } else {
                        // si succès
                        manip_files.succesReq(reponse, 'suppr');
                        return;
                    }
                });
            }
            return;
        }
    });
} // FIN SUPPRIMER PETIT-DEJEUNER
