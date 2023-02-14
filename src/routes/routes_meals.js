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
// instanciation du router
const routerMeals = express.Router();


/*
 * REQUÊTES
 */

/*
 * POST
 */
// routes pour ajouter un plat avec calcul automatique de l'ID
// e.g http://localhost:3000/meals
routerMeals.post('carte/meals', controllerMeals.addMeal);
// deuxième route sans "s" à meal
routerMeals.post('carte/meal', controllerMeals.addMeal);   

// routes pour ajouter un plat en précisant l'ID dans la requête
// e.g http://localhost:3000/meals/1
routerMeals.post('carte/meals/:id', controllerMeals.addMealId);
routerMeals.post('carte/meal/:id', controllerMeals.addMealId);



/*
 * GET
 */
// routes pour afficher tous les plats
// e.g http://localhost:3000/meals
routerMeals.get('carte/meals', controllerMeals.readMeals);
routerMeals.get('carte/meal', controllerMeals.readMeals);

// route pour afficher un plat spécifique selon son ID
// e.g http://localhost:3000/meals/1
routerMeals.get('carte/meals/:id', controllerMeals.readMealId);
routerMeals.get('carte/meal/:id', controllerMeals.readMealId);

// route pour afficher tous les plats correspondants à une recherche de nom dans la requete
// e.g http://localhost:3000/meals/search/salade
routerMeals.get('carte/meals/search/:name', controllerMeals.searchMeals);
routerMeals.get('carte/meal/search/:name', controllerMeals.searchMeals);



/*
 * PUT
 */
// route pour mettre à jour un plat selon son ID
// e.g http://localhost:3000/meals
routerMeals.put('carte/meals/:id', controllerMeals.udpateMeal);
routerMeals.put('carte/meal/:id', controllerMeals.udpateMeal);



/*
 * DELETE
 */
// route pour supprimer un plat selon son ID
// e.g http://localhost:3000/meals
routerMeals.delete('carte/meals/:id', controllerMeals.deleteMeal);
routerMeals.delete('carte/meal/:id', controllerMeals.deleteMeal);


/*
 * EXPORT
 */
// export du router
module.exports = routerMeals;
