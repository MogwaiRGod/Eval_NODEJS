/****************************************************** IMPORTS ***********************************/

const express = require("express"); // import du module express 

// Router est une classe d'express => express.Router() crée une instance de cette classe.
// Cette classe permet de créer un middleware, ce middleware étant un gestionnaire de routes complet.
const router_entrees = express.Router(); // création d'un router pour le tableau entrées
                                        //  = fichier de stockage de toutes les routes
const controller_entrees = require("../controller/controller_entrees"); // import des fonctions du controller des entrées



/*************************************************** REQUÊTES ****************************************************/

/************************************************* POST ***********************************/
// route pour créer une donnée
// e.g http://localhost:3000/entrees
router_entrees.post('/entrees', controller_entrees.ajoutEntree); // on sélectionne la fonction ajoutEntree du fichier
                                                                // importé dans controller_entrees
                                                                // et on l'utilise comme fonction callback de la requête
router_entrees.post('/entree', controller_entrees.ajoutEntree);

// route pour créer une données avec une id spécifique
// e.g http://localhost:3000/entrees/1
router_entrees.post('/entrees/:id', controller_entrees.ajoutEntreeId);
router_entrees.post('/entree/:id', controller_entrees.ajoutEntreeId);


/************************************************* GET ***********************************/

// route pour lire l'intégralité des entrées
// e.g http://localhost:3000/entrees
router_entrees.get('/entrees', controller_entrees.lireEntrees);
router_entrees.get('/entree', controller_entrees.lireEntrees);

// route pour lire une entrée selon son id
// e.g http://localhost:3000/entrees/1
router_entrees.get('/entrees/:id', controller_entrees.lireEntreeId);
router_entrees.get('/entree/:id', controller_entrees.lireEntreeId);

// route pour afficher une entrée selon son nom
// e.g http://localhost:3000/entrees/search/croquette
router_entrees.get('/entrees/search/:nom', controller_entrees.rechercheEntree);
router_entrees.get('/entree/search/:nom', controller_entrees.rechercheEntree);


/************************************************* PUT ***********************************/
// route pour modifier une donnée (selon son id)
// e.g http://localhost:3000/1
router_entrees.put('/entrees/:id', controller_entrees.updateEntree);
router_entrees.put('/entree/:id', controller_entrees.updateEntree);


/************************************************* DELETE ***********************************/
// route pour supprimer une donnée (selon son id)
// e.g http://localhost:3000/entrees/1
router_entrees.delete('/entrees/:id', controller_entrees.supprimerEntree);
router_entrees.delete('/entree/:id', controller_entrees.supprimerEntree);



/*************************************************** EXPORT ***************************************************/
// export du router
module.exports = router_entrees;