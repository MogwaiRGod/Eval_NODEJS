const API = require('./app.js');
const port = 3000; // choix du port sur lequel faire tourner l'application

// listen() va requêter le port entré en argument pour faire tourner API
API.listen(port, () => {    // lancement de l'application
    console.log(`L'application tourne sur le port ${port}`);   // vérification que l'application tourne
});