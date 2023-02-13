/**************************************************** IMPORTS ***************************************************************************/

/*************************************************** modules *******************/
const express = require("express");
const bodyParser = require("body-parser"); 

/*************************************************** routes *******************/

// import de tous les routers spécifiques aux tableaux
const routes_entrees = require('./routes_entrees.js')
const routes_boissons = require('./routes_boissons.js')
const routes_desserts = require('./routes_desserts.js')
const routes_menus = require('./routes_menus.js')
const routes_petits_dejeuners = require('./routes_petitsdejeuners.js')
const routes_plats = require('./routes_plats.js')


/**************************************************** VARIABLES ******************************************************************/

const router = express.Router(); // instanciation du router
router.use(bodyParser.json());



/********************************************************** ROUTER **********************************************************************************************/

/************************************************* test ***********************************/
// test de la route menant à la racine
// e.g http://localhost:3000/
router.get('/', (requete, reponse) => {
    reponse.status(200).send("La route est fonctionelle");
});

/************************************ routes **************************************************/
// on utilise chaque router importé
router.use(routes_entrees); 
router.use(routes_boissons); 
router.use(routes_desserts); 
router.use(routes_menus); 
router.use(routes_petits_dejeuners); 
router.use(routes_plats); 



/********************************** EXPORT *************************************/

module.exports = router;
