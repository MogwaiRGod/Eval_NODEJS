/*
* VARIABLES
*/

// messages de statuts de requêtes
const error = 
{   
    // error 404
    "404_id": "Aucun objet trouvé avec cet id",
    "404_nom": "Aucun objet trouvé avec ce nom",
    "404_vide": "Le jeu de données demandé est vide",
    // error 500
    "500_lecture": "Une erreur est survenue lors de la lecture des données",
    "500_ecriture": "Une erreur est survenue lors de l'écriture des données",
    "500": "Erreur interne",
    // codes 200
    "200_ajout": "Donnée ajoutée avec succès !",
    "200_maj": "Donnée mise à jour avec succès !",
    "200_suppr": "Donnée supprimée avec succès !",
    "200": "La requête est un succès",
    // error 400
    "400_vide": "Corps de requête vide",
    "400_deja_existant": "Il y a déjà un objet avec cet ID dans le arrayleau",
    "400_invalide": "Propriété(s) invalide(s)",
    "400_val_invalide": "Valeur(s) invalide(s)"
};



/*
* FONCTIONS
*/


/*
* POUR LES RESULTATS
* DE REQUÊTES
* <=> error/STATUTS ET MESSAGES
*/
// fonction qui envoie un code HTTP et un message à la suite d'une requête HTTP
exports.requestStatus = (code, msg, resp) => {
    resp.status(parseInt(code)).send(msg);
}

// fonction qui vérifie si une erreur système s'est produite et le cas échant, envoie un erreur + message et retourne VRAI;
// sinon ne fait rien et retourne FAUX
exports.caseError = (error_sys, resp, type = "") => {
    // le type d'erreur est soit une erreur d'écriture, soit de lecture ; si à l'avenir,
    // d'autres error sont possibles, ça retournera par défaut 'erreur interne' = erreur 500
    const erreur_msg = error[`500_${type}`];
    if (error_sys) {
        resp.status(parseInt(500)).send({
            message: erreur_msg,
            error: error_sys
        });
        return true;
    }
    return false;
} // FIN CAS ERREUR       

// fonction qui retourne un statut de requête selon le cas + message si elle a été un succès
// par défaut, le message sera "La requête est un succès"
exports.successReq = (resp, cas ="") => {
    const msg = error[`200_${cas}`];
    this.requestStatus(200, msg, resp);
    return;
}



/*
* VERIFICATION D'ENTREES
* = PARAMETRES DU CORPS DE REQUÊTES
*/
// fonction qui vérifie si un arrayleau entré en argument est vide ou non ; si oui -> message d'erreur + retourne VRAI
// si non -> ne fait rien et retourne FAUX
exports.checkArray = (array, resp) => {
    // si vide
    if (!array.length) {
        this.requestStatus(404, error["404_vide"], resp);
        return true;
    }
    return false;
} // FIN CHECK array

// fonction qui vérifie si un corps de requête est vide ou non ; si oui, envoie une erreur et retourne VRAI, sinon,
// ne fait rien et retourne FAUX
exports.checkEmpty = (props, resp) => {
    if (!props.length) {
        this.requestStatus(400, error["400_vide"], resp);
        return true;
    }
    return false;
} // FIN CHECK VIDE

// fonction qui vérifie l'intégrité des propriétés ; si elles sont ok, fonction ne fait rien et retourne FAUX ; sinon, message
// d'erreur et retourne VRAI
exports.checkProperties = (props, resp) => {
    // s'il n'y a pas assez de propriétés ou si les propriétés entrées ne correspondent pas à celles attendues
    if (props.length !== 2 || props.find( e => e.toLowerCase() === "nom") === undefined || props.find( e => e.toLowerCase() === "prix") === undefined) {
        // erreur
        this.requestStatus(400, error["400_invalide"], resp);
        return true;
    }
    return false;
} // FIN CHECK PRORIETES

// fonction qui vérifie que les valeurs entrées dans le corps de la requête soient correctes
// concrètement, vérifie que le prix entré est bien un nombre ; si oui, retourne FAUX et ne fait rien ; si non, envoie une erreur et retourne VRAI
exports.checkValues = (prix, resp) => {
    if (parseFloat(prix) != prix) {
        this.requestStatus(400, error["400_val_invalide"], resp);
        return true;
    }
    return false;
} // FIN CHECK VALEURS

// fonction qui évalue une liste de propriétés ; fonction à utiliser dans le cas d'une mise à jour d'item. La fonction va vérifier
// que l'on demande à modifier 1 à 2 propriétés et que les propriétés demandées correspondent au prix ou au nom de l'item
// affiche un message d'erreur si les propriétés  sont incorrectes et retourne VRAI, sinon retourne FAUX
exports.checkPropsUpdate = (liste_props, resp) => {
    // on vérifie que l'on demande à maximum 2 propriétés
    if (liste_props.length > 2 || !liste_props.length) {
        this.requestStatus(404, error["400_invalide"], resp);
        return true;
    }
    // on boucle dans les propriétés demandées
    liste_props.forEach( p => {
        if (p.tostr().toLowerCase() !== "nom" && p.tostr().toLowerCase() !== "prix"){
            // si la propriété demandée n'est ni le nom, ni le prix
            this.requestStatus(404, error["400_invalide"], resp);
            return true;   
        }
    });
    // sinon retourne faux
    return false;
} // FIN CHECK PRORIETES

// fonction qui vérifie tout dans le corps de la requête : qu'il est non-vide et que les propriétés et valeurs sont intègres pour l'ajout d'un item
// si une erreur est détéctée, applique le statut d'erreur correspondant et retourne vrai
// sinon ne fait rien et retourne faux
exports.checkBodyAdd = (props, resp) => {
    // vérification que le corps de la requête est non-vide
    if (this.checkEmpty(props, resp) || this.checkProperties(props, resp)) {
        return true;
    }
    return false;
} // FIN CHECKBODY

// fonction qui vérifie que l'id entré en argument n'est pas déjà pris par un objet du arrayleau passé en argument
// si c'est le cas : message d'erreur + retourne vrai ; sinon ne ne fait rien et retourne faux
exports.checkId = (id, array, resp) => {
    if(array.find(e => parseInt(e.id) === parseInt(id)) !== undefined){
        this.requestStatus(400, error["400_deja_existant"], resp);
        return true;
    }
    return false;
} // FIN CHECK ID

// fonction qui indique s'il existe déjà dans un arrayleau un item avec l'id demandé ;
// si oui, ne fait rien et retourne VRAI, sinon envoie un message d'erreur et retourne FAUX
exports.existsId = (id, array, resp) => {
    // s'il y a bien un item avec l'id demandé
    if(array.find(e => e.id === parseInt(id)) !== undefined){
        return true;
    } 
    // sinon
    this.requestStatus(404, error["404_id"], resp);
    return false;
}



/*
* POUR LA MANIPULATION D'ITEM
* DE LA BDD
* = OBJETS JSON
*/
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
exports.createItem = (id, nom, prix) => {
    return {"id": parseInt(id), "nom": nom, "prix": Number(prix)};
}

// fonction qui affiche un item d'une liste donnée, ayant un id entré en argument,
// dans le résultat d'une requête HTTP
exports.readItemId = (id, array, resp) => {
    const item = array.find(e => e.id === parseInt(id));
    this.requestStatus(200, item, resp);
    return;
} // FIN AFFICHER ITEM



/*
* FONCTIONS POUR LA RECHERCHE
* D'EXPRESSION DANS LES NOMS
* D'OBJETS DE LA BDD
*/
// fonction qui cherche une expression (regex) dans une str de caractères (str)
// retourne un booléen selon si la regex a été trouvé à l'intérieur ou non
exports.searchRegex = (str, regex) => {
    let regexFound = false;// indique si les caractères sont bons dans l'évaluation en cours

    // standardisation des arguments
    str=str.tostr().toLowerCase(); regex=regex.tostr().toLowerCase();

    // on boucle dans la str tant que la regex peut être contenu (en longueur) dans la chaîne
    for (let i=0; i<= str.length-regex.length; i++) {
        // on boucle dans la regex afin d'évaluer les caractères de la chaîne et de la regex
        for (let j=0; j<regex.length; j++) {
            // si le caractère évalué n'est pas le même
            if (regex[j] !== str[i+j]) {
                regexFound = false; // màj du booléen regexFound
                if (j>0) { // si on a déjà trouvé des caractères identiques
                    str=str.substr(i+j, str.length); // on enlève tous les caractères de la str évalués jusque-là
                    return this.searchRegex(str, regex); // et on relance la fonction
                } else {
                    break; // sinon, on se contente de sortir de la boucle pour itérer sur le prochain caractère de la chaîne
                } // FIN SI
            } else if (j === regex.length-1) { // si on a évalué le dernier caractère de la regex (et qu'il est identique
                regexFound = true;            // à celui en cours de la chaîne)
                return regexFound; // on peut quitter la fonction
            } else { // sinon, si le caractère évalué est le même
                regexFound = true;
            }// FIN SI
        } // FIN POUR J
    } // FIN POUR I
    return regexFound;
}   // FIN FONCTION CHERCHER REGEX

// fonction qui, pour une liste d'objets (array), une propriété spécifique à évaluer (prop) et une expression à rechercher (regex),
// retourne une une response de requête affichant une liste de tous les items contenant la regex dans la valeur de la propriété susmentionnée,
// ou un message d'erreur si rien n'a été trouvé
// usage concret : pour un arrayleau de la BDD, va chercher tous les items dont le nom contient l'expression entrée dans la requête
exports.searchItem = (array, prop, regex, resp) => {
    let foundItems = [];
    // on boucle dans le arrayleau
    array.forEach( e => {
        // on séléctionne le nom de l'item (e[prop])
        // et on évalue s'il contient la regex
        if (this.searchRegex(e[prop], regex)) {
            // si oui, on stocke l'item (e) dans les items trouvées
            foundItems.push(e);
        } // FIN SI
    }); // FIN FOR EACH
    // si aucun item n'a été trouve
    if (!foundItems.length) {
        // message d'erreur
        return this.requestStatus(404, error["404_nom"], resp);
    }
    return this.requestStatus(200, foundItems, resp);
     // sinon on affiche la liste des items ayant la regex dans leur nom
} // FIN RECHERCHE ITEM



 






