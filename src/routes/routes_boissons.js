/************************************************ IMPORTS ***********************/

const express = require("express"); 
const controller_boissons = require("../controller/controller_boissons"); // import des fonctions du controller des boissons



/************************************************ VARIABLES ***********************/

const router_boissons = express.Router(); // instanciation d'un router pour le tableau boissons



/********************************************************* REQUÊTES *********************************************/

// toutes les routes sont accessibles avec "boissons" au pluriel ou non (pour faciliter l'accès)

/********************************************** POST ***********************/
// pour ajouter une boisson sans préciser l'ID
// e.g http://localhost:3000/boissons
router_boissons.post('/boissons', controller_boissons.ajouterBoisson);
router_boissons.post('/boisson', controller_boissons.ajouterBoisson);

// pour ajouter une boisson en précisant l'ID *DANS LA ROUTE DE LA REQUÊTE, PAS LE BODY*
// e.g http://localhost:3000/boissons/1
router_boissons.post('/boissons/:id', controller_boissons.ajouterBoissonParId);
router_boissons.post('/boisson/:id', controller_boissons.ajouterBoissonParId);


/********************************************** GET ***********************/
// pour afficher toutes les boissons
// e.g http://localhost:3000/boissons
router_boissons.get('/boissons', controller_boissons.afficherBoissons);
router_boissons.get('/boisson', controller_boissons.afficherBoissons);

// pour afficher une boisson en fonction de son id
// e.g http://localhost:3000/boissons/1
router_boissons.get('/boissons/:id', controller_boissons.afficherBoissonId);
router_boissons.get('/boisson/:id', controller_boissons.afficherBoissonId);

// pour afficher les résultats d'une recherche de boissons
// e.g http://localhost:3000/boissons/search/coca
router_boissons.get('/boissons/search/:recherche', controller_boissons.rechercheBoissons);
router_boissons.get('/boisson/search/:recherche', controller_boissons.rechercheBoissons);


/********************************************** PUT ***********************/
// pour mettre à jour une ou deux propriétés (nom et/ou prix) d'une boissons sélectionnée par son id
// les champs à màj sont à spécifier dans le corps de la requête
// e.g http://localhost:3000/boissons/1
router_boissons.put('/boissons/:id', controller_boissons.updateBoissons);
router_boissons.put('/boisson/:id', controller_boissons.updateBoissons);


/********************************************** DELETE ***********************/
// pour supprimer un item sélectionné par son id
// e.g http://localhost:3000/boissons/1
router_boissons.delete('/boissons/:id', controller_boissons.supprBoissons);
router_boissons.delete('/boisson/:id', controller_boissons.supprBoissons);



/************************************************************* EXPORT **********************************************/
// export du module
module.exports = router_boissons;