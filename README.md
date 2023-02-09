# Evaluation Node.js

## Auteur 
Diane (MogwaiRGod)

## Langage
* JavaScript

<br>

# Fonctionnement
    API Node.js permettant de gérer des requêtes HTTP de base (Get, Post...) vers un menu de restaurant, afin d'effectuer une gestion de base des données (CRUD).

<br>

# Contenu
**-- /**
--
## ---- serveur.js
Serveur de l'application <=> **choix du port** où faire tourner l'application + **lancement** de l'application.
## ---- app.js
Contient **l'import des méthodes** nécessaires.<br>
Contient **l'import des routes** et les rend **utilisables**.
## ---- package.json
Description technique des **composants** de l'API.

---
**-- /node_modules**
--
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
--
---- /model
--

* **menu.json** <br>
Contient le **jeu de données** = menu du restaurant, sous forme d'un **objet json composé de 6 tableaux**, chacun contenant une **partie du menu** e.g un tableau "entrées", "boisssons", "desserts"...

---- /controller
--

* **6 controllers**, un par tableau du menu.<br>
Chaque fichier contient le **code-source du CRUD** (Create, Read, Update, Delete).

---- /routes
--

* **6 routes**, une par tableau du menu.<br>
Chaque fichier contient **l'export du controller** correspondant.
Chaque route

<br>

---