/*
* IMPORTS
*/
// express
const express = require("express");
// controller correspondant
const controllerMeals = require("../controller/controller_meals");

/*
* VARIABLES
*/

const routerMeals = express.Router();


/*
* REQUÊTES
*/

/*
* POST
*/
// routes pour ajouter un Plat avec calcul automatique de l'ID
// e.g http://localhost:3000/meals
routerMeals.post('/meals', controllerMeals.addMeal);
routerMeals.post('/meal', controllerMeals.addMeal);   // deuxième route sans "s" à Plat

// routes pour ajouter un Plat en précisant l'ID dans la requête
// e.g http://localhost:3000/meals/1
routerMeals.post('/meals/:id', controllerMeals.addMealId);
routerMeals.post('/meal/:id', controllerMeals.addMealId);



/*
* GET
*/
// routes pour afficher tous les plats
// e.g http://localhost:3000/meals
routerMeals.get('/meals', controllerMeals.readMeals);
routerMeals.get('/meal', controllerMeals.readMeals);

// route pour afficher un Plat spécifique selon son ID
// e.g http://localhost:3000/meals/1
routerMeals.get('/meals/:id', controllerMeals.readMealId);
routerMeals.get('/meal/:id', controllerMeals.readMealId);

// route pour afficher tous les plats correspondants à une recherche de nom dans la requete
// e.g http://localhost:3000/meals/search/salade
routerMeals.get('/meals/search/:name', controllerMeals.searchMeals);
routerMeals.get('/meal/search/:name', controllerMeals.searchMeals);



/*
* PUT
*/
// route pour mettre à jour un Plat selon son ID
// e.g http://localhost:3000/meals
routerMeals.put('/meals/:id', controllerMeals.udpateMeal);
routerMeals.put('/meal/:id', controllerMeals.udpateMeal);



/*
* DELETE
*/
// route pour supprimer un Plat selon son ID
// e.g http://localhost:3000/meals
routerMeals.delete('/meals/:id', controllerMeals.deleteMeal);
routerMeals.delete('/meal/:id', controllerMeals.deleteMeal);


/*
* EXPORT
*/
// export du router
module.exports = routerMeals;
