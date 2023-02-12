/************************************** IMPORTS ET MONTAGE */

/******************** modules */
const express = require("express"); // import du module express 
const bodyParser = require("body-parser");

/******************** router */
const routes = require('./src/routes/router.js');


/************************************** VARIABLES */

// instanciation de l'application
const api = express();  // notre API est une application express ; app est donc une instance d'express


// app.use([chemin], [middleware]) -> cette fonction sert à monter un middleware (logiciel qui fournit des
// fonctionnalités à une application) à un endroit spécifié ; si pas 
// de chemin, alors monte le middleware entré en argument à la localisation actuelle
api.use(bodyParser.json()); // montage de bodyParser sur l'application



/************************************** SCRIPT */

api.use(routes);


/************************************** EXPORT */
// autorisation de l'export de app
module.exports = api;