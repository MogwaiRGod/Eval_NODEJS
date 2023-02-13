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
const manipFiles = require('../utils/manipulate_files'); // import des fonctions nécessaires



/*
* CRUD
*/

/*
* CREATE
*/

// fonction qui permet d'ajouter un petit-déjaûner à la BDD en calculant son ID
exports.addBreakfast = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')){
            // cas d'error à la lecture
            return;
        } else {
            // vérification des données à entrer
            if (manipFiles.checkBodyAdd(Object.getOwnPropertyNames(request.body), response)) {
                // cas de données non-intègres
                return;
            } else if (manipFiles.checkValues(request.body.prix, response)) {
                // on vérirife que les valeurs soient OK sinon on envoie une error et on quitte
                return;
            } else {
                // stockage des données du tableau
                let existingData = JSON.parse(data); let id;
                // évaluation : tableau vide ou non pour déterminer l'id de l'item à ajouter
                (!existingData.breakfasts.length) ? id=0 : id=manipFiles.defineId(existingData.breakfasts);
                // création de l'item avec les valeurs voulues
                const item = manipFiles.createItem(id, request.body.nom, request.body.prix);
                // ajout de l'item dans le tableau
                existingData.breakfasts.push(item);
                // réécriture du fichier de données
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // cas d'error
                    if (manipFiles.caseError(error_write, response, 'ecriture')){
                        return;
                    }
                    // cas de succès
                    manipFiles.successReq(response, 'ajout');
                    return;
                }); // FIN WRITE FILE
            } // FIN SI            
        } // FIN SI
    }); // FIN READ FILE
} // FIN ADD BREAKFAST

// fonction qui ajoute un petit dejeuner avec son ID entré en paramètre de la requête
exports.addBreakfastId = (request, response) => {
    // lecture du fichier
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')){
            return;
        } else {
            // stockage des données
            let existingData = JSON.parse(data);
            // vérification que l'ID demandé n'est pas déjà attribué
            if (manipFiles.checkId(request.params.id, existingData.breakfasts, response)) {
                return;
            } else if (manipFiles.checkBodyAdd(Object.getOwnPropertyNames(request.body), response)){
                // vérification des propriétés
                return;
                // vérification des valeurs
            } else if (manipFiles.checkValues(request.body.prix, response)) {
                return;
            } else {
                // détermination de l'id de l'item
                let id;
                (!existingData.breakfasts.length) ? id=0 : id=manipFiles.defineId(existingData.breakfasts);
                // création de l'item
                const item = manipFiles.createItem(id, request.body.nom, request.body.prix);
                // ajout de l'item au tableau
                existingData.breakfasts.push(item);
                // réécriture du fichier de données
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    if (manipFiles.caseError(error_write, response, 'ecriture')){
                        return;
                    } else {
                        manipFiles.successReq(response, 'ajout');
                    } // FIN SI
                }); // FIN WRITE FILE
            } // FIN SI
        }// FIN SI
    }); // FIN READ FILE
} // FIN ADD BREAKFAST ID



/*
* READ
*/

// fonction qui affiche tous les petits dejs de la BDD
exports.readBreakfasts = (request, response) => {
    // lecture du fichier
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')){
            return;
        } else {
            // sélection des données
            const existingData = JSON.parse(data).breakfasts;
            // vérification qu'il y a des données à afficher
            if (manipFiles.checkArray(existingData, response)) {
                return;
            } else {
                // affichage des données
                manipFiles.requestStatus(200, existingData, response);
                return;
            }
        }
    }); // FIN READ FILE
} 

// fonction qui affiche un petit dejeuner dont l'ID est passé en paramètre de la requête
exports.readBreakfastId = (request, response) => {
    // lecture du fichier
    fs.readFile(menu, (error, data) => {
        // si error lecture
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // stockage données
            const existingData = JSON.parse(data).breakfasts;
            // vérification que le jeu de données n'est pas vide
            if (manipFiles.checkArray(existingData, response)) {
                return; 
                // vérification que l'ID est bien attribué
            } else if (manipFiles.existsId(request.params.id, existingData, response)) {
                // on affiche l'item en question
                manipFiles.readItemId(request.params.id, existingData, response);
                return;
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN READ BREAKFAST

// fonction qui cherche un petit dejeuner dans la BDD
exports.searchBreakfast = (request, response) => {
    // lecture fichier
    fs.readFile(menu, (error, data) => {
        // si error
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            const existingData = JSON.parse(data).breakfasts;
            // vérification que le tableau n'est pas vide
            if (manipFiles.checkArray(existingData, response)) {
                return;
            } else {
                // recherche de items correspondants et affichage le cas échéant
                manipFiles.searchItem(existingData, "nom", request.params.name, response);
                return;
            }
        } // FIN SI
    }); // FIN READ FILE
} // FIN SEARCH BREAKFAST


/*
* UPDATE
*/

// fonction qui màj un petit dej selon son ID
exports.updateBreakfast = (request, response) => {
    // lecture du fichier
    fs.readFile(menu, (error, data) => {
        // si error dans la lecture
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            let existingData = JSON.parse(data);
            // vérification que le tableau n'est pas vide
            if (manipFiles.checkArray(existingData.breakfasts, response)) {
                return;
                // vérification que l'ID demandé est attribué
            } else if (manipFiles.existsId(request.params.id, existingData.breakfasts, response)) {
                // vérification de l'intégrité des entrées
                const propsList = Object.getOwnPropertyNames(request.body);
                // vérification des propriétés
                if (manipFiles.checkPropsUpdate(propsList, response)) {
                    return;
                    // vérification des valeurs
                } else if (propsList.find(p => p.toString().toLowerCase() === "prix") && manipFiles.checkValues(request.body.prix, response)) {
                    return;
                } else {
                    // on cherche son index
                    const index = existingData.breakfasts.findIndex(obj => obj.id === parseInt(request.params.id));
                    // sélection de l'item
                    let item = existingData.breakfasts[index];
                    // màj de l'item
                    propsList.forEach(p => {
                        item[p] = request.body[p];
                    });
                    // on remet le petit-déjeûner modifié à sa place dans le tableau
                    existingData.breakfasts[index] = item;
                    // réécriture du fichier
                    fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                        // si error
                        if (manipFiles.caseError(error_write, response, 'ecriture')) {
                            return;
                        } else {
                            // si succès
                            manipFiles.successReq(response, 'maj');
                            return;
                        }
                    });
                }
            }
        } // FIN SI
    }); // FIN READ FILE
} // FIN UPDATE BREAKFAST



/*
* DELETE
*/

// fonction qui supprime un petit dej selon son ID
exports.deleteBreakfast = (request, response) => {
    // lecture du fichier
    fs.readFile(menu, (error, data) => {
        // si error dans la lecture
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            let existingData = JSON.parse(data);
            // vérification que le tableau n'est pas vide
            if (manipFiles.checkArray(existingData.breakfasts, response)) {
                return;
                // vérification que l'item demandé existe
            } else if (manipFiles.existsId(request.params.id, existingData.breakfasts, response)) {
                // si oui, on cherche son index dans le tableau
                const index = existingData.breakfasts.findIndex(obj => obj.id === parseInt(request.params.id));
                // on supprime l'item
                existingData.breakfasts.splice(index, 1);
                // réécriture du fichier de données
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // si error
                    if (manipFiles.caseError(error_write, response, 'ecriture')) {
                        return;
                    } else {
                        // si succès
                        manipFiles.successReq(response, 'suppr');
                        return;
                    }
                });
            }
            return;
        }
    });
} // FIN DELETE BREAKFAST