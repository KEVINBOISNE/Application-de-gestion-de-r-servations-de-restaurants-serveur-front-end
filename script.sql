START TRANSACTION;
USE Gestion_Restaurant;

INSERT INTO Compte_utilisateur (nom, prenom, mot_de_passe, adresse, email, carte_bancaire) VALUES ('Dupont', 'Jean', MD5('1234'), '1 rue de la paix', 'Dupont.Jean@gmail.com', '123445566777774');
INSERT INTO Restaurant (nom_restaurant, adresse, menu_restautant, horaire, nombres_tables) VALUES ('NANI SUSHI ?!', '2 rue de la paix, 75001 PARIS', 'menu1', '12h-23h', 4);
INSERT INTO Reservation (menu, heure_reservation, table_reserver, id_restaurant) VALUES ('menu1','12:00:00', 5 , 1);
INSERT INTO compte_utilisateur_reservation (id_compte_utilisateur, id_reservation) VALUES (1, 1);

INSERT INTO Reservation_restaurant (id_reservation, id_restaurant) VALUES (1, 1);
INSERT INTO Types_Restaurants (restaurant_français, restaurant_italien, restaurant_indien, restaurant_japonais) VALUES ('Le petit resto', 'la pasta', 'ayam poulet', 'NANI SUSHI ?!');
INSERT INTO Types_restaurants_restaurant (id_type_restaurant, id_restaurant) VALUES (1, 1);
INSERT INTO Restaurant_alentour (restaurant_ville, restaurant_region, restaurant_pays) VALUES ('Paris','ile de france','France');
INSERT INTO Compte_utilisateur_Restaurant_alentour (id_compte_utilisateur, id_restaurant_alentour) VALUES (1, 1);

-- SELECT Compte_utilisateur.nom, Compte_utilisateur.prenom, 
--        Reservation.menu, Reservation.heure_reservation, Reservation.table_reserver, 
--        Types_Restaurants.restaurant_japonais, 
--        Restaurant_alentour.restaurant_ville, Restaurant_alentour.restaurant_region, Restaurant_alentour.restaurant_pays, 
--        Restaurant.nom_restaurant, Restaurant.adresse
-- FROM Compte_utilisateur 
-- INNER JOIN compte_utilisateur_reservation 
-- ON Compte_utilisateur.id_compte_utilisateur = compte_utilisateur_reservation.id_compte_utilisateur 
-- INNER JOIN Reservation 
-- ON compte_utilisateur_reservation.id_reservation = Reservation.id_reservation
-- INNER JOIN Restaurant
-- ON Reservation.id_restaurant = Restaurant.id_restaurant
-- INNER JOIN Types_restaurants_restaurant
-- ON Restaurant.id_restaurant = Types_restaurants_restaurant.id_restaurant
-- INNER JOIN Types_Restaurants
-- ON Types_restaurants_restaurant.id_type_restaurant = Types_Restaurants.id_type_restaurant
-- INNER JOIN Compte_utilisateur_Restaurant_alentour
-- ON Compte_utilisateur.id_compte_utilisateur = Compte_utilisateur_Restaurant_alentour.id_compte_utilisateur
-- INNER JOIN Restaurant_alentour
-- ON Compte_utilisateur_Restaurant_alentour.id_restaurant_alentour = Restaurant_alentour.id_restaurant_alentour
-- GROUP BY Compte_utilisateur.nom, Compte_utilisateur.prenom, 
--          Reservation.menu, Reservation.heure_reservation, Reservation.table_reserver, 
--          Types_Restaurants.restaurant_japonais, 
--          Restaurant_alentour.restaurant_ville, Restaurant_alentour.restaurant_region, Restaurant_alentour.restaurant_pays, 
--          Restaurant.nom_restaurant, Restaurant.adresse;
         
COMMIT;
