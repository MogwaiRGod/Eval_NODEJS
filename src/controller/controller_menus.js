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

// fonction qui permet d'ajouter un menu à la BDD en calculant son ID
exports.addMenu = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')){
            // cas d'erreur à la lecture
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
                (!existingData.menus.length) ? id=0 : id=manipFiles.defineId(existingData.menus);
                // création de l'item avec les valeurs voulues
                const item = manipFiles.createItem(id, request.body.nom, request.body.prix);
                // ajout de l'item dans le tableau
                existingData.menus.push(item);
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
} // FIN ADD MENU

// fonction qui ajoute un menu avec son ID entré en paramètre de la requête
exports.addMenuId = (request, response) => {
    // lecture du fichier
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')){
            return;
        } else {
            // stockage des données
            let existingData = JSON.parse(data);
            // vérification que l'ID demandé n'est pas déjà attribué
            if (manipFiles.checkId(request.params.id, existingData.menus, response)) {
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
                (!existingData.menus.length) ? id=0 : id=manipFiles.defineId(existingData.menus);
                // création de l'item
                const item = manipFiles.createItem(id, request.body.nom, request.body.prix);
                // ajout de l'item au tableau
                existingData.menus.push(item);
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
} // FIN ADD MENU ID



/*
* READ
*/

// fonction qui affiche tous les menus de la BDD
exports.readMenus = (request, response) => {
    // lecture du fichier
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')){
            return;
        } else {
            // sélection des données
            const existingData = JSON.parse(data).menus;
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
} // FIN READ MENUS

// fonction qui affiche un menu dont l'ID est passé en paramètre de la requête
exports.readMenuId = (request, response) => {
    // lecture du fichier
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // stockage données
            const existingData = JSON.parse(data).menus;
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
} // FIN READ MENU ID

// fonction qui cherche un menu dans la BDD
exports.searchMenu = (request, response) => {
    // lecture fichier
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            const existingData = JSON.parse(data).menus;
            // vérification que le tableau n'est pas vide
            if (manipFiles.checkArray(existingData, response)) {
                return;
            } else {
                // plus le temps pour le pseudo-code, se référer à controller_desserts pour les détails, déso
                manipFiles.searchItem(existingData, "nom", request.params.name, response);
                return;
            }
        } // FIN SI
    }); // FIN READ FILE
} // FIN SEARCH MENU



/*
* UPDATE
*/

// fonction qui màj un menu selon son ID
exports.updateMenu = (request, response) => {
    // lecture
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            let existingData = JSON.parse(data);
            // vérification que le tableau n'est pas vide
            if (manipFiles.checkArray(existingData.menus, response)) {
                return;
                // vérification que l'item existe
            } else if (manipFiles.existsId(request.params.id, existingData.menus, response)) {
                // vérification de l'intégrité des entrées
                const liste_props = Object.getOwnPropertyNames(request.body);
                // vérification des propriétés
                if (manipFiles.checkPropsUpdate(liste_props, response)) {
                    return;
                    // vérification des valeurs
                } else if (liste_props.find(p => p.toString().toLowerCase() === "prix") && manipFiles.checkValues(request.body.prix, response)) {
                    return;
                } else {
                    // on cherche l'index de l'item
                    const index = existingData.menus.findIndex(obj => obj.id === parseInt(request.params.id));
                    // sélection de l'item
                    let item = existingData.menus[index];
                    // màj de l'item
                    liste_props.forEach(p => {
                        item[p] = request.body[p];
                    });
                    // on remet l'item modifié à sa place
                    existingData.menus[index] = item;
                    // réécriture des données
                    fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                        if (manipFiles.caseError(error_write, response, 'ecriture')) {
                            return;
                        } else {
                            manipFiles.successReq(response, 'maj');
                            return;
                        }
                    });
                }
            }
        } // FIN SI
    }); // FIN READ FILE
} // FIN UPDATE MENU



/*
* DELETE
*/

// fonction qui supprime un menu selon son ID
exports.deleteMenu = (request, response) => {
    // lecture fichier
    fs.readFile(menu, (error, data) => {
        // si erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            let existingData = JSON.parse(data);
            // vérification que le tableau n'est pas vide
            if (manipFiles.checkArray(existingData.menus, response)) {
                return;
                // vérification que le menu existe
            } else if (manipFiles.existsId(request.params.id, existingData.menus, response)) {
                // on cherche son index
                const index = existingData.menus.findIndex(obj => obj.id === parseInt(request.params.id));
                // on supprime l'item
                existingData.menus.splice(index, 1);
                // réécriture des données
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // si ereur
                    if (manipFiles.caseError(error_write, response, 'ecriture')) {
                        return;
                    } else {
                        manipFiles.successReq(response, 'suppr');
                        return;
                    }
                });
            }
            return;
        }
    });
} // FIN DELETE MENU
