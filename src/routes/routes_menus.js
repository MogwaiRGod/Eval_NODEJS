/****************************************************** IMPORTS ****************************************************/

const express = require("express"); 
const controller_menus = require("../controller/controller_menus");



/****************************************************** VARIABLES****************************************************/

const router_menus = express.Router(); // instanciation du router



/*************************************************************** REQUÊTES ****************************************************/

// pour chaque route, existe en deux versions : uns avec un S à menu et une sans (pour pouvoir effectuer les requêtes sans se préoccuper du pluriel)

/************************************* POST ***********************************/

router_menus.post('/menus', controller_menus.ajouterMenu);
router_menus.post('/menu', controller_menus.ajouterMenu);

// router_menus.post('/menus/:id', controller_menus.ajouterMenuId);
// router_menus.post('/menu/:id', controller_menus.ajouterMenuId);


/************************************* GET ***********************************/

// router_menus.get('/menus', controller_menus.afficherMenus);
// router_menus.get('/menu', controller_menus.afficherMenus);
// router_menus.get('/menus/:id', controller_menus.afficherMenuId);
// router_menus.get('/menu/:id', controller_menus.afficherMenuId);
// router_menus.get('/menus/search/:recherche', controller_menus.chercherMenu);
// router_menus.get('/menu/search/:recherche', controller_menus.chercherMenu);


/************************************* PUT ***********************************/

// router_menus.put('/menus/:id', controller_menus.updateMenu);
// router_menus.put('/menu/:id', controller_menus.updateMenu);


/************************************* DELETE ***********************************/

// router_menus.delete('/menus/:id', controller_menus.supprMenu);
// router_menus.delete('/menu/:id', controller_menus.supprMenu);

/************************************* EXPORT ***********************************/
// export du router
module.exports = router_menus;