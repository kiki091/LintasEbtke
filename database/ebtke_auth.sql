-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.1.16-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5143
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for ebtke_auth
CREATE DATABASE IF NOT EXISTS `ebtke_auth` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ebtke_auth`;

-- Dumping structure for table ebtke_auth.location
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `slug` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.location: ~2 rows (approximately)
DELETE FROM `location`;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
	(1, 'user', 'user', NULL, NULL),
	(2, 'admin', 'admin', NULL, NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `slug` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `menu_group_id` int(5) DEFAULT NULL,
  `have_sub_menu` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  UNIQUE KEY `url_UNIQUE` (`url`),
  KEY `fk_menu_1_idx` (`menu_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.menu: ~30 rows (approximately)
DELETE FROM `menu`;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` (`id`, `title`, `display_name`, `slug`, `url`, `menu_group_id`, `have_sub_menu`, `is_active`, `order`, `created_at`, `updated_at`) VALUES
	(1, 'News', 'News', 'news', 'menuNews()', 1, 0, 1, 1, NULL, NULL),
	(2, 'Event', 'Event', 'event', 'menuEvent()', 1, 0, 1, 2, NULL, NULL),
	(3, 'Lintas History', 'Lintas History', 'lintas-history', 'menuLintasHistory()', 2, 0, 1, 1, NULL, NULL),
	(4, 'Vision and Mission', 'Vision and Mission', 'vision-and-mission', 'menuVisionMission()', 2, 0, 1, 2, NULL, NULL),
	(5, 'Organization Structure', 'Organization Structure', 'organization-structure', 'menuOrganizationStructure()', 2, 0, 1, 3, NULL, NULL),
	(6, 'Lintas Of Scope', 'Lintas Of Scope', 'lintas-of-scope', 'menuLintasScope()', 2, 0, 1, 4, NULL, NULL),
	(7, 'Procedure', 'Procedure', 'procedure', 'menuProcedure()', 3, 0, 1, 1, NULL, NULL),
	(8, 'Potentials', 'Potentials', 'potentials', 'menuPotentials()', 3, 1, 1, 2, NULL, NULL),
	(9, 'Green Pages', 'Green Pages', 'green-pages-category', 'menuGreenPagesCategory()', 3, 0, 1, 3, NULL, NULL),
	(10, 'Renewable Energy', 'Renewable Energy', 'renewable-energi', 'menuRenewableEnergi()', 4, 1, 1, 1, NULL, NULL),
	(11, 'Geothermal', 'Geothermal', 'geothermal', 'menuGeothermal()', 4, 0, 1, 2, NULL, NULL),
	(12, 'Bio Energy', 'Bio Energy', 'bio-energi', 'menuBioEnergi()', 4, 0, 1, 3, NULL, '2017-06-29 02:08:01'),
	(13, 'Others', 'Others', 'others', 'menuOthers()', 4, 0, 1, 4, NULL, NULL),
	(14, 'Tools', 'Tools', 'tools', 'menuTools()', 5, 0, 1, 1, NULL, NULL),
	(15, 'White Papers', 'White Papers', 'white-papers', 'menuWhitePapers()', 5, 0, 1, 2, NULL, NULL),
	(16, 'Publications', 'Publications', 'publications', 'menuPublications()', 5, 0, 1, 3, NULL, NULL),
	(17, 'Feasibility Studies', 'Feasibility Studies', 'feasibility-studies', 'menuFeasibilityStudies()', 5, 0, 1, 4, NULL, NULL),
	(18, 'NREEC Institution', 'NREEC Institution', 'nreec-institution', 'menuNreecInstitution()', 6, 0, 1, 1, NULL, NULL),
	(19, 'NREEC Resources', 'NREEC Resources', 'nreec-resources', 'menuNreecResources()', 6, 0, 1, 2, NULL, NULL),
	(20, 'NREEC Events', 'NREEC Events', 'nreec-events', 'menuNreecEvents()', 6, 0, 1, 3, NULL, NULL),
	(21, 'Services', 'Services', 'investment-services', 'menuInvestmentServices()', 3, 0, 1, 4, NULL, NULL),
	(22, 'Home Pages', 'Seo Home Pages', 'seo-home-pages', 'seoHomePages()', 7, 0, 1, 1, NULL, NULL),
	(29, 'About Us', 'Seo About Us', 'seo-about-us', 'seoAboutUs()', 7, 1, 1, 2, NULL, NULL),
	(30, 'Pages', 'Main Banner', 'main-banner-pages', 'menuMainBanner()', 8, 0, 1, 1, NULL, NULL),
	(31, 'Investment Services', 'Seo Investment Services', 'seo-investment-services', 'seoInvestmentServices()', 7, 1, 1, 1, NULL, NULL),
	(32, 'Renewable Energy', 'Seo Renewable Energy', 'seo-renewable-energy', 'seoRenewableEnergi()', 7, 1, 1, 1, NULL, NULL),
	(33, 'Resource', 'Seo Resource', 'seo-resource', 'seoResource()', 7, 1, 1, 1, NULL, NULL),
	(34, 'News & Events', 'Seo News & Events', 'seo-news-and-events', 'seoNewsAndEvents()', 7, 1, 1, 1, NULL, NULL),
	(35, 'Contact Us', 'Contact Us', 'contact-us', 'menuContactUs()', 9, 0, 1, 1, NULL, NULL),
	(36, 'Account', 'Account Sipedia', 'account-sipedia', 'menuAccountSipedia()', 11, 0, 1, 1, NULL, NULL),
	(37, 'Account', 'User Account', 'user-account', 'menuUserAccount()', 12, 0, 1, 1, '2017-08-26 01:18:05', NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.menu_group
CREATE TABLE IF NOT EXISTS `menu_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `icon` varchar(45) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `system_id` int(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `fk_menu_group_1_idx` (`system_id`),
  CONSTRAINT `fk_menu_group_1` FOREIGN KEY (`system_id`) REFERENCES `system` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.menu_group: ~11 rows (approximately)
DELETE FROM `menu_group`;
/*!40000 ALTER TABLE `menu_group` DISABLE KEYS */;
INSERT INTO `menu_group` (`id`, `title`, `icon`, `order`, `is_active`, `system_id`, `created_at`, `updated_at`) VALUES
	(1, 'News & Event', 'fa-newspaper-o', 5, 1, 1, '2017-08-26 01:14:45', '2017-08-26 01:15:04'),
	(2, 'Company', 'fa-building-o', 1, 1, 1, '2017-08-26 01:14:46', '2017-06-28 23:18:49'),
	(3, 'Investment Services', 'fa-bar-chart', 3, 1, 1, '2017-08-26 01:14:47', '2017-08-26 01:15:03'),
	(4, 'Information Services', 'fa-bullhorn', 2, 1, 1, '2017-08-26 01:14:48', '2017-06-28 23:18:59'),
	(5, 'Resource', 'fa-folder-o', 6, 1, 1, '2017-08-26 01:14:49', '2017-08-26 01:15:02'),
	(6, 'Link', 'fa-external-link', 4, 1, 1, '2017-08-26 01:14:52', '2017-08-26 01:15:02'),
	(7, 'Seo', 'fa-globe', 7, 1, 1, '2017-08-26 01:14:51', '2017-08-26 01:15:01'),
	(8, 'Main Banner', 'fa-image', 8, 1, 1, '2017-08-26 01:14:53', '2017-08-26 01:15:00'),
	(9, 'Message', 'fa-envelope', 9, 1, 1, '2017-08-26 01:14:54', '2017-08-26 01:14:58'),
	(11, 'Sipedia', 'fa-bar-chart-o', 10, 1, 3, '2017-08-26 01:14:56', '2017-08-26 01:14:57'),
	(12, 'User Management', 'fa fa-shield', 11, 1, 2, '2017-08-26 01:14:38', '2017-08-26 01:14:39');
/*!40000 ALTER TABLE `menu_group` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.privilage
CREATE TABLE IF NOT EXISTS `privilage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.privilage: ~3 rows (approximately)
DELETE FROM `privilage`;
/*!40000 ALTER TABLE `privilage` DISABLE KEYS */;
INSERT INTO `privilage` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'User Privilage', 'User Privilage', 'User Privilage', NULL, NULL),
	(2, 'Admin Privilage', 'Admin Privilage', 'Admin Privilage', NULL, NULL),
	(3, 'Sipedia Privilage', 'Sipedia Privilage', 'Sipedia Privilage', NULL, NULL);
/*!40000 ALTER TABLE `privilage` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.role
CREATE TABLE IF NOT EXISTS `role` (
  `user_id` int(10) NOT NULL,
  `privilage_id` int(10) NOT NULL,
  PRIMARY KEY (`user_id`,`privilage_id`),
  KEY `fk_role_2_idx` (`privilage_id`),
  CONSTRAINT `fk_role_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role_2` FOREIGN KEY (`privilage_id`) REFERENCES `privilage` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.role: ~5 rows (approximately)
DELETE FROM `role`;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` (`user_id`, `privilage_id`) VALUES
	(1, 2),
	(1, 3),
	(2, 1),
	(2, 3),
	(16, 1);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.sub_menu
CREATE TABLE IF NOT EXISTS `sub_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `url` varchar(100) NOT NULL,
  `menu_id` int(3) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  UNIQUE KEY `url_UNIQUE` (`url`),
  KEY `fk_sub_menu_1_idx` (`menu_id`),
  CONSTRAINT `fk_sub_menu_1` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.sub_menu: ~17 rows (approximately)
DELETE FROM `sub_menu`;
/*!40000 ALTER TABLE `sub_menu` DISABLE KEYS */;
INSERT INTO `sub_menu` (`id`, `title`, `slug`, `url`, `menu_id`, `is_active`, `created_at`, `updated_at`) VALUES
	(1, 'Geothermal', 'sub-geothermal', 'subMenuGeothermal()', 8, 1, NULL, NULL),
	(2, 'Bio Energy', 'sub-bio-energy', 'subMenuBioEnergy()', 8, 1, NULL, '2017-06-29 02:44:34'),
	(3, 'Others', 'sub-others', 'subMenuOthers()', 8, 1, NULL, NULL),
	(4, 'Energy Conservation', 'sub-energi-conservation', 'subMenuEnergiConservation()', 8, 1, NULL, NULL),
	(5, 'Industry', 'sub-industry', 'subMenuIndustry()', 10, 1, NULL, NULL),
	(6, 'Comercial Building', 'sub-comercial-building', 'subMenuComercialBuilding()', 10, 1, NULL, NULL),
	(7, 'Transportation', 'sub-transportation', 'subMenuTransportation()', 10, 1, NULL, NULL),
	(8, 'Residentials', 'sub-residentials', 'subMenuResidentials()', 10, 1, NULL, NULL),
	(10, 'Seo Vision & Mission', 'seo-vision-mission', 'seoVisionMission()', 29, 1, NULL, NULL),
	(12, 'Seo Lintas Of Scope', 'seo-lintas-of-scope', 'seoLintasOfScope()', 29, 1, NULL, NULL),
	(13, 'Seo Procedure', 'seo-procedure', 'seoInvestmentProcedure()', 31, 1, NULL, NULL),
	(14, 'Seo Green Pages', 'seo-green-pages', 'seoGreenPages()', 31, 1, NULL, NULL),
	(15, 'Seo Industry', 'seo-industry', 'seoIndustry()', 32, 1, NULL, NULL),
	(16, 'Seo Tools', 'seo-tools', 'seoTools()', 33, 1, NULL, NULL),
	(17, 'Seo White Papers', 'seo-white-papers', 'seoWhitePapers()', 33, 1, NULL, NULL),
	(18, 'Seo News', 'seo-news', 'seoNews()', 34, 1, NULL, NULL),
	(19, 'Seo Events', 'seo-events', 'seoEvents()', 34, 1, NULL, NULL);
/*!40000 ALTER TABLE `sub_menu` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.system
CREATE TABLE IF NOT EXISTS `system` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `slug` varchar(90) NOT NULL,
  `order` tinyint(2) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.system: ~3 rows (approximately)
DELETE FROM `system`;
/*!40000 ALTER TABLE `system` DISABLE KEYS */;
INSERT INTO `system` (`id`, `name`, `slug`, `order`, `created_at`, `updated_at`) VALUES
	(1, 'CONTENT MANAGEMENT SYSTEM', 'cms', 1, NULL, NULL),
	(2, 'ACCOUNT MANAGEMENT SYSTEM', 'ams', 2, NULL, NULL),
	(3, 'SIPEDIA', 'sipedia', 3, NULL, NULL);
/*!40000 ALTER TABLE `system` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.system_location
CREATE TABLE IF NOT EXISTS `system_location` (
  `user_id` int(3) unsigned NOT NULL,
  `system_id` int(3) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`system_id`),
  KEY `fk_system_location_1_idx` (`user_id`),
  KEY `fk_system_location_2_idx` (`system_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.system_location: ~13 rows (approximately)
DELETE FROM `system_location`;
/*!40000 ALTER TABLE `system_location` DISABLE KEYS */;
INSERT INTO `system_location` (`user_id`, `system_id`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 1),
	(2, 3),
	(10, 1),
	(10, 2),
	(13, 1),
	(13, 2),
	(14, 1),
	(14, 2),
	(15, 2),
	(16, 1);
/*!40000 ALTER TABLE `system_location` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `location_id` int(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_1_idx` (`location_id`),
  CONSTRAINT `fk_users_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.users: ~3 rows (approximately)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `is_active`, `location_id`, `created_at`, `updated_at`) VALUES
	(1, 'admin', 'admin@lintas.go.id', '$2y$10$jWqW0ETc23XTaaDtjktAw.XRvdet5BnBHauvmJLPBCWNfbyvI3YNy', '91vB9z9oHItsSzeM2bVtUDeKEzFaQTIxkHtJv0bqz95Yx1ar4JCcdSoMS7Cl', 1, 2, '2017-05-04 16:58:53', '2017-07-11 14:38:04'),
	(2, 'user', 'user@gmail.com', '$2y$10$jWqW0ETc23XTaaDtjktAw.XRvdet5BnBHauvmJLPBCWNfbyvI3YNy', 'ITit4HVi7LIAocsgtv6vQNnsSGgpzKgrGcXnijLdcTjX5CjBE7ZgdrtRAXXo', 1, 1, '2017-05-04 16:58:53', '2017-05-04 16:58:53'),
	(16, 'kiki', 'kiki@gmail.com', '$2y$10$DrIa21Ru0w4QrD05nV6b4O0G8PQoJVC5gq1kazqoOWyF0Ea15jTma', 'jckWXnh6SDSa3oBMWcdODN9G2j60S1igfbP3tJDwZ9VfTcsWao0qRS5ScyQV', 1, 1, '2017-07-02 03:17:35', '2017-07-02 03:39:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table ebtke_auth.user_menu
CREATE TABLE IF NOT EXISTS `user_menu` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `menu_id` int(10) NOT NULL,
  PRIMARY KEY (`id`,`user_id`,`menu_id`),
  KEY `fk_user_menu_1_idx` (`user_id`),
  KEY `fk_user_menu_2_idx` (`menu_id`),
  CONSTRAINT `fk_user_menu_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_menu_2` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=213 DEFAULT CHARSET=utf8;

-- Dumping data for table ebtke_auth.user_menu: ~33 rows (approximately)
DELETE FROM `user_menu`;
/*!40000 ALTER TABLE `user_menu` DISABLE KEYS */;
INSERT INTO `user_menu` (`id`, `user_id`, `menu_id`) VALUES
	(55, 16, 2),
	(56, 16, 1),
	(180, 1, 29),
	(181, 1, 22),
	(182, 1, 31),
	(183, 1, 34),
	(184, 1, 32),
	(185, 1, 33),
	(186, 1, 12),
	(187, 1, 11),
	(188, 1, 13),
	(189, 1, 10),
	(190, 1, 35),
	(191, 1, 2),
	(192, 1, 1),
	(193, 1, 17),
	(194, 1, 16),
	(195, 1, 14),
	(196, 1, 15),
	(197, 1, 9),
	(198, 1, 8),
	(199, 1, 7),
	(200, 1, 21),
	(201, 1, 3),
	(202, 1, 6),
	(203, 1, 5),
	(204, 1, 4),
	(205, 1, 20),
	(206, 1, 18),
	(207, 1, 19),
	(208, 1, 30),
	(209, 2, 36),
	(210, 1, 36),
	(212, 1, 37);
/*!40000 ALTER TABLE `user_menu` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
