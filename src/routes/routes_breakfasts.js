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

const routerBreakfast = express.Router();



/*
* REQUÊTES
*/

/*
* POST
*/
// route permettant d'ajouter un petit-dej à la BDD sans préciser d'ID
// e.g http://localhost:3000/petitdej
routerBreakfast.post('/breakfast', controllerBreakfast.addBreakfast);

// route qui permet d'ajouter un petit-dej à la BDD en précisant son ID
// e.g http://localhost:3000/petitdej/1
routerBreakfast.post('/breakfast/:id', controllerBreakfast.addBreakfastId);



/*
* GET
*/
// route qui permettent d'afficher les petits-dejs de la BDD
// e.g http://localhost:3000/petitdej
routerBreakfast.get('/breakfast', controllerBreakfast.readBreakfasts);

// route permettant de demander à afficher un petit-dej selon son ID
// e.g http://localhost:3000/petitdej/1
routerBreakfast.get('/breakfast/:id', controllerBreakfast.readBreakfastId);

// route permettant d'effectuer une recherche de petit-dej
// e.g http://localhost:3000/petitdej/search/britannique
routerBreakfast.get('/breakfast/search/:name', controllerBreakfast.searchBreakfast);


/*
* PUT
*/
// route permettant de màj un peit-dej
// e.g http://localhost:3000/petitdej/1
routerBreakfast.put('/breakfast/:id', controllerBreakfast.updateBreakfast);


/*
* DELETE
*/
// route permettant de supprimer un petit-dej
// e.g http://localhost:3000/petitdej/1
routerBreakfast.delete('/breakfast/:id', controllerBreakfast.deleteBreakfast);



/*
* EXPORT
*/
// export du router
module.exports = routerBreakfast;
