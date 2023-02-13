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
const manipFiles = require('../utils/manipulate_files');


/*
 * CRUD
 */

/*
 * CREATE
 */

// fonction qui ajoute un plat en calculant automatiquement son ID
exports.addMeal = (request, response) => {
    // lecture des données
    fs.readFile(menu, (error, data) => {
        // si erreur
        if(manipFiles.caseError(error, response, "lecture")){
            // message + fin
            return;
        } else { 
            // stockage des propriétés de la requête
            const propsList = Object.getOwnPropertyNames(request.body);
            // vérification de l'intégrité de la requête 
            // = que le corps n'est pas vide et que les propriétés sont correctes
            if (manipFiles.checkBodyAdd(propsList, response)) {
                // si non-intègres -> error + fin
                return;
            // si les propriétés ont OK, on vérifie que les valeurs le sont également
            } else if (manipFiles.checkValues(request.body.prix, response)) {  
                return;
            } else {
                let id; let existingData = JSON.parse(data);
                // sinon, on détermine l'ID du nouveau plat
                /*
                * si le tableau est vide : alors id = 0             
                * sinon on calcule l'ID selon l'ID le plus élevé attribué avec la fonction defineID
                */
                (!existingData.meals.length) ? id = 0 : id = manipFiles.defineId(existingData.meals);
                // création de l'objet
                const item = manipFiles.createItem(id, request.body.nom, request.body.prix);
                // ajout au tableau
                existingData.meals.push(item);
                // réécriture de la BDD
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // si error
                    if(manipFiles.caseError(error_write, response, 'ecriture')){
                        // message + fin
                        return;
                    } else { // si succès
                       // message + fin
                        manipFiles.successReq(response, 'ajout');
                        return;
                    }// FIN SI
                }); // FIN WRITE FILE
            }// FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN ADD MEAL

// fonction qui ajoute un plat à la BDD en spécifiant son ID
exports.addMealId = (request, response) => {
    // lecture BDD
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')){
            return;
        } else {
            const propsList = Object.getOwnPropertyNames(request.body);
            let existingData = JSON.parse(data);
            // vérification que l'ID demandé n'est pas déjà attribué
            if (manipFiles.checkId(request.params.id, existingData.meals, response)) { 
                // sinon erreur + fin
                return;
            } else if (manipFiles.checkBodyAdd(propsList, response)) { 
                // vérificatoin de l'intégrité des données à entrer ; si non-intègres : error + fin
                return;
            // si les propriétés ont OK, on vérifie que les valeurs le sont également
            } else if (manipFiles.checkValues(request.body.prix, response)) {  
                return;
            } else {
                // détermination de l'ID selon que le tableau est vide ou non
                let id;
                (!existingData.meals.length) ? id=0 : id=manipFiles.defineId(existingData.meals);
                // création de l'item
                const item = manipFiles.createItem(id, request.body.nom, request.body.prix);
                // ajout de l'item au tableau
                existingData.meals.push(item);
                // réécriture du fichier
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // cas d'error
                    if (manipFiles.caseError(error_write, response, 'ecriture')) {
                        return;
                    } // cas de succès
                    manipFiles.successReq(response, 'ajout');
                });
            }// FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN ADD MEAL ID



/*
 * READ
 */

// fonction permettant d'afficher tous les meals
exports.readMeals = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // si erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // stockage des données demandées
            const existingData = JSON.parse(data).meals;
            // s'il n'y a pas de données
            if (manipFiles.checkArray(existingData, response)) {
                return;
            }
            // sinon, affichage des données
            manipFiles.requestStatus(200, existingData, response);
        }
    }); // FIN READ FILE
} // FIN READ MEALS

// fonction qui permet d'afficher un plat selon son id
exports.readMealId = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // si erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // stockage des données demandées
            const existingData = JSON.parse(data).meals;
            // s'il n'y a pas de données
            if (manipFiles.checkArray(existingData, response)) {
                return;
            } else if (manipFiles.existsId(request.params.id, existingData, response)) { 
                // vérification que l'item demandé existe ; si oui :
                // on affiche l'item selon l'ID demandé
                manipFiles.readItemId(request.params.id, existingData, response);
            } else {
                // sinon, si aucun item n'a été trouvé, un message d'error a été envoyé et maintenant on quitte la fonction
                return;
            }// FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN READ MEAL ID

// fonction qui recherche les meals dont le nom correspond à une expression entrée dans la requête
exports.searchMeals = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // si erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // stockage du tableau
            const existingData = JSON.parse(data).meals;
            // vérification que le tableau est non-vide
            if (manipFiles.checkArray(existingData, response)) {
                // si non, errerur + on quitte
                return;
            } else {
                // on cherche dans le tableau les occurrences correspondantes
                // si on en trouve, la fonction les affiche, sinon, message d'error
                manipFiles.searchItem(existingData, "nom", request.params.name, response);
                return;
            }// FIN SI           
        }// FIN SI
    }); // FIN READ FILE
} // FIN SEARCH MEALS



/*
 * UPDATE
 */

// fonction qui permet de màj un plat sélectionné par son ID
exports.udpateMeal = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // cas d'erreur
        if (manipFiles.caseError(error, response, 'lecture')){
            return;
        } else {
            // sélection des données
            let existingData = JSON.parse(data);
            // vérification que le tableau est non-vide
            if (manipFiles.checkArray(existingData.meals, response)) {
                return;
                // vérification que l'item existe
            } else if (manipFiles.existsId(request.params.id, existingData.meals, response)) {
                // sélection des propriétés dans le corps de requête
                const propsList = Object.getOwnPropertyNames(request.body);
                // vérification que les propriétés demandées sont correctes
                if (manipFiles.checkPropsUpdate(propsList, response)) {
                    return;
                    // on vérifie que les valeurs sont OK
                } else if (propsList.find(p => p.toString().toLowerCase() === "prix") && manipFiles.checkValues(request.body.prix, response)) {
                    return;
                } else {
                    // on sélectionne l'item dans le tableau
                    let item = existingData.meals.find( e => e.id === parseInt(request.params.id));
                    // on boucle dans les propriétés
                    propsList.forEach( p => {
                        // on màj l'item selon elles
                        item[p] = request.body[p];
                    }); // FIN FOR EACH
                    // réécriture du fichier de données
                    fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                        // si erreur
                        if (manipFiles.caseError(error_write, response, 'ecriture')){
                            return;
                        } else {
                            // si succès
                            manipFiles.successReq(response, 'maj');
                            return;
                        }
                    }); // FIN WRITE FILE
                } // FI SI
            } // FIN SI
            return;
        } // FIN SI
    }); // FIN WRITE FILE
} // FIN UPDATE MEAL



/*
 * DELETE
 */

// fonction permettant de supprimer un plat sélectionné par son ID
exports.deleteMeal = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // cas d'error
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // sélection des données
            let existingData = JSON.parse(data);
            // vérification que le tableau de meals n'est pas vide
            if (manipFiles.checkArray(existingData.meals, response)){
                return;
            } else if (manipFiles.existsId(request.params.id, existingData.meals, response)) {
                // vérification que l'item demandé existe 
                // si oui, on cherche son index dans le tableau
                const index = existingData.meals.findIndex(obj => obj.id === parseInt(request.params.id));
                // suppression de l'item
                existingData.meals.splice(index, 1);
                // on réécrit les données
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // cas d'erreur
                    if (manipFiles.caseError(error_write, response, 'ecriture')) {
                        return;
                    } 
                    // cas de succès
                    manipFiles.successReq(response, 'suppr');
                }); // FIN WRITE FILE
            } // FIN SI
        } //FIN SI
    }); // FIN READ FILE
} // FIN DELETE MEAL
