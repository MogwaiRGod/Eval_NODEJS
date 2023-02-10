/******************************************************* FONCTIONS */

// fonction qui cherche une expression (regex) dans une chaine de caracètres (chaine)
// retourne un booléen selon si la regex a été trouvé à l'intérieur ou non
exports.chercherRegex = (chaine, regex) => {
    let regex_trouve = false;// indique si les caractères sont bons dans l'évaluation en cours

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
exports.casErreurs = (no_err, erreur_sys, erreur_msg, rep) => {
    if (erreur_sys) {
        rep.status(parseInt(no_err)).send({
            message: erreur_msg,
            error: erreur_sys
        });
        return true;
    } else {
        return false;
    }
} // FIN CAS ERREUR        



// fonction qui vérifie si un corps de requête est vide ou non ; si oui, envoie une erreur et retourne VRAI, sinon,
// ne fait rien et retourne FAUX
exports.checkVide = (no_err, props, rep, err) => {
    if (!props.length) {
        rep.status(parseInt(no_err)).send(err);
        return true;
    } else {
        return false;
    }
} // FIN CHECK VIDE

// fonction qui vérifie l'intégrité des propriétés ; si elles sont ok, fonction ne fait rien et retourne FAUX ; sinon, message
// d'erreur et retourne VRAI
exports.checkProprietes = (no_err, props, rep, err) => {
    // s'il n'y a pas assez de propriétés ou si les propriétés entrées ne correspondent pas à celles attendues
    if (props.length !== 2 || props.find( e => e === "nom") === undefined || props.find( e => e === "prix") === undefined) {
        // erreur
        rep.status(parseInt(no_err)).send(err);
        return true;
    } else {
        return false;
    }
} // FIN CHECK PRORIETES

// fonction qui vérifie tout dans le corps de la requête : qu'il n'est ni vide, et que les propriétés sont intgères pour l'ajout d'un item
// si une erreur est détéctée, applique le statut d'erreur correpondant et retourne vrai
// sinon ne fait rien et retourne faux
exports.checkBodyAjout = (no_err, props, rep, err_vide, err_props) => {
    // vérification que le corps de la requête est non-vide
    if (this.checkVide(no_err, props, rep, err_vide) || this.checkProprietes(no_err, props, rep, err_props)) {
        return true;
    } else {
        return false;
    }
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
    return {"id": id, "nom": nom, "prix": prix};
}

// fonction qui envoie un code HTTP et un message à la suite d'une requête HTTP
exports.requeteStatut = (code, msg, rep) => {
    rep.status(parseInt(code)).send(msg);
    return;
}