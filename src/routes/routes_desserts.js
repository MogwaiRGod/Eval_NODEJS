/************************************************* IMPORTS ******************************************************************/

const express = require("express"); 
const controller_desserts = require("../controller/controller_desserts");



/************************************************* VARIABLES ******************************************************************/

const router_desserts = express.Router(); // instanciation d'un router pour les desserts



/********************************************************** REQUÊTES *********************************************************/

/************************************************* POST **********************************/
// routes pour ajouter un dessert avec calcul automatique de l'ID
// e.g http://localhost:3000/desserts
router_desserts.post('/desserts', controller_desserts.ajouterDessert);
router_desserts.post('/dessert', controller_desserts.ajouterDessert);   // deuxième route sans "s" à dessert

// routes pour ajouter un dessert en précisant l'ID dans la requête
// e.g http://localhost:3000/desserts/1
router_desserts.post('/desserts/:id', controller_desserts.ajouterDessertId);
router_desserts.post('/dessert/:id', controller_desserts.ajouterDessertId);



/************************************************* GET ***************************************/
// routes pour afficher tous les desserts
// e.g http://localhost:3000/desserts
router_desserts.get('/desserts', controller_desserts.afficherDesserts);
router_desserts.get('/dessert', controller_desserts.afficherDesserts);

// route pour afficher un dessert spécifique selon son ID
// e.g http://localhost:3000/desserts/1
router_desserts.get('/desserts/:id', controller_desserts.afficherDessertId);
router_desserts.get('/dessert/:id', controller_desserts.afficherDessertId);

// route pour afficher tous les desserts correspondants à une recherche de nom dans la requete
// e.g http://localhost:3000/desserts/search/safran
router_desserts.get('/desserts/search/:recherche', controller_desserts.rechercheDesserts);
router_desserts.get('/dessert/search/:recherche', controller_desserts.rechercheDesserts);



/************************************************* PUT ***************************************/
// route pour mettre à jour un dessert selon son ID
// e.g http://localhost:3000/desserts
router_desserts.put('/desserts/:id', controller_desserts.udpateDessert);
router_desserts.put('/dessert/:id', controller_desserts.udpateDessert);



/************************************************* DELETE ***************************************/
// route pour supprimer un dessert selon son ID
// e.g http://localhost:3000/desserts
router_desserts.delete('/desserts/:id', controller_desserts.supprimerDessert);
router_desserts.delete('/dessert/:id', controller_desserts.supprimerDessert);



/*********************************************************** EXPORT ********************************************************/
// export du router
module.exports = router_desserts;