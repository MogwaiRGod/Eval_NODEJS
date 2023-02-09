/************************************** IMPORT ET MONTAGE DES MODULES */

const express = require("express"); // import d'express => module contenant des fonctionnalités 
                                    // pour les applications web = pour les reqûetes HTTP =>
                                    // récupération des fonctions :
                                    // get(), use()...
const app = express();  // notre API est une application express ; app est donc une instance d'express
const fs = require('fs');   // module qui permet de manipuler des fichiers
const bodyParser = require("body-parser"); // bodyParser est utile à express ; il lui permet de
                                            // créer/lire/manipuler des données HTTP POST

// app.use([chemin], [middleware]) -> cette fonction sert à monter un middleware (logiciel qui fournit des
// fonctionnalités à une application) à un endroit spécifié ; si pas 
// de chemin, alors monte le middleware entré en argument à la localisation actuelle
app.use(bodyParser.json()); // montage de bodyParser


/****************************************** VARIABLES */

const chemin_menu = 'SRC/model/carte.json';    // chemin du fichier du menu


// autorisation de l'export de app
module.exports = app;