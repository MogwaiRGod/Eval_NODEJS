/*********************************** VARIABLES */
const menu = './src/model/menu.json';   // chemin du fichier du menu
const erreurs = // messages de statuts de requêtes
{   
    // erreurs 404
    "404_id": "Aucun objet trouvé avec cet id",
    "404_nom": "Aucun objet trouvé avec ce nom",
    // erreurs 500
    "500_lecture": "Une erreur est survenue lors de la lecture des données",
    "500_ecriture": "Une erreur est survenue lors de l'écriture des données",
    // codes 200
    "200_ajout": "Donnée ajoutée avec succès !",
    "200_maj": "Donnée mise à jour avec succès !",
    "200_suppr": "Donnée supprimée avec succès !",
    // erreurs 400
    "400_vide": "Corps de requête vide",
    "400_deja_existant": "Il y a déjà un objet avec cet ID dans le tableau",
    "400_invalide": "Propriété(s) invalide(s)"
};

/*********************************** IMPORTS */
const fs = require('fs'); 
const manip_files = require('../utils/manipulateFiles');
