/*
 * IMPORTS
 */
// express
const express = require("express"); 
// controller correspondant
const controllerBreakfast = require("../controller/controller_breakfasts");

/*
 * VARIABLES
 */
// instanciation du router
const routerBreakfast = express.Router();



/*
 * REQUÊTES
 */

/*
 * POST
 */
// route permettant d'ajouter un petit-dej à la BDD sans préciser d'ID
// e.g http://localhost:3000/breakfast
routerBreakfast.post('carte/breakfast', controllerBreakfast.addBreakfast);

// route qui permet d'ajouter un petit-dej à la BDD en précisant son ID
// e.g http://localhost:3000/breakfast/1
routerBreakfast.post('carte/breakfast/:id', controllerBreakfast.addBreakfastId);



/*
 * GET
 */
// route qui permettent d'afficher les petits-dejs de la BDD
// e.g http://localhost:3000/breakfast
routerBreakfast.get('carte/breakfast', controllerBreakfast.readBreakfasts);

// route permettant de demander à afficher un petit-dej selon son ID
// e.g http://localhost:3000/breakfast/1
routerBreakfast.get('carte/breakfast/:id', controllerBreakfast.readBreakfastId);

// route permettant d'effectuer une recherche de petit-dej
// e.g http://localhost:3000/breakfast/search/britannique
routerBreakfast.get('carte/breakfast/search/:name', controllerBreakfast.searchBreakfast);


/*
 * PUT
 */
// route permettant de màj un peit-dej
// e.g http://localhost:3000/breakfast/1
routerBreakfast.put('carte/breakfast/:id', controllerBreakfast.updateBreakfast);


/*
 * DELETE
 */
// route permettant de supprimer un petit-dej
// e.g http://localhost:3000/breakfast/1
routerBreakfast.delete('carte/breakfast/:id', controllerBreakfast.deleteBreakfast);



/*
 * EXPORT
 */
// export du router
module.exports = routerBreakfast;
