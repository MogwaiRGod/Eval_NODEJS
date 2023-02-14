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
routerDesserts.post('carte/desserts', controllerDesserts.addDessert);
// deuxième route sans "s" à dessert
routerDesserts.post('carte/dessert', controllerDesserts.addDessert);   

// routes pour ajouter un dessert en précisant l'ID dans la requête
// e.g http://localhost:3000/desserts/1
routerDesserts.post('carte/desserts/:id', controllerDesserts.addDessertId);
routerDesserts.post('carte/dessert/:id', controllerDesserts.addDessertId);


/*
 * GET
 */
// routes pour afficher tous les desserts
// e.g http://localhost:3000/desserts
routerDesserts.get('carte/desserts', controllerDesserts.readDesserts);
routerDesserts.get('carte/dessert', controllerDesserts.readDesserts);

// routes pour afficher un dessert spécifique selon son ID
// e.g http://localhost:3000/desserts/1
routerDesserts.get('carte/desserts/:id', controllerDesserts.readDessertId);
routerDesserts.get('carte/dessert/:id', controllerDesserts.readDessertId);

// routes pour afficher tous les desserts correspondants à une recherche de nom dans la requete
// e.g http://localhost:3000/desserts/search/safran
routerDesserts.get('carte/desserts/search/:name', controllerDesserts.searchDesserts);
routerDesserts.get('carte/dessert/search/:name', controllerDesserts.searchDesserts);


/*
 * PUT
 */
// routes pour mettre à jour un dessert selon son ID
// e.g http://localhost:3000/desserts
routerDesserts.put('carte/desserts/:id', controllerDesserts.udpateDessert);
routerDesserts.put('carte/dessert/:id', controllerDesserts.udpateDessert);



/*
 * DELETE
 */
// routes pour supprimer un dessert selon son ID
// e.g http://localhost:3000/desserts
routerDesserts.delete('carte/desserts/:id', controllerDesserts.deleteDessert);
routerDesserts.delete('carte/dessert/:id', controllerDesserts.deleteDessert);


/*
 * EXPORT
 */
// export du router
module.exports = routerDesserts;
