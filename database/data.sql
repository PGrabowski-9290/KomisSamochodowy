-- zestaw przykładowych danych w celach testowych aplikacji,

INSERT INTO `offers` (`prize`, `title`, `description`, `model`, `prodYear`, `firstRegistrationYear`, `vin`, `engineType`, `cylinders`, `power`, `transmision`, `drive`, `color`, `isReserved`, `isActive`, `isArchive`, `Brands_brandId`, `fuelTypes_fuelTypeId`, `odometer`) VALUES
	(12000.00, 'Toyota', 'Opis sprzedazy samochodu marki skoda', 'Avensis', '2010', '2011', '123123132', '2.0 R4 ', 4, 155, 'Manual', 'AWD', 'BlueFire', 0, 1, 0, 60, 3, 200400),
	(30000.00, 'BMW m3', 'BMW dobre auto niemiec płakał jak sprzedawał', 'M3', '2015', '2015', '321321321', '3.5 V6', 6, 273, 'Manual', 'RWD', 'GrayCloud', 0, 1, 0, 5, 1, 65000);

INSERT INTO `offersimages` (`path`, `Offers_offerId`) VALUES
	('https://changinglanes.ie/wp-content/uploads/2021/12/IMG_0477-1024x768.jpg', 1),
	('https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1062x597/format/jpg/quality/100/https://s.aolcdn.com/os/ab/_cms/2021/12/09141307/Ford-Mustang-Mach-E-2111.jpg', 1),
	('https://cdn.topcarnews.net/media/wp-content/uploads/2022/02/17033038/image-geely-debuts-the-preface-are-people-still-interested-in-d-segment-cars-164501823884556.jpg', 2);