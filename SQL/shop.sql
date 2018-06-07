DROP DATABASE IF EXISTS `shop`;
CREATE DATABASE IF NOT EXISTS `shop`;

USE `shop`;

DROP TABLE IF EXISTS `products`;

CREATE TABLE IF NOT EXISTS `products`(

	id 		TINYINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	title 	VARCHAR(50) NOT NULL DEFAULT "no_title",
	url 	TEXT NOT NULL,
	price FLOAT(10,2) NOT NULL DEFAULT 0.0,
	tva FLOAT(3,2) NOT NULL DEFAULT 0.20

)ENGINE=InnoDB DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO `products` (
	title,
	url,
	price,
	tva
) VALUES	("Pyjama", "http://pyjama.jpg", 9.99, 0.2),
			("Calecon", "http://marcel.jpg", 12.99, 0.2),
			("chausette", "http://chaussette.jpg", 1.99, 0.2),
			("chapeau", "http://chapeau.jpg", 15.99, 0.2);
			





