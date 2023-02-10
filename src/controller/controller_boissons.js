/*********************************** VARIABLES */
const menu = './src/model/menu.json';   // chemin du fichier du menu


/*********************************** IMPORTS */
const fs = require('fs'); 
const { type } = require('os'); // euuuuh j'ai j'amais écrit ça, je ne sais pas comment c'est arrivé là mais du coup je le garde dans le doute ???
const manip_files = require('../utils/manipulateFiles');




/********************************************************** CRUD */

/******************************* CREATE */
// fonction qui ajoute une boisson en calculant son id
exports.ajouterBoisson = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        // en cas d'erreurs : affiche l'erreur et quitte la fonction
        if(manip_files.casErreurs(erreur, reponse)) {
            return;
        } else {
            // récupération des propriétés entrées dans le corps de la requête
            const liste_props = Object.getOwnPropertyNames(requete.body);
            // vérification de l'intégrité des propriétés de la requête ; si une erreur a été détectée, on quitte la fonction
            if (manip_files.checkBodyAjout(liste_props, reponse)) {
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
                        if(manip_files.casErreurs(erreur, reponse)) {
                            return;
                        } else {
                        // cas de succès
                            manip_files.succesReq(reponse, 'ajout');
                        } // FIN SI
                    }); // FIN WRITE FILE
                    
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN AJOUTER BOISSONS

// fonction qui ajoute une boisson à la BDD en fonction de l'ID entré dans la requête
exports.ajouterBoissonParId = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        // cas d'erreur
        if(manip_files.casErreurs(erreur, reponse)) {
            return;
        } else {
            let donnees_existantes = JSON.parse(donnees);
            // si le tableau est non-vide,
            if (donnees_existantes.boissons.length !== 0) {
                // on vérifie qu'il n'y a pas déjà un item avec l'id demandé dans le tableau
                if (manip_files.checkId(requete.params.id, donnees_existantes.boissons, reponse)) {
                    // si oui -> erreur et on quitte la fonction
                    return;
                } // FIN SI
            } // FIN SI
            // puis on vérifie l'intégrité de la requête
            const liste_props = Object.getOwnPropertyNames(requete.body);
            // vérification de l'intégrité de la requête ; si une erreur a été détectée, on quitte la fonction
            if (manip_files.checkBodyAjout(liste_props, reponse)) {
                return;
            } else {
                // sinon, on créée l'objet
                const item = manip_files.creerItem(requete.params.id, requete.body.nom, requete.body.prix);
                // et on l'ajoute au tableau existant
                donnees_existantes.boissons.push(item);
                // puis on réécrit le fichier de données
                fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur) => {
                    // si erreur
                    if(manip_files.casErreurs(erreur,  reponse)) {
                        return;
                    } else {
                        // sinon si succès
                        manip_files.succesReq(reponse, 'ajout')
                    } // FIN SI
                }); // FIN WRITE FILE
            } // FIN SI
        } // FIN SI
    });// FIN READ FILE
} // FIN AJOUTER BOISSON PAR ID


/******************************* READ */