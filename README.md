Evaluation Node.js
===

### Auteur 
Diane (MogwaiRGod)  

## Langage  
* JavaScript  


## Plateforme logicielle
* Node.js  
<br>
---

# Installation
* Vérifier que node.js est installé
```
node -v
```
Lancer le programme
```
npm start
```
CTRL + C pour sortir
rs pour redémarrer

# Fonctionnement
API Node.js permettant de gérer des requêtes HTTP de base (Get, Post...) vers un menu de restaurant, afin d'effectuer une gestion de base des données (CRUD).  
<br>
# Contenu
**-- /**  
---
## ---- serveur.js
Serveur de l'application <=> **choix du port** où faire tourner l'application + **lancement** de l'application.
## ---- app.js
Contient **l'import des méthodes** nécessaires.<br>
Contient **l'import du router** et rend **utilisables** lesdites routes.
## ---- package.json
Description technique des **composants** de l'API.

---
**-- /node_modules**
---
Contient les **dépendances** nécessaires au fonctionnement de l'API

- **express**<br>
Module contenant des fonctionnalités pour les **applications web** = pour les **reqûetes HTTP** => contient des fonctions telles que get(), use()...

- **fs**<br>
Module qui permet de manipuler des **fichiers**

- **bodyParser**<br>
Middleware utile à **express** ; il lui permet de créer/lire/manipuler des données **HTTP POST**

- **nodemon**<br>
Module **rechargeant** automatiquement l'application à chaque **changement (sauvegarde)** d'un des fichiers qui la composent

---

**-- /src**
---
---- /model
---

* **menu.json** <br>
Contient le **jeu de données** = menu du restaurant, sous forme d'un **objet json composé de 6 tableaux**, chacun contenant une **partie du menu** e.g un tableau "entrées", "boisssons", "desserts"...

---- /controller
--

* **6 controllers**, un par tableau du menu.<br>
Chaque fichier contient le **code-source du CRUD** (Create, Read, Update, Delete). =><br> 
    * **Create** : permet de demander à créer une donnée et à l'ajouter au tableau correspondant, en précisant son id ou non
    * **Read** : permet de demander à lire l'intégralité du tableau, une donnée spécifique du tableau via son ID on bien d'afficher toutes les données dont le nom contient une expression recherchée
    * **Update** : permet de sélectionner une donnée et de la modifer, entièrement ou partiellement, selon ce que l'on a entré dans le corps de la requête
    * **Delete** : permet de supprimer une donnée spécifique


---- /routes
--

* **router.js** <br>
Contient l'intégralité des routers, c'est-à-dire l'intégralité des routes.
* Les 6 autres fichiers = **6 routers**, un par tableau du menu, càd que chaque router contient toutes les routes nécessaires à la gestion d'un tableau du menu.<br>
Chaque fichier contient **l'export du controller** correspondant.
Chaque route (= requête HTTP pour une URL donnée <=> chemin vers une donnée spécifique) va **effectuer la requête** demandée par l'utilisateur =><br>
    * **Post** : pour Create
    * **Get** : pour Read
    * **Put** : pour Update
    * **Delete** : pour Delete


---- /utils
--

* **manipulateFiles.js** <br>
Contient toutes les fonctions nécessaires aux controllers. Contient également les messages d'erreur/de succès des requêtes.<br> 
Description des fonctions :
    * Fonctions pour les **statuts** des requêtes
    * Fonctions de **vérification** des entrées des requêtes
    * Fonctions de **traitement** des items
    * Fonctions de **recherche d'expression** (= pour rechercher des items par leur nom)
