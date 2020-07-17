CREATE DATABASE IF NOT EXISTS TCZtest;
USE TCZtest;

CREATE TABLE product ( 
	id int AUTO_INCREMENT,
	name varchar(20),
	email varchar(80),
	message varchar(100),
	PRIMARY KEY (id)
);
CREATE TABLE mobile ( 
	id int AUTO_INCREMENT,
	mobileNo varchar(20),
	PRIMARY KEY (id)
);

