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
const controllerMenus = require("../controller/controller_menus");

/*
 * VARIABLES
 */
// instanciation du router
const routerMenus = express.Router(); // instanciation du router



/*
 * REQUÊTES
 */


/*
 * POST
 */
// routes permettant d'ajouter un menu à la BDD sans préciser d'ID
// e.g http://localhost:3000/menus
routerMenus.post('carte/menus', controllerMenus.addMenu);
routerMenus.post('carte/menu', controllerMenus.addMenu);

// routes qui permettent d'ajouter un menu à la BDD en précisant son ID
// e.g http://localhost:3000/menus/1
routerMenus.post('carte/menus/:id', controllerMenus.addMenuId);
routerMenus.post('carte/menu/:id', controllerMenus.addMenuId);



/*
 * GET
 */
// routes qui permettent d'afficher le menu de la BDD
// e.g http://localhost:3000/menus
routerMenus.get('carte/menus', controllerMenus.readMenus);
routerMenus.get('carte/menu', controllerMenus.readMenus);

// routes permettant de demander à afficher un menu selon son ID
// http://localhost:3000/menus/1
routerMenus.get('carte/menus/:id', controllerMenus.readMenuId);
routerMenus.get('carte/menu/:id', controllerMenus.readMenuId);

// routes permettant d'effectuer une recherche de menus
// http://localhost:3000/menus/search/midi
routerMenus.get('carte/menus/search/:name', controllerMenus.searchMenu);
routerMenus.get('carte/menu/search/:name', controllerMenus.searchMenu);


/*
 * PUT
 */
// routes permettant de màj un menu
// e.g http://localhost:3000/menus/1
routerMenus.put('carte/menus/:id', controllerMenus.updateMenu);
routerMenus.put('carte/menu/:id', controllerMenus.updateMenu);


/*
 * DELETE
 */
// routes permettant de supprimer un menu
// e.g http://localhost:3000/menus/1
routerMenus.delete('carte/menus/:id', controllerMenus.deleteMenu);
routerMenus.delete('carte/menu/:id', controllerMenus.deleteMenu);



/*
 * EXPORT
 */
// export du router
module.exports = routerMenus;
