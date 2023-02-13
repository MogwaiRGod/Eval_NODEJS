/*
* VARIABLES
*/
// chemin du fichier du menu
const menu = './src/model/menu.json';   


/*
* IMPORTS
*/
// import de file system (module)
const fs = require('fs'); 
// import des fonctions utiles au controller
const manipFiles = require('../utils/manipulate_files');




/*
* CRUD
*/

/*
* CREATE
*/
// fonction qui ajoute une boisson en calculant son id
exports.addDrink = (request, response) => {
    fs.readFile(menu, (error, data) => {
        // en cas d'erreur : affiche l'erreur et quitte la fonction
        if(manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // récupération des propriétés entrées dans le corps de la requête
            const propsList = Object.getOwnPropertyNames(request.body);
            // vérification de l'intégrité des propriétés de la requête ; si une error a été détectée, on quitte la fonction
            if (manipFiles.checkBodyAjout(propsList, response)) {
                return;
            // si les propriétés ont OK, on vérifie que les valeurs le sont également
            } else if (manipFiles.checkValues(request.body.prix, response)) {  
                return;
            } else {
                let existingData = JSON.parse(data); let id;                                 
                /*
                * on définit l'id de la nouvelle boisson selon que le tableau des drinks est vide ou non
                * s'il n'est pas vide, on calcule son id à partir des ids déjà attribuées
                */
                (!existingData.drinks.length) ? id = 0 : id = manipFiles.defineId(existingData.drinks);
                // création de l'item et ajout au tableau de données
                existingData.drinks.push(manipFiles.createItem(id, request.body.nom, request.body.prix));
                // réécriture du fichier
                    fs.writeFile(menu, JSON.stringify(existingData), (error_write) => { 
                        // cas d'erreur
                        if(manipFiles.caseError(error_write, response, 'ecriture')) {
                            return;
                        } else {
                        // cas de succès
                            manipFiles.successReq(response, 'ajout');
                            return;
                        } // FIN SI
                    }); // FIN WRITE FILE
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN ADD DRINK

// fonction qui ajoute une boisson à la BDD en fonction de l'ID entré dans la requête
exports.addDrinkId = (request, response) => {
    fs.readFile(menu, (error, data) => {
        // cas d'erreur
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            let existingData = JSON.parse(data);
            // si le tableau est non-vide,
            if (manipFiles.checkArray(existingData.drinks, response)) {
                // on vérifie qu'il n'y a pas déjà un item avec l'id demandé dans le tableau
                if (manipFiles.checkId(request.params.id, existingData.drinks, response)) {
                    // si oui -> error et on quitte la fonction
                    return;
                } // FIN SI
            } // FIN SI
            // puis on vérifie l'intégrité de la requête
            const propsList = Object.getOwnPropertyNames(request.body);
            // vérification de l'intégrité de la requête ; si une error a été détectée, on quitte la fonction
            if (manipFiles.checkBodyAjout(propsList, response)) {
                return;
            // si les propriétés ont OK, on vérifie que les valeurs le sont également
            } else if (manipFiles.checkValues(request.body.prix, response)) {  
                return;
            } else {
                // sinon, on créée l'objet
                const item = manipFiles.createItem(request.params.id, request.body.nom, request.body.prix);
                // et on l'ajoute au tableau existant
                existingData.drinks.push(item);
                // puis on réécrit le fichier de données
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                    // si erreur
                    if(manipFiles.caseError(error_write,  response, 'ecriture')) {
                        return;
                    } else {
                        // sinon si succès
                        manipFiles.successReq(response, 'ajout')
                    } // FIN SI
                }); // FIN WRITE FILE
            } // FIN SI
        } // FIN SI
    });// FIN READ FILE
} // FIN ADD DRINK ID


/*
* READ
*/

// fonction permettant d'afficher l'intégralité des drinks disponibles
exports.readDrinks = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // récupération des données qui nous intéressent
            const existingData = JSON.parse(data).drinks;
            // affichage des données
            response.status(200).send(existingData);
        } // FIN SI
    }); // FIN READ FILE
} // FIN READ DRINKS

// fonction qui affiche une boisson selon son id
exports.readDrinkId = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // récupération des données
            const existingData = JSON.parse(data).drinks;
            // on vérifie que le tableau n'est pas vide
            if (manipFiles.checkArray(existingData, response)) {
                return;
            }    // on vérifie qu'il existe bel et bien une boisson avec l'id demandée
            else if (!manipFiles.existsId(parseInt(request.params.id), existingData, response)) {
                // sinon error et on quitte la fonction
                return;
            } else {
                // s'il existe, on affiche l'objet correspondant
                manipFiles.readItemId(request.params.id, existingData, response);
            } // FIN SI            
        } // FIN SI
    }); // FIN READ FILE
} // FIN READ DRINK ID

// fonction qui affiche le résultat d'une recherche (écrite dans la requête), ce résultat étant toutes les drinks disponibles
// correspondant à l'expression de la recherche
exports.searchDrinks = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // vérification que le tableau de données n'est pas vide
            const existingData = JSON.parse(data).drinks;
            if (manipFiles.checkArray(existingData, response)) {
                return;
            } else { 
                // s'il n'est pas vide, on effectue la recherche =>
                // on lance une fonction qui cherche tous les items correspondants à la recherche, et si rien ne correspond, affiche un message d'error
                manipFiles.searchItem(existingData, "nom", request.params.name, response);
                return;     
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN SEARCH DRINKS


/*
* UPDATE
*/

// fonction permettant de mettre à jour les propriétés (au choix) d'une boisson sélectionnée par son id dans la requête
exports.updateDrink = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // sélection des données
            let existingData = JSON.parse(data);
            // vérification que le tableau est non-vide
            if (manipFiles.checkArray(existingData.drinks, response)) {
                // si vide : message d'error + on quitte
                return;
            } 
            // vérification que le corps de la requête est non-vide
            // sélection des proprités demandées
            const propsList = Object.getOwnPropertyNames(request.body);
            if (manipFiles.checkEmpty(propsList, response)){
                // si vide : message d'error + on quitte
                return;
            } 
            // vérification que l'item demandé existe
            else if(manipFiles.existsId(request.params.id, existingData.drinks, response)){
                // vérification de l'intégrité de la requête (<=> on vérifie qu'on demande bien à modifier au moins le prix ou le nom et rien d'autre)
                if(manipFiles.checkPropsUpdate(propsList, response)) {
                    // si elles sont incorrectes -> error + on quitte la fonction
                    return;
                // si les propriétés ont OK, on vérifie que les valeurs le sont également
                } else if (propsList.find(p => p.toString().toLowerCase() === "prix") && manipFiles.checkValues(request.body.prix, response)) {  
                    return;
                } else {
                    // sinon, on sélectionne l'item demandé
                    let item = existingData.drinks.find( e => e.id === parseInt(request.params.id));
                    // on boucle dans la liste des propriétés à mettre à jour chez l'item
                    // on boucle dans les propriétés à modifier
                    propsList.forEach( p => {
                        // afin de màj l'item
                        item[p] = request.body[p]
                    });
                    // pas besoin de màj le tableau car la variable item pointe directement sur l'item dans le tableau <=> est déjà mis à jour
                    // on réécrit la BDD
                    fs.writeFile(menu, JSON.stringify(existingData), (error_write) => {
                        // si erreur
                        if(manipFiles.caseError(error_write, response, 'ecriture')) {
                            return;
                        } else {
                            // sinon si succès
                            manipFiles.successReq(response, 'maj');
                        }
                    }); // FIN WRITE FILE
                } // FIN SI
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN UPDATE DRINK


/*
* DELETE
*/

// fonction permttant de supprimer une boisson du menu, en la sélectionnant par son id
exports.deleteDrink = (request, response) => {
    fs.readFile(menu, (error, data) => {
        if (manipFiles.caseError(error, response, 'lecture')) {
            return;
        } else {
            // on stocke les données
            let existingData = JSON.parse(data);
            // vérification que la BDD n'est pas vide
            if (manipFiles.checkArray(existingData.drinks, response)) {
                return;
            } // vérification que l'item avec l'ID demandé existe
            else if (manipFiles.existsId(request.params.id, existingData.drinks, response)){
                // on cherche l'index de l'item à supprimer
                const index = existingData.drinks.findIndex(e => e.id === parseInt(request.params.id));
                // suppression de l'item à l'aide de son index
                existingData.drinks.splice(index, 1);
                // on réécrit les données
                fs.writeFile(menu, JSON.stringify(existingData), (error_write) => { 
                    if (manipFiles.caseError(error_write, response, 'ecriture')) {
                        return;
                    } else {
                        // sinon si succès
                        manipFiles.successReq(response, 'suppr');
                    }
                }); // FIN WRITE FILE
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN DELETE DRINK
