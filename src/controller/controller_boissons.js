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
        if(manip_files.casErreurs(erreur, reponse, 'lecture')) {
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
                // console.log(manip_files.checkTab(donnees_existantes, reponse))
                (!donnees_existantes.boissons.length) ? id = 0 : id = manip_files.defineId(donnees_existantes.boissons);
                // création de l'item et ajout au tableau de données
                donnees_existantes.boissons.push(manip_files.creerItem(id, requete.body.nom, requete.body.prix));
                // réécriture du fichier
                    fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur) => { 
                        // cas d'erreur
                        if(manip_files.casErreurs(erreur, reponse, 'ecriture')) {
                            return;
                        } else {
                        // cas de succès
                            manip_files.succesReq(reponse, 'ajout');
                            return;
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
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            let donnees_existantes = JSON.parse(donnees);
            // si le tableau est non-vide,
            if (manip_files.checkTab(donnees_existantes.boissons, reponse)) {
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
                    if(manip_files.casErreurs(erreur,  reponse, 'ecriture')) {
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
// fonction permettant d'afficher l'intégralité des boissons disponibles
exports.afficherBoissons = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // récupération des données qui nous intéressent
            const donnees_existantes = JSON.parse(donnees).boissons;
            // affichage des données
            reponse.status(200).send(donnees_existantes);
        } // FIN SI
    }); // FIN READ FILE
} // FIN AFFICHER BOISSONS

// fonction qui affiche une boisson selon son id
exports.afficherBoissonId = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // récupération des données
            const donnees_existantes = JSON.parse(donnees).boissons;
            // on vérifie que le tableau n'est pas vide
            if (manip_files.checkTab(donnees_existantes, reponse)) {
                return;
            }    // on vérifie qu'il existe bel et bien une boisson avec l'id demandée
            else if (!manip_files.existeId(parseInt(requete.params.id), donnees_existantes, reponse)) {
                // sinon erreur et on quitte la fonction
                return;
            } else {
                // s'il existe, on affiche l'objet correspondant
                manip_files.afficherItemId(requete.params.id, donnees_existantes, reponse);
            } // FIN SI            
        } // FIN SI
    }); // FIN READ FILE
} // FIN AFFICHER BOISSON ID

// fonction qui affiche le résultat d'une recherche (écrite dans la requête), ce résultat étant toutes les boissons disponibles
// correspondant à l'expression de la recherche
exports.rechercheBoissons = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // vérification que le tableau de données n'est pas vide
            const donnees_existantes = JSON.parse(donnees).boissons;
            if (manip_files.checkTab(donnees_existantes, reponse)) {
                return;
            } else { // s'il n'est pas vide, on effectue la recherche
                // on stocke toutes les boissons contenant l'expression recherchée dans une constante
                const liste_boissons = manip_files.rechercheItem(donnees_existantes, "nom", requete.params.recherche);
                // on affiche les résultats obtenus
                manip_files.requeteStatut(200, liste_boissons, reponse);            
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN AFFICHER BOISSONS


/******************************* UPDATE */
// fonction permettant de mettre à jour les propriétés (au choix) d'une boisson sélectionnée par son id dans la requête
exports.updateBoissons = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // sélection des données
            let donnees_existantes = JSON.parse(donnees);
            // vérification que le tableau est non-vide
            if (manip_files.checkTab(donnees_existantes.boissons, reponse)) {
                // si vide : message d'erreur + on quitte
                return;
            } // vérification que le corps de la requête est non-vide
            // sélection des proprités demandées
            const liste_props = Object.getOwnPropertyNames(requete.body);
            if (manip_files.checkVide(liste_props, reponse)){
                // si vide : message d'erreur + on quitte
                return;
            } 
            // vérification que l'item demandé existe
            else if(manip_files.existeId(requete.params.id, donnees_existantes.boissons, reponse)){
                // vérification de l'intégrité de la requête (<=> on vérifie qu'on demande bien à modifier au moins le prix ou le nom et rien d'autre)
                if(manip_files.checkPropsUpdate(liste_props, reponse)) {
                    // si elles sont incorrectes -> erreur + on quitte la fonction
                    return;
                } else {
                    // sinon, on sélectionne l'item demandé
                    let item = donnees_existantes.boissons.find( e => e.id === parseInt(requete.params.id));
                    // on boucle dans la liste des propriétés à mettre à jour chez l'item
                    // on boucle dans les propriétés à modifier
                    liste_props.forEach( p => {
                        // afin de màj l'item
                        item[p] = requete.body[p]
                    });
                    // pas besoin de màj le tableau car la variable item pointe directement sur l'item dans le tableau <=> est déjà mis à jour
                    // on réécrit la BDD
                    fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur) => {
                        if(manip_files.casErreurs(erreur, reponse, 'ecriture')) {
                            return;
                        } else {
                            // sinon si succès
                            manip_files.succesReq(reponse, 'maj');
                        }
                    }); // FIN WRITE FILE
                } // FIN SI
            } // FIN SI
        } // FIN SI
    }); // FIN READ FIL
} // FIN UPDATE BOISSONS


/******************************* DELETE */
// fonction permttant de supprimer une boisson du menu, en la sélectionnant par son id
exports. supprBoissons = (requete, reponse) => {
    fs.readFile(menu, (erreur, donnees) => {
        if (manip_files.casErreurs(erreur, reponse, 'lecture')) {
            return;
        } else {
            // on stocke les données
            let donnees_existantes = JSON.parse(donnees);
            // vérification que la BDD n'est pas vide
            if (manip_files.checkTab(donnees_existantes.boissons, reponse)) {
                return;
            } // vérification que l'item avec l'ID demandé existe
            else if (manip_files.existeId(requete.params.id, donnees_existantes.boissons, reponse)){
                // on cherche l'index de l'item à supprimer
                const index = donnees_existantes.boissons.findIndex(e => e.id === parseInt(requete.params.id));
                // suppression de l'item à l'aide de son index
                donnees_existantes.boissons.splice(index, 1);
                // on réécrit les données
                fs.writeFile(menu, JSON.stringify(donnees_existantes), (erreur) => { 
                    if (manip_files.casErreurs(erreur, reponse, 'ecriture')) {
                        return;
                    } else {
                        // sinon si succès
                        manip_files.succesReq(reponse, 'suppr');
                    }
                }); // FIN WRITE FILE
            } // FIN SI
        } // FIN SI
    }); // FIN READ FILE
} // FIN SUPPR BOISSONS