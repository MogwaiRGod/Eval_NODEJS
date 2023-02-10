/************************************* IMPORTS */

const express = require("express"); 
const controller_boissons = require("../controller/controller_boissons"); // import des fonctions du controller des boissons



/************************************* VARIABLES */

const router_boissons = express.Router(); // instanciation d'un router pour le tableau boissons


/********************************************** REQUÊTES */

/************************ TEST */
// e.g http://localhost:3000/boissons
router_boissons.get('/boissons', (requete, reponse) => {    // vérifie que la route vers le tableau
                                                        // est fonctionnelle
    reponse.status(200).send("Route fonctionnelle");
});

/************************ POST */
// pour ajouter une boisson sans préciser l'ID
router_boissons.post('/boissons', controller_boissons.ajouterBoisson);

// pour ajouter une boisson en précisant l'ID *DANS LA ROUTE DE LA REQUÊTE, PAS LE BODY*
router_boissons.post('/boissons/:id', controller_boissons.ajouterBoissonParId);


/************************ GET */
// pour afficher toutes les boissons
// router_boissons.get('/'+tab, controller_boissons.afficherBoissons);

// pour afficher une boisson en fonction de son id
// router_boissons.get('/'+tab+'/:id', controller_boissons.afficherBoissonId);

// pour afficher les résultats d'une recherche de boissons
// router_boissons.get('/'+tab+'/search/:nom', controller_boissons.rechercheBoissons);


/************************ PUT */
// pour mettre à jour une ou deux propriétés (nom et/ou prix) d'une boissons sélectionnée par son id
// les champs à màj sont à spécifier dans le corps de la requête
// router_boissons.put('/'+tab+'/:id', controller_boissons.updateBoissons);


/************************ DELETE */
// pour supprimer un item sélectionné par son id
// router_boissons.put('/'+tab+'/:id', controller_boissons.supprBoissons);



/*************************************** EXPORT */
// export du module
module.exports = router_boissons;