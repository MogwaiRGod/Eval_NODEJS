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




/********************************************************** CRUD */

/******************************* CREATE */
// fonction qui ajoute une boisson en calculant son id
exports.ajouterBoisson = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        // en cas d'erreurs : affiche l'erreur et quitte la fonction
        if(manip_files.casErreurs(500, erreur, erreurs["500_lecture"], reponse)) {
            return;
        } else {
            // récupération des propriétés entrées dans le corps de la requête
            const liste_props = Object.getOwnPropertyNames(requete.body);
            // vérification de l'intégrité de la requête ; si une erreur a été détectée, on quitte la fonction
            if (manip_files.checkBodyAjout(400, liste_props, reponse, erreurs["400_vide"], erreurs["400_invalide"])) {
                return;
            } else {
                let donnees_existantes = JSON.parse(donnees);
                // on définit l'id de la nouvelle boisson selon que le tableau des boissons est vide ou non
                let id;                                 // s'il n'est pas vide, on calcule son id à partir des ids déjà attribuées
                (!donnees_existantes.boissons.length) ? id = 0 : id = manip_files.defineId(donnees_existantes.boissons);
                // création de l'item et ajout au tableau de données
                donnees_existantes.boissons.push(manip_files.creerItem(id, requete.body.nom, requete.body.prix));
                // réécriture du fichier
                    fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur) => { 
                        // cas d'erreur
                        if(manip_files.casErreurs(500, erreur, erreurs["500_ecriture"], reponse)) {
                            return;
                        } else {
                        // cas de succès
                            manip_files.requeteStatut(200, erreurs["200_ajout"], reponse);
                        } // FIN SI
                    }); // FIN WRITE FILE
                    
            } // FIN SI

            
        } // FIN SI

    }); // FIN READ FILE
} // FIN AJOUTER BOISSONS