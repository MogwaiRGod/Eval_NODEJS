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
// e.g http://localhost:3000/starters
routerStarters.post('/starters', controllerStarters.addStarter); // on sélectionne la fonction addStarter du fichier
                                                                // importé dans controllerStarters
                                                                // et on l'utilise comme fonction callback de la requête
routerStarters.post('/starter', controllerStarters.addStarter);

// route pour créer une données avec une id spécifique
// e.g http://localhost:3000/starters/1
routerStarters.post('/starters/:id', controllerStarters.addStarterId);
routerStarters.post('/starter/:id', controllerStarters.addStarterId);


/*
* GET
*/
// route pour lire l'intégralité des entrées
// e.g http://localhost:3000/starters
routerStarters.get('/starters', controllerStarters.readStarters);
routerStarters.get('/starter', controllerStarters.readStarters);

// route pour lire une entrée selon son id
// e.g http://localhost:3000/starters/1
routerStarters.get('/starters/:id', controllerStarters.readStarterId);
routerStarters.get('/starter/:id', controllerStarters.readStarterId);

// route pour afficher une entrée selon son nom
// e.g http://localhost:3000/starters/search/croquette
routerStarters.get('/starters/search/:name', controllerStarters.searchStarter);
routerStarters.get('/starter/search/:name', controllerStarters.searchStarter);


/*
* PUT
*/
// route pour modifier une donnée (selon son id)
// e.g http://localhost:3000/1
routerStarters.put('/starters/:id', controllerStarters.updateStarter);
routerStarters.put('/starter/:id', controllerStarters.updateStarter);


/*
* DELETE
*/
// route pour supprimer une donnée (selon son id)
// e.g http://localhost:3000/starters/1
routerStarters.delete('/starters/:id', controllerStarters.deleteStarter);
routerStarters.delete('/starter/:id', controllerStarters.deleteStarter);


/*
* EXPORT
*/
// export du router
module.exports = routerStarters;
