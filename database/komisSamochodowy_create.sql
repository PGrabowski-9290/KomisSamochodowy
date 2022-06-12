-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-06-03 20:24:25.495

-- Craete database
CREATE DATABASE komis_samochodowy;

use komis_samochodowy;

-- Create user for database
CREATE USER 'sakomis'@'%' IDENTIFIED BY 'simokas';
-- Grant privilages for user
GRANT ALL PRIVILEGES ON komis_samochodowy.* to 'sakomis'@'%';

-- tables
-- Table: Brands
CREATE TABLE Brands (
    brandId int NOT NULL AUTO_INCREMENT COMMENT 'unikalne id marki',
    name varchar(100) NOT NULL COMMENT 'nazwa marki',
    CONSTRAINT Brands_pk PRIMARY KEY (brandId)
) COMMENT 'Słownik Marek samochodów';

-- Table: Offers
CREATE TABLE Offers (
    offerId int NOT NULL AUTO_INCREMENT COMMENT 'unikalny identyfikator oferty',
    prize decimal(10,2) NOT NULL COMMENT 'Cena oferty',
    title varchar(250) NOT NULL COMMENT 'Tytuł oferty',
    description text NOT NULL COMMENT 'Opis oferty',
    model varchar(50) NOT NULL COMMENT 'Model samochodu przedstawiony w ofercie',
    prodYear varchar(4) NOT NULL COMMENT 'rok produkcji pojazdu przedstawionego w ofercie',
    firstRegistrationYear varchar(4) NOT NULL COMMENT 'pierwsza rejestracja pojazdu',
    vin char(17) NOT NULL COMMENT 'numer VIN pojazdu',
    engineType varchar(100) NOT NULL COMMENT 'typ silnika pojazdu ',
    cylinders int NOT NULL COMMENT 'ilość cylindrów w silniku',
    power int NOT NULL COMMENT 'moc samochodu przedstawiona w koniach mechanicznych (HP)',
    transmision varchar(20) NOT NULL COMMENT 'typ skrzyni biegów',
    drive varchar(50) NOT NULL COMMENT 'rodzaj napędu samochodu',
    color varchar(30) NOT NULL COMMENT 'kolor pojazdu',
    isReserved bool NULL COMMENT 'informacja czy jest zarezerwowany',
    isActive bool NOT NULL COMMENT 'Czy oferta jest aktywna',
    isArchive bool NOT NULL COMMENT 'Czy oferta jest w ofertą archiwalną',
    Brands_brandId int NOT NULL COMMENT 'klucz obcy wskazujący markę samochodu',
    fuelTypes_fuelTypeId int NOT NULL COMMENT 'klucz obcy wskazujący typ paliwa',
    odometer int NOT NULL COMMENT 'przebieg pojazdu',
    CONSTRAINT Offers_pk PRIMARY KEY (offerId)
) COMMENT 'Tabela zawierająca informacje o ofertach';

-- Table: OffersImages
CREATE TABLE OffersImages (
    imageId bigint NOT NULL AUTO_INCREMENT COMMENT 'unikalny identyfikator zdjęcia',
    path text NOT NULL COMMENT 'ścieżka na serwerze lokalizująca obrazek',
    Offers_offerId int NOT NULL COMMENT 'klucz obcy wskazujący oferte z którą jest powiązany obrazek',
    CONSTRAINT OffersImages_pk PRIMARY KEY (imageId)
) COMMENT 'Tabela przechowująca ścieżkę do zdjęć oferty';

-- Table: Reservation
CREATE TABLE Reservation (
    reservationId int NOT NULL AUTO_INCREMENT,
    reservationStart timestamp NOT NULL COMMENT 'Czas od kiedy rezerwacja jest aktywna',
    reservationEnd timestamp NOT NULL COMMENT 'czas do kiedy trwa rezerwacja',
    Users_userId int NOT NULL COMMENT 'klucz obcy wskazujący użytkownika',
    Offers_offerId int NOT NULL COMMENT 'klucz obcy wskazujący ofertę',
    CONSTRAINT Reservation_pk PRIMARY KEY (reservationId)
) COMMENT 'Tabela z rezerwacjami';

-- Table: Roles
CREATE TABLE Roles (
    roleId int NOT NULL AUTO_INCREMENT COMMENT 'unikalny identyfikator roli',
    name varchar(10) NOT NULL COMMENT 'nazwa roli',
    CONSTRAINT Roles_pk PRIMARY KEY (roleId)
) COMMENT 'Tabela słownikowa ról użytkowników';

-- Table: Users
CREATE TABLE Users (
    userId int NOT NULL AUTO_INCREMENT COMMENT 'unikalny identyfikator użytkownika',
    mail varchar(150) NOT NULL COMMENT 'email użytkownika',
    hashedPassword varchar(300) NOT NULL COMMENT 'zahashowane hasło użytkowniaka',
    firstName varchar(50) NOT NULL COMMENT 'Imię użytkownika serwisu',
    Roles_roleId int NOT NULL COMMENT 'klucz obcy wskazujący rolę użytkownika',
    refreshToken varchar(255) null COMMENT 'Token sesji użytkownika',
    UNIQUE INDEX Users_mail_u (mail),
    CONSTRAINT Users_pk PRIMARY KEY (userId)
);

-- Table: fuelTypes
CREATE TABLE fuelTypes (
    fuelTypeId int NOT NULL AUTO_INCREMENT COMMENT 'unikalne id typu paliwa',
    name varchar(50) NOT NULL COMMENT 'nazwa wyświetlana typu paliwa',
    CONSTRAINT fuelTypes_pk PRIMARY KEY (fuelTypeId)
) COMMENT 'Słownik typów paliwa';

-- foreign keys
-- Reference: OffersImages_Offers (table: OffersImages)
ALTER TABLE OffersImages ADD CONSTRAINT OffersImages_Offers FOREIGN KEY OffersImages_Offers (Offers_offerId)
    REFERENCES Offers (offerId);

-- Reference: Offers_Brands (table: Offers)
ALTER TABLE Offers ADD CONSTRAINT Offers_Brands FOREIGN KEY Offers_Brands (Brands_brandId)
    REFERENCES Brands (brandId);

-- Reference: Offers_fuelTypes (table: Offers)
ALTER TABLE Offers ADD CONSTRAINT Offers_fuelTypes FOREIGN KEY Offers_fuelTypes (fuelTypes_fuelTypeId)
    REFERENCES fuelTypes (fuelTypeId);

-- Reference: Reservation_Offers (table: Reservation)
ALTER TABLE Reservation ADD CONSTRAINT Reservation_Offers FOREIGN KEY Reservation_Offers (Offers_offerId)
    REFERENCES Offers (offerId);

-- Reference: Reservation_Users (table: Reservation)
ALTER TABLE Reservation ADD CONSTRAINT Reservation_Users FOREIGN KEY Reservation_Users (Users_userId)
    REFERENCES Users (userId);

-- Reference: Users_Roles (table: Users)
ALTER TABLE Users ADD CONSTRAINT Users_Roles FOREIGN KEY Users_Roles (Roles_roleId)
    REFERENCES Roles (roleId);


-- Add default data to database tables

INSERT INTO `roles` VALUES (1,'ADMIN'),(2,'EDITOR'),(3,'USER');

INSERT INTO `fueltypes`(`fuelTypeId`, `name`) VALUES (1,'Benzyna'),(2,'LPG'),(3,'OlejNapędowy'),(4,'Elektryczny');

INSERT INTO `brands`(`brandId`, `name`) VALUES (1,'Acura'),(2,'Alfa-Romeo'),(3,'Aston Martin'),(4,'Audi'),(5,'BMW'),(6,'Bentley'),(7,'Buick'),(8,'Cadilac'),(9,'Chevrolet'),(10,'Chrysler'),(11,'Daewoo'),(12,'Daihatsu'),(13,'Dodge'),(14,'Eagle'),(15,'Ferrari'),(16,'Fiat'),(17,'Fisker'),(18,'Ford'),(19,'Freighliner'),(20,'GMC - General Motors Company'),(21,'Genesis'),(22,'Geo'),(23,'Honda'),(24,'Hummer'),(25,'Hyundai'),(26,'Infinity'),(27,'Isuzu'),(28,'Jaguar'),(29,'Jeep'),(30,'Kla'),(31,'Lamborghini'),(32,'Land Rover'),(33,'Lexus'),(34,'Lincoln'),(35,'Lotus'),(36,'Mazda'),(37,'Maserati'),(38,'Maybach'),(39,'McLaren'),(40,'Mercedez-Benz'),(41,'Mercury'),(42,'Mini'),(43,'Mitsubishi'),(44,'Nissan'),(45,'Oldsmobile'),(46,'Panoz'),(47,'Plymouth'),(48,'Polestar'),(49,'Pontiac'),(50,'Porsche'),(51,'Ram'),(52,'Rivian'),(53,'Rolls_Royce'),(54,'Saab'),(55,'Saturn'),(56,'Smart'),(57,'Subaru'),(58,'Susuki'),(59,'Tesla'),(60,'Toyota'),(61,'Volkswagen'),(62,'Volvo')
-- End of file.

