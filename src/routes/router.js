/********************************** IMPORTS */

/*************** modules */
const express = require("express");
const bodyParser = require("body-parser"); 

/*************** routes */
const routes_entrees = require('./routes_entrees.js')


/********************************** VARIABLES */

const router = express.Router(); // instanciation du router
router.use(bodyParser.json());





/********************************** ROUTER */

router.use(routes_entrees); // import des routes du tableau entrées



/********************************** EXPORT */

module.exports = router;