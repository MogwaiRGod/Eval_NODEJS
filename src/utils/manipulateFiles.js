/*********************************************** FONCTIONS */

// fonction qui cherche une expression (regex) dans une chaine de caracètres (chaine)
// retourne un booléen selon si la regex a été trouvé à l'intérieur ou non
exports.chercherRegex = (chaine, regex) => {
    // indique si les caractères sont bons dans l'évaluation en cours
    let regex_trouve = false;
    // on boucle dans la chaine tant que la regex peut être contenu (en longueur) dans la chaîne
    for (let i=0; i<= chaine.length-regex.length; i++) {
        // on boucle dans la regex afin d'évaluer les caractères de la chaîne et de la regex
        for (let j=0; j<regex.length; j++) {
            // si le caractère évalué n'est pas le même
            if (regex[j] !== chaine[i+j]) {
                regex_trouve = false; // màj du booléen regex_trouve
                if (j>0) { // si on a déjà trouvé des caractères identiques
                    chaine=chaine.substring(i+j, chaine.length-1); // on enlève tous les caractères de la chaine évalués jusque-là
                    return chercherRegex(chaine, regex); // et on relance la fonction
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