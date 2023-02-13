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
// fonctions utiles au controller
const manipFiles = require('../utils/manipulate_files');



/*
* CRUD
*/

/*
* CREATE
*/

// fonction qui ajoute un dessert à la BDD sans avoir l'ID précisé dans la requête => la fonction calcule l'ID selon ceux
// déjà attribués
exports.addDessert = (request, response) => {
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
                // si non-intègres -> erreur + fin
                return;
            // si les propriétés ont OK, on vérifie que les valeurs le sont également
            } else if (manipFiles.checkValues(request.body.prix, response)) {  
                return;
            } else {
                let id; let existingData = JSON.parse(data);
                /*
                * sinon, on détermine l'ID du nouveau dessert
                /* si le tableau est vide -> id = 0
                * sinon calcule l'ID selon l'ID le plus élevé attribué
                */
                (!existingData.desserts.length) ? id = 0 : id = manipFiles.defineId(existingData.desserts);
                // création de l'objet
                const item = manipFiles.createItem(id, request.body.nom, request.body.prix);
                // ajout au tableau
                existingData.desserts.push(item);
                // réécriture de la BDD
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // si erreur
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
} // FIN ADD DESSERT

// fonction qui ajoute un dessert à la BDD en spécifiant son ID
exports.addDessertId = (request, response) => {
    // lecture BDD
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')){
            return;
        } else {
            const propsList = Object.getOwnPropertyNames(request.body);
            let existingData = JSON.parse(data);
            // vérification que l'ID demandé n'est pas déjà attribué
            if (manipFiles.checkId(request.params.id, existingData.desserts, response)) {
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
                (!existingData.desserts.length) ? id=0 : id=manipFiles.defineId(existingData.desserts);
                // création de l'item
                const item = manipFiles.createItem(id, request.body.nom, request.body.prix);
                // ajout de l'item au tableau
                existingData.desserts.push(item);
                // réécriture du fichier
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // cas d'erreur
                    if (manipFiles.caseError(error_write, response, 'ecriture')) {
                        return;
                    } // cas de succès
                    manipFiles.successReq(response, 'ajout');
                });
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN ADD DESSERT ID



/*
* READ
*/

// fonction permettant d'read tous les desserts
exports.readDesserts = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // si erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // stockage des données demandées
            const existingData = JSON.parse(data).desserts;
            // s'il n'y a pas de données
            if (manipFiles.checkArray(existingData, response)) {
                return;
            }
            // sinon, affichage des données
            manipFiles.requestStatus(200, existingData, response);
        }
    }); // FIN READ FILE
} // FIN READ DESSERTS

// fonction qui permet d'read un item selon son id
exports.readDessertId = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // si erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // stockage des données demandées
            const existingData = JSON.parse(data).desserts;
            // s'il n'y a pas de données
            if (manipFiles.checkArray(existingData, response)) {
                return;
            } else if (manipFiles.existsId(request.params.id, existingData, response)) { 
                // vérification que l'item demandé existe ; si oui :
                // on affiche l'item selon l'ID demandé
                manipFiles.readItemId(request.params.id, existingData, response);
            } else {
                // sinon, si aucun item n'a été trouvé, un message d'erreur a été envoyé et maintenant on quitte la fonction
                return;
            }// FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN READ DESSERT ID

// fonction qui recherche les desserts dont le nom correspond à une expression entrée dans la requête
exports.searchDesserts = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // si erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // stockage du tableau
            const existingData = JSON.parse(data).desserts;
            // vérification que le tableau est non-vide
            if (manipFiles.checkArray(existingData, response)) {
                // si non, erreur + on quitte
                return;
            } else {
                // on cherche dans le tableau les occurrences correspondantes
                // si on en trouve, la fonction les affiche, sinon, message d'error
                manipFiles.searchItem(existingData, "nom", request.params.name, response);
                return;
            }// FIN SI           
        }// FIN SI
    }); // FIN READ FILE
} // FIN SEARCH DESSERTS



/*
* UPDATE
*/

// fonction qui met à jour le nom et/ou le prix d'un item sélectionné dans la requête par son id,
// selon des propriétés entrées dans le corps de la requête
exports.udpateDessert = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // cas d'erreur
        if (manipFiles.caseError(error, response, 'lecture')){
            return;
        } else {
            // sélection des données
            let existingData = JSON.parse(data);
            // vérification que le tableau est non-vide
            if (manipFiles.checkArray(existingData.desserts, response)) {
                return;
            } else if (manipFiles.existsId(request.params.id, existingData.desserts, response)) {
                // vérification que l'item existe
                // sélection des propriétés dans le corps de requête
                const propsList = Object.getOwnPropertyNames(request.body);
                // vérification que les propriétés demandées sont correctes
                if (manipFiles.checkPropsUpdate(propsList, response)) {
                    return;
                // si les propriétés ont OK, on vérifie que les valeurs le sont également
                } else if (propsList.find(p => p.toString().toLowerCase() === "prix") && manipFiles.checkValues(request.body.prix, response)) {  
                    return;
                } else {
                    // on sélectionne l'item dans le tableau
                    let item = existingData.desserts.find( e => e.id === parseInt(request.params.id));
                    console.log(item)
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
                            manipFiles.successReq(response, 'maj');
                            return;
                        }
                    }); // FIN WRITE FILE
                } // FI SI
            } // FIN SI
            return;
        } // FIN SI
    }); // FIN WRITE FILE
} // FIN UPDATE DESSERT



/*
* DELETE
*/

// fonction qui supprime un dessert sélectionné par son ID
exports.deleteDessert = (request, response) => {
    // lecture du fichier de données
    fs.readFile(menu, (error, data) => {
        // cas d'erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // sélection des données
            let existingData = JSON.parse(data);
            // vérification que le tableau de desserts n'est pas vide
            if (manipFiles.checkArray(existingData.desserts, response)){
                return;
            } else if (manipFiles.existsId(request.params.id, existingData.desserts, response)) {
                // vérification que l'item demandé existe 
                // si oui, on cherche son index dans le tableau
                const index = existingData.desserts.findIndex(obj => obj.id === parseInt(request.params.id));
                // suppression de l'item
                existingData.desserts.splice(index, 1);
                // on réécrit les données
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // cas d'erreur
                    if (manipFiles.caseError(error_write, response, 'ecriture')) {
                        return;
                    } // cas de succès
                    manipFiles.successReq(response, 'suppr');
                }); // FIN WRITE FILE
            } // FIN SI
        } //FIN SI
    }); // FIN READ FILE
} // FIN DELETE DESSERT
