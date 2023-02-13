/*
* IMPORTS
*/
// express
const express = require("express"); // import du module express 

/*
* VARIABLES
*/
// Router est une classe d'express => express.Router() crée une instance de cette classe.
// Cette classe permet de créer un middleware, ce middleware étant un gestionnaire de routes complet.
const routerStarters = express.Router(); // création d'un router pour le tableau entrées
                                        //  = fichier de stockage de toutes les routes
const controllerStarters = require("../controller/controller_starters"); // import des fonctions du controller des entrées



/*
* REQUÊTES
*/


/*
* POST
*/
// route pour créer une donnée
// e.g http://localhost:3000/entrees
routerStarters.post('/entrees', controllerStarters.ajoutEntree); // on sélectionne la fonction ajoutEntree du fichier
                                                                // importé dans controllerStarters
                                                                // et on l'utilise comme fonction callback de la requête
routerStarters.post('/entree', controllerStarters.ajoutEntree);

// route pour créer une données avec une id spécifique
// e.g http://localhost:3000/entrees/1
routerStarters.post('/entrees/:id', controllerStarters.ajoutEntreeId);
routerStarters.post('/entree/:id', controllerStarters.ajoutEntreeId);


/*
* GET
*/
// route pour lire l'intégralité des entrées
// e.g http://localhost:3000/entrees
routerStarters.get('/entrees', controllerStarters.lireEntrees);
routerStarters.get('/entree', controllerStarters.lireEntrees);

// route pour lire une entrée selon son id
// e.g http://localhost:3000/entrees/1
routerStarters.get('/entrees/:id', controllerStarters.lireEntreeId);
routerStarters.get('/entree/:id', controllerStarters.lireEntreeId);

// route pour afficher une entrée selon son nom
// e.g http://localhost:3000/entrees/search/croquette
routerStarters.get('/entrees/search/:nom', controllerStarters.rechercheEntree);
routerStarters.get('/entree/search/:nom', controllerStarters.rechercheEntree);


/*
* PUT
*/
// route pour modifier une donnée (selon son id)
// e.g http://localhost:3000/1
routerStarters.put('/entrees/:id', controllerStarters.updateEntree);
routerStarters.put('/entree/:id', controllerStarters.updateEntree);


/*
* DELETE
*/
// route pour supprimer une donnée (selon son id)
// e.g http://localhost:3000/entrees/1
routerStarters.delete('/entrees/:id', controllerStarters.supprimerEntree);
routerStarters.delete('/entree/:id', controllerStarters.supprimerEntree);


/*
* EXPORT
*/
// export du router
module.exports = routerStarters;
