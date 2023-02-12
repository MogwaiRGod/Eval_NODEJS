/************************************* IMPORTS */

const express = require("express"); 
const controller_plats = require("../controller/controller_plats");


/************************************* VARIABLES */

const router_plats = express.Router();



/********************************************** REQUÊTES */

/************************************************* POST **********************************/
// routes pour ajouter un Plat avec calcul automatique de l'ID
// e.g http://localhost:3000/plats
router_plats.post('/plats', controller_plats.ajouterPlat);
router_plats.post('/plat', controller_plats.ajouterPlat);   // deuxième route sans "s" à Plat

// routes pour ajouter un Plat en précisant l'ID dans la requête
// e.g http://localhost:3000/plats/1
router_plats.post('/plats/:id', controller_plats.ajouterPlatId);
router_plats.post('/plat/:id', controller_plats.ajouterPlatId);



/************************************************* GET ***************************************/
// routes pour afficher tous les plats
// e.g http://localhost:3000/plats
router_plats.get('/plats', controller_plats.afficherPlats);
router_plats.get('/plat', controller_plats.afficherPlats);

// route pour afficher un Plat spécifique selon son ID
// e.g http://localhost:3000/plats/1
router_plats.get('/plats/:id', controller_plats.afficherPlatId);
router_plats.get('/plat/:id', controller_plats.afficherPlatId);

// route pour afficher tous les plats correspondants à une recherche de nom dans la requete
// e.g http://localhost:3000/plats/search/safran
router_plats.get('/plats/search/:recherche', controller_plats.recherchePlats);
router_plats.get('/plat/search/:recherche', controller_plats.recherchePlats);



/************************************************* PUT ***************************************/
// route pour mettre à jour un Plat selon son ID
// e.g http://localhost:3000/plats
router_plats.put('/plats/:id', controller_plats.udpatePlat);
router_plats.put('/plat/:id', controller_plats.udpatePlat);



/************************************************* DELETE ***************************************/
// route pour supprimer un Plat selon son ID
// e.g http://localhost:3000/plats
router_plats.delete('/plats/:id', controller_plats.supprimerPlat);
router_plats.delete('/plat/:id', controller_plats.supprimerPlat);


/************************************* EXPORT */
// export du router
module.exports = router_plats;