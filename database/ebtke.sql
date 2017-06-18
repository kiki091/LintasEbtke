-- MySQL dump 10.13  Distrib 5.7.13, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: ebtke
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'berita',NULL,NULL),(2,'acara',NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_trans`
--

DROP TABLE IF EXISTS `category_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_trans` (
  `id` int(11) NOT NULL,
  `locale` varchar(2) NOT NULL,
  `title` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_trans_1_idx` (`category_id`),
  CONSTRAINT `fk_category_trans_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_trans`
--

LOCK TABLES `category_trans` WRITE;
/*!40000 ALTER TABLE `category_trans` DISABLE KEYS */;
INSERT INTO `category_trans` VALUES (1,'id','Berita',NULL,NULL,1),(2,'en','News',NULL,NULL,1),(3,'id','Acara',NULL,NULL,2),(4,'en','Event',NULL,NULL,2);
/*!40000 ALTER TABLE `category_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_history`
--

DROP TABLE IF EXISTS `company_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(200) DEFAULT NULL,
  `downloaded` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_history`
--

LOCK TABLES `company_history` WRITE;
/*!40000 ALTER TABLE `company_history` DISABLE KEYS */;
INSERT INTO `company_history` VALUES (1,'SEKILAS-TENTANG-LINTAS-EBTKE.pdf',NULL,NULL,NULL);
/*!40000 ALTER TABLE `company_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_history_trans`
--

DROP TABLE IF EXISTS `company_history_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_history_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `introduction` text,
  `description_left` text,
  `description_right` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `company_history_id` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_history_trans_1_idx` (`company_history_id`),
  CONSTRAINT `fk_company_history_trans_1` FOREIGN KEY (`company_history_id`) REFERENCES `company_history` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_history_trans`
--

LOCK TABLES `company_history_trans` WRITE;
/*!40000 ALTER TABLE `company_history_trans` DISABLE KEYS */;
INSERT INTO `company_history_trans` VALUES (1,'en','Whats is lintas ?','LINTAS EBTKE is an extension of the New and Renewable Energy Information and Investment Service and Energy Conservation.','<p>\n			<span class=\"first-letter\">I</span>\n			n general, LINTAS EBTKE will become the axis of EBTKE information where the information technology system applied will help the visitor find the information they need quickly. In addition, the EBTKE LINTAS office enables people to visit and conduct face-to-face consultations with competent staff and assigned to EBTKE Traffic.\n			</p>\n			<p>\n			Only a small part of Indonesia renewable energy potential and energy conservation have been utilized. To optimize the utilization of such potentials, communication and close cooperation between stakeholders is essential so that EBTKE activities / projects can be implemented immediately.. \n			</p>','<p>\n			It is suspected that there are still unmet needs of local government, industry, project development, univeersitas and research institutes, investors, financial institutions and the general public for information policy and EBTKE implementation. These stakeholders need the best and most current information on the applicable regulations, technology and implementation, funding and investment, cooperation opportunities, and even technical assistance for planning the implementation of EBTKE.\n			</p>\n			<p>\n				Information from LINTAS EBTKE is expected to facilitate cooperation among these stakeholders so that the utilization and application of EBTKE can increase.\n			</p>',NULL,NULL,1),(2,'id','Apa itu lintas ?','LINTAS EBTKE adalah kepanjangan dari Layanan Informasi dan Investasi Energi Baru, Terbarukan dan Konservasi Energi.','<p>\n			<span class=\"first-letter\">S</span>\n			ecara umum, LINTAS EBTKE akan menjadi poros informasi EBTKE dimana sistem teknologi informasi yang diterapkan akan membantu pengunjung menemukan informasi yang dibutuhkannya dengan cepat.\n			Selain itu, adanya kantor LINTAS EBTKE memungkinkan masyarakat untuk berkunjung dan melakukan konsultasi tatap muka dengan staf yang kompeten dan ditugaskan di LINTAS EBTKE. \n			</p>\n			<p>\n			Hanya sebagian kecil dari potensi energi terbarukan dan konservasi energi indonesia yang sudah dimanfaatkan. Untuk mengoptimalkan pemanfaatan potensi tersebut, perlu komunikasi dan kerjasama yang erat antar pemangku kepentingan sehingga kegiatan / proyek EBTKE dapat segera terlaksana. \n			</p>','<p>\n			Ditengarai masih adanya kebutuhan yang belum terpenuhi dari pemerintah daerah, industri, pengembangan proyek, univeersitas dan lembaga penelitian, investor, lembaga pembiayaan serta masyarakat umum akan informasi kebijakan dan penerapan EBTKE. Para pemangku kepentingan ini memerlukan informasi terbaik dan terkinimengenai peraturan yang berlaku, teknologi dan implementasinya, pendanaan dan investasi, kesempatan kerjasama, bahkan bantuan teknis untuk merencanakan penerapan EBTKE.\n			</p>\n			<p>\n				Informasi dari LINTAS EBTKE diharapkan dapat memfasilitasi kerjasama antar pemangku kepentingan ini agar pemanfaatan dan penerapan EBTKE dapat meningkat.\n			</p>',NULL,NULL,1),(3,'da','Hvad er lintas ?','LINTAS EBTKE er en udvidelse af den nye og vedvarende energi informations- og investeringstjeneste og energibesparelse.','<p>\n			<span class=\"first-letter\">G</span>\n			enerelt vil LINTAS EBTKE blive EBTKE-aksen, hvor det anvendte informationsteknologisystem hjælper den besøgende med at finde de oplysninger, de har brug for hurtigt. Desuden giver EBTKE LINTAS-kontoret folk mulighed for at besøge og gennemføre ansigt-til-ansigt-konsultationer med kompetent personale og tildelt EBTKE Traffic.\n			</p>\n			<p>\n			Kun en lille del af Indonesiens vedvarende energipotentiale og energibesparelser er blevet udnyttet. For at optimere udnyttelsen af sådanne potentialer er kommunikation og tæt samarbejde mellem interessenter af afgørende betydning, så EBTKE-aktiviteter / projekter kan implementeres straks.. \n			</p>','<p>\n			Det er mistanke om, at der stadig mangler behov for kommuner, industri, projektudvikling, univeersitas og forskningsinstitutter, investorer, finansielle institutioner og offentligheden for informationspolitik og EBTKE-implementering. Disse interessenter har brug for den bedste og nyeste information om gældende regler, teknologi og implementering, finansiering og investering, samarbejdsmuligheder og endda teknisk bistand til planlægning af implementeringen af EBTKE.\n			</p>\n			<p>\n				Oplysninger fra LINTAS EBTKE forventes at lette samarbejdet mellem disse interessenter, således at brugen og anvendelsen af EBTKE kan øge.\n			</p>',NULL,NULL,1);
/*!40000 ALTER TABLE `company_history_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_upload`
--

DROP TABLE IF EXISTS `file_upload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_upload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(60) DEFAULT NULL,
  `filename` varchar(200) NOT NULL,
  `is_active` int(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename_UNIQUE` (`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_upload`
--

LOCK TABLES `file_upload` WRITE;
/*!40000 ALTER TABLE `file_upload` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_upload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_upload_trans`
--

DROP TABLE IF EXISTS `file_upload_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_upload_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `file_upload_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_file_upload_trans_1_idx` (`file_upload_id`),
  CONSTRAINT `fk_file_upload_trans_1` FOREIGN KEY (`file_upload_id`) REFERENCES `file_upload` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_upload_trans`
--

LOCK TABLES `file_upload_trans` WRITE;
/*!40000 ALTER TABLE `file_upload_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_upload_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `green_pges`
--

DROP TABLE IF EXISTS `green_pges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `green_pges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `office_name` varchar(100) DEFAULT NULL,
  `slug` varchar(150) NOT NULL,
  `is_active` int(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `fax_number` varchar(15) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `postal_code` int(10) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `green_pges`
--

LOCK TABLES `green_pges` WRITE;
/*!40000 ALTER TABLE `green_pges` DISABLE KEYS */;
INSERT INTO `green_pges` VALUES (1,'pt-asia-pragon.png','PT. Asia Pragon','pt-asia-pragon',1,1,'+6222 6032953','+6222 6072077','office@asiaparagon.com',40184,'http://asiaparagon.com/ap/',NULL,NULL,NULL);
/*!40000 ALTER TABLE `green_pges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `green_pges_images`
--

DROP TABLE IF EXISTS `green_pges_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `green_pges_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(45) DEFAULT NULL,
  `green_pges_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_green_pges_images_1_idx` (`green_pges_id`),
  CONSTRAINT `fk_green_pges_images_1` FOREIGN KEY (`green_pges_id`) REFERENCES `green_pges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `green_pges_images`
--

LOCK TABLES `green_pges_images` WRITE;
/*!40000 ALTER TABLE `green_pges_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `green_pges_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `green_pges_trans`
--

DROP TABLE IF EXISTS `green_pges_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `green_pges_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `address` text,
  `introduction` text,
  `description` text,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `green_pges_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_green_pges_trans_1_idx` (`green_pges_id`),
  CONSTRAINT `fk_green_pges_trans_1` FOREIGN KEY (`green_pges_id`) REFERENCES `green_pges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `green_pges_trans`
--

LOCK TABLES `green_pges_trans` WRITE;
/*!40000 ALTER TABLE `green_pges_trans` DISABLE KEYS */;
INSERT INTO `green_pges_trans` VALUES (1,'id','Jalan Kiwi No. 25 Andir - Bandung,\nWest Java, Indonesia.','<b>PT ASIA PARAGON</b> adalah perusahaan yang bergerak dalam bidang energi, design, enginering, teknologi informasi, kontraktor umum dan perdagangan. PT ASIA PARAGON berbasis di Bandung dan Jakarta, didirikan pada tahun 2005 oleh sejumlah profesional muda yang sudah berpengalaman dalam menangani berbagai proyek baik nasional maupun internasional. PT ASIA PARAGON terus berinovasi dan menciptakan jaringan komunikasi dan kerjasama global dengan semua institusi nasional dan internasional juga dengan para ahli baik secara individual maupun kelembagaan dalam bidang terkait.','<p>\n<b>PT ASIA PARAGON terdiri dari beberapa divisi yang meliputi :</b> </p>\n1. Business consultant, \n2. Developer, \n3. Construction, \n4. Engineering Management Consultant, \n5. Assessement Engineering, \n6. Organic Farming\n<p>\nProyek-proyek terkait dengan energi umumnya ditangani oleh divisi business consultant, engineering management consultant, construction dan assessment engineering. </p>\n<p>\n<b>Produk/Jasa:</b></p>\n<p>\n(1) Studi kelayakan, pengembangan dan konstruksi pembangkit listrik dari energi terbarukan\n(2) Survei potensi energi terbarukan\n(3) Studi terkait RAN-GRK\n(4) Pengadaan dan pemasangan generator listrik\n(5) Pengadaan dan pemasangan EnMS (Energy Management System)\n(6) Audit energi di industri dan bangunan\n(7) Kajian akademis terhadap kebijakan dan aturan terkait energi\n(8) Pengadaaan dan pemasangan lampu hemat energi dan lampu tenaga surya\n</p>\n<p>\n<b>Rekam jejak:</b>\n</p>\n<p>\nPengalaman-pengalaman PT Asia Paragon terkait dengan bidang energi di antaranya:</p>\n<p>\n1. Feasibility Study Industri PV (Photovoltaic), BPPT\n2. Pengembangan nilai tambah di bidang energi alternatif\n3. Survey Potensi Panasbumi Star Energi\n4. Survey Potensi Panasbumi di Sulawesi\n5. Studi Rencana  Aksi Nasional (RAN) Antisipasi Sektor Transportasi Menghadapi Climate Change\n6. Studi Kelayakan PLTMH Kabupaten Bantaeng\n7. Pemasangan Kincir Angin Untuk Pengairan di Garut (Cibolang dan Pameungpeuk)\n8. Pemasanggan Lampu PJU tenaga surya di Maluku\n9. PUSRI, Studi Kelayakan Pembangkit Listrik dan Steam\n10. Studi Kelayakan untuk Pengembangan Tenaga Listrik dan Steam di Pabrik Kujang\n11. PDT Sollar Cell Sulawesi\n12. PDT Sollar Cell Jatim\n13. PDT Sollar Cell Bali\n14. Studi Kelayakan untuk PLTA Labuhan Bajo, Kabupaten Manggarai\n15. Studi Kelayakan Kincir Angin di Pangkal Pinang\n16. Studi Kelayakan Panasbumi di Aceh\n17. Studi Kelayakan Panasbumi di Jaboi, Sabang\n18. Studi Kelayakan Panasbumi di Sabang\n19. Audit Energi Sektor Industri Kimia dan Makanan\n</p>','PT ASIA PARAGON','PT ASIA PARAGON','PT ASIA PARAGON adalah perusahaan yang bergerak dalam bidang energi, design, enginering, teknologi informasi, kontraktor umum dan perdagangan',1,NULL,NULL),(2,'en','Kiwi Street No. 25 Andir - Bandung,\nWest Java, Indonesia.','<b> PT ASIA PARAGON </b> is a company engaged in energy, design, enginering, information technology, general contracting and trading. PT ASIA PARAGON is based in Bandung and Jakarta, established in 2005 by a number of young professionals who have experience in handling various projects both nationally and internationally. PT ASIA PARAGON continues to innovate and create a global communication and cooperation network with all national and international institutions as well as experts both individually and institutionally in related fields. ','<p>\n<b> PT ASIA PARAGON consists of several divisions which include: </b> </p>\n1. Business consultant,\n2. Developer,\n3. Construction,\n4. Engineering Management Consultants,\n5. Assessment Engineering,\n6. Organic Farming\n<p>\nEnergy-related projects are generally handled by business consultant divisions, engineering management consultants, construction and assessment engineering. </p>\n<p>\n<b> Products / Services: </b> </p>\n<p>\n(1) Feasibility study, development and construction of power plant from renewable energy\n(2) Survey of potential renewable energy\n(3) Related studies of RAN-GRK\n(4) Procurement and installation of electrical generators\n(5) Procurement and installation of EnMS (Energy Management System)\n(6) Energy audits in industries and buildings\n(7) Academic review of energy-related policies and rules\n(8) Procurement and installation of energy saving lamps and solar powered lamps\n</p>\n<p>\n<b> Track record: </b>\n</p>\n<p>\nThe experiences of PT Asia Paragon related to the energy sector include: </p>\n<p>\n1. Feasibility Study of PV Industry (Photovoltaic), BPPT\n2. The development of added value in the field of alternative energy\n3. Survey of Potential Star Energy Geothermal\n4. Survey of Geothermal Potential in Sulawesi\n5. National Action Plan Study (RAN) Transportation Transportation Anticipation Facing Climate Change\n6. Feasibility Study of PLTMH of Bantaeng Regency\n7. Installation of Windmills for Watering in Garut (Cibolang and Pameungpeuk)\n8. Pemasanggan PJU lamp solar power in Maluku\n9. PUSRI, Feasibility Study of Power Station and Steam\n10. Feasibility Study for Development of Electricity and Steam at Kujang Plant\n11. PDT Sollar Cell Sulawesi\n12. PDT Sollar Cell Jatim\n13. PDT Sollar Cell Bali\n14. Feasibility Study for Labuhan Bajo Hydroelectric Power Plant, Manggarai Regency\n15. Feasibility Study of Windmills in Pangkal Pinang\n16. Feasibility Study of Geothermal in Aceh\n17. Feasibility Study of Geothermal in Jaboi, Sabang\n18. Feasibility Study of Geothermal in Sabang\n19. Energy Audit of Chemical and Food Industry Sectors\n</p>','PT ASIA PARAGON','PT ASIA PARAGON','PT ASIA PARAGON is a company engaged in energy, design, enginering, information technology, general contracting and trading',1,NULL,NULL);
/*!40000 ALTER TABLE `green_pges_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investment_services`
--

DROP TABLE IF EXISTS `investment_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investment_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `slug` varchar(200) NOT NULL,
  `is_active` int(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `total_view` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investment_services`
--

LOCK TABLES `investment_services` WRITE;
/*!40000 ALTER TABLE `investment_services` DISABLE KEYS */;
INSERT INTO `investment_services` VALUES (1,'potensi-penghematan-energi-hingga-25-%.jpg','potensi-penghematan-energi-hingga-25',1,1,NULL,NULL,NULL,1),(2,'penerapan-model-bisnis-energy.jpg','penerapan-model-bisnis-energy-saving-performance-contract-espc-oleh-energy-services-company-esco-untuk-mendukung-implementasi-efisiensi-energi-di-sektor-publik',1,1,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `investment_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investment_services_related`
--

DROP TABLE IF EXISTS `investment_services_related`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investment_services_related` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `investment_services_id` int(10) DEFAULT NULL,
  `investment_services_related_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_investment_services_related_1_idx` (`investment_services_id`),
  KEY `fk_investment_services_related_2_idx` (`investment_services_related_id`),
  CONSTRAINT `fk_investment_services_related_1` FOREIGN KEY (`investment_services_id`) REFERENCES `investment_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_investment_services_related_2` FOREIGN KEY (`investment_services_related_id`) REFERENCES `investment_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investment_services_related`
--

LOCK TABLES `investment_services_related` WRITE;
/*!40000 ALTER TABLE `investment_services_related` DISABLE KEYS */;
INSERT INTO `investment_services_related` VALUES (1,1,2),(2,2,1);
/*!40000 ALTER TABLE `investment_services_related` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `investment_services_trans`
--

DROP TABLE IF EXISTS `investment_services_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investment_services_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `introduction` text,
  `description` text,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `investment_services_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_investment_services_trans_1_idx` (`investment_services_id`),
  CONSTRAINT `fk_investment_services_trans_1` FOREIGN KEY (`investment_services_id`) REFERENCES `investment_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `investment_services_trans`
--

LOCK TABLES `investment_services_trans` WRITE;
/*!40000 ALTER TABLE `investment_services_trans` DISABLE KEYS */;
INSERT INTO `investment_services_trans` VALUES (1,'id','POTENSI PENGHEMATAN ENERGI HINGGA 25%','<p>\nDengan pertumbuhan ekonomi dan jumlah penduduk yang pesat, Indonesia berkepentingan untuk mengelola dan menggunakan energi seefektif dan seefisien mungkin. Menurut data Bank Dunia, pertumbuhan ekonomi Indonesia meningkat dari 5,7 persen pada tahun 2005 menjadi 5,9 persen pada tahun 2010, dan diproyeksikan mencapai 6,2 persen pada tahun 2011. Sementara populasi Indonesia yang kini mencapai 229 juta penduduk diperkirakan akan meningkat menjadi lebih dari 230 juta pada tahun 2011.\n</p>','<p>\n<span class=\"first-letter\">S</span>emua pertumbuhan ini tentunya disertai dengan meningkatnya kebutuhan energi akibat bertambahnya jumlah rumah, beragam bangunan komersial serta industri. Jika diasumsikan rata-rata pertumbuhan kebutuhan listrik adalah sebesar 7 persen per tahun selama kurun waktu 30 tahun, maka konsumsi listrik akan meningkat dengan tajam, contohnya pada sektor rumah tangga, konsumsi akan meningkat dari 21,52 gigawatt hour (Gwh) di tahun 2000 menjadi sekitar 444,53 Gwh pada tahun 2030.</p>\n<p>\nTerdapat empat sektor utama pengguna energi, yaitu sektor rumah tangga, komersial, industri dan transportasi. Saat ini pengguna energi terbesar adalah sektor industri dengan pangsa 44,2 persen. Konsumsi terbesar berikutnya adalah sektor transportasi dengan pangsa 40,6 persen, diikuti dengan sektor rumah tangga sebesar 11,4 persen dan sektor komersial sebesar 3,7 persen.</p>\n<p>\nBerangkat dari kenyataan sektor industri, rumah tangga dan transportasi merupakan konsumen terbesar energi maka menurut Direktur Konservasi Energi, Maryam Ayuni potensi penghematan tiga sektor tersebut dengan melakukan penghematan antara 15-25 persen. \"Ada angka sebesar itu yang bisa dihemat,\"kata dia di Jakarta.</p>\n<p>\nTerkait dengan instruksi presiden (Inpres) nomor 13 tahun 2011 tentang penghematan energi yang kemudian terbitnya tiga peraturan menteri energi dan sumber daya mineral (MESDM) sebagai turunan dari Inpres tersebut yaitu permen nomor 12, 13, 14 dan 15 yang mengatur penghematan energi listrik, bahan bakar minyak, air tanah dan manajemen energi, menurutnya, realisasi penghematannya dari sejak diterapkan hemat energi 1 Juni lalu terdapat penghematan yang cukup signifikan.\"Yang cukup signifikan penurunannya di listrik, untuk bahan bakar minyak belum terlalu signifikan,\"pungkasnya.(FT)\n</p>','POTENSI PENGHEMATAN ENERGI HINGGA 25%','PENGHEMATAN ENERGI','POTENSI PENGHEMATAN ENERGI HINGGA 25%',1,NULL,NULL),(2,'en','ENERGY SAVING POTENCY UP TO 25%','<p>\nWith economic growth and rapid population growth, Indonesia has an interest in managing and using energy as effectively and efficiently as possible. According to World Bank data, Indonesia\'s economic growth increased from 5.7 percent in 2005 to 5.9 percent in 2010, and is projected to reach 6.2 percent in 2011. While Indonesia\'s current population of 229 million is expected to increase to More than 230 million in 2011.\n</p>','<p>\n<span class=\"first-letter\">A</span>ll of this growth is certainly accompanied by increasing energy demand due to the increasing number of houses, a variety of commercial buildings and industries. If it is assumed that the average growth of electricity demand is 7 percent per year for 30 years, then electricity consumption will increase sharply, for example in the household sector, consumption will increase from 21.52 gigawatt hour (Gwh) in 2000 to About 444.53 Gwh by 2030.</p>\n<p>\nThere are four main sectors of energy users, namely household, commercial, industrial and transportation sectors. Currently the largest energy user is the industry sector with a share of 44.2 percent. The next largest consumption is the transportation sector with a share of 40.6 percent, followed by the household sector of 11.4 percent and the commercial sector of 3.7 percent.</p>\n<p>\nDeparting from the reality of industrial sector, household and transportation is the biggest consumer of energy, according to Director of Conservation of Energy, Maryam Ayuni potential savings of three sectors by making savings between 15-25 percent. \"There are numbers that can be saved,\" he said in Jakarta.</p>\n<p>\nIn connection with Presidential Directive (Inpres) number 13 of 2011 on energy savings, which then issued three ministerial regulations of energy and mineral resources (MESDM) as a derivative of the Inpres namely candy number 12, 13, 14 and 15 which regulate the energy saving of electricity, Fuel oil, groundwater and energy management, according to him, the realization of the savings from since applied energy efficiency June 1 ago there is a significant savings. \"Significant decrease in electricity, for fuel oil has not been too significant,\" he concluded.\n</p>','ENERGY SAVING POTENCY UP TO 25%','ENERGY SAVING','ENERGY SAVING POTENCY UP TO 25%',1,NULL,NULL),(3,'id','PENERAPAN MODEL BISNIS ENERGY SAVING PERFORMANCE CONTRACT (ESPC) OLEH ENERGY SERVICES COMPANY (ESCO) UNTUK MENDUKUNG IMPLEMENTASI EFISIENSI ENERGI DI SEKTOR PUBLIK','<p>\nPenerapan Model Bisnis Energy Saving Performance Contract (ESPC) untuk Mendukung Implementasi Efisiensi Energi di Sektor Publik oleh Energy Services Company (ESCO)</p>','<p>\n<span class=\"first-letter\">L</span>atar belakang dalam penerapan model bisnis Energy Saving Performance Contract (ESPC) untuk mendukung implementasi efisiensi energi di sektor publik oleh Energy Services Company (ESCO) adalah potensi penghematan energi di sektor industri sebesar 10 – 30 % dan di sektor bangunan gedung sebesar 10 – 30 %, dimana masing-masing sektor mempunyai target penghematan energi sebesar 17% untuk industri dan 15% untuk bangunan gedung. Kemudian komitmen pemerintah Indonesia untuk mengurangi emisi GRK sebesar 26% dengan upaya sendiri dan 41% dengan upaya sendiri serta dukungan internasional serta peranan penting Konservasi Energi dalam mencapai sasaran kebijakan energi nasional seperti yang tercantum pada PP No. 79 Tahun 2014 yaitu:</p>\n<p>\n- Tercapainya elastisitas energi lebih kecil dari 1 (satu) pada tahun 2025 yang diselaraskan dengan target pertumbuhan ekonomi; dan <br/>\n- Tercapainya penurunan intensitas energi final sebesar 1% (satu) persen per tahun sampai dengan tahun 2025 dapat direalisasikan antara lain dengan investasi efisiensi energi untuk membantu tercapainya target yang sudah ditetapkan tersebut.</p>\n<p>\nNamun, investasi efisiensi energi masih belum dapat dilaksanakan khususnya yang berbiaya menengah dan tinggi. Bottle-neck investasi efisiensi energi antara lain disebabkan oleh:</p>\n<p>\n- kurangnya awareness top management / pemilik perusahaan terhadap investasi efisiensi energi sehingga belum menjadi prioritas karena lebih mementingkan peningkatan kapasitas produksi, daya saing dan ekspansi perusahaan;<br/>\n- belum tersedianya dana perusahaan untuk investasi efisiensi energi;<br/>\n- kurang / tidak ada akses ke bank / LK untuk membantu dalam pembiayaan investasi efisiensi energi;<br/>\n- tidak tersedianya collateral (jaminan dengan asset yang liquid) dari pihak perusahaan agar dapat memenuhi syarat bank / LK untuk memperoleh pinjaman; dan<br/>\n- pihak bank / LK belum mengenal proyek efisiensi energi dan risiko pembiayaannya sehingga belum berminat memberikan bantuan pembiayaan terhadap proyek efisiensi energi.</p>\n<p>\nDapat dilihat bahwa hal ini terjadi pada 2 (dua) belah pihak yaitu pihak perusahaan dan bank / LK. Untuk itu, diperlukan pihak lain yang mendukung investasi efisiensi energi ini selain Pemerintah yaitu pihak yang dapat menjembatani secara business to business, salah satunya adalah Energy Services Company (ESCO). Energy Services Company (ESCO) adalah Perusahaan yang memberikan jasa untuk mendukung implementasi efisiensi dan konservasi energi secara terintegrasi di sektor industri dan bangunan gedung. Analogi ESCO di sektor pekerjaan umum dan konstruksi adalah perusahaan Engineering, Procurement and Construction (EPC). </p>\n<p>\nLingkup pekerjaan ESCO antara lain memberikan saran/konsultansi, melakukan assessment (audit energi), feasibility study (FS), Investment Grade Audit (IGA), Detailed Engineering Design (DED), procurement, installation, commissioning, operation & maintenance (O&M), measurement & verification (M&V), performance guarantee dan financial assistance. ESCO melakukan kontrak kerja dengan perusahaan yang menjadi klien sesuai dengan kinerja penghematan energi (Energy Saving Performance Contract – ESPC). ESCO akan dibayar oleh klien berdasarkan capaian kinerja penghematan energi yang tertera pada ESPC. Di dalam ESPC juga terkandung hal-hal terkait M&V untuk menentukan apakah penghematan yang tercapai itu adalah upaya klien sendiri atau hasil dari proyek efisiensi energi yang dijamin oleh ESCO, hal ini perlu ada untuk menghindari terjadi perselisihan/dispute antara ESCO dan kliennya. Dalam memberikan pelayanannya, ESCO dapat menerapkan 2 (dua) model sebagai berikut:</p>\n<p>\n1. Guaranteed saving, dalam hal ini, ESCO hanya memberikan jaminan penghematan dan yang melakukan investasi adalah pihak klien; dan <br/>\n2. Shared saving, dalam hal ini ESCO yang melakukan investasi dengan persentase lebih besar daripada kliennya, misal perbandingan investasi 70% oleh ESCO dan 30% sisanya oleh perusahaan.</p>\n\n<p>\nPerkembangan bisnis ESCO untuk mendukung implementasi efisiensi energi di Indonesia sangat lambat dibandingkan di beberapa negara lain dalam satu kawasan Asia yaitu Thailand, China, Singapura, Malaysia, dan India. Hal ini terjadi antara lain disebabkan oleh:\n- Jasa ESCO ini belum atau sedikit dikenal oleh pihak industri, bangunan gedung dan bank / LK sebagai klien yang potensial;<br/>\n- Model perikatan bisnis dengan ESCO yaitu Energy Saving Performance Contract (ESPC) atau Kontrak Kerja Berbasis Kinerja Penghematan Energi adalah hal yang masih baru bagi pihak klien dari sektor industri dan bangunan gedung;<br/>\n- Tingkat kepercayaan pihak klien (pengguna jasa ESCO) masih belum terbangun karena memang belum ada satu informasi yang mendukung tentang kompetensi dari ESCO;<br/>\n- Kapasitas ESCO baik secara institusional maupun tenaga ahli pendukungnya perlu ditingkatkan; dan<br/>\n- Belum ada demonstration project pelaksanaan investasi efisiensi energi oleh ESCO yang dapat digunakan untuk sosialisasi kepada pihak industri dan bangunan gedung untuk melihat manfaat menggunakan jasa ESCO untuk investasi efisiensi energi.</p>\n<p>\nPerkembangan ESCO yang sangat lambat, sementara potensi penerapan bisnis efisiensi energi di Indonesia sangat besar, sehingga Indonesia akan menjadi pasar / lahan ESCO asing untuk beroperasi di Indonesia terlebih dengan adanya WTO dan AFTA. Sehubungan dengan hal tersebut, Pemerintah c.q. Ditjen EBTKE – KESDM serta Kementerian lainnya seperti Kementerian Perindustrian berupaya untuk debottlenecking investasi efisiensi energi, salah satunya adalah dengan mendorong berkembangnya ESCO. Bentuk dukungan Pemerintah untuk perkembangan ESCO antara lain:</p>\n<p>\n- Memberikan capacity building kepada ESCO melalui training tentang Investment Grade Energy Audit (IGA) dan penyusunan proposal pembiayaan proyek efisiensi energi, serta sharing pengetahuan dan pengalaman dengan pihak ESCO dari Luar Negeri;<br/>\n- Pilot Project ESCO di industri tekstil, yang saat ini sedang dilaksanakan di bawah program kerjasama dengan Danida ESP3;<br/>\n- Penyiapan regulasi yang mendukung berkembangnya ESCO di Indonesia. Regulasi ESCO bertujuan untuk memberikan perlindungan kepada klien pengguna jasa ESCO yang terpercaya dan kompeten (trusted ESCO), kemudahan ESCO dalam memperoleh fasilitas pembiayaan dari bank / LK ataupun insentif pajak dari Pemerintah, serta perlindungan dalam kemitraan dengan ESCO lokal dengan ESCO asing yang lebih kuat dalam expertise, experience dan capital sehingga diharapkan dapat terjadi transfer of knowledge dan experience.<br/>\n- Penyiapan pedoman teknis yang dibutuhkan untuk operasional ESCO antara lain Pedoman Pelaksanaan IGA, Pedoman Penyusunan M&V dan Pedoman Penyusunan ESPC;<br/>\n- Pelaksanaan IGA di sektor industri pada TA 2015 dengan anggaran DJEBTKEKESDM di 3 sub-sektor industri yaitu tekstil, besi dan baja dan kimia, masingmasing sub-sektor ada 3 obyek industri. Diharapkan ESCO yang tergabung dalam APKENINDO dapat menjadi pelaksana dan kami berencana akan melibatkan bank / LK agar hasil IGA dapat ditindaklanjuti dengan pembiayaan investasi efisiensi energi.</p>\n<p>\nSelain sektor industri dan bangunan gedung (komersial), masih ada sektor lain yang sangat potensial untuk menggunakan jasa ESCO yaitu sektor publik. Yang termasuk dalam sektor publik ini antara lain gedung-gedung milik Pemerintah dan Pemda, fasilitas umum seperti Penerangan Jalan Umum (PJU), BUMN, dan BUMD yang dalam operasional dan investasinya menggunakan anggaran negara atau anggaran daerah. Sektor publik ini berbeda dengan sektor swasta dimana anggaran negara atau anggaran daerah sangat rigid / kaku (tidak fleksibel) dan dalam penggunaannya harus prudensial (berhati-hati untuk tidak menyimpang secara administrasi dan keuangan). Perikatan bisnis ESCO dengan kontrak kerja berbasis kinerja penghematan energi (ESPC) belum dikenal oleh sektor publik dimana pembayaran berdasarkan besar penghematan yang dicapai dan dilaksanakan multi-years. Terlebih apabila ESCO melaksanakan model shared-saving dimana investasi menggunakan dana pihak ESCO terlebih dahulu dan dibayar secara bertahap berdasarkan kinerja penghematan energi yang tercapai sampai periode tertentu (payback period) sesuai kesepakatan dalam ESPC.</p>\n<p>\nPenggunaan jasa ESCO di sektor publik ini sangat mendukung penerapan Instruksi Presiden No. 13 Tahun 2011 tentang Penghematan Energi dan Air dan Peraturan Menteri ESDM No. 13 Tahun 2012 tentang Penghematan Pemakaian Tenaga Listrik dengan target penghematan sebesar 20%. Skema Kerjasama Pemerintah dan Swasta (KPS) dapat diterapkan pada proyek efisiensi energi di sektor publik yaitu PJU dan retrofit gedung kantor Pemerintah/Pemda, karena secara prinsip skema KPS sama dengan skema ESCO “shared saving” dimana pihak swasta (perusahaan ESCO) menyediakan dana investasi, memberikan jaminan penghematan energi yang dapat dicapai dan Pemerintah membayar berdasarkan penghematan energi yang berhasil dicapai secara bertahap/berkala sampai periode tertentu (misal pay-back period) sesuai kesepakatan dalam Energy Saving Performance Contract (ESPC). PJU dengan skema ESCO ini sudah dilaksanakan antara lain di Pemkab Pasuruan dan Pemkab Magetan. Pihak Pemkab sudah merasakan manfaat dari pola kerjasama ESCO ini, namun berdasarkan audit BPK ada pelanggaran administrasi terkait sistem akuntansi pemerintah. Memang yang harus menjadi pertimbangan adalah masa kontrak dengan perusahaan ESCO yang cenderung untuk multiyears.</p>\n<p>\nKe depannya model ESPC diharapkan dapat mendukung implementasi efisiensi energi di sektor publik dapat diterapkan, dimana masing-masing pihak terkait dapat memberikan solusi pendukung antara lain:</p>\n- BAPPENAS yang dapat memasukkan skema ESCO ke skema KPS khusus proyek efisiensi energi;<br/><br/>\n- Kementerian Keuangan dan KSAP dapat mempertimbangkan kefleksibelan anggaran negara/daerah terhadap skema ESCO dengan pembayaran secara bertahap berdasarkan kinerja penghematan energi dalam periode yang ditentukan (multiyears);<br/><br/>\n- LKPP dapat mengakomodasi pengadaan barang/jasa Pemerintah khusus ESCO dengan model kontrak kerja berbasis kinerja penghematan energi yang dapat dimasukkan ke dalam public green procurement;<br/><br/>\n- Pihak auditor internal kementerian/LPNK, BPK, dan BPKP serta Kementerian Dalam Negeri dapat mengenal model kontrak ESPC dan ESCO sebagai pelaksananya untuk mendukung implementasi efisiensi energi di sektor publik;<br/><br/>\n- OJK dapat mendukung dengan kemudahan pemberian pembiayaan kepada ESCO dari bank / LK;<br/><br/>\n- Pihak APKENINDO kiranya dapat lebih meningkatkan kapasitasnya kelak untuk menjalankan model bisnis ESPC di sektor publik; dan<br/><br/>\n- KESDM akan menyiapakan regulasi terkait ESCO beserta pedoman teknis pelaksanaan di lapangan.\n</p>','PENERAPAN MODEL BISNIS ENERGY','PENERAPAN MODEL BISNIS ENERGY','PENERAPAN MODEL BISNIS ENERGY SAVING PERFORMANCE CONTRACT (ESPC) OLEH ENERGY SERVICES COMPANY (ESCO) UNTUK MENDUKUNG IMPLEMENTASI EFISIENSI ENERGI DI SEKTOR PUBLIK',2,NULL,NULL),(4,'en','APPLICATION OF ENERGY SAVING PERFORMANCE CONTRACT (ESPC) BUSINESS MODEL BY ENERGY SERVICES COMPANY (ESCO) TO SUPPORT THE ENERGY EFFICIENCY IMPLEMENTATION IN THE PUBLIC SECTOR','<p>\nApplying the Energy Saving Performance Contract (ESPC) Business Model to Support the Implementation of Energy Efficiency in the Public Sector by Energy Services Company (ESCO)</p>','<p>\n<span class = \"first-letter\">L</span> behind the implementation of the Energy Saving Performance Contract (ESPC) business model to support the implementation of energy efficiency in the public sector by Energy Services Company (ESCO) is the potential energy savings in the industrial sector By 10 - 30% and in the building sector by 10 - 30%, where each sector has energy saving target of 17% for industry and 15% for building. Then the Government of Indonesia\'s commitment to reduce GHG emissions by 26% with own efforts and 41% with own efforts and international support and the important role of Energy Conservation in achieving the national energy policy targets as stated in PP. 79 Year 2014 is: </p>\n<p>\n\n- The achievement of energy elasticity is smaller than 1 (one) in 2025 which is aligned with the target of economic growth; and <br/>\n- The achievement of a decrease in the final energy intensity of 1% (one) percent per year until 2025 can be realized, among others, by energy efficiency investment to help achieve the set targets. </p>\n<p>\nHowever, energy efficiency investments are still unworkable, especially those with medium and high cost. Bottle-neck energy efficiency investments are among others caused by: </p>\n<p>\n- Lack of awareness of top management towards energy efficiency investment so it has not become a priority because it is more concerned with increased production capacity, competitiveness and expansion of the company; <br/>\n- the unavailability of corporate funds for energy efficiency investments; <br/>\n- lack / no access to bank / LK to assist in financing energy efficiency investments; <br/>\n- the unavailability of collateral (collateral with liquid assets) from the company in order to qualify bank / LK to obtain the loan; And <br/>\n- the bank / LK is not familiar with the energy efficiency project and its financing risks so it has not been interested in providing financing assistance to the energy efficiency project.  </p>\n<p>\nIt can be seen that this happens on 2 (two) parties ie the company and bank / LK. For that, other parties are needed to support energy efficiency investment besides the Government, which is a party that can bridge the business to business, one of which is Energy Services Company (ESCO). Energy Services Company (ESCO) is a company that provides services to support the implementation of energy efficiency and conservation in an integrated manner in the industrial and building sectors. ESCO analogy in the public works and construction sector is an Engineering, Procurement and Construction (EPC) company. </p>\n<p>\nThe scope of ESCO\'s work includes advice / consultancy, conducting assessment (audit of energy), feasibility study (FS), Investment Grade Audit (IGA), Detailed Engineering Design (DED), procurement, installation, commissioning, operation & maintenance (O & M) Measurement & verification (M & V), performance guarantee and financial assistance. ESCO undertakes contracts with companies that become clients in accordance with energy saving performance (ESPC). ESCO will be paid by clients based on the performance of the energy savings listed on ESPC. In the ESPC also contains M & V related matters to determine whether the savings achieved are the client\'s own efforts or the result of an energy efficiency project guaranteed by ESCO, this is necessary to avoid any dispute between the ESCO and its clients. In providing its services, ESCO can apply 2 (two) models as follows: </p>\n<p>\n1. Guaranteed saving, in this case, ESCO only provides savings and investment savings are the client\'s side; and <br/>\n2. Shared saving, in this case the ESCO invests a larger percentage of its clients, eg 70% of the investment ratio by ESCO and the remaining 30% by the company. </p>\n\n<p>\nESCO\'s business development to support the implementation of energy efficiency in Indonesia is very slow compared to in some other countries in Asia, China, Singapore, Malaysia and India. This occurs, among others, caused by:\n\n- This ESCO service has not been or is little known by industry, building and bank / LK as potential clients; <br/>\n- The business association model with ESCO is the Energy Saving Performance Contract (ESPC) or Performance Based Energy Performance Contract is something new for the clients of the industrial and building sectors; <br/>\n- The client\'s trust level (ESCO service user) is not yet built as there is no supportive information about ESCO\'s competence; <br/>\n- ESCO capacity both institutional and supporting experts needs to be improved, And <br/>\n- There is no demonstration project of ESCO energy efficiency investments that can be used for socialization to industry and building parties to see the benefits of using ESCO services for energy efficiency investment.  </p>\n<p>\nThe development of ESCO is very slow, while the potential implementation of energy efficiency business in Indonesia is very large, so that Indonesia will become a foreign ESCO market / land to operate in Indonesia especially with WTO and AFTA. In connection therewith, the Government c.q. DG EBTKE - KESDM and other Ministries such as the Ministry of Industry strive to debottlenecking energy efficiency investments, one of which is by encouraging the development of ESCO. Forms of Government support for ESCO developments include: </p>\n<p>\n- Provide capacity building to ESCO through training on Investment Grade Energy Audit (IGA) and preparation of energy efficiency project financing proposal, and sharing knowledge and experience with ESCO from overseas; <br/>\n- The ESCO Pilot Project in the textile industry, which is currently being implemented under a joint venture program with Danida ESP3; <br/>\n- Preparation of regulations that support the development of ESCO in Indonesia. The ESCO Regulation aims to provide protection to trusted ESCO trusted ESCO clients, ESCO ease in obtaining financing facilities from bank / LK or tax incentives from the Government, as well as protection in partnership with local ESCOs with stronger foreign ESCOs Expertise, experience and capital so it is expected to transfer the knowledge and experience. <br/>\n- Preparing technical guidance required for ESCO operations including IGA Implementation Guidelines, M & V Preparation Guidelines and ESPC Preparation Guidelines; <br/>\n- Implementation of IGA in industrial sector in FY 2015 with budget DJEBTKEKESDM in 3 sub-sector of industry that is textile, iron and steel and chemical, each sub-sector there are 3 object of industry. It is expected that the ESCO incorporated in APKENINDO can be the implementer and we plan to involve the bank / LK so that the IGA results can be followed up with the financing of energy efficiency investment.  </p>\n<p>\nIn addition to the industrial sector and building (commercial), there are still other sectors that are very potential to use the services of ESCO namely the public sector. Included in the public sector include buildings owned by the Government and local government, public facilities such as Public Street Lighting (PJU), BUMN, and BUMD are in operation and investment using the state budget or local budget. The public sector is different from the private sector where the state budget or local budget is very rigid / rigid (inflexible) and in its use must be prudential (being careful not to deviate administratively and financially). The ESCO business engagement with energy efficiency-based employment contracts (ESPC) is not yet recognized by the public sector where payments are based on the large savings achieved and implemented multi-years. Especially if ESCO implement a shared-saving model where the investments use ESCO\'s funds first and are paid in stages based on the performance of energy savings achieved up to a certain period (payback period) according to the agreement in ESPC. </p>\n<p>\nThe use of ESCO services in the public sector strongly supports the implementation of Presidential Instruction no. 13 of 2011 on Energy and Water Conservation and Regulation of the Minister of Energy and Mineral Resources No. 13 Year 2012 on Electricity Usage Savings with an austerity target of 20%. Public Private Partnership (PPP) schemes can be applied to energy efficiency projects in the public sector, namely PJU and retrofit of government / local government offices, because in principle the PPP scheme is similar to the ESCO \"shared saving\" scheme where the private sector (ESCO) provides investment funds , Provides an energy-saving guarantee that can be achieved and the Government pays on the basis of the energy savings achieved gradually / periodically until a certain period (eg pay-back period) as agreed in the Energy Saving Performance Contract (ESPC). PJU with ESCO scheme has been implemented among others in Pemkab Pasuruan and Magetan Regency. The local government has benefited from this pattern of ESCO cooperation, but based on BPK audit there are administrative violations related to government accounting system. Indeed, that should be a consideration is the contract period with ESCO companies that tend to multiyears. </p>\n<p>\nIn the future ESPC model is expected to support the implementation of energy efficiency in the public sector can be applied, where each related party can provide support solutions such as: </p>\n\n- BAPPENAS that can incorporate ESCO schemes into specific energy efficiency project PPP schemes;<br/> <br/>\n- The Ministry of Finance and the KSAP may consider the flexibility of state / regional budgets on ESCO schemes with gradual payments based on energy-saving performance over a multiyear period; <br/><br/>\n- LKPP can accommodate the ESCO special procurement of goods / services with a performance-based energy efficiency contract model that can be incorporated into public green procurement; <br/><br/>\n- The internal auditors of ministries / LPNK, BPK and BPKP and the Ministry of Home Affairs can recognize the ESPC and ESCO contract models as executors to support the implementation of energy efficiency in the public sector; <br/><br/>\n- OJK can support with ease of providing financing to ESCO from bank / LK; <br/>\n- The APKENINDO party may further increase its capacity later to run the ESPC business model in the public sector; And <br/><br/>\n- KESDM will prepare ESCO related regulations along with technical guidance on field implementation. \n</p>','APPLICATION OF ENERGY SAVING PERFORMANCE','APPLICATION OF ENERGY SAVING PERFORMANCE','APPLICATION OF ENERGY SAVING PERFORMANCE CONTRACT (ESPC) BUSINESS MODEL BY ENERGY SERVICES COMPANY (ESCO) TO SUPPORT THE ENERGY EFFICIENCY IMPLEMENTATION IN THE PUBLIC SECTOR',2,NULL,NULL);
/*!40000 ALTER TABLE `investment_services_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_banner`
--

DROP TABLE IF EXISTS `main_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_banner`
--

LOCK TABLES `main_banner` WRITE;
/*!40000 ALTER TABLE `main_banner` DISABLE KEYS */;
INSERT INTO `main_banner` VALUES (1,'banner:landing','filename_001.jpg',1,1,NULL,NULL,NULL),(2,'banner:landing','filename_002.jpg',1,1,NULL,NULL,NULL),(3,'banner:landing','filename_003.jpg',1,1,NULL,NULL,NULL),(4,'banner:landing','filename_004.jpg',1,1,NULL,NULL,NULL),(5,'banner:company:history','banner.jpg',1,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `main_banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_banner_trans`
--

DROP TABLE IF EXISTS `main_banner_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_banner_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `main_banner_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_main_banner_trans_1_idx` (`main_banner_id`),
  CONSTRAINT `fk_main_banner_trans_1` FOREIGN KEY (`main_banner_id`) REFERENCES `main_banner` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_banner_trans`
--

LOCK TABLES `main_banner_trans` WRITE;
/*!40000 ALTER TABLE `main_banner_trans` DISABLE KEYS */;
INSERT INTO `main_banner_trans` VALUES (1,'id','Potong 10 Persen Diharapkan Jadi Gaya Hidup Masyarakat',NULL,NULL,1),(2,'en','Cut 10 Percent Expected to Be a Community Lifestyle',NULL,NULL,1),(3,'id','Hemat Energi Upaya Mencapai Energi Berkeadilan',NULL,NULL,2),(4,'en','Save Energy Efforts to Achieve Energy Justice',NULL,NULL,2),(5,'id','Indonesia – Denmark Luncurkan Peta Potensi Angin',NULL,NULL,3),(6,'en','Indonesia - Denmark Launches Potential Wind Map',NULL,NULL,3),(7,'id','Pembangunan Infrastruktur EBTKE di Sumatera Barat',NULL,NULL,4),(8,'en','Infrastructure Development EBTKE in West Sumatra',NULL,NULL,4);
/*!40000 ALTER TABLE `main_banner_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `slug` varchar(200) NOT NULL,
  `order` int(3) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `total_view` int(10) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `category_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_news_1_idx` (`category_id`),
  CONSTRAINT `fk_news_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'thumbnail_002.jpg','edukasi-masyarakat-zona-panas-bumi-hadir-di-taman-pintar-yogyakarta',1,1,12,'2017-06-07 07:39:45','2017-06-07 07:39:45',NULL,1),(2,'thumbnail_002.jpg','hemat-energi-upaya-mencapai-energi-berkeadilan',2,1,6,'2017-06-07 07:39:45','2017-06-07 07:39:45',NULL,1),(3,'thumbnail_002.jpg','pemerintah-dan-stakeholder-diskusikan-pengembangan-ebt',3,1,2,'2017-06-07 07:39:45','2017-06-07 07:39:45',NULL,2);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_images`
--

DROP TABLE IF EXISTS `news_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `news_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_images_1_idx` (`news_id`),
  CONSTRAINT `fk_news_images_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_images`
--

LOCK TABLES `news_images` WRITE;
/*!40000 ALTER TABLE `news_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `news_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_related`
--

DROP TABLE IF EXISTS `news_related`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_related` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) DEFAULT NULL,
  `news_related_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_related_1_idx` (`news_id`),
  KEY `fk_news_related_2_idx` (`news_related_id`),
  CONSTRAINT `fk_news_related_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_news_related_2` FOREIGN KEY (`news_related_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_related`
--

LOCK TABLES `news_related` WRITE;
/*!40000 ALTER TABLE `news_related` DISABLE KEYS */;
INSERT INTO `news_related` VALUES (1,1,2),(2,2,1),(3,1,3);
/*!40000 ALTER TABLE `news_related` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_trans`
--

DROP TABLE IF EXISTS `news_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `introduction` text,
  `description` text,
  `meta_title` varchar(150) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `news_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_trans_1_idx` (`news_id`),
  CONSTRAINT `fk_news_trans_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_trans`
--

LOCK TABLES `news_trans` WRITE;
/*!40000 ALTER TABLE `news_trans` DISABLE KEYS */;
INSERT INTO `news_trans` VALUES (1,'id','Edukasi Masyarakat, Zona Panas Bumi Hadir di Taman Pintar Yogyakarta','<p><span class=\"first-letter\">Y</span>OGYAKARTA - Guna memberikan edukasi tentang pemanfaatan dan pengembangan panas bumi di Indonesia, Kementerian Energi dan Sumber Daya Mineral (ESDM) bekerja sama dengan PT Pertamina Geothermal Energy (PGE) dan Pemerintah Kota Yogyakarta menghadirkan Zona Panas Bumi di Taman Pintar Yogyakarta yang mulai dibuka untuk umum hari ini, Jumat (26/5). Zona Panas Bumi diresmikan dengan pengguntingan pita bersama Direktur Jenderal Energi Baru, Terbarukan, dan Konservasi Energi yang diwakili oleh Direktur Panas Bumi Yunus Saefulhak, Direktur Utama PGE Irfan Zainuddin, dan Wakil Walikota Yogyakarta Heru Purwadi.</p>','<p>\"Kita berada di sini dalam rangka mewariskan energi bersih untuk masa depan. (Diharapkan) dengan edukasi tentang panas bumi di Taman Pintar ini resistensi masyarakat akan turun, dan pengembangan panas bumi akan dapat sesuai target nasional,\" papar Yunus.\n\nTaman pintar ini merupakan destinasi wisata dengan pengunjung 1 juta lebih per tahunnya yang sebagian besar adalah pelajar usia sekolah dasar dan menengah. Oleh karena itu, lanjut Yunus, Taman Pintar diharapkan dapat mengedukasi para orang tua melalui penuturan anak-anaknya selepas berkunjung. \"Anak ini yang akan bercerita kepada orangtuanya kalau panas bumi adalah air yang ditanak sehingga keluar uap. Jadi tidak berbahaya, berbeda dengan energi fosil atau penambangan lainnya,\" tambah Yunus.\n\nYunus mengungkapkan, dari 28000 MW potensi panas bumi nasional saat ini yang sudah dimanfaatkan baru sekitar 1700 MW atau 6,2%. Saat ini sudah 9 Wilayah Kerja Panasbumi (WKP) sudah berproduksi, semuanya ramah lingkungan dan sustainable. \"Asal lingkungan di atasnya dijaga baik, uap dari lubang tersebut akan dapat terus dimanfaatkan, bahkan (PLTP) Kamojang hingga saat ini dapat beroperasi tanpa bahan bakar lainnya,\" ujarnya.\n\nYunus berharap, dalam 1-2 tahun ke depan keberadaan Zona Panas Bumi di Taman Pintar dapat mengubah persepsi panas bumi membahayakan dan mencemari lingkungan. \"Dalam pembangunan infrastuktur panas bumi memang ada yg dibongkar, namun sangat kecil, hanya 1-10% dibanding penambangan yg lain. Disini pengunjung diberikan pemahaman yang komprehensif bahwa panas bumi ini adalah energi yang ramah lingkungan, sustainable, dan memberikan dampak ekonomi bagi daerah penghasil,\" pungkas Yunus. (KHR)</p>','Edukasi Masyarakat, Zona Panas Bumi Hadir di Taman Pintar Yogyakarta -  Kementerian ESDM Republik Indonesia','Edukasi Masyarakat, Zona Panas Bumi, Yogyakarta, Kementerian ESDM','YOGYAKARTA - Guna memberikan edukasi tentang pemanfaatan dan pengembangan panas bumi di Indonesia, Kementerian Energi dan Sumber Daya Mineral (ESDM)',NULL,NULL,1),(2,'en','Community Education, Geothermal Zone Present at Taman Pintar Yogyakarta','<p><span class=\"first-letter\">Y</span>OGYAKARTA - To provide education on geothermal utilization and development in Indonesia, the Ministry of Energy and Mineral Resources (ESDM) in cooperation with PT Pertamina Geothermal Energy (PGE) and the Government of Yogyakarta presents the Geothermal Zone in Taman Pintar Yogyakarta which is open to the public Today, Friday (26/5). The Geothermal Zone was inaugurated with ribbon cutting with the Director General of New Energy, Renewable Energy and Energy Conservation represented by Director of Geothermal Yunus Saefulhak, PGE President Director Irfan Zainuddin and Vice Mayor of Yogyakarta Heru Purwadi.</p>','<p>\"We are here in order to pass on clean energy for the future.\" (Hopefully) with education on geothermal in Taman Pintar this community resistance will come down, and geothermal development will be able to fit the national target, \"Yunus said.\n\nThis smart park is a tourist destination with more than 1 million visitors per year, most of them are elementary and middle school students. Therefore, continued Yunus, Taman Pintar is expected to educate the parents through the narrative of his children after visiting. \"This child who will tell his parents if the geothermal is water that is dipan so steam out, so harmless, unlike the fossil energy or other mining,\" added Yunus.\n\nYunus revealed, of 28000 MW of the current national geothermal potential that has been utilized only about 1700 MW or 6.2%. Currently, 9 Working Areas of Panasbumi (WKP) are already in production, all are environmentally friendly and sustainable. \"The origin of the environment on it is well guarded, steam from the hole will continue to be utilized, even (PLTP) Kamojang until now can operate without other fuel,\" he said.\n\nYunus hopes that within the next 1-2 years the existence of Geothermal Zone in Taman Pintar can change the geothermal perception of harm and pollute the environment. \"In the construction of geothermal infrastructure there are indeed dismantled, but very small, only 1-10% compared to other mining.There visitors are given a comprehensive understanding that this geothermal energy is environmentally friendly, sustainable, and provide economic impacts for producing areas , \"Yunus concluded. (KHR)</p>','Community Education, Geothermal Zone Present at Taman Pintar Yogyakarta - Ministry of ESDM Republic of Indonesia','Community Education, Geothermal Zone, Yogyakarta, Ministry of ESDM','YOGYAKARTA - To provide education on geothermal utilization and development in Indonesia, the Ministry of Energy and Mineral Resources (ESDM)',NULL,NULL,1),(3,'id','Hemat Energi Upaya Mencapai Energi Berkeadilan','<p><span class=\"first-letter\">E</span>BTKE-- Energi merupakan pintu gerbang menuju ke peradaban modern. Hampir tidak ada kegiatan manusia modern yang tidak menggunakan energi.</p>','<p>Hal ini dikatakan oleh Direktur Konservasi Farida Zed dalam Acara Kampanye Hemat Energi “Potong 10%\", di Makassar, Minggu, 21 Mei 2017.</p>\n<p>\n\"Kebutuhan energi nasional terus meningkat dari waktu ke waktu sejalan dengan pertumbuhan pembangunan dan pertambahan jumlah penduduk. Selama 10 tahun terakhir, pertumbuhan konsumsi energi rata-rata naik sebesar 7 persen per tahun dan sampai saat ini 94 persen dari kebutuhan energi nasional masih dipenuhi dari sumber energi fosil yang tidak terbarukan yaitu minyak bumi, gas bumi dan batubara,\"ujar dia dalam sambutannya.</p>\n<p>\nNamun, lanjut dia, di sisi lain, sumber daya energi fosil terus mengalami penurunan, dengan kondisi seperti itu Pemerintah terus melakukan upaya untuk mencari dan mengembangkan pemanfaatan sumber energi terbarukan guna menjaga stabilitas suplai energi dalam negeri.</p>\n<p>\n\"Di samping upaya untuk mencari alternatif sumber energi terbarukan, maka upaya untuk melakukan penghematan energi memiliki peran sangat strategis,\"tutur Farida.</p>\n<p>\nMenurut dia, besarnya potensi penghematan energi ini membawa masyarakat dunia bersepakat untuk menempatkan penghematan energi (energi efisiensi) sebagai sumber energi pertama (first fuel). \"Hal ini sekaligus mengamanatkan bahwa sebelum kita menggunakan jenis energi apapun (termasuk energi terbarukan) maka yang perlu dilakukan terlebih dahulu adalah melakukan penghematan,\"tambahnya</p>\n<p>\nDengan demikian, lebih lanjut Farida mengatakan, maka gerakan untuk melakukan penghematan energi bukan lagi sebagai sebuah retorika tetapi merupakan bagian dari tanggung jawab moral pribadi, masyarakat, Badan Usaha dan seluruh komponen bangsa untuk melaksanakan penghematan dalam menggunakan energi.</p>\n<p>\n\"Di negara-negara maju, perilaku hemat energi sudah menjadi bagian dari budaya dan gaya hidup sehari-hari,\"tegasnya.</p>\n<p>\nSementara di Indonesia, Farida menjelaskan, hemat energi masih belum disadari manfaat dan peran strategisnya. \"Bila kita menengok ke beberapa negara maju, gerakan hemat energi justru diinisiasi oleh masyarakat, melalui kelompok- individu untuk melakukan upaya penghematan energi. Hemat energi adalah menggunakan energi secara bijak yaitu efisien dan rasional tanpa mengurangi kenyamanan, kesehatan & produktivitas,\"kata dia.</p>\n<p>\nBerangkat dari kenyataan diatas, Farida menekankan, Aksi Gerakan Hemat Energi “Potong 10%” bertujuan untuk mendorong kesadaran masyarakat mengenai hemat energi dan menjadikan hemat energi sebagai gaya hidup. Hal ini merupakan upaya untuk mencapai energi berkeadilan.</p>\n<p>\n\"Dengan melakukan penghematan konsumsi energi, maka kita dapat memberikan akses energi kepada Saudara-Saudara kita yang berada di daerah terpencil,\"tandasnya</p>\n<p>\nDari studi yang pernah dilakukan, lebih jauh, Farida mengungkapkan, terdapat potensi penghematan energi di berbagai sektor penggunaan energi seperti Rumah Tangga, Industri, Transportasi maupun di Gedung Komersial dan Fasilitas Umum dengan variasi mulai dari 10% - 40%. Menghemat 1 kilowatt hour (kWh) jauh lebih murah dan lebih mudah dibandingkan dengan memproduksi 1 kWh.</p>\n<p>\n\"Apabila kita menghemat penggunaan energi sebesar 10% dari penggunaan saat ini sebagaimana tema dari kampanye kita hari ini, maka dapat menunda pembangunan pembangkit listrik sebesar 2 GW yang nilainya sekitar Rp 18,4 Triliun,\"pungkasnya. (RWS)</p>','Hemat Energi Upaya Mencapai Energi Berkeadilan','Hemat Energi, Upaya Mencapai Energi Berkeadilan, Kementerian ESDM','EBTKE-- Energi merupakan pintu gerbang menuju ke peradaban modern. Hampir tidak ada kegiatan manusia modern yang tidak menggunakan energi.',NULL,NULL,2),(4,'en','Save Energy Efforts to Achieve Energy Justice','<p><span class=\"first-letter\">E</span>BTKE-- Energy is the gateway to modern civilization. There is hardly any modern human activity that does not use energy.</p>','<p>This was said by Farida Zed Conservation Director in the \"10% Cut Energy Saving Campaign\" Event, in Makassar, Sunday, May 21, 2017.</p>\n<p>\n\"National energy needs continue to increase from time to time in line with the growth of development and population growth Over the past 10 years, the average growth in energy consumption has increased by 7 percent per year and to date 94 percent of the national energy needs are still met from sources Non-renewable fossil fuels such as petroleum, natural gas and coal, \"he said in his speech.</p>\n<p>\nHowever, he continued, on the other hand, fossil energy resources continue to decline, with conditions like that the Government continues to make efforts to seek and develop the utilization of renewable energy sources in order to maintain the stability of domestic energy supply.</p>\n<p>\n\"In addition to efforts to find alternative renewable energy sources, then efforts to make energy savings have a very strategic role,\" said Farida.</p>\n<p>\nAccording to him, the magnitude of this energy saving potential brings the world community to agree on putting energy savings (energy efficiency) as the first fuel source. \"It is at once mandated that before we use any kind of energy (including renewable energy) then what needs to be done first is to make savings,\" he added</p>\n<p>\nThus, Farida further said, the movement to make energy savings is no longer as a rhetoric but is part of personal moral responsibility, society, business entities and all components of the nation to implement savings in energy use.</p>\n<p>\n\"In developed countries, energy-saving behavior has become part of the culture and everyday lifestyle,\" he said.</p>\n<p>\nWhile in Indonesia, Farida explained, energy saving is still not realized the benefits and strategic role. \"If we look to some developed countries, the movement of energy saving is actually initiated by the society, through groups to make energy saving efforts Energy efficient is to use energy wisely that is efficient and rational without reducing comfort, health & productivity,\" he said.</p>\n<p>\nBased on the above facts, Farida emphasized, \"10% Cut Energy Efficiency Movement\" aims to encourage public awareness about energy saving and energy-saving lifestyle. This is an attempt to achieve justice.</p>\n<p>\n\"By saving energy consumption, then we can provide energy access to our brothers who are in remote areas,\" he said</p>\n<p>\nFarida stated that there are potential energy savings in various energy sectors such as Household, Industry, Transportation or Commercial Building and Public Facilities with variations ranging from 10% - 40%. Saving 1 kilowatt hour (kWh) is much cheaper and easier than producing 1 kWh.</p>\n<p>\n\"If we save energy usage by 10% of current usage as the theme of our campaign today, then it can delay the construction of 2 GW power plant which is worth Rp 18.4 Trillion,\" he concluded. (RWS)</p>','Save Energy Efforts to Achieve Energy Justice','Save Energy, Effort to Achieve Energy Justice, Ministry of Energy and Mineral Resources','EBTKE-- Energy is the gateway to modern civilization. There is hardly any modern human activity that does not use energy.',NULL,NULL,2),(5,'id','Pemerintah dan Stakeholder Diskusikan Pengembangan EBT','<p>\n<span class=\"first-letter\">E</span>BTKE-- Kedutaan Besar Perancis untuk Indonesia, yang diwakili oleh Konsular Ekonomi Pascal Furth beserta kumpulan pengusaha Perancis dibidang Energi dan Energi Terbarukan atau French Renewable Energy for Indonesia (FREGI) mengadakan acara Breakfast Meeting, Rabu, 17 Mei 2017, di Jakarta.</p>','<p>\nDalam kesempatan tersebut, pihak Perancis mengundang Pemerintah Indonesia yang diwakili oleh Direktur Jenderal Energi Baru Terbarukan dan Konservasi Energi (Dirjen EBTKE), Kementerian Energi dan Sumber Daya Mineral (ESDM) Rida Mulyana beserta jajaran antara lain Sekretaris Direktorat Jenderal (Sesditjen) EBTKE Dadan Kusdiana, Direktur Panas Bumi Yunus Yunus Saefulhak dan Kepala Subdirektorat Penyiapan Program Aneka Energi Baru dan Energi Terbarukan Ibu Ida Nuryatin Finahari.</p>\n<p>\nAcara ini menjadi sarana bagi Pemerintah Indonesia dan FREGI untuk berdiskusi dan bertukar informasi terkait pengembangan serta pengusahaan energi terbarukan di Indonesia.</p>\n<p>\nAdapun isu yang dibahas antara lain  implementasi Peraturan Menteri (Permen) nomor 10 dan 12 tahun 2017, mekanisme penghitungan Biaya Pokok Produksi (BPP),  proses penentuan kuota dan sistem lelang pembangkit listrik tenaga surya (PLTS) dan pembangkit listrik tenaga angin (PLTB) potensi insentif untuk pengembang energi baru terbarukan, perbedaan pengusahaan panas bumi serta minyak dan gas (Migas), dan isu-isu menarik lainnya.</p>\n<p>\nBreakfast meeting ini juga dihadiri oleh institusi perancis seperti, Agence Française de Développement (AFD), Business France, Kamar Dagang dan Industri Indonesia (Kadin Indonesia).</p>','Pemerintah dan Stakeholder Diskusikan Pengembangan EBT','Pengembangan EBT','Pemerintah dan Stakeholder Diskusikan Pengembangan EBT',NULL,NULL,3),(6,'en','Government and Stakeholders Discuss Development of EBT','<p>\n<span class=\"first-letter\">E</span>BTKE-- The French Embassy for Indonesia, represented by the Consular Economy of Pascal Furth and a collection of French entrepreneurs in the Renewable Energy for Indonesia (FREGI) field organized the Breakfast Meeting on Wednesday, May 17, 2017, in Jakarta.</p>','<p>\nOn the occasion, the French invited the Government of Indonesia represented by the Director General of Renewable Energy and Energy Conservation (DG EBTKE), Ministry of Energy and Mineral Resources (ESDM) Rida Mulyana along with Secretary of Directorate General (Sesditjen) EBTKE Dadan Kusdiana, Director of Geothermal Yunus Yunus Saefulhak and Head of Subdirectorate of New Energy and Renewable Energy Renewal Program for Ida Nuryatin Finahari.</p>\n<p>\nThis event is a means for the Government of Indonesia and FREGI to discuss and exchange information related to the development and exploitation of renewable energy in Indonesia.</p>\n<p>\nThe issues discussed include the implementation of Ministerial Regulation (Permen) number 10 and 12 of 2017, the mechanism of calculating Cost of Production (BPP), the process of determining the quota and auction system of solar power plants (PLTS) and wind power plants (PLTB) potential Incentives for renewable energy developers, geothermal and oil and gas (oil and gas) concessions, and other interesting issues.</p>\n<p>\nBreakfast meeting is also attended by french institutions such as, Agence Française de Développement (AFD), Business France, Chamber of Commerce and Industry of Indonesia (Kadin Indonesia).</p>','Government and Stakeholders Discuss Development of EBT','Discuss Development of EBT','Government and Stakeholders Discuss Development of EBT',NULL,NULL,3);
/*!40000 ALTER TABLE `news_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_structure`
--

DROP TABLE IF EXISTS `organization_structure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization_structure` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) DEFAULT NULL,
  `thumbnail` varchar(150) DEFAULT NULL,
  `filename` varchar(150) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `order` int(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fullname_UNIQUE` (`fullname`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_structure`
--

LOCK TABLES `organization_structure` WRITE;
/*!40000 ALTER TABLE `organization_structure` DISABLE KEYS */;
INSERT INTO `organization_structure` VALUES (1,'Ir. Rida Mulyana, MSc','Ir-Rida-Mulyana-MSc.jpg',NULL,1,1,NULL,NULL,1),(2,'Dr. Ir. Dadan Kusdiana, M,Sc.','Ir-Rida-Mulyana-MSc.jpg','structure_01.jpg',1,2,NULL,NULL,1),(3,'Ir. Yunus Saefulhak, M.M., M.T.','Ir-Rida-Mulyana-MSc.jpg','structure_02.jpg',1,3,NULL,NULL,1);
/*!40000 ALTER TABLE `organization_structure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_structure_trans`
--

DROP TABLE IF EXISTS `organization_structure_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization_structure_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title_position` text,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `organization_structure_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_organization_structure_trans_1_idx` (`organization_structure_id`),
  CONSTRAINT `fk_organization_structure_trans_1` FOREIGN KEY (`organization_structure_id`) REFERENCES `organization_structure` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_structure_trans`
--

LOCK TABLES `organization_structure_trans` WRITE;
/*!40000 ALTER TABLE `organization_structure_trans` DISABLE KEYS */;
INSERT INTO `organization_structure_trans` VALUES (1,'id','Direktur Jenderal energi baru, terbarukan, dan konservasi energi','<p>\n<h3>DIREKTUR JENDERAL ENERGI BARU, TERBARUKAN, DAN KONSERVASI ENERGI</h3>\n</p>\n<p>\nDirektorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi mempunyai tugas menyelenggarakan perumusan dan pelaksanaan kebijakan di bidang pembinaan, pengendalian, dan pengawasan kegiatan panas bumi, bioenergi, aneka energi baru dan terbarukan, dan\nkonservasi energi.</p>\n<p>\nDirektorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi terdiri dari 6 unit kerja:</p>\n<ul>\n<li>Sekretariat Direktorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi;</li>\n<li>Direktorat Panas Bumi;</li>\n<li>Direktorat Bioenergi;</li>\n<li>Direktorat Aneka Energi Baru dan Energi Terbarukan;</li>\n<li>Direktorat Konservasi Energi;</li>\n<li>Direktorat Perencanaan dan Pembangunan Infrastruktur EBTKE</li>\n</ul>',NULL,NULL,1),(2,'en','Director General of new, renewable energy, and energy conservation','<p>\n<h3>DIRECTOR GENERAL OF NEW ENERGY, ENERGY AND ENERGY CONSERVATION</h3>\n</p>\n<p>\nThe Directorate General of New Energy, Renewable Energy and Conservation has the task of organizing the formulation and implementation of policies in the field of fostering, controlling and supervising geothermal, bioenergy, new and renewable energy activities, and\nEnergy conservation.</p>\n<p>\nThe Directorate General of New, Renewable and Energy Conservation consists of 6 work units:</p>\n<ul>\n<li> Secretariat of the Directorate General of New, Renewable Energy and Energy Conservation; </ li>\n<li> Directorate of Geothermal </ li>\n<li> Directorate of Bioenergy; </ li>\n<li> Directorate of New Energy and Renewable Energy </ li>\n<li> Directorate of Energy Conservation; </ li>\n<li> Directorate of Planning and Infrastructure Development EBTKE </ li>\n</ ul>',NULL,NULL,1),(3,'da','Generaldirektør for ny, vedvarende energi og energibesparelse','<p>\n<h3>DIREKTØR GENEREL AF NY ENERGI, ENERGI OG ENERGIBEVARING</h3>\n</p>\n<p>\nGeneraldirektoratet for Ny Energi, Vedvarende Energi og Bevarelse har til opgave at organisere udformningen og gennemførelsen af politikker inden for fremme, kontrol og overvågning af geotermisk, bioenergi, ny og vedvarende energiaktiviteter, og\nEnergibesparelse.</p>\n<p>\nGeneraldirektoratet for ny, vedvarende energi og energibesparelse består af 6 arbejdsenheder:</p>\n<ul>\n<li> Sekretariat for Generaldirektoratet for vedvarende energi og energibesparelser; </ li>\n<li> Direktoratet Geotermisk; </ li>\n<li> Direktoratet Bioenergi; </ li>\n<li> Direktoratet for Kunst, den Nye Energi og Vedvarende Energi </ li>\n<li> Direktoratet for energibesparelser; </ li>\n<li> Direktoratet for Planlægning og Infrastruktur Udvikling EBTKE </ li>\n</ ul>',NULL,NULL,1),(4,'id','Sekretaris Direktorat Jenderal energi baru, terbarukan, dan konservasi energi','<p>\n<h3>SEKRETARIS DIREKTORAT JENDERAL ENERGI BARU, TERBARUKAN, DAN KONSERVASI ENERGI</h3>\n</p>\nSekretariat Direktorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi mempunyai tugas melaksanakan koordinasi pelaksanaan tugas, pembinaan dan pemberian dukungan administrasi kepada seluruh unit organisasi di lingkungan Direktorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi.</p>',NULL,NULL,2),(5,'en','Secretary of Directorate General of new, renewable energy and energy conservation','<p>\n<h3>SECRETARY OF DIRECTORATE GENERAL OF NEW ENERGY, ENERGY AND CONSERVATION</h3>\n</p>\nSecretariat of the Directorate General of New Energy, Renewable Energy and Conservation has the duty to coordinate the implementation of tasks, guidance and administration support to all organizational units within the Directorate General of New Energy, Renewable Energy and Conservation.</p>',NULL,NULL,2),(6,'da','Generalsekretæren for ny energi, vedvarende, og energibesparelser','<p>\n<h3>GENERALDIREKTORAT energiminister NY, VEDVARENDE og energibesparelser</h3>\n</p>\n<p>Sekretariatet for Generaldirektoratet for vedvarende energi og energibesparelser har til opgave at koordinere gennemførelsen af de opgaver, coaching og yde administrativ støtte til alle organisatoriske enheder inden for Generaldirektoratet for vedvarende energi og energibesparelser.</p>',NULL,NULL,2),(7,'id','Direktur Panas Bumi','<p>\n<h3>DIREKTUR PANAS BUMI</h3>\n</p>\n<p>Direktorat Panas Bumi mempunyai tugas melaksanakan perumusan dan pelaksanaan kebijakan, penyusunan norma, standar, prosedur, dan kriteria, pemberian bimbingan teknis dan supervisi, evaluasi dan pelaporan, serta pengendalian dan pengawasan di bidang penyiapan program, pengawasan eksplorasi dan eksploitasi, pelayanan dan bimbingan usaha, investasi, dan kerja sama, keteknikan dan lingkungan panas bumi.</p>',NULL,NULL,3),(8,'en','Director of Geothermal','<p>\n<h3> DIRECTOR OF HOT EARTH </h3>\n</p>\n<p> The Directorate of Geothermal has the task of executing the formulation and execution of policies, the compilation of norms, standards, procedures and criteria, the provision of technical guidance and supervision, evaluation and reporting, as well as control and supervision in the field of program preparation, exploration and exploitation, Business guidance, investment, and cooperation, engineering and geothermal environments. </p>',NULL,NULL,3),(9,'da','Director Geotermisk','<p>\n<h3> DIREKTØR FOR GEOTERMISK </h3>\n</p>\n<p> Direktoratet Jordvarme har opgaver politikformulering og implementering, udarbejdelse af normer, standarder, procedurer og kriterier, der giver teknisk vejledning og supervision, evaluering og rapportering, samt kontrol og tilsyn inden for områderne forberedelse program, overvågning af efterforskning og udnyttelse, service og vejledning af virksomheder, investeringer og samarbejde, teknik og geotermisk miljø. </p>',NULL,NULL,3);
/*!40000 ALTER TABLE `organization_structure_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `potentials`
--

DROP TABLE IF EXISTS `potentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `potentials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(4) DEFAULT NULL COMMENT 'tahun',
  `total_population` varchar(30) DEFAULT NULL COMMENT 'jumlah penduduk',
  `total_waste` varchar(45) DEFAULT NULL COMMENT 'Total Sampah',
  `potentials_region_id` int(5) DEFAULT NULL,
  `tpa_name` varchar(45) DEFAULT NULL,
  `tpa_wide` varchar(45) DEFAULT NULL COMMENT 'luas tpa ',
  `tpa_capacity` varchar(45) DEFAULT NULL,
  `tpa_address` text,
  `tpa_cordinat` varchar(45) DEFAULT NULL,
  `tpa_schema_management` text,
  `organic_trash` varchar(45) DEFAULT NULL,
  `plastic_trash` varchar(45) DEFAULT NULL,
  `paper_trash` varchar(45) DEFAULT NULL,
  `textiles_trash` varchar(45) DEFAULT NULL,
  `rubber_trash` varchar(45) DEFAULT NULL,
  `logam_trash` varchar(45) DEFAULT NULL,
  `glass_trash` varchar(45) DEFAULT NULL,
  `other_trash` varchar(45) DEFAULT NULL,
  `rdf` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_1_idx` (`potentials_region_id`),
  CONSTRAINT `fk_potentials_region_1` FOREIGN KEY (`potentials_region_id`) REFERENCES `potentials_region` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `potentials`
--

LOCK TABLES `potentials` WRITE;
/*!40000 ALTER TABLE `potentials` DISABLE KEYS */;
/*!40000 ALTER TABLE `potentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `potentials_city_region`
--

DROP TABLE IF EXISTS `potentials_city_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `potentials_city_region` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_name` varchar(70) NOT NULL,
  `potentials_region_id` int(5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `city_name_UNIQUE` (`city_name`),
  KEY `fk_1_idx` (`potentials_region_id`),
  CONSTRAINT `fk_potentials_region` FOREIGN KEY (`potentials_region_id`) REFERENCES `potentials_region` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `potentials_city_region`
--

LOCK TABLES `potentials_city_region` WRITE;
/*!40000 ALTER TABLE `potentials_city_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `potentials_city_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `potentials_region`
--

DROP TABLE IF EXISTS `potentials_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `potentials_region` (
  `id` int(10) NOT NULL,
  `region_name` varchar(70) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `region_name_UNIQUE` (`region_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `potentials_region`
--

LOCK TABLES `potentials_region` WRITE;
/*!40000 ALTER TABLE `potentials_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `potentials_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo`
--

DROP TABLE IF EXISTS `seo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `key` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo`
--

LOCK TABLES `seo` WRITE;
/*!40000 ALTER TABLE `seo` DISABLE KEYS */;
INSERT INTO `seo` VALUES (1,'seo:landing:news','2017-06-07 10:15:33',1),(2,'seo:company:organization-structure','2017-06-07 10:15:33',1),(3,'seo:company:history','2017-06-07 10:15:33',1),(4,'seo:company:vision-mission','2017-06-07 10:15:33',1),(5,'seo:company:scope-of-services','2017-06-07 10:15:33',1),(6,'seo:white-paper:landing','2017-06-07 10:15:33',1);
/*!40000 ALTER TABLE `seo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo_trans`
--

DROP TABLE IF EXISTS `seo_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seo_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `meta_title` varchar(100) NOT NULL,
  `meta_keyword` text NOT NULL,
  `meta_description` text NOT NULL,
  `seo_id` int(10) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_seo_trans_1_idx` (`seo_id`),
  CONSTRAINT `fk_seo_trans_1` FOREIGN KEY (`seo_id`) REFERENCES `seo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo_trans`
--

LOCK TABLES `seo_trans` WRITE;
/*!40000 ALTER TABLE `seo_trans` DISABLE KEYS */;
INSERT INTO `seo_trans` VALUES (1,'id','Kementerian ESDM Republik Indonesia | Berita dan Kegiatan','Berita dan Kegiatan','Kementerian ESDM Republik Indonesia | Berita dan Kegiatan',1,'2017-06-07 07:39:45','2017-06-07 07:39:45'),(2,'en','Ministry ESDM Republic Of Indonesia | Event And News','Event And News','Ministry ESDM Republic Of Indonesia | Event And News',1,'2017-06-07 07:39:45','2017-06-07 07:39:45'),(3,'en','Organization Structure','Organization Structure','Organization Structure',2,'2017-06-07 07:39:45','2017-06-07 07:39:45'),(4,'id','Struktur Organisasi','Struktur Organisasi','Struktur Organisasi',2,'2017-06-07 07:39:45','2017-06-07 07:39:45'),(5,'en','Company History','Company History','Company History',3,'2017-06-07 07:39:45','2017-06-07 07:39:45'),(6,'id','Sejarah Perusahaan','Sejarah Perusahaan','Sejarah Perusahaan',3,'2017-06-07 07:39:45','2017-06-07 07:39:45'),(7,'id','Cakupan pelayanan LINTAS','Cakupan pelayanan LINTAS','Cakupan pelayanan LINTAS',5,'2017-06-14 11:36:24','2017-06-14 11:36:24'),(8,'en','LINTAS scope of works','LINTAS scope of works','LINTAS scope of works',5,'2017-06-14 11:36:24','2017-06-14 11:36:24'),(9,'id','Menjadi gerbang energi bersih di Indonesia','Menjadi gerbang energi bersih di Indonesia','Menjadi gerbang energi bersih di Indonesia',4,'2017-06-14 11:36:24','2017-06-14 11:36:24'),(10,'en','Gateway to clean energy in Indonesia - Lintas energi bersih Indonesia','Gateway to clean energy in Indonesia - Lintas energi bersih Indonesia','Gateway to clean energy in Indonesia - Lintas energi bersih Indonesia',4,'2017-06-14 11:36:24','2017-06-14 11:36:24'),(11,'en','white papers','white papers','white papers',6,'2017-06-14 11:36:24','2017-06-14 11:36:24'),(12,'id','kertas putih','kertas putih','kertas putih',6,'2017-06-14 11:36:24','2017-06-14 11:36:24');
/*!40000 ALTER TABLE `seo_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribe`
--

DROP TABLE IF EXISTS `subscribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscribe` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribe`
--

LOCK TABLES `subscribe` WRITE;
/*!40000 ALTER TABLE `subscribe` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tools`
--

DROP TABLE IF EXISTS `tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tools` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(80) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `version` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `tools_type` varchar(20) DEFAULT NULL COMMENT 'free',
  `platform` varchar(100) DEFAULT NULL,
  `manufacture` varchar(70) DEFAULT NULL,
  `download` int(10) DEFAULT NULL,
  `rating` int(10) DEFAULT NULL,
  `user_ip` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `file_upload` varchar(150) DEFAULT NULL,
  `file_size` varchar(10) DEFAULT NULL,
  `thumbnail` varchar(150) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  UNIQUE KEY `filename_UNIQUE` (`filename`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tools`
--

LOCK TABLES `tools` WRITE;
/*!40000 ALTER TABLE `tools` DISABLE KEYS */;
INSERT INTO `tools` VALUES (1,'CCleaner','ccleaner','5.31.6105','English','free','Windows','System Care',NULL,NULL,NULL,1,'ccleaner.exe','4.5 MB','6067__ccleaner_icon.png',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tools_related`
--

DROP TABLE IF EXISTS `tools_related`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tools_related` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tools_id` int(10) DEFAULT NULL,
  `tools_related_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tools_related_1_idx` (`tools_id`),
  KEY `fk_tools_related_2_idx` (`tools_related_id`),
  CONSTRAINT `fk_tools_related_1` FOREIGN KEY (`tools_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tools_related_2` FOREIGN KEY (`tools_related_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tools_related`
--

LOCK TABLES `tools_related` WRITE;
/*!40000 ALTER TABLE `tools_related` DISABLE KEYS */;
/*!40000 ALTER TABLE `tools_related` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tools_trans`
--

DROP TABLE IF EXISTS `tools_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tools_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `description` text,
  `tools_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tools_trans_1_idx` (`tools_id`),
  CONSTRAINT `fk_tools_trans_1` FOREIGN KEY (`tools_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tools_trans`
--

LOCK TABLES `tools_trans` WRITE;
/*!40000 ALTER TABLE `tools_trans` DISABLE KEYS */;
INSERT INTO `tools_trans` VALUES (1,'en','Probably the most popular freeware cleaner globally with over 2 billion downloads since its launch in 2003. Piriform’s CCleaner is a quick and easy to use program which makes your computer faster, more secure and more reliable. CCleaner removes cookies, temporary files and various other unused data that clogs up your operating system. This frees up valuable hard disk space allowing your system to run faster. Removing this data also protects your anonymity meaning you can browse online more securely. The built in Registry Cleaner fixes errors and broken settings to make your computer more stable. The simple, intuitive UI and rapid but powerful cleaning make CCleaner a favourite among novices and techies alike. Professional, Network, Business and Technician Editions of CCleaner are also available for serious users.',1,NULL,NULL),(2,'id','Mungkin freeware freeware paling populer secara global dengan lebih dari 2 miliar unduhan sejak diluncurkan pada tahun 2003. Piriform\'s CCleaner adalah program yang cepat dan mudah digunakan yang membuat komputer Anda lebih cepat, lebih aman dan lebih dapat diandalkan. CCleaner menghapus cookies, file sementara dan berbagai data lain yang tidak terpakai yang menyumbat sistem operasi Anda. Ini membebaskan ruang hard disk yang berharga yang memungkinkan sistem Anda berjalan lebih cepat. Menghapus data ini juga melindungi anonimitas Anda yang berarti Anda dapat menjelajah secara online dengan lebih aman. Yang dibangun di Registry Cleaner memperbaiki kesalahan dan pengaturan yang rusak agar komputer Anda lebih stabil. UI yang sederhana dan intuitif dan pembersihan yang cepat namun kuat membuat CCleaner menjadi favorit di antara para pemula dan teknisi. Profesional, Jaringan, Bisnis dan Teknisi Edisi CCleaner juga tersedia untuk pengguna yang serius.',1,NULL,NULL);
/*!40000 ALTER TABLE `tools_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `white_paper`
--

DROP TABLE IF EXISTS `white_paper`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `white_paper` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `slug` varchar(150) DEFAULT NULL,
  `file` varchar(150) DEFAULT NULL,
  `downloaded` int(10) DEFAULT NULL,
  `rating` int(10) DEFAULT NULL,
  `user_ip` varchar(100) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `white_paper`
--

LOCK TABLES `white_paper` WRITE;
/*!40000 ALTER TABLE `white_paper` DISABLE KEYS */;
INSERT INTO `white_paper` VALUES (1,'invisible_apps.JPG','invisible-apps','invisible-apps.pdf',NULL,NULL,NULL,1,'2017-06-14 17:33:43','2017-06-14 17:33:43',1);
/*!40000 ALTER TABLE `white_paper` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `white_paper_trans`
--

DROP TABLE IF EXISTS `white_paper_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `white_paper_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text,
  `white_paper_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_1_idx` (`white_paper_id`),
  CONSTRAINT `fk_1` FOREIGN KEY (`white_paper_id`) REFERENCES `white_paper` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `white_paper_trans`
--

LOCK TABLES `white_paper_trans` WRITE;
/*!40000 ALTER TABLE `white_paper_trans` DISABLE KEYS */;
INSERT INTO `white_paper_trans` VALUES (1,'en','The arrival of the Invisible Apps ','<p>Admit it, we have become slaves of our own screens, some even speak of the \'screen generation\' and they are right. <br>\r\n<br>\r\nWith the new devices that are out on the market such as smart watches and Apple TV’s, our screen time increases every day. But how intelligent are and become these screens? Let us tell you all about it! </p>',1,'2017-06-14 05:41:43','2017-06-14 05:41:43'),(2,'id','Kedatangan Aplikasi Yang Memungkinkan','\r\n<p> Akui saja, kita telah menjadi budak layar kita sendiri, beberapa bahkan berbicara tentang \'generasi layar\' dan mereka benar. <br>\r\n<br>\r\nDengan perangkat baru yang beredar di pasaran seperti jam tangan pintar dan Apple TV, waktu layar kita meningkat setiap hari. Tapi seberapa cerdas dan menjadi layar ini? Mari kita ceritakan semuanya tentang itu! </p>',1,'2017-06-14 11:42:35','2017-06-14 11:42:35');
/*!40000 ALTER TABLE `white_paper_trans` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-18 20:30:34
