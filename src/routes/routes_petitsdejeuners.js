/************************************************************* IMPORTS *************************/

const express = require("express"); 
const controller_petitdej = require("../controller/controller_petitsdejeuners");



/************************************************************* VARIABLES *************************/

const router_petitdej = express.Router();



/********************************************************************** REQUÊTES *************************************************************/

/************************************************* POST ***********************************/
// routes permettant d'ajouter un petit-dej à la BDD sans préciser d'ID
// e.g http://localhost:3000/petitdej
router_petitdej.post('/petitdej', controller_petitdej.ajouterPetitDej);
router_petitdej.post('/petitsdejs', controller_petitdej.ajouterPetitDej);

// routes qui permettent d'ajouter un petit-dej à la BDD en précisant son ID
// e.g http://localhost:3000/petitdej/1
router_petitdej.post('/petitdej/:id', controller_petitdej.ajouterPetitDejId);
router_petitdej.post('/petitsdejs/:id', controller_petitdej.ajouterPetitDejId);


/************************************************* GET ***********************************/

// routes qui permettent d'afficher les petits-dejs de la BDD
// e.g http://localhost:3000/petitdej
router_petitdej.get('/petitdej', controller_petitdej.afficherPetitsDejs);
router_petitdej.get('/petitsdejs', controller_petitdej.afficherPetitsDejs);

// // routes permettant de demander à afficher un petit-dej selon son ID
router_petitdej.get('/petitdej/:id', controller_petitdej.afficherPetitDejId);
router_petitdej.get('/petitsdejs/:id', controller_petitdej.afficherPetitDejId);

// // routes permettant d'effectuer une recherche de petit-dej
router_petitdej.get('/petitdej/search/:recherche', controller_petitdej.chercherPetitDej);
router_petitdej.get('/petitsdejs/search/:recherche', controller_petitdej.chercherPetitDej);


// /************************************************* PUT ***********************************/

// // routes permettant de màj un peit-dej
router_petitdej.put('/petitdej/:id', controller_petitdej.updatePetitDej);
router_petitdej.put('/petitsdejs/:id', controller_petitdej.updatePetitDej);


// /************************************************* DELETE ***********************************/

// // routes permettant de supprimer un petit-dej
router_petitdej.delete('/petitdej/:id', controller_petitdej.supprPetitDej);
router_petitdej.delete('/petitsdejs/:id', controller_petitdej.supprPetitDej);



/************************************************* EXPORT ***********************************/
// export du router
module.exports = router_petitdej;