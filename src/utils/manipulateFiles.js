/******************************************************* VARIABLES */

const erreurs = // messages de statuts de requêtes
{   
    // erreurs 404
    "404_id": "Aucun objet trouvé avec cet id",
    "404_nom": "Aucun objet trouvé avec ce nom",
    // erreurs 500
    "500_lecture": "Une erreur est survenue lors de la lecture des données",
    "500_ecriture": "Une erreur est survenue lors de l'écriture des données",
    "500": "Erreur interne",
    // codes 200
    "200_ajout": "Donnée ajoutée avec succès !",
    "200_maj": "Donnée mise à jour avec succès !",
    "200_suppr": "Donnée supprimée avec succès !",
    // erreurs 400
    "400_vide": "Corps de requête vide",
    "400_deja_existant": "Il y a déjà un objet avec cet ID dans le tableau",
    "400_invalide": "Propriété(s) invalide(s)"
};


/******************************************************* FONCTIONS */

// fonction qui cherche une expression (regex) dans une chaine de caractères (chaine)
// retourne un booléen selon si la regex a été trouvé à l'intérieur ou non
exports.chercherRegex = (chaine, regex) => {
    let regex_trouve = false;// indique si les caractères sont bons dans l'évaluation en cours

    // standardisation des arguments
    chaine=chaine.toLowerCase(); regex=regex.toLowerCase();

    // on boucle dans la chaine tant que la regex peut être contenu (en longueur) dans la chaîne
    for (let i=0; i<= chaine.length-regex.length; i++) {
        // on boucle dans la regex afin d'évaluer les caractères de la chaîne et de la regex
        for (let j=0; j<regex.length; j++) {
            // si le caractère évalué n'est pas le même
            if (regex[j] !== chaine[i+j]) {
                regex_trouve = false; // màj du booléen regex_trouve
                if (j>0) { // si on a déjà trouvé des caractères identiques
                    chaine=chaine.substring(i+j, chaine.length); // on enlève tous les caractères de la chaine évalués jusque-là
                    return this.chercherRegex(chaine, regex); // et on relance la fonction
                } else {
                    break; // sinon, on se contente de sortir de la boucle pour itérer sur le prochain caractère de la chaîne
                } // FIN SI
            } else if (j === regex.length-1) { // si on a évalué le dernier caractère de la regex (et qu'il est identique
                                            // à celui en cours de la chaîne)
                return regex_trouve; // on peut quitter la fonction
            } else { // sinon, si le caractère évalué est le même
                regex_trouve = true;
            }// FIN SI
        } // FIN POUR J
    } // FIN POUR I
    return regex_trouve;
}   // FIN FONCTION CHERCHER REGEX



// fonction qui vérifie si une erreur système s'est produite et le cas échant, envoie un erreur + message et retourne VRAI;
// sinon ne fait rien et retourne FAUX
exports.casErreurs = (erreur_sys, rep, type) => {
    // le type d'erreur est soit une erreur d'écriture, soit de lecture
    let erreur_msg;
    switch(type) {
        case 'lecture':
            erreur_msg = erreurs["500_lecture"];
            break;
        case 'ecriture':
            erreur_msg = erreurs["500_ecriture"];
            break;
        default:
            // dans le cas où il y aurait d'autres erreurs possibles dans le future
            erreur_msg = erreurs["500"];
            break;
    }
    if (erreur_sys) {
        rep.status(parseInt(500)).send({
            message: erreur_msg,
            error: erreur_sys
        });
        return true;
    }
    return false;
} // FIN CAS ERREUR        



// fonction qui vérifie si un corps de requête est vide ou non ; si oui, envoie une erreur et retourne VRAI, sinon,
// ne fait rien et retourne FAUX
exports.checkVide = (props, rep) => {
    if (!props.length) {
        this.requeteStatut(400, erreurs["400_vide"], rep);
        return true;
    }
    return false;
} // FIN CHECK VIDE

// fonction qui vérifie l'intégrité des propriétés ; si elles sont ok, fonction ne fait rien et retourne FAUX ; sinon, message
// d'erreur et retourne VRAI
exports.checkProprietes = (props, rep) => {
    // s'il n'y a pas assez de propriétés ou si les propriétés entrées ne correspondent pas à celles attendues
    if (props.length !== 2 || props.find( e => e.toLowerCase() === "nom") === undefined || props.find( e => e.toLowerCase() === "prix") === undefined) {
        // erreur
        this.requeteStatut(400, erreurs["400_invalide"], rep);
        return true;
    }
    return false;
} // FIN CHECK PRORIETES


// fonction qui vérifie tout dans le corps de la requête : qu'il n'est ni vide, et que les propriétés sont intgères pour l'ajout d'un item
// si une erreur est détéctée, applique le statut d'erreur correpondant et retourne vrai
// sinon ne fait rien et retourne faux
exports.checkBodyAjout = (props, rep) => {
    // vérification que le corps de la requête est non-vide
    if (this.checkVide(props, rep)) {
        return true;
    } else if(this.checkProprietes(props, rep)) {
        return true;
    }
    return false;
} // FIN CHECKBODY


// fonction qui définit un id à partir de l'id le plus grand déjà attribué à l'item d'une liste d'objets
// retourne un entier (id)
exports.defineId = (objs) => {
    //la liste des IDs récupérés dans les objets
    let liste_ids = [];
    objs.forEach( e => liste_ids.push(parseInt(e.id)));
    // on retourne l'ID obtenu à partir de l'ID le plus grand déjà attribué +1
    return Math.max(...liste_ids) + 1;
}


// fonction qui crée un objet JSON pour être ajouté dans une BDD
// Objet comme suit :
//  {
//      "id": ...,
//      "nom": ...,
//      "prix": ...
// }
exports.creerItem = (id, nom, prix) => {
    return {"id": parseInt(id), "nom": nom, "prix": Number(prix)};
}

// fonction qui envoie un code HTTP et un message à la suite d'une requête HTTP
exports.requeteStatut = (code, msg, rep) => {
    rep.status(parseInt(code)).send(msg);
}

// fonction qui vérifie que l'id entré en argument n'est pas déjà pris par un objet du tableau passé en argument
// si c'est le cas : message d'erreur + retourne vrai ; sinon ne ne fait rien et retourne faux
exports.checkId = (id, tab, rep) => {
    if(tab.find(e => e.id === parseInt(id)) !== undefined){
        this.requeteStatut(400, erreurs["400_deja_existant"], rep);
        return true;
    }
    return false;
} // FIN CHECK ID

// fonction qui retourne un statut de requête selon le cas + message si elle a été un succès,
exports.succesReq = (rep, cas) => {
    switch(cas) {
        case 'ajout':
            msg = erreurs['200_ajout'];
            break;
        case 'suppr':
            msg = erreurs['200_suppr'];
            break;
        case 'maj':
            msg = erreurs['200_maj'];
            break;
    }   
    this.requeteStatut(200, msg, rep);
    return;
}

// fonction qui indique s'il existe déjà dans un tableau un item avec l'id demandé ;
// si oui, ne fait rien et retourne VRAI, sinon envoie un message d'erreur et retourne FAUX
exports.existeId = (id, tab, rep) => {
    // s'il y a bien un item avec l'id demandé
    if(tab.find(e => e.id === parseInt(id)) !== undefined){
        return true;
    } 
    // sinon
    this.requeteStatut(404, erreurs["404_id"], rep);
    return false;
}

exports.afficherItemId = (id, tab, rep) => {
    const item = tab.find(e => e.id === parseInt(id));
    this.requeteStatut(200, item, rep);
    return;
} // FIN AFFICHER ITEM