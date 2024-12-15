DROP DATABASE IF EXISTS Gestion_Restaurant;

CREATE DATABASE IF NOT EXISTS Gestion_Restaurant;

USE Gestion_Restaurant;

    CREATE TABLE IF NOT EXISTS Compte_utilisateur
    (
        id_compte_utilisateur INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR (50),
        prenom VARCHAR (50),
        mot_de_passe VARCHAR (100),
        adresse VARCHAR (100),
        email VARCHAR (50),
        carte_bancaire VARCHAR (50)
    );

CREATE TABLE IF NOT EXISTS Restaurant
(
id_restaurant INT PRIMARY KEY AUTO_INCREMENT,
nom_restaurant VARCHAR (50),
adresse VARCHAR (100),
menu_restautant VARCHAR (50),
horaire VARCHAR (50),
nombres_tables INT
);

CREATE TABLE IF NOT EXISTS Reservation
(
    id_reservation INT PRIMARY KEY AUTO_INCREMENT,
    menu VARCHAR (50),
    heure_reservation TIME,
    table_reserver INT,
    id_restaurant INT,
    FOREIGN KEY (id_restaurant) REFERENCES Restaurant (id_restaurant)

);

CREATE TABLE IF NOT EXISTS compte_utilisateur_reservation
(
    id_compte_utilisateur INT, 
    id_reservation INT,
    FOREIGN KEY (id_compte_utilisateur) REFERENCES Compte_utilisateur(id_compte_utilisateur),
    FOREIGN KEY (id_reservation) REFERENCES Reservation(id_reservation)
);

CREATE TABLE IF NOT EXISTS Reservation_restaurant
(
    id_reservation INT,
    id_restaurant INT,
    FOREIGN KEY (id_reservation) REFERENCES Reservation (id_reservation),
    FOREIGN KEY (id_restaurant) REFERENCES Restaurant (id_restaurant)
);
CREATE TABLE IF NOT EXISTS Types_Restaurants
(
    id_type_restaurant INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_français VARCHAR (50),
    restaurant_italien VARCHAR (50),
    restaurant_indien VARCHAR (50),
    restaurant_japonais VARCHAR (50)
);

CREATE TABLE IF NOT EXISTS Types_restaurants_restaurant
(
    id_type_restaurant INT,
    id_restaurant INT,
    FOREIGN KEY (id_type_restaurant) REFERENCES Types_Restaurants (id_type_restaurant),
    FOREIGN KEY (id_restaurant) REFERENCES Restaurant (id_restaurant)
);

CREATE TABLE IF NOT EXISTS Restaurant_alentour(
    id_restaurant_alentour INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_ville VARCHAR (50),
    restaurant_region VARCHAR (50),
    restaurant_pays VARCHAR (50)
);

CREATE TABLE IF NOT EXISTS Compte_utilisateur_Restaurant_alentour
(
    id_compte_utilisateur INT,
    id_restaurant_alentour INT,
    FOREIGN KEY (id_compte_utilisateur) REFERENCES Compte_utilisateur (id_compte_utilisateur),
    FOREIGN KEY (id_restaurant_alentour) REFERENCES Restaurant_alentour (id_restaurant_alentour)
);



