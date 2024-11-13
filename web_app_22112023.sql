-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: web_app
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categ`
--

DROP TABLE IF EXISTS `categ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categ` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categ`
--

LOCK TABLES `categ` WRITE;
/*!40000 ALTER TABLE `categ` DISABLE KEYS */;
INSERT INTO `categ` VALUES (5,'Запчасти'),(3,'Инструментарий'),(1,'Книги'),(6,'Программное обеспечение'),(2,'Расходные материалы'),(4,'Устройства');
/*!40000 ALTER TABLE `categ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `predpr_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `predpr_idx` (`predpr_id`),
  CONSTRAINT `predpr` FOREIGN KEY (`predpr_id`) REFERENCES `predpr` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'Счет № 1 от 25.10.2023',1),(2,'Счет № 2 от 26.10.2023',3);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predpr`
--

DROP TABLE IF EXISTS `predpr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predpr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predpr`
--

LOCK TABLES `predpr` WRITE;
/*!40000 ALTER TABLE `predpr` DISABLE KEYS */;
INSERT INTO `predpr` VALUES (1,'ГБПОУ ТК№21','г.Москва ул.Вербная 4'),(3,'Мегадизайн','г.Москва Сиреневый бульвар, 4Г');
/*!40000 ALTER TABLE `predpr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod`
--

DROP TABLE IF EXISTS `prod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prod` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `categ_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `categ_idx` (`categ_id`),
  CONSTRAINT `categ` FOREIGN KEY (`categ_id`) REFERENCES `categ` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod`
--

LOCK TABLES `prod` WRITE;
/*!40000 ALTER TABLE `prod` DISABLE KEYS */;
INSERT INTO `prod` VALUES (1,'Карандаши',10.00,3),(2,'Тетрадь в клеточку',12.00,2),(3,'Тетрадь в полоску',12.00,2),(4,'Учебник по физике 6 кл',500.00,1),(5,'Учебник по физике 7 кл',450.00,1),(6,'Учебник по физике 8 кл',550.00,1),(7,'Учебник по физике 9 кл',560.00,1),(8,'Учебник по физике 10 кл',600.00,1),(9,'Учебник по физике 11 кл',700.00,1),(10,'Учебник по химии 6 кл',400.00,1),(11,'Учебник по химии 7 кл',500.00,1),(12,'Учебник по химии 8 кл',600.00,1),(13,'Учебник по химии 9 кл',650.00,1),(14,'Учебник по химии 10 кл',700.00,1),(15,'Учебник по химии 11 кл',900.00,1),(16,'Чернила черные',200.00,2),(17,'Чернила синие',200.00,2),(18,'Ручка шариковая черная',50.00,3),(19,'Ручка шариковая синяя',45.00,3),(20,'Лазерный принтер HP LaserJet Pro M15w W2G51A',10450.00,4),(21,'Лазерный принтер HP LaserJet M211dw',12445.00,4),(22,'Картридж для HP LaserJet Pro M15w',2400.00,5),(23,'картридж для HP LaserJet M211dw',2500.00,5),(24,'Microsoft Windows 11 Home Box Edition',14050.00,6),(25,'Cloudera Data Platform (CDP)',550000.00,6);
/*!40000 ALTER TABLE `prod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sklad`
--

DROP TABLE IF EXISTS `sklad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sklad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prod_id` int DEFAULT NULL,
  `kol` int DEFAULT NULL,
  `date_in` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prod_idx` (`prod_id`),
  CONSTRAINT `prod` FOREIGN KEY (`prod_id`) REFERENCES `prod` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sklad`
--

LOCK TABLES `sklad` WRITE;
/*!40000 ALTER TABLE `sklad` DISABLE KEYS */;
INSERT INTO `sklad` VALUES (1,1,10,'2023-10-25'),(2,2,2,'2023-10-25'),(3,3,3,'2023-10-25'),(4,4,5,'2023-10-25'),(5,5,3,'2023-10-25'),(6,6,30,'2023-10-25'),(7,7,20,'2023-10-25'),(8,10,1,'2023-10-25'),(9,12,2,'2023-10-25'),(10,13,4,'2023-10-25'),(11,15,2,'2023-10-25'),(12,16,23,'2023-10-25'),(13,17,7,'2023-10-25'),(14,18,2,'2023-10-25'),(15,19,2,'2023-10-25'),(16,20,1,'2023-10-25'),(17,21,1,'2023-10-25'),(18,22,11,'2023-10-25'),(19,23,1,'2023-10-25'),(20,24,1,'2023-10-25'),(21,25,1,'2023-10-25');
/*!40000 ALTER TABLE `sklad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spec`
--

DROP TABLE IF EXISTS `spec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `prod_id` int DEFAULT NULL,
  `kol` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_idx` (`order_id`),
  KEY `prod_idx` (`prod_id`),
  CONSTRAINT `order` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `prod1` FOREIGN KEY (`prod_id`) REFERENCES `prod` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spec`
--

LOCK TABLES `spec` WRITE;
/*!40000 ALTER TABLE `spec` DISABLE KEYS */;
INSERT INTO `spec` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,1,10,1),(5,1,13,1),(6,1,23,1),(7,1,24,1),(8,2,6,1),(9,2,7,1),(10,2,8,1),(11,2,9,1),(12,2,10,1),(13,2,11,1);
/*!40000 ALTER TABLE `spec` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `spec_BEFORE_INSERT` BEFORE INSERT ON `spec` FOR EACH ROW BEGIN
declare count int;
set count = (select kol from sklad where prod_id = NEW.prod_id);
if count - NEW.kol > 0
then
	update sklad
	set kol = count - NEW.kol
    where prod_id = NEW.prod_id;
else SIGNAL sqlstate '45001' 
	 set message_text = "Недостаточно товара на складе!";
end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `spec_BEFORE_UPDATE` BEFORE UPDATE ON `spec` FOR EACH ROW BEGIN
declare count int;

if old.prod_id != new.prod_id
then SIGNAL sqlstate '45001' 
	 set message_text = "Невозможно изменить наименовние товара в спецификации!";
end if;

set count = (select kol from sklad where prod_id = OLD.prod_id);
if count - (NEW.kol - OLD.kol) > 0
then
	update sklad
	set kol = count - (NEW.kol - OLD.kol)
    where prod_id = NEW.prod_id;
else SIGNAL sqlstate '45001' 
	 set message_text = "Невозможно изменить количество товара в спецификации!";
end if;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `spec_AFTER_DELETE` AFTER DELETE ON `spec` FOR EACH ROW BEGIN
declare count int;
set count = (select kol from sklad where prod_id = old.prod_id);
update sklad
set kol = count + old.kol
where prod_id = old.prod_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping events for database 'web_app'
--

--
-- Dumping routines for database 'web_app'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-02 11:44:35
