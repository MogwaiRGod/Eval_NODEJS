/* 
 *
 * NOTE : toutes les routes sont accessibles avec 
 * "drinks" au pluriel ou non (pour faciliter l'accès) 
 *
 */

/*
 * IMPORTS
 */
// express
const express = require("express"); 
// controller correspondant
const controllerDrinks = require("../controller/controller_drinks");

/*
 * VARIABLES
 */
// instanciation d'un router pour le tableau boissons
const routerDrinks = express.Router(); 


/*
 * REQUÊTES
 */

/*
 * POST
 */
// pour ajouter une boisson sans préciser l'ID
// e.g http://localhost:3000/drinks
routerDrinks.post('/drinks', controllerDrinks.addDrink);
routerDrinks.post('/drink', controllerDrinks.addDrink);

// pour ajouter une boisson en précisant l'ID *DANS LA ROUTE DE LA REQUÊTE, PAS LE BODY*
// e.g http://localhost:3000/drinks/1
routerDrinks.post('/drinks/:id', controllerDrinks.addDrinkId);
routerDrinks.post('/drink/:id', controllerDrinks.addDrinkId);


/*
 * GET
 */
// pour afficher toutes les boissons
// e.g http://localhost:3000/drinks
routerDrinks.get('/drinks', controllerDrinks.readDrinks);
routerDrinks.get('/drink', controllerDrinks.readDrinks);

// pour afficher une boisson en fonction de son id
// e.g http://localhost:3000/drinks/1
routerDrinks.get('/drinks/:id', controllerDrinks.readDrinkId);
routerDrinks.get('/drink/:id', controllerDrinks.readDrinkId);

// pour afficher les résultats d'une recherche de boissons
// e.g http://localhost:3000/drinks/search/coca
routerDrinks.get('/drinks/search/:name', controllerDrinks.searchDrinks);
routerDrinks.get('/drink/search/:name', controllerDrinks.searchDrinks);



/*
 * PUT
 */
// pour mettre à jour une ou deux propriétés (nom et/ou prix) d'une boissons sélectionnée par son id
// les champs à màj sont à spécifier dans le corps de la requête
// e.g http://localhost:3000/drinks/1
routerDrinks.put('/drinks/:id', controllerDrinks.updateDrink);
routerDrinks.put('/drink/:id', controllerDrinks.updateDrink);


/*
 * DELETE
 */
// pour supprimer un item sélectionné par son id
// e.g http://localhost:3000/drinks/1
routerDrinks.delete('/drinks/:id', controllerDrinks.deleteDrink);
routerDrinks.delete('/drink/:id', controllerDrinks.deleteDrink);



/*
 * EXPORT
 */
// export du module
module.exports = routerDrinks;
