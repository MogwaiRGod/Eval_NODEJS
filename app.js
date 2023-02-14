/* 
 * IMPORTS ET MONTAGE 
 *
 */
/* modules */
// import du module express 
const express = require("express"); 
const bodyParser = require("body-parser");
/*
 * import du module cors (Cross-origin resource sharing) qui permet d'autoriser l'accès à des donnée d'une page-web à une application :
 * dans notre cas, va nous permettre par la suite de créer un dashboard (HTML) dont les requêtes pourront être traitées par
 * notre application
 */
const cors = require('cors');

/* router */
const routes = require('./src/routes/router.js');


/*
 * VARIABLES 
 */

// instanciation de l'application
const api = express();  // notre API est une application express ; app est donc une instance d'express


// app.use([chemin], [middleware]) -> cette fonction sert à monter un middleware (logiciel qui fournit des
// fonctionnalités à une application) à un endroit spécifié ; si pas 
// de chemin, alors monte le middleware entré en argument à la localisation actuelle
api.use(bodyParser.json()); // montage de bodyParser sur l'application
api.use(cors());



/*
 * SCRIPT 
 */
api.use(routes);



/*
 * EXPORT 
  */
// autorisation de l'export de app
module.exports = api;
