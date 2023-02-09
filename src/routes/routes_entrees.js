/************************************* IMPORTS */

const express = require("express"); // import du module express 

// Router est une classe d'express => express.Router() crée une instance de cette classe.
// Cette classe permet de créer un middleware, ce middleware étant un gestionnaire de routes complet.
const router_entrees = express.Router(); // création d'un router pour le tableau entrées
                                        //  = fichier de stockage de toutes les routes
const controller_entrees = require("../controller/controller_entrees"); // import des fonctions du controller des entrées
// const app = require('/EVAL_NODEJS/app.js');  // import de l'application principale


/********************************** REQUÊTES */

/*************** TEST */
// test de la route menant à la racine
// e.g http://localhost:3000/
router_entrees.get('/', (requete, reponse) => {
    reponse.status(200).send("La route est fonctionelle");
});


/*************** POST */
// route pour créer une donnée
router_entrees.post('/entrees', controller_entrees.ajoutEntree); // on sélectionne la fonction ajoutEntree du fichier
                                                                // importé dans controller_entrees
                                                                // et on l'utilise comme fonction callback de la requête
// route pour créer une données avec une id spécifique
router_entrees.post('/entrees/:id', controller_entrees.ajoutEntreeId);


/*************** GET */

// route pour lire l'intégralité des entrées
router_entrees.get('/entrees', controller_entrees.lireEntrees);

// route pour lire une entrée selon son id
router_entrees.get('/entrees/:id', controller_entrees.lireEntreeId);


/*************** PUT */
// route pour modifier une donnée (selon son id)
router_entrees.put('/entrees/:id', controller_entrees.updateEntree);
// route pour supprimer une donnée


/********************************** EXPORT */
// export du module
module.exports = router_entrees;