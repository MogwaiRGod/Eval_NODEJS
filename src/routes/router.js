/*
 * IMPORTS
 */

/*
 * modules
 */
const express = require("express");
const bodyParser = require("body-parser"); 


/*
 * routers
 */

// import de tous les routers spécifiques aux tableaux
const routesStarters = require('./routes_starters.js')
const routesBreakfasts = require('./routes_breakfasts.js')
const routesDesserts = require('./routes_desserts.js')
const routesMeals = require('./routes_meals.js')
const routesDrinks = require('./routes_drinks.js')
const routesMenus = require('./routes_menus.js')


/*
 * VARIABLES
 */
// instanciation du router
const router = express.Router(); 
router.use(bodyParser.json());


/*
 * ROUTER
 */


/*
 * test
 *
 * test de la route menant à la racine
 * e.g http://localhost:3000/
 */
router.get('/', (request, response) => {
    response.status(200).send("La route est fonctionelle");
});

/* 
 * routes
 *
 * on utilise chaque router importé
 */
router.use(routesStarters); 
router.use(routesDrinks); 
router.use(routesDesserts); 
router.use(routesMenus); 
router.use(routesBreakfasts); 
router.use(routesMeals); 



/*
 * EXPORT
 */
module.exports = router;
