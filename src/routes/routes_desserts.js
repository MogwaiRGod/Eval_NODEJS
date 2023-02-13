/*
 * IMPORTS
 */
// express
const express = require("express"); 
// controller correspondant
const controllerDesserts = require("../controller/controller_desserts");

/*
 * VARIABLES
 */
// instanciation du router
const routerDesserts = express.Router(); // instanciation d'un router pour les desserts


/*
 * REQUÊTES
 */

/*
 * POST
 */
// routes pour ajouter un dessert avec calcul automatique de l'ID
// e.g http://localhost:3000/desserts
routerDesserts.post('/desserts', controllerDesserts.addDessert);
// deuxième route sans "s" à dessert
routerDesserts.post('/dessert', controllerDesserts.addDessert);   

// routes pour ajouter un dessert en précisant l'ID dans la requête
// e.g http://localhost:3000/desserts/1
routerDesserts.post('/desserts/:id', controllerDesserts.addDessertId);
routerDesserts.post('/dessert/:id', controllerDesserts.addDessertId);


/*
 * GET
 */
// routes pour afficher tous les desserts
// e.g http://localhost:3000/desserts
routerDesserts.get('/desserts', controllerDesserts.readDesserts);
routerDesserts.get('/dessert', controllerDesserts.readDesserts);

// routes pour afficher un dessert spécifique selon son ID
// e.g http://localhost:3000/desserts/1
routerDesserts.get('/desserts/:id', controllerDesserts.readDessertId);
routerDesserts.get('/dessert/:id', controllerDesserts.readDessertId);

// routes pour afficher tous les desserts correspondants à une recherche de nom dans la requete
// e.g http://localhost:3000/desserts/search/safran
routerDesserts.get('/desserts/search/:name', controllerDesserts.searchDesserts);
routerDesserts.get('/dessert/search/:name', controllerDesserts.searchDesserts);


/*
 * PUT
 */
// routes pour mettre à jour un dessert selon son ID
// e.g http://localhost:3000/desserts
routerDesserts.put('/desserts/:id', controllerDesserts.udpateDessert);
routerDesserts.put('/dessert/:id', controllerDesserts.udpateDessert);



/*
 * DELETE
 */
// routes pour supprimer un dessert selon son ID
// e.g http://localhost:3000/desserts
routerDesserts.delete('/desserts/:id', controllerDesserts.deleteDessert);
routerDesserts.delete('/dessert/:id', controllerDesserts.deleteDessert);


/*
 * EXPORT
 */
// export du router
module.exports = routerDesserts;
