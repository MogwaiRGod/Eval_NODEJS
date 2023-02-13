/* 
* NOTE : pour chaque route, existe en deux versions : 
* une avec un S à menu et une sans (pour pouvoir effectuer les requêtes 
* sans se préoccuper du pluriel) 
*
*/

/*
* IMPORTS
*/
// express
const express = require("express"); 
// controller correspondant
const controller_menus = require("../controller/controller_menus");

/*
* VARIABLES
*/

const router_menus = express.Router(); // instanciation du router



/*
* REQUÊTES
*/


/*
* POST
*/
// routes permettant d'ajouter un menu à la BDD sans préciser d'ID
// e.g http://localhost:3000/menus
router_menus.post('/menus', controller_menus.ajouterMenu);
router_menus.post('/menu', controller_menus.ajouterMenu);

// routes qui permettent d'ajouter un menu à la BDD en précisant son ID
// e.g http://localhost:3000/menus/1
router_menus.post('/menus/:id', controller_menus.ajouterMenuId);
router_menus.post('/menu/:id', controller_menus.ajouterMenuId);



/*
* GET
*/
// routes qui permettent d'afficher le menu de la BDD
// e.g http://localhost:3000/menus
router_menus.get('/menus', controller_menus.afficherMenus);
router_menus.get('/menu', controller_menus.afficherMenus);

// routes permettant de demander à afficher un menu selon son ID
// http://localhost:3000/menus/1
router_menus.get('/menus/:id', controller_menus.afficherMenuId);
router_menus.get('/menu/:id', controller_menus.afficherMenuId);

// routes permettant d'effectuer une recherche de menus
// http://localhost:3000/menus/search/midi
router_menus.get('/menus/search/:recherche', controller_menus.chercherMenu);
router_menus.get('/menu/search/:recherche', controller_menus.chercherMenu);


/*
* PUT
*/
// routes permettant de màj un menu
// e.g http://localhost:3000/menus/1
router_menus.put('/menus/:id', controller_menus.updateMenu);
router_menus.put('/menu/:id', controller_menus.updateMenu);


/*
* DELETE
*/
// routes permettant de supprimer un menu
// e.g http://localhost:3000/menus/1
router_menus.delete('/menus/:id', controller_menus.supprMenu);
router_menus.delete('/menu/:id', controller_menus.supprMenu);



/*
* EXPORT
*/
// export du router
module.exports = router_menus;
