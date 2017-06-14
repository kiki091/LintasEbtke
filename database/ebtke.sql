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
INSERT INTO `news` VALUES (1,'thumbnail_002.jpg','edukasi-masyarakat-zona-panas-bumi-hadir-di-taman-pintar-yogyakarta',1,1,11,'2017-06-07 07:39:45','2017-06-07 07:39:45',NULL,1),(2,'thumbnail_002.jpg','hemat-energi-upaya-mencapai-energi-berkeadilan',2,1,5,'2017-06-07 07:39:45','2017-06-07 07:39:45',NULL,1),(3,'thumbnail_002.jpg','pemerintah-dan-stakeholder-diskusikan-pengembangan-ebt',3,1,2,'2017-06-07 07:39:45','2017-06-07 07:39:45',NULL,2);
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

-- Dump completed on 2017-06-15  0:38:19
