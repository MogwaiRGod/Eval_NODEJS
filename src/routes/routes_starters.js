/*
 * IMPORTS
 */
// express
const express = require("express"); // import du module express 


/*
 * VARIABLES
 */

/*
 * Router est une classe d'express => express.Router() crée une instance de cette classe.
 * Cette classe permet de créer un middleware, ce middleware étant un gestionnaire de routes complet.
 */
// création d'un router pour le tableau starters
//  = fichier de stockage de toutes les routes
const routerStarters = express.Router();
// import des fonctions du controller des entrées (starters)
const controllerStarters = require("../controller/controller_starters"); 



/*
 * REQUÊTES
 */


/*
 * POST
 */
// routes pour créer une donnée
// e.g http://localhost:3000/starters
// ici, on sélectionne la fonction addStarter du fichier
// importée dans controllerStarters et on l'utilise comme fonction callback de la requête
routerStarters.post('carte/starters', controllerStarters.addStarter); 
routerStarters.post('carte/starter', controllerStarters.addStarter);

// routes pour créer une données avec une id spécifique
// e.g http://localhost:3000/starters/1
routerStarters.post('carte/starters/:id', controllerStarters.addStarterId);
routerStarters.post('carte/starter/:id', controllerStarters.addStarterId);


/*
 * GET
 */
// routes pour lire l'intégralité des entrées
// e.g http://localhost:3000/starters
routerStarters.get('carte/starters', controllerStarters.readStarters);
routerStarters.get('carte/starter', controllerStarters.readStarters);

// routes pour lire une entrée selon son id
// e.g http://localhost:3000/starters/1
routerStarters.get('carte/starters/:id', controllerStarters.readStarterId);
routerStarters.get('carte/starter/:id', controllerStarters.readStarterId);

// routes pour afficher une entrée selon son nom
// e.g http://localhost:3000/starters/search/croquette
routerStarters.get('carte/starters/search/:name', controllerStarters.searchStarter);
routerStarters.get('carte/starter/search/:name', controllerStarters.searchStarter);


/*
 * PUT
 */
// routes pour modifier une donnée (selon son id)
// e.g http://localhost:3000/1
routerStarters.put('carte/starters/:id', controllerStarters.updateStarter);
routerStarters.put('carte/starter/:id', controllerStarters.updateStarter);


/*
 * DELETE
 */
// routes pour supprimer une donnée (selon son id)
// e.g http://localhost:3000/starters/1
routerStarters.delete('carte/starters/:id', controllerStarters.deleteStarter);
routerStarters.delete('carte/starter/:id', controllerStarters.deleteStarter);


/*
 * EXPORT
 */
// export du router
module.exports = routerStarters;
