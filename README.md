Evaluation Node.js
===

### Auteur 
Diane (MogwaiRGod)  

## Langage  
* JavaScript  


## Plateforme logicielle
* Node.js  
<br>
<hr>

# Installation
* Vérifier que node.js est installé
```
node -v
```
Lancer le programme
```
npm start
```
* CTRL + C pour sortir  
* rs pour redémarrer

<br>
<hr>
<br>

# Fonctionnement
API Node.js permettant de gérer des requêtes HTTP de base (Get, Post...) vers un menu de restaurant, afin d'effectuer une gestion de base des données (CRUD).

<br>
<hr>
<br>  

# Contenu
Résumé du contenu
---

<br>

| Dossier | Fichier(s) | Description |
|:-------:|:----------------|:--------|
|/        |- serveur.js <br> - app.js <br> - package.json|Points d'entrée de l'application|
|/node_modules| |Contient les **dépendances** nécessaires au fonctionnement de l'API <br> |
|/src||Contient l'organisation Model-Controller + Routes|
|/model|menu.json|Contient le **jeu de données** = menu du restaurant, sous forme d'un **objet json composé de 6 tableaux**, chacun contenant une **partie du menu** e.g un tableau "starters", "drinsk", "desserts"...|
|/controller|Code-source du CRUD <br> - controller_menus.js <br> - controller_starters.js <br> - controller_meals.js <br> - controller_drinks.js <br> - controller_desserts.js <br> - controller_breakfasts.js <br> |Les controllers spécifiques à chaque tableau|
|/routes|- Router.js <br> - routes_menus.js <br> - routes_starters.js <br> - routes_meals.js <br> - routes_drinks.js <br> - routes_desserts.js <br> - routes_breakfasts.js <br> |Les routes spécifiques à chaque tableau + le router qui contient tous les routers|
|/utils|manipulate_files.js|Contient toutes les **fonctions nécessaires** aux controllers. Contient également les messages d'erreur/de succès des requêtes.|

<br>

Détail du contenu
---

### Fichiers à la racine
* **Serveur** de l'application <=> **choix du port** où faire tourner l'application + **lancement** de l'application. <br> 
* * **app.js** : Point d'entrée de l'application = contient tout. <br> 
* * **Package.json** : Description technique des **composants** de l'API.

### Modules
* **express** : Module contenant des fonctionnalités pour les **applications web** = pour les **reqûetes HTTP** => contient des fonctions telles que get(), use()... <br>
* **fs** : Module qui permet de manipuler des **fichiers** <br>
* **bodyParser** : Middleware utile à **express** ; il lui permet de créer/lire/manipuler des données **HTTP POST** <br> 
* **nodemon** : Module **rechargeant** automatiquement l'application à chaque **changement (sauvegarde)** d'un des fichiers qui la composent

### Controllers
**6 controllers**, un par tableau du menu.<br>
Chaque fichier contient le **code-source du CRUD** (Create, Read, Update, Delete). =><br> 
    * **Create** : permet de demander à créer une donnée et à l'ajouter au tableau correspondant, en précisant son id ou non
    * **Read** : permet de demander à lire l'intégralité du tableau, une donnée spécifique du tableau via son ID on bien d'afficher toutes les données dont le nom contient une expression recherchée
    * **Update** : permet de sélectionner une donnée et de la modifer, entièrement ou partiellement, selon ce que l'on a entré dans le corps de la requête
    * **Delete** : permet de supprimer une donnée spécifique

### Routes
Chaque route (= requête HTTP pour une URL donnée <=> chemin vers une donnée spécifique) va **effectuer la requête** demandée par l'utilisateur =><br>
    * **Post** : pour Create
    * **Get** : pour Read
    * **Put** : pour Update
    * **Delete** : pour Delete  

### manipulate_files.js 
Fonctionne comme un module. Description des fonctions :
 * Fonctions pour les **statuts** des requêtes  
 * Fonctions de **vérification** des entrées des requêtes  
 * Fonctions de **traitement** des items  
 * Fonctions de **recherche d'expression** (= pour rechercher des items par leur nom)  
