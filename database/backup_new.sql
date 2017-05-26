-- MySQL dump 10.13  Distrib 5.7.13, for linux-glibc2.5 (x86_64)
--
-- Host: localhost    Database: pusri_db
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
  `thumbnail` varchar(200) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `is_landing` int(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'thumbnail-perusahaan.jpg',1,1,1,NULL,NULL),(2,'thumbnail-produk.jpg',2,1,1,NULL,NULL),(3,'thumbnail-distribusi-marketing.jpg',3,1,1,NULL,NULL),(4,'thumbnail-laporan.jpg',4,1,0,NULL,NULL),(5,'thumbnail-gcg.jpg',5,1,0,NULL,NULL),(6,'thumbnail-csr.jpg',6,1,1,NULL,NULL),(7,NULL,7,1,0,NULL,NULL),(8,NULL,8,1,0,NULL,NULL),(9,'thumbnail-recruitment.gif',9,1,1,NULL,NULL);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_trans`
--

DROP TABLE IF EXISTS `category_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `category_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_category_trans_1_idx` (`category_id`),
  CONSTRAINT `fk_category_trans_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_trans`
--

LOCK TABLES `category_trans` WRITE;
/*!40000 ALTER TABLE `category_trans` DISABLE KEYS */;
INSERT INTO `category_trans` VALUES (1,'id','Perusahaan','peusahaan',1,NULL,NULL),(2,'en','Company','company',1,NULL,NULL),(3,'id','Produk','produk',2,NULL,NULL),(4,'en','Product','product',2,NULL,NULL),(5,'id','Distribusi & Penjualan','distribusi-dan-penjualan',3,NULL,NULL),(6,'en','Distribution And Marketing','distribution-and-marketing',3,NULL,NULL),(7,'id','Laporan','laporan',4,NULL,NULL),(8,'en','Report','report',4,NULL,NULL),(9,'id','GCG','gcg',5,NULL,NULL),(10,'en','GCG','gcg-overview',5,NULL,NULL),(11,'id','CSR','csr',6,NULL,NULL),(12,'en','CSR','csr-program',6,NULL,NULL),(13,'id','Berita & Kegiatan','berita-dan-kegiatan',7,NULL,NULL),(14,'en','News & Event','news-and-event',7,NULL,NULL),(15,'id','Hubungi Kami','hubungi-kami',8,NULL,NULL),(16,'en','Contact Us','contact-us',8,NULL,NULL),(17,'id','Penerimaan','penerimaan',9,NULL,NULL),(18,'en','Recruitment','recruitment',9,NULL,NULL);
/*!40000 ALTER TABLE `category_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_certification`
--

DROP TABLE IF EXISTS `company_certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_certification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(45) DEFAULT NULL,
  `order` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `category_id` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_certification_1_idx` (`category_id`),
  CONSTRAINT `fk_company_certification_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_certification`
--

LOCK TABLES `company_certification` WRITE;
/*!40000 ALTER TABLE `company_certification` DISABLE KEYS */;
INSERT INTO `company_certification` VALUES (1,'filename.jpg','1',NULL,NULL,1);
/*!40000 ALTER TABLE `company_certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_certification_trans`
--

DROP TABLE IF EXISTS `company_certification_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_certification_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `information` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `company_certification_id` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_certification_trans_1_idx` (`company_certification_id`),
  CONSTRAINT `fk_company_certification_trans_1` FOREIGN KEY (`company_certification_id`) REFERENCES `company_certification` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_certification_trans`
--

LOCK TABLES `company_certification_trans` WRITE;
/*!40000 ALTER TABLE `company_certification_trans` DISABLE KEYS */;
INSERT INTO `company_certification_trans` VALUES (1,'en','Green Proper Charter',NULL,NULL,NULL,1),(2,'id','Piagam Proper Hijau',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `company_certification_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_identity`
--

DROP TABLE IF EXISTS `company_identity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_identity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `category_id` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_identity_1_idx` (`category_id`),
  CONSTRAINT `fk_company_identity_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_identity`
--

LOCK TABLES `company_identity` WRITE;
/*!40000 ALTER TABLE `company_identity` DISABLE KEYS */;
INSERT INTO `company_identity` VALUES (1,'filename.jpg',NULL,NULL,1);
/*!40000 ALTER TABLE `company_identity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_identity_trans`
--

DROP TABLE IF EXISTS `company_identity_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_identity_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(65) DEFAULT NULL,
  `slug` varchar(150) NOT NULL,
  `introduction` varchar(280) DEFAULT NULL,
  `side_description` text,
  `description` longtext,
  `company_identity_id` int(5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_company_identity_trans_1_idx` (`company_identity_id`),
  CONSTRAINT `fk_company_identity_trans_1` FOREIGN KEY (`company_identity_id`) REFERENCES `company_identity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_identity_trans`
--

LOCK TABLES `company_identity_trans` WRITE;
/*!40000 ALTER TABLE `company_identity_trans` DISABLE KEYS */;
INSERT INTO `company_identity_trans` VALUES (1,'en','Corporate Identity Overview','corporate-identity-overview','It is essential for a company to stay consistent, particularly for its identity in any communication forms.','A corporate identity is all representations or visual and physical media manifestation displaying a corporate identity, so the company is distinguishable from other companies.','<p><span class=\"first-letter\">I</span>n Public Relations, the relation of Corporate Identity is described in corporate identity dynamics stated by Hacth and Schultz. The dynamics model states that corporate identity has a close relation with the corporate culture and corporate image. Internally, corporate identity is associated to culture / adopted by the company. Yet externally, corporate identity has a close relation with corporate image. Currently, corporate identity has been recognized as a strategic resource and a source of competitive advantage. </p><p>PT Pupuk Sriwidjaja Palembang is renowned as a company that has been socialized and recognized with a unique logo and name. Yet, PT Pupuk Sriwidjaja Palembang’s logo and name is sometimes applied in various shape and colors.</p><p>That is the reason why PT Pupuk Sriwidjaja Palembang (or abbreviated as PT Pusri Palembang) has set a fixed standard logo and company’s name, so all PT Pusri Palembang stakeholders who are about to use its logo and PT Pusri Palembang name on its communication to PT Pusri Palembang both formal and informally must use the standard we set. It is to make a consistency and uniformity.</p><p>Perceptual uniformity in the application of logos, colors, and consistent typography is essential to maintain a strong brand in the market. And the most important of all is the unity of the spirit of all related parties both inside and outside PT Pusri Palembang to achieve the common goal of making PT Pusri Palembang a big company that plays an active role in creating a food prosperous and the self-sufficient Indonesia. </p>',1,NULL,NULL),(2,'id','Sekilas Identitas Perusahaan','sekilas-identitas-perusahaan','Dalam bentuk komunikasi apapun, sangat penting bagi sebuah Perusahaan untuk menjaga konsistensinya, salah satunya adalah konsistensi terhadap identitasnya.','Identitas perusahaan atau jati diri perusahaan (corporate identity) adalah semua perwakilan atau perwujudan media visual dan fisik yang menampilkan suatu jati diri Perusahaan sehingga dapat membedakan perusahaan tersebut dengan Perusahaan lainnya. ','<p><span class=\"first-letter\">D</span>alam bidang public relations, relasi identitas Perusahaan dijelaskan dalam bentuk model dinamika identitas Perusahaan yang dikemukakan oleh Hacth and Schultz . Model dinamika tersebut menyebutkan bahwa identitas Perusahaan memiliki relasi dengan budaya perusahaan (corporate culture) dan citra perusahaan (corporate image). Secara internal, identitas Perusahaan terkait dengan kultur / budaya yang dianut oleh Perusahaan. Namun, secara eksternal, identitas Perusahaan memiliki keterkaitan dengan citra perusahaan. Saat ini, identitas Perusahaan telah diakui sebagai sumber daya yang strategis dan sumber keunggulan yang kompetitif.</p><p>PT Pupuk Sriwidjaja Palembang sebagai sebuah Perusahaan yang sudah berdiri dan bersosialisasi dengan masyarakat telah dikenal dengan logo dan namanya yang khas. Namun dalam aplikasinya logo dan nama PT Pupuk Sriwidjaja Palembang\nterkadang digunakan dengan banyak variasi bentuk dan warna.</p><p>Untuk itulah kini PT Pupuk Sriwidjaja Palembang (atau disingkat PT Pusri Palembang) telah menetapkan standar logo dan nama perusahaan sehingga semua stakeholders PT Pusri Palembang yang ingin menggunakan logo dan nama PT Pusri Palembang dalam komunikasinya baik secara formal maupun informal dengan PT Pusri Palembang diharapkan untuk memakai standar yang sama, untuk konsistensi dan keseragaman.</p><p>Keseragaman persepsi dalam penerapan logo, warna, dan tipografi yang konsisten sangatlah penting jika ingin menjaga kehadiran brand yang kuat di pasaran. Dan yang paling penting adalah kesatuan semangat semua pihak yang berkepentingan baik di dalam maupun di luar lingkungan PT Pusri Palembang untuk mencapai tujuan bersama yaitu menjadikan PT Pusri Palembang menjadi perusahaan besar yang berperan aktif dalam mewujudkan Indonesia yang makmur dan berswasembada pangan.</p>',1,NULL,NULL);
/*!40000 ALTER TABLE `company_identity_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_management`
--

DROP TABLE IF EXISTS `company_management`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_management` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `foto_images` varchar(150) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` varchar(45) DEFAULT NULL,
  `category_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_management_1_idx` (`category_id`),
  CONSTRAINT `fk_company_management_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_management`
--

LOCK TABLES `company_management` WRITE;
/*!40000 ALTER TABLE `company_management` DISABLE KEYS */;
INSERT INTO `company_management` VALUES (1,'foto.jpg',1,'1',1,NULL,NULL);
/*!40000 ALTER TABLE `company_management` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_management_trans`
--

DROP TABLE IF EXISTS `company_management_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_management_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `fullname` varchar(150) DEFAULT NULL,
  `history` text,
  `company_management_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_management_trans_1_idx` (`company_management_id`),
  CONSTRAINT `fk_company_management_trans_1` FOREIGN KEY (`company_management_id`) REFERENCES `company_management` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_management_trans`
--

LOCK TABLES `company_management_trans` WRITE;
/*!40000 ALTER TABLE `company_management_trans` DISABLE KEYS */;
INSERT INTO `company_management_trans` VALUES (1,'en','Commissioner','Achmad Tossin Sutawikara, SE, MM','Achmad Tossin Sutawikara born in Bandung on May 1, 1958 , obtained his degree as Bachelor of Economics majoring in Accounting from the University of Padjadjaran Bandung in 1983 and obtained his Master degree in Marketing Management in 1994. And then he joined PT Pupuk Kujang as the staff of the Bureau of Finance in 1983 , then received several positions.  He has served a position as Head of Compartment Administration and Finance in 2001 , and as Financial Director in 2004 - 2010. He also has served as President Director since November 12, 2010. He has served as a Commissioner of PT Pupuk Sriwidjaja Palembang on  September 3, 2012 to January 2016 , due to his appointment as Director of Human Resources & Governance of  PT Pupuk Indonesia ( Persero ) . Then on April 20, 2016 formally served as a Commissioner of PT Pusri Palembang',1,NULL,NULL),(2,'id','Komisaris','Achmad Tossin Sutawikara, SE, MM','Achmad Tossin Sutawikara Lahir di Bandung tanggal 1 Mei 1958, memperoleh gelar Sarjana Ekonomi jurusan Akuntansi dari Universitas Padjajaran Bandung tahun 1983 dan gelar Magister Manajemen Pemasaran tahun 1994. Bergabung dengan PT Pupuk Kujang sebagai staf di Biro Keuangan pada tahun 1983, kemudian menjabat di beberapa posisi. Pernah menjabat sebagai Kepala Kompartemen Administrasi dan Keuangan tahun 2001, sebagai Direktur Keuangan pada 2004 - 2010. Menjabat sebagai Direktur Utama sejak 12\nNovember 2010. Menjabat sebagai Komisaris PT Pupuk Sriwidjaja Palembang pada 3 September 2012 hingga Januari 2016, seiring dengan penunjukannya sebagai Direktur SDM &  Tata Kelola PT Pupuk Indonesia (Persero). Kemudian pada tanggal 20 April 2016 resmi menjabat sebagai Komisaris Utama PT Pusri Palembang.',1,NULL,NULL);
/*!40000 ALTER TABLE `company_management_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_point`
--

DROP TABLE IF EXISTS `company_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_point` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `category_id` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_point_1_idx` (`category_id`),
  CONSTRAINT `fk_company_point_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_point`
--

LOCK TABLES `company_point` WRITE;
/*!40000 ALTER TABLE `company_point` DISABLE KEYS */;
INSERT INTO `company_point` VALUES (1,'filename.jpg',NULL,NULL,1);
/*!40000 ALTER TABLE `company_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_point_trans`
--

DROP TABLE IF EXISTS `company_point_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_point_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(65) NOT NULL,
  `slug` varchar(150) DEFAULT NULL,
  `introduction` varchar(280) DEFAULT NULL,
  `side_description` text,
  `description` text,
  `company_point_id` int(5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `fk_company_point_trans_1_idx` (`company_point_id`),
  CONSTRAINT `fk_company_point_trans_1` FOREIGN KEY (`company_point_id`) REFERENCES `company_point` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_point_trans`
--

LOCK TABLES `company_point_trans` WRITE;
/*!40000 ALTER TABLE `company_point_trans` DISABLE KEYS */;
INSERT INTO `company_point_trans` VALUES (2,'en','Company Values','company-values','Strength is invaluable in realizing the company\'s vision. ','Implementing company values consistently and by discipline through individual’s awareness is our invaluable values to realize the vision of company.','<h3 class=\"blue_color\">Integrity</h3>\n<p>A behavior reflecting a correspondency between mind, utterence and action. <br><br></p>\n<img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"><br><ol>\n<li>Utter and Act Honestly with nothing to hide</li>\n<li>Take upon to report any fraudulence and wrongdoing based on the data and facts.</li>\n<li>Act consistently by words.</li>\n<li>Work earnestly.</li>\n<li>Work responsibly as a worship.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Commit acts that harm the company.</li>\n<li>Misuse corporate assets and authorities for personal interest.</li>\n<li>Be easily to shift ground and break own words.</li>\n<li>Take or receive gift/bribe/gratification from other parties beyond the procedures.</li>\n<li>Work lazily and at will regardless the rules and orders of superior.</li>\n</ol><br>\n<h3 class=\"blue_color\">Professional</h3>\n<p>Ready to carry out tasks in accordance with capabilities and knowledge with full of responsibility and creativity. <br><br></p>\n<img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"><br><ol>\n<li>Dare to act correctly, accurately and fast in favor of the company.</li>\n<li>Carry out task thoroughly with full responsibility.</li>\n<li>Always improve competency and knowledge.</li>\n<li>Think creatively and present innovative ideas.</li>\n<li>Work effectively and efficiently to manage the time.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Be lazy and delay task accomplishment.</li>\n<li>Allow old conditions to keep going on and reluctant to produce creative new conditions.</li>\n<li>Be averse to adaptation to competency and skill in line with the advancement technology.</li>\n<li>Ignore any existing regulations and procedures.</li>\n<li>Be easily satisfied and pleased with existing achievement</li>\n</ol><br>\n<h3><span class=\"blue_color\">Focus On Consumer<br></span></h3>\n<p>Prioritizing the satisfaction and fulfillment of the needs of all customers as expected. <br><br><img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"></p>\n<ol>\n<li>Be attentive and responsive to complaints and customer needs.</li>\n<li>Reduce unnecessary bureaucracy.</li>\n<li>Swiftly provide solutions and anticipate potential issues.</li>\n<li>Maintain good relations with customer (maintaining networking).</li>\n<li>Next process is our customer.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Respond customers indifferently with no respect.</li>\n<li>Be convoluted and delay service responses.</li>\n<li>Allow customer to wait without service.</li>\n<li>Blame the customer for the complaints delivered.</li>\n<li>Ignore customer potential as business sustainability factor.</li>\n</ol><br>\n<h3 class=\"blue_color\">Loyality</h3>\n<p>Obey the rules and management, keep the harmony between employees with leadership to preserve the values and global vision. <br><br></p>\n<img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"><br><ol>\n<li>Prioritize to the company interest over personal, group and class interest.</li>\n<li>Obey existing Regulations and Procedures and implement them consistently.</li>\n<li>Obey the company’s leadership and executive management line.</li>\n<li>Maintain confidentiality and company good image with full of responsibility.</li>\n<li>Revere the honor and values of the company.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Be selfish and seek advantage for personal and group interest.</li>\n<li>Disclose company’s secret.</li>\n<li>Intentionally discredit the company’s good reputation or do amoral conducts.</li>\n<li>Steal, use or destruct the company’s assets.</li>\n<li>Disperse negative issues causing conflicts in the company.</li>\n</ol>\n<h3 class=\"blue_color\">&nbsp;</h3>\n<h3 class=\"blue_color\">Good Prejudice</h3>\n<p>Always be with positive perspective in responding everything. <br><br></p>\n<img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"><br><ol>\n<li>Prioritize trust principle.</li>\n<li>Willingly listen to opinion objectively and entirely.</li>\n<li>Be emphatic when interacting with others.</li>\n<li>Position ourselves to fully understand before coming to an opinion.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Easily suspect and have negative presupposition before the facts.</li>\n<li>Underestimate others for groundless assumption.</li>\n<li>Judge with no facts and do believe in one side only.</li>\n<li>Respond any things with bad prejudice and focus on negative matters.</li>\n<li>Easily give up against challenge, hard condition and changing situation.</li>\n</ol>\n<h3 class=\"blue_color\"><br><br></h3>',1,NULL,NULL),(3,'id','Tata Nilai Perusahaan','tata-nilai-perusahaan','Kekuatan tidak ternilai dalam mewujudkan Visi perusahaan.','Penerapan Tata Nilai Perusahaan secara konsisten dan disiplin melalui kesadaran masing-masing individu, adalah kekuatan tidak ternilai kami dalam mewujudkan Visi perusahaan.','<h3 class=\"blue_color\">Integritas</h3>\n<p>Perilaku yang mencerminkan kesesuaian antara pikiran, perkataan dan perbuatan.<br><br></p>\n<img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"><br><ol>\n<li>Berkata dan bertindak jujur tanpa menyembunyikan fakta yang ada.</li>\n<li>Berani melaporkan kesalahan dan kecurangan yang terjadi sesuai data dan fakta yang sebenarnya.</li>\n<li>Konsisten bertindak sesuai perkataan.</li>\n<li>Bekerja dengan ikhlas.</li>\n<li>Bekerja bertanggung-jawab sebagai ibadah.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Melakukan kecurangan yang merugikan perusahaan.</li>\n<li>Menyalahgunakan aset dan kewenangan perusahaan untuk&nbsp; kepentingan pribadi.</li>\n<li>Mudah berubah pendirian dan mangkir dari perkataannya sendiri.</li>\n<li>Menerima imbalan / suap / gratifkasi dari pihak lain untuk hal&nbsp; yang menyalahi prosedur.</li>\n<li>Bekerja malas, semaunya tanpa mengindahkan peraturan dan perintah atasan.</li>\n</ol><br>\n<h3 class=\"blue_color\">Profesional</h3>\n<p>Sigap melaksanakan tugas sesuai dengan kemampuan serta pengetahuan dengan bertanggung jawab dan kreatifitas tinggi.<br><br></p>\n<img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"><br><ol>\n<li>Berani bertindak secara benar, tepat dan cepat untuk kepentingan perusahaan.</li>\n<li>Melaksanakan tugas hingga tuntas dengan bertanggungjawab.</li>\n<li>Senantiasa meningkatkan kompetensi dan pengetahuan.</li>\n<li>Berpikir kreatif dan menyampaikan gagasan inovatif.</li>\n<li>Bekerja efektif dan efisien mengelola waktu.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Malas dan menunda penyelesaian tugas.</li>\n<li>Membiarkan keadaan lama berlangsung dan enggan&nbsp; menghasilkan hal baru yang kreatif.</li>\n<li>Enggan menyesuaikan diri pada kompetensi dan keahlian&nbsp; sesuai perkembangan teknologi yang berlangsung.</li>\n<li>Bekerja mengabaikan peraturan dan prosedur yang ada .</li>\n<li>Mudah puas dan nyaman dengan pencapaian yang ada.</li>\n</ol><br>\n<h3><span class=\"blue_color\">Fokus Pada Pelanggan</span></h3>\n<p>Prioritas pada kepuasan dan pemenuhan kebutuhan pelanggan internal dan eksternal sesuai harapan. <br><br><br><img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"></p>\n<ol>\n<li>Memperhatikan dan tanggap terhadap keluhan dan kebutuhan pelanggan.</li>\n<li>Memotong birokrasi yang tidak perlu.</li>\n<li>Sigap memberikan solusi dan mengantisipasi masalah yang mungkin terjadi.</li>\n<li>Memelihara hubungan baik dengan pelanggan (maintainin networking)</li>\n<li>Menjadikan proses selanjutnya sebagai pelanggan (next process is our customer)</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Acuh tak acuh tanpa respek menanggapi pelanggan.</li>\n<li>Berbelit-belit dan menunda respon pelayanan.</li>\n<li>Membiarkan pelanggan menunggu tanpa tindakan pelayanan.</li>\n<li>Menyalahkan pelanggan atas keluhan yang disampaikan.</li>\n<li>Mengabaikan potensi pelanggan sebagai faktor keberlangsungan usaha.</li>\n</ol><br>\n<h3 class=\"blue_color\">Loyalitas</h3>\n<p>Taat peraturan, patuh pada pimpinan, serta menjaga kesatuan hati antara pimpinan dengan karyawan demi melindungi nilai dan mencapai visi.<br><br></p>\n<img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"><br><ol>\n<li>Mengutamakan kepentingan perusahaan diatas kepentingan pribadi, golongan dan kelompok.</li>\n<li>Taat Peraturan dan Prosedur yang ada serta konsisten&nbsp; menjalankannya.</li>\n<li>Patuh pada pimpinan dan lini manajemen eksekutif&nbsp; perusahaan.</li>\n<li>Menjaga kerahasiaan dan citra baik perusahaan dengan&nbsp; penuh tanggungjawab.</li>\n<li>Menjunjung tinggi kehormatan dan nilai-nilai perusahaan.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Mementingkan diri sendiri dan mencari keuntungan demi kepentingan pribadi dan golongan.</li>\n<li>Mengkhianati perusahaan dan pimpinan dengan tindakan yang merugikan</li>\n<li>Membocorkan rahasia perusahaan.</li>\n<li>Menjelekkan nama baik perusahaan dengan sengaja atau dengan tindakan pribadi yang melanggar moral.</li>\n<li>Mencuri, menggunakan semena-mena serta merusak aset- aset perusahaan.</li>\n<li>&nbsp;Menyebarkan isu negatif yang mengakibatkan perpecahan dalam perusahaan.</li>\n</ol>\n<h3 class=\"blue_color\">&nbsp;</h3>\n<h3 class=\"blue_color\">Baik Sangka</h3>\n<p>Selalu bersikap atau menanggapi segala hal dari perspektif positif.<br><br></p>\n<img src=\"http://www.pusri.co.id/css/img/uploaded/check.png\" alt=\"\" width=\"35\" height=\"33\"><br><ol>\n<li>Mengedepankan asas percaya.</li>\n<li>Bersedia mendengarkan pendapat dengan obyektif dan sepenuhnya.</li>\n<li>Memiliki empati saat berinteraksi dengan orang lain.</li>\n<li>Menempatkan diri untuk memahami secara utuh sebelum menyimpulkan pendapat.</li>\n</ol><br><img src=\"http://www.pusri.co.id/css/img/uploaded/cross.png\" alt=\"\" width=\"36\" height=\"33\"><br><ol>\n<li>Mudah curiga dan berprasangka negatif sebelum menerima informasi lengkap.</li>\n<li>Memandang rendah orang lain karena asumsi yang tidak berdasar.</li>\n<li>Menghakimi tanpa kejelasan fakta dan percaya sepihak saja.</li>\n<li>Merespon segala sesuatu dengan prasangka buruk serta berpusat pada hal-hal negatif saja.</li>\n<li>Mudah menyerah pada tantangan, keadaan sulit dan kondisi yang berubah.</li>\n</ol>\n<h3 class=\"blue_color\"><br><br></h3>',1,NULL,NULL);
/*!40000 ALTER TABLE `company_point_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_profile`
--

DROP TABLE IF EXISTS `company_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_profile` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `is_active` int(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `created_by` int(1) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `category_id` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_company_profile_1_idx` (`category_id`),
  CONSTRAINT `fk_company_profile_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_profile`
--

LOCK TABLES `company_profile` WRITE;
/*!40000 ALTER TABLE `company_profile` DISABLE KEYS */;
INSERT INTO `company_profile` VALUES (1,1,NULL,1,NULL,1);
/*!40000 ALTER TABLE `company_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_profile_trans`
--

DROP TABLE IF EXISTS `company_profile_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_profile_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(10) DEFAULT NULL,
  `title` varchar(65) DEFAULT NULL,
  `slug` varchar(75) DEFAULT NULL,
  `side_description` text,
  `highlight_description` text,
  `description` text,
  `meta_title` varchar(65) DEFAULT NULL,
  `meta_keyword` text,
  `meta_description` text,
  `company_profile_id` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_profile_trans`
--

LOCK TABLES `company_profile_trans` WRITE;
/*!40000 ALTER TABLE `company_profile_trans` DISABLE KEYS */;
INSERT INTO `company_profile_trans` VALUES (1,'en','Company Overview','company-overview','<p class=\"blue_text\">PT Pupuk Sriwidjaja conducts its business operation with the purpose of implementing and supporting government’s policies and programs in economy field and national development, particularly in fertilizer industry and other agricultural products.</p>','<p class=\"blue_color\">For more than 50 years, Pusri has deliver significant contribution for&nbsp; the development of national fertilizer industry, food security, and national prosperity.</p>','<p><span class=\"first-letter\">P</span>T Pupuk Sriwidjaja Palembang (Pusri) was initiated as the pioneer of urea fertilizer producer in Indonesia. The company was established with the name PT Pupuk Sriwidjaja (Persero), on 24th December 1959 in Palembang, South Sumatera, Indonesia. Pusri engaged its business operation with main purpose to perform and support government’s policies and programs in economy and national development sector, particularly in fertilizer industry and other agricultural products. Pusri’s extensive history as a pioneer of national fertilizer producer for over 50 years has proven its capability and commitment in carrying out the important duty mandated by the government.</p>\n\n<p>In addition to be national fertilizer producer, Pusri also bears the duty to carry out trade, services and other businesses related to fertilizer industry. Pusri is responsible in performing distribution and marketing for subsidized fertilizer to farmers as a form of Public Service Obligation (PSO) implementation, supporting national provision program by prioritizing fertilizer production and distribution for farmers throughout Indonesia. The trading of non-subsidized urea fertilizer in which to fulfill fertilizer needs for plantation, industry, and export demand is a part of company’s other business operation outside from the responsibility of Public Service Obligation tasks.</p>\n\n<p>As a company which is responsible for national fertilizer industry continuance, Pusri has experienced various management and authority rearrangement closely related with government policies. At present, Pusri officially operates under the name of PT Pupuk Srwiwidjaja Palembang with Pusri as the same brand and trademark.</p>','Company Overview','Pupuk, Urea, Pupuk Subsidi, Pupuk Non Subsidi, Amoniak','PT Pupuk Sriwidjaja Palembang (Pusri) adalah Badan Usaha Milik Negara yang didirikan sebagai pelopor produsen pupuk urea di Indonesia',1,NULL,NULL),(2,'id','Sekilas Perusahaan','sekilas-perusahaan','<span class=\"blue_text\">Pusri menjalankan operasi bisnisnya dengan tujuan utama untuk melaksanakan dan menunjang kebijaksanaan dan program pemerintah di bidang ekonomi dan pembangunan nasional, khususnya di industri pupuk dan produk agribisnis lainnya.</span>','<div class=\"text_bg_blue add_fix\"><div>Selama</div><div>lebih</div><div>dari</div><div>50</div><div>tahun,</div><div>Pusri</div><div>telah</div><div>memberikan</div><div>kontribusi</div><div>yang</div><div>signifikan</div><div>bagi</div><div>kemajuan</div><div>industri</div><div>pupuk,</div><div>ketahanan</div><div>pangan</div><div>dan</div><div>kemakmuran</div><div>nasional.</div></div>','<p><span class=\"first-letter\">P</span>T Pupuk Sriwidjaja Palembang (Pusri) adalah perusahaan yang didirikan sebagai pelopor produsen pupuk urea di Indonesia pada tanggal 24 Desember 1959 di Palembang Sumatera Selatan, dengan nama PT Pupuk Sriwidjaja (Persero). Pusri memulai operasional usaha dengan tujuan utama untuk melaksanakan dan menunjang kebijaksanaan dan program pemerintah di bidang ekonomi dan pembangunan nasional, khususnya di industri pupuk dan kimia lainnya. Sejarah panjang Pusri sebagai pelopor produsen pupuk nasional selama lebih dari 50 tahun telah membuktikan kemampuan dan komitmen kami dalam melaksanakan tugas penting yang diberikan oleh pemerintah.<br><br>Selain sebagai produsen pupuk nasional, Pusri juga mengemban tugas dalam melaksanakan usaha perdagangan, pemberian jasa dan usaha lain yang berkaitan dengan industri pupuk. Pusri bertanggung jawab dalam melaksanakan distribusi dan pemasaran pupuk bersubsidi kepada petani sebagai bentuk pelaksanaan <em>Public Service Obligation</em> (PSO) untuk mendukung program pangan nasional dengan memprioritaskan produksi dan pendistribusian pupuk bagi petani di seluruh wilayah Indonesia. Penjualan pupuk urea non subsidi sebagai pemenuhan kebutuhan pupuk sektor perkebunan, industri maupun eksport menjadi bagian kegiatan perusahaan yang lainnya diluar tanggung jawab pelaksanaan <em>Public Service Obligation</em> (PSO). <br><br>Sebagai perusahaan yang bertanggung jawab atas kelangsungan industri pupuk nasional, Pusri telah mengalami berbagai perubahan dalam manajemen dan wewenang yang sangat berkaitan dengan kebijakan-kebijakan pemerintah. Saat ini Pusri secara resmi beroperasi dengan nama PT Pupuk Sriwidjaja Palembang dengan tetap menggunakan brand dan merk dagang Pusri.</p>','Sekilas Perusahaan','Pupuk, Urea, Pupuk Subsidi, Pupuk Non Subsidi, Amoniak','PT Pupuk Sriwidjaja Palembang (Pusri) adalah Badan Usaha Milik Negara yang didirikan sebagai pelopor produsen pupuk urea di Indonesia',1,NULL,NULL);
/*!40000 ALTER TABLE `company_profile_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gcg`
--

DROP TABLE IF EXISTS `gcg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gcg` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(200) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `is_landing` int(1) DEFAULT NULL,
  `tag_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_gcg_1_idx` (`tag_id`),
  CONSTRAINT `fk_gcg_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gcg`
--

LOCK TABLES `gcg` WRITE;
/*!40000 ALTER TABLE `gcg` DISABLE KEYS */;
INSERT INTO `gcg` VALUES (1,'thumbnail-gcg.jpg','banner-gcg.jpg',1,1,1,3,NULL,NULL);
/*!40000 ALTER TABLE `gcg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gcg_trans`
--

DROP TABLE IF EXISTS `gcg_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gcg_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `side_description` text,
  `description` text,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `gcg_id` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_gcg_trans_1_idx` (`gcg_id`),
  CONSTRAINT `fk_gcg_trans_1` FOREIGN KEY (`gcg_id`) REFERENCES `gcg` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gcg_trans`
--

LOCK TABLES `gcg_trans` WRITE;
/*!40000 ALTER TABLE `gcg_trans` DISABLE KEYS */;
INSERT INTO `gcg_trans` VALUES (1,'en','GCG Overview','good-corporate-governance-overview','The implementation of Good Corporate Governance (GCG) is an obligation and important basis to achieve the realization of vision and mission and the company business continuation. ','<p><span class=\"first-letter\">P</span>T Pusri Palembang, starts of the operational employee, manager, and general manager, head of SPI, company secretary up to the Director and Commissioner, really aware it.</p><p>PT Pusri Palembang always fulfills GCG rules and principles issued by Government Cq ministry of SOE. It is carried out well by the management by following up Minister of SOE Master Plan 1998 which positioned GCG as one of eight pillars of SOE to reach world standard company.</p><p>The management has also fulfilled its obligation of SOE Reformation Master Plan in May, 2010 about the policy of GCG implementation in SOE in the form of President Director Letter No. 1387/100.0T/2000, on December 19, 2000, about the policy of GCG implementation in all company scopes. The letter is also equipped by forming PUSRI GCG Implementation Team pursuant to the decree of the Board of directors.</p><p>The decree of Minister of SOE No. Kep.-117/MMBU/2002, August 1, 2002, about the implementation of GCG practices has also been PUSRI’s strong basis to keep improving the management to achieve sustainable GCG implementation.</p><p>And currently has been renewed by Ministry of SOE rules Kep.-117/MMBU/2002, August 1, 2011, about a Good Corporate Governance Implementation</p>','PT Pupuk Sriwidjaja Palembang (Pusri)','Fertilizer, Urea, fertilizer subsidies, fertilizer Unsubsidized, Ammonia','PT Pupuk Sriwidjaja Palembang (Pusri) is a State Owned Enterprise which was established as a pioneer manufacturer of urea fertilizer in Indonesia',1,NULL,NULL),(2,'id','Sekilas GCG','sekilas-good-corporate-governance','Penerapan tata kelola perusahaan yang baik Good Corporate Governance (GCG) merupakan keharusan dan landasan penting bagi keberhasilan mewujudkan visi dan misi serta kelangsungan usaha perusahaan. ','<p><span class=\"first-letter\">H</span>al itu sangat disadari oleh seluruh jajaran manajemen PT Pusri Palembang mulai dari Karyawan Pelaksana, Manajer, General Manager, Kepala SPI, Sekretaris Perusahaan hingga Direksi dan Komisaris, sebagaimana tercermin dalam setiap Laporan Tahunan Perusahaan dari tahun ke tahun. </p><p>PT Pusri Palembang senantiasa memenuhi kaidah-kaidah serta aturan GCG yang ditetapkan oleh Pemerintah Cq Kementerian BUMN. Hal itu dilaksanakan dengan baik oleh manajemen dengan menindaklanjuti Master Plan Meneg BUMN tahun 1998 yang meletakkan GCG sebagai salah satu dari delapan pondasi BUMN untuk menuju perusahaan berstandar dunia.</p><p>Manajemen juga telah memenuhi kewajiban sebagaimana dituangkan dalam Master Plan Reformasi BUMN bulan Mei tahun 2000 tentang kebijakan penerapan GCG di BUMN. Bentuknya berupa Surat Direktur Utama No. 1387/100.0T/2000, tanggal 19 Desember 2000, tentang kebijakan penerapan GCG di seluruh lingkup kerja perusahaan. Surat tersebut juga dilengkapi dengan dibentuknya Tim Penerapan GCG PUSRI melalui Surat Keputusan Direksi tanggal 31 Januari 2001. </p><p>Keputusan Menteri BUMN No. Kep.-117/MMBU/2002, tanggal 1 Agustus 2002, tentang penerapan praktek GCG, juga telah menjadi landasan kuat PUSRI untuk membenahi terus manajemen menuju penerapan GCG yang berkelanjutan, sekaligus merupakan payung hukum bagi penerapan GCG oleh perusahaan.</p><p>Dan kini telah diperbarui dengan Peraturan Menteri BUMN No. PER-01/MBU/2011 tanggal 1 Agustus 2011 tentang Penerapan Tata Kelola Perusahaan Yang Baik.<p>','PT Pupuk Sriwidjaja Palembang (Pusri)','Pupuk, Urea, Pupuk Subsidi, Pupuk Non Subsidi, Amoniak','PT Pupuk Sriwidjaja Palembang (Pusri) adalah Badan Usaha Milik Negara yang didirikan sebagai pelopor produsen pupuk urea di Indonesia',1,NULL,NULL);
/*!40000 ALTER TABLE `gcg_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gp3k`
--

DROP TABLE IF EXISTS `gp3k`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gp3k` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(200) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `is_landing` int(1) DEFAULT NULL,
  `tag_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gp3k`
--

LOCK TABLES `gp3k` WRITE;
/*!40000 ALTER TABLE `gp3k` DISABLE KEYS */;
INSERT INTO `gp3k` VALUES (1,'thumbnail.jpg','filename.jpg',1,1,1,4,NULL,NULL);
/*!40000 ALTER TABLE `gp3k` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gp3k_report`
--

DROP TABLE IF EXISTS `gp3k_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gp3k_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `years` int(4) DEFAULT NULL,
  `table_report` text,
  `description` text,
  `tag_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_gp3k_report_1_idx` (`tag_id`),
  CONSTRAINT `fk_gp3k_report_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gp3k_report`
--

LOCK TABLES `gp3k_report` WRITE;
/*!40000 ALTER TABLE `gp3k_report` DISABLE KEYS */;
INSERT INTO `gp3k_report` VALUES (1,'en',2011,'<table class=\"res-table table_keuangan\" cellspacing=\"1\" cellpadding=\"0\">\n<tbody>\n<tr class=\"title_table\">\n<td colspan=\"6\"><strong>GP3K</strong> <br>PT Pupuk Sriwidjaja Palembang 2011 Year<br> <strong>(unit:Ha)</strong></td>\n</tr>\n<tr><th>Number</th><th>Province</th><th>Program of Cultivation 2011</th><th>Relation Cultivation 2011 ( Juli - Des )</th><th>Relation Harvest (Juli-Des) 2011</th><th>Carry Over ( CO ) Harvest at MT I 2012 year</th></tr>\n<tr>\n<td>1</td>\n<td>Sumsel</td>\n<td>15.000</td>\n<td>12.942</td>\n<td>7.741 *)</td>\n<td>5.201</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Lampung</td>\n<td>6.000</td>\n<td>938</td>\n<td>938</td>\n<td>0</td>\n</tr>\n<tr class=\"total\">\n<td colspan=\"2\">Total</td>\n<td>21.000</td>\n<td>13.880</td>\n<td>8.679</td>\n<td>5.201</td>\n</tr>\n</tbody>\n</table>',NULL,5,NULL,NULL),(2,'id',2011,'<table class=\"res-table table_keuangan\" cellspacing=\"1\" cellpadding=\"0\">\n<tbody>\n<tr class=\"title_table\">\n<td colspan=\"6\"><strong>GP3K</strong> <br>PT Pupuk Sriwidjaja Palembang Tahun 2011<br> <strong>(satuan:Ha)</strong></td>\n</tr>\n<tr><th>No</th><th>Propinsi</th><th>Rencana Tanam 2011</th><th>Realisasi Tanam 2011 ( Juli - Des )</th><th>Realisasi Panen (Juli-Des) 2011</th><th>Carry Over ( CO ) Panen ke MT I Thn 2012</th></tr>\n<tr>\n<td>1</td>\n<td>Sumsel</td>\n<td>15.000</td>\n<td>12.942</td>\n<td>7.741 *)</td>\n<td>5.201</td>\n</tr>\n<tr>\n<td>2</td>\n<td>Lampung</td>\n<td>6.000</td>\n<td>938</td>\n<td>938</td>\n<td>0</td>\n</tr>\n<tr class=\"total\">\n<td colspan=\"2\">Jumlah</td>\n<td>21.000</td>\n<td>13.880</td>\n<td>8.679</td>\n<td>5.201</td>\n</tr>\n</tbody>\n</table>',NULL,5,NULL,NULL);
/*!40000 ALTER TABLE `gp3k_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gp3k_trans`
--

DROP TABLE IF EXISTS `gp3k_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gp3k_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `slug` varchar(200) NOT NULL,
  `description` text,
  `meta_title` varchar(200) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `gp3k_id` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_gp3k_trans_1_idx` (`gp3k_id`),
  CONSTRAINT `fk_gp3k_trans_1` FOREIGN KEY (`gp3k_id`) REFERENCES `gp3k` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gp3k_trans`
--

LOCK TABLES `gp3k_trans` WRITE;
/*!40000 ALTER TABLE `gp3k_trans` DISABLE KEYS */;
INSERT INTO `gp3k_trans` VALUES (1,'en','GP3K Overview','gp3k-overview','<p><span class=\"first-letter\">G</span>P3K is a form of BUMN support in the framework of national food security program with a national rice surplus target of 10 million tons in the period 2011-2015. In line with Presidential Instruction No. 5 years 2011: State-Owned Enterprises play an active role in maintaining food security, therefore the GP3K Program (Corporate Based Food Production Improvement Program) is launched by the Ministry of State-Owned Enterprises as one of the government\'s efforts to help realize the achievement of the national food surplus.</p><p>As the oldest fertilizer company in Indonesia, PT PUSRI has made a major contribution in the development of national agriculture. In line with the agricultural intensification program launched by the government in order to achieve food self-sufficiency, especially rice, the role of PUSRI as a fertilizer producer is more strategic.</p><p>In achieving these targets, in addition to increasing the efficiency of production costs so that the cost of fertilizer can be reduced as efficiently as possible, PT PUSRI also streamline the system of distribution of fertilizer to farmers with the principle of 6 precisely, namely; On time, type, dose, quantity, price and place.</p><p>Surplus of 10 million tons of rice in 2014 is a program that must be done with hard work and with a special method, for the government to implement GP3K and PT PUSRI become one of the operators who implement GP3K in 8 regions; South Sumatra, Lampung, Central Java, Banten, Bengkulu, Bangka Belitung, Jambi and Yogyakarta.</p><p>The steps of PT PUSRI to meet the target are 9 main programs of GP3K PUSRI which include:</p>','GP3K Overview','Fertilizer, Urea, Subsidized Fertilizer, Non Subsidized Fertilizer, Ammonia','PT Pupuk Sriwidjaja Palembang (Pusri) is a State Owned Enterprise established as a pioneer of urea fertilizer producer in Indonesia',1,NULL,NULL),(2,'id','Sekilas GP3K','sekilas-gp3k','<p><span class=\"first-letter\">G</span>P3K merupakan bentuk dukungan BUMN dalam rangka program ketahanan pangan nasional dengan target surplus beras nasional 10 juta ton dalam kurun waktu 2011-2015. Sejalan dengan Inpres No. 5 thn 2011: BUMN ikut berperan aktif dalam menjaga ketahanan pangan, oleh karena itu dicanangkanlah Program GP3K (Gerakan Peningkatan Produksi Pangan Berbasis Korporasi) oleh Kementrian Negara BUMN sebagai salah satu usaha pemerintah untuk membantu mewujudkan pencapaian surplus pangan nasional tersebut.</p><p>Sebagai perusahaan pupuk tertua di Indonesia, PT PUSRI telah memberikan kontribusi besar dalam pembangunan pertanian nasional. Sejalan dengan program intensifikasi pertanian yang dicanangkan pemerintah dalam rangka mencapai swasembada pangan, khususnya padi, maka peranan PUSRI sebagai produsen pupuk semakin strategis.</p><p>Dalam mencapai sasaran tersebut, selain meningkatkan efisiensi biaya produksi sehingga biaya pupuk dapat ditekan seefisien mungkin, PT PUSRI juga mengefektifkan sistim pendistribusian pupuk ke petani dengan prinsip 6 tepat, yaitu; tepat waktu, jenis, dosis, jumlah, harga dan tempat.</p><p>Surplus 10 juta ton beras pada tahun 2014 merupakan program yang harus dilakukan dengan kerja keras dan dengan metode khusus, untuk itu pemerintah melaksanakan GP3K dan PT PUSRI menjadi salah satu operator yang melaksanakan GP3K di 8 wilayah yaitu; Sumatera Selatan, Lampung, Jawa Tengah, Banten, Bengkulu, Bangka Belitung, Jambi dan DIY.</p><p>Langkah-langkah PT PUSRI untuk memenuhi sasaran tersebut berupa 9 program utama GP3K PUSRI yang meliputi:</p>\n','Sekilas GP3K','Pupuk, Urea, Pupuk Subsidi, Pupuk Non Subsidi, Amoniak','PT Pupuk Sriwidjaja Palembang (Pusri) adalah Badan Usaha Milik Negara yang didirikan sebagai pelopor produsen pupuk urea di Indonesia',1,NULL,NULL);
/*!40000 ALTER TABLE `gp3k_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_banner`
--

DROP TABLE IF EXISTS `main_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `main_banner` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `key` varchar(100) DEFAULT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_banner`
--

LOCK TABLES `main_banner` WRITE;
/*!40000 ALTER TABLE `main_banner` DISABLE KEYS */;
INSERT INTO `main_banner` VALUES (1,'banner:mainbanner:landing','banner-home-1.jpg',1,1,NULL,NULL),(2,'banner:mainbanner:landing','banner-home-2.jpg',2,1,NULL,NULL),(3,'banner:mainbanner:landing','banner-home-3.jpg',3,1,NULL,NULL),(4,'banner:mainbanner:landing','banner-home-4.jpg',4,1,NULL,NULL),(5,'banner:mainbanner:landing','banner-home-5.jpg',5,1,NULL,NULL),(6,'banner:mainbanner:company','banner-company.jpg',1,1,NULL,NULL),(7,'banner:mainbanner:career','banner-career.jpg',1,1,NULL,NULL);
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
  `title` varchar(200) DEFAULT NULL,
  `description` text,
  `main_banner_id` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_main_banner_trans_1_idx` (`main_banner_id`),
  CONSTRAINT `fk_main_banner_trans_1` FOREIGN KEY (`main_banner_id`) REFERENCES `main_banner` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_banner_trans`
--

LOCK TABLES `main_banner_trans` WRITE;
/*!40000 ALTER TABLE `main_banner_trans` DISABLE KEYS */;
INSERT INTO `main_banner_trans` VALUES (1,'id','Mencapai Kesejahteraan Bersama','Semua usaha yang Pusri lakukan selalu berorientasi untuk mewujudkan kesejahteraan bagi semua pemangku kepentingan dan bangsa Indonesia.',1,NULL,NULL),(2,'en','Achieving Common Welfare','Pusri activities are always oriented in achieving welfare for all stakeholders and the nation.',1,NULL,NULL),(3,'id','Mencapai Kompetensi Unggul','Bagi Pusri, tidak ada batas untuk selalu meningkatkan dan memperkaya tingkat kompetensi bagi semua individu.',2,NULL,NULL),(4,'en','Achieving Excellent Competency','Pusri sees no limits in improving and enriching all individualsâ€™ competency level.',2,NULL,NULL),(5,'id','Mencapai Pertumbuhan Berkelanjutan','Pusri akan selalu mencari inovasi-inovasi dan terobosan-terobosan baru untuk mencapai pertumbuhan berkelanjutan yang sanggup memenuhi kebutuhan masa depan.',3,NULL,NULL),(6,'en','Achieving Sustainable Growth','Pusri will continuously seek for new innovations and breakthroughs to achieve sustainable growth to meet future needs.',3,NULL,NULL),(7,'id','Mencapai Keunggulan Bersaing','Pusri mengoptimalkan sumber daya yang tersedia untuk memberikan pupuk dengan kualitas prima.',4,NULL,NULL),(8,'en','Achieving Competitive Excellence','Pusri optimizes the available resources to provide high quality fertilizer.',4,NULL,NULL),(9,'id','Mencapai Reliabilitas Tinggi','Pusri memprioritaskan kebutuhan sektor pertanian dan perkebunan dalam negeri maupun luar negeri.',5,NULL,NULL),(10,'en','Achieving Advanced Reliability','Pusri prioritizes agriculture and plantation sector need domestically as well as internationally.',5,NULL,NULL),(11,'id','Sekilas Tentang Perusahaan','Pusri menjalankan operasi bisnisnya dengan tujuan utama untuk melaksanakan dan menunjang kebijaksanaan dan program pemerintah di bidang ekonomi dan pembangunan nasional, khususnya di industri pupuk dan produk agribisnis lainnya.',6,NULL,NULL),(12,'en','Company Overview','PT Pupuk Sriwidjaja conducts its business operation with the purpose of implementing and supporting government’s policies and programs in economy field and national development, particularly in fertilizer industry and other agricultural products.',6,NULL,NULL),(13,'id','Lowongan','Informasi lengkap Rekrutmen Pusri Tahun 2015 yang sedang berjalan dapat dilihat di  <a href=\"www.rekrutmenpusri.com\">www.rekrutmenpusri.com</a>',7,NULL,NULL),(14,'en','Vacancy ','Detailed information Recruitment Pusri 2015 that are running can be found at <a href=\"www.rekrutmenpusri.com\"> www.rekrutmenpusri.com </a>',7,NULL,NULL);
/*!40000 ALTER TABLE `main_banner_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `class` varchar(100) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `is_dropdown` int(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(1) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'dropdown yamm-fw',1,1,1,NULL,NULL,NULL),(2,'dropdown yamm-fw',2,1,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_trans`
--

DROP TABLE IF EXISTS `menu_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `menu_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_trans`
--

LOCK TABLES `menu_trans` WRITE;
/*!40000 ALTER TABLE `menu_trans` DISABLE KEYS */;
INSERT INTO `menu_trans` VALUES (1,'id','Perusahaan','peusahaan',1,NULL,NULL),(2,'en','Company','company',1,NULL,NULL),(3,'id','Produk','produk',2,NULL,NULL),(4,'en','Product','product',2,NULL,NULL);
/*!40000 ALTER TABLE `menu_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_and_event`
--

DROP TABLE IF EXISTS `news_and_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_and_event` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(100) DEFAULT NULL,
  `filename` varchar(100) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `is_landing` int(1) DEFAULT NULL,
  `tag_id` int(5) DEFAULT NULL,
  `publised` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_and_event_1_idx` (`tag_id`),
  CONSTRAINT `fk_news_and_event_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_and_event`
--

LOCK TABLES `news_and_event` WRITE;
/*!40000 ALTER TABLE `news_and_event` DISABLE KEYS */;
INSERT INTO `news_and_event` VALUES (1,'news_1.jpg','news_1.jpg',1,1,1,1,'2016-12-30',NULL,NULL),(2,'news_2.jpg','news_2.jpg',1,1,1,2,'2017-02-09',NULL,NULL);
/*!40000 ALTER TABLE `news_and_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news_and_event_trans`
--

DROP TABLE IF EXISTS `news_and_event_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news_and_event_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `side_description` text,
  `description` text,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `news_and_event_id` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_news_and_event_trans_1_idx` (`news_and_event_id`),
  CONSTRAINT `fk_news_and_event_trans_1` FOREIGN KEY (`news_and_event_id`) REFERENCES `news_and_event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_and_event_trans`
--

LOCK TABLES `news_and_event_trans` WRITE;
/*!40000 ALTER TABLE `news_and_event_trans` DISABLE KEYS */;
INSERT INTO `news_and_event_trans` VALUES (1,'en','Pt Pusri implementing packing fertilizer in the last year 2016 and early in the year 2017','pt-pusri-implementing-packing-fertilizer-in-the-last-year-2016-and-early-in-the-year-2017','Palembang - Year 2016 was a year full of challenges for PT Pusri Palembang, having to deal with various problems and issues. Among the factories PT Pusri Palembang who are old and wasteful, high gas prices that have an impact on the selling price of a commercial product becomes difficult to compete and coupled with the influx of fertilizer products of competitors from abroad that offer haga cost of production is lower than the national fertilizer.','<p>In addition to facing a lot of obstacles and problems, in this year PT Pusri Palembang also achieved success among others, PT Pusri Palembang succeeded in making the product in the packaging retail and opened up Pusri Mart in some city in Indonesia with a total of 23 (twenty three) outlets spread in Central Java, Yogyakarta, Lampung, South Sumatra, Babel, Bengkulu and Jambi. Then Progress revitalization project Pusri IIB, STG Boiler Coal, Jetty, Urea Bulk Storage and Conveyor System this year has entered the final stage. On 30 September 2016, Factory Pusri IIB also been successful in producing urea and ammonia followed by First Drop on November 3, 2016. PT Pusri Palembang will continue to carry out the development by building a factory PUSRI IIIB and NPK plant Fushion II as well as other projects.\n</p>\n<p>\nSecara keseluruhan pada Tahun 2016 produksi pabrik eksisting untuk Urea mencapai 100% dan Amonia sebesar 102,14%. Dari sektor penyaluran dan pengadaan pupuk bersubsidi, di Tahun 2016 PT Pusri Palembang telah menyalurkan pupuk urea lebih dari 95% dari Penugasan Pemerintah dan untuk pertama kalinya PT Pusri Palembang berhasil memasarkan Produk NPK secara komersil. Pada Tahun 2017 nanti PT Pusri Palembang menargetkan penyaluran pupuk untuk sektor pangan yaitu sebesar 1.363.350 Ton Urea dan 80.000 Ton NPK. Sedangkan dari sektor Komersil target perusahaan adalah 952.684 Ton Urea untuk perkebunan dan 20.000 ton NPK.\n<b>Berikut realisasi tonase Urea dan Amonia :</b>\n</p>\n<table style=\"width: 635px;\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\">\n	<tbody>\n		<tr>\n			<td width=\"123\">\n				<p><strong>MANUFACTORY</strong></p>\n			</td>\n			<td width=\"189\">\n				<p><strong>REALIZATION</strong></p>\n			</td>\n			<td width=\"174\">\n			<p><strong>TARGET RKAP</strong></p>\n			</td>\n			<td width=\"150\">\n			<p><strong>% THD RKAP</strong></p>\n			</td>\n		</tr>\n		<tr>\n			<td width=\"123\">\n			<p><strong>UREA</strong></p>\n			</td>\n			<td width=\"189\">\n			<p><strong>1.608.559</strong></p>\n			</td>\n			<td width=\"174\">\n			<p><strong>1.608.100</strong></p>\n			</td>\n			<td width=\"150\">\n			<p><strong>100,03</strong></p>\n			</td>\n		</tr>\n		<tr>\n			<td width=\"123\">\n			<p><strong>AMMONIA</strong></p>\n			</td>\n			<td width=\"189\">\n			<p><strong>1.175.832</strong></p>\n			</td>\n			<td width=\"174\">\n			<p><strong>1.150.800</strong></p>\n			</td>\n			<td width=\"150\">\n			<p><strong>102,18</strong></p>\n			</td>\n		</tr>\n		<tr>\n			<td width=\"123\">\n			<p><strong>NPK</strong></p>\n			</td>\n			<td width=\"189\">\n			<p><strong>71.810</strong></p>\n			</td>\n			<td width=\"174\">\n			<p><strong>75.000</strong></p>\n			</td>\n			<td width=\"150\">\n			<p><strong>95,75</strong></p>\n			</td>\n		</tr>\n	</tbody>\n</table>\n<p>\nPT Pusri Palembang through CSR Department has contributed to the community in developing small businesses and community empowerment through the Partnership Program and Community Development. Until November realization PKBL funds distributed is Rp. RKAP Rp 40,569,012,355 of the total. 41.967 billion. Expectations of the management of PT Pusri Palembang in the Year 2017, namely PT Pusri Palembang can continue to make innovation and product diversification, working harder and harder for all the goals and the vision and mission can be accomplished.</p><p>PT Pusri Palembang Directors would like to thank all those who have contributed to the PT Pusri Palembang either directly or indirectly. Let\'s work together more courage in the work \"Towards Pusri Jaya 2030\". Happy New Year 2017, hopefully in the year 2017 more achievement that we will achieve and we have all become a better person more than the previous year.</p>','PT Pupuk Sriwidjaja Palembang (Pusri)','Fertilizer, Urea, fertilizer subsidies, fertilizer Unsubsidized, Ammonia','PT Pupuk Sriwidjaja Palembang (Pusri) is a State Owned Enterprise which was established as a pioneer manufacturer of urea fertilizer in Indonesia',1,NULL,NULL),(2,'id','Pt Pusri melaksanakan pengantongan pupuk terakhir di tahun 2016 dan perdana di tahun 2017','pt-pusri-melaksanakan-pengantongan-pupuk-terakhir-di-tahun-2016-dan-perdana-di-tahun-2017','PALEMBANG – Tahun 2016 merupakan tahun yang penuh tantangan bagi PT Pusri Palembang, karena harus berhadapan dengan berbagai kendala serta persoalan. Diantaranya pabrik-pabrik PT Pusri Palembang  yang sudah berumur tua dan boros, harga gas yang tinggi sehingga berdampak pada harga jual produk komersil menjadi sulit untuk bersaing dan ditambah dengan masuknya produk pupuk pesaing dari luar negeri yang menawarkan haga pokok produksi yang lebih rendah dibandingkan pupuk nasional.','<p>PALEMBANG – Tahun 2016 merupakan tahun yang penuh tantangan bagi PT Pusri Palembang, karena harus berhadapan dengan berbagai kendala serta persoalan. Diantaranya pabrik-pabrik PT Pusri Palembang  yang sudah berumur tua dan boros, harga gas yang tinggi sehingga berdampak pada harga jual produk komersil menjadi sulit untuk bersaing dan ditambah dengan masuknya produk pupuk pesaing dari luar negeri yang menawarkan haga pokok produksi yang lebih rendah dibandingkan pupuk nasional.</p><p>Selain menghadapi banyak kendala serta persoalan, di tahun ini PT Pusri Palembang juga berhasil meraih kesuksesan diantaranya, PT Pusri Palembang berhasil membuat produk dalam kemasan retail dan berhasil membuka Pusri Mart di beberapa Kota yang ada di Indonesia dengan total 23 (dua puluh tiga) gerai yang tersebar di Provinsi Jawa Tengah, DIY, Lampung, Sumsel, Babel, Bengkulu dan Jambi. Kemudian Progress proyek revitalisasi Pusri IIB, STG Boiler Batu Bara, Jetty, Urea Bulk Storage dan Conveyor System tahun ini telah memasuki tahap akhir. Pada 30 September 2016, Pabrik Pusri IIB juga sudah berhasil memproduksi Urea dan dilanjutkan dengan First Drop Amonia pada 3 November 2016. PT Pusri Palembang akan terus melaksanakan pengembangan dengan membangun Pabrik pusri IIIB dan Pabrik NPK Fushion II serta proyek-proyek lainnya.</p><p>Secara keseluruhan pada Tahun 2016 produksi pabrik eksisting untuk Urea mencapai 100% dan Amonia sebesar 102,14%. Dari sektor penyaluran dan pengadaan pupuk bersubsidi, di Tahun 2016 PT Pusri Palembang telah menyalurkan pupuk urea lebih dari 95% dari Penugasan Pemerintah dan untuk pertama kalinya PT Pusri Palembang berhasil memasarkan Produk NPK secara komersil. Pada Tahun 2017 nanti PT Pusri Palembang menargetkan penyaluran pupuk untuk sektor pangan yaitu sebesar 1.363.350 Ton Urea dan 80.000 Ton NPK. Sedangkan dari sektor Komersil target perusahaan adalah 952.684 Ton Urea untuk perkebunan dan 20.000 ton NPK.<br/><b>Berikut realisasi tonase Urea dan Amonia :</b>\n</p>\n<table style=\"width: 635px;\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\">\n<tbody>\n<tr>\n<td width=\"123\">\n<p><strong>PABRIK</strong></p>\n</td>\n<td width=\"189\">\n<p><strong>REALISASI</strong></p>\n</td>\n<td width=\"174\">\n<p><strong>TARGET RKAP</strong></p>\n</td>\n<td width=\"150\">\n<p><strong>% THD RKAP</strong></p>\n</td>\n</tr>\n<tr>\n<td width=\"123\">\n<p><strong>UREA</strong></p>\n</td>\n<td width=\"189\">\n<p><strong>1.608.559</strong></p>\n</td>\n<td width=\"174\">\n<p><strong>1.608.100</strong></p>\n</td>\n<td width=\"150\">\n<p><strong>100,03</strong></p>\n</td>\n</tr>\n<tr>\n<td width=\"123\">\n<p><strong>AMONIA</strong></p>\n</td>\n<td width=\"189\">\n<p><strong>1.175.832</strong></p>\n</td>\n<td width=\"174\">\n<p><strong>1.150.800</strong></p>\n</td>\n<td width=\"150\">\n<p><strong>102,18</strong></p>\n</td>\n</tr>\n<tr>\n<td width=\"123\">\n<p><strong>NPK</strong></p>\n</td>\n<td width=\"189\">\n<p><strong>71.810</strong></p>\n</td>\n<td width=\"174\">\n<p><strong>75.000</strong></p>\n</td>\n<td width=\"150\">\n<p><strong>95,75</strong></p>\n</td>\n</tr>\n</tbody>\n</table>\n<p>\nPT Pusri Palembang melalui Departemen PKBL telah memberikan kontribusinya bagi masyarakat dalam mengembangkan usaha kecil serta pemberdayaan masyarakat melalui Program Kemitraan dan Bina Lingkungan. Sampai dengan bulan November  realisasi dana yang disalurkan PKBL yaitu sebesar Rp. 40.569.012.355 dari total RKAP Rp. 41.967.000.000. Harapan dari manajemen PT Pusri Palembang di Tahun 2017 yaitu PT Pusri Palembang dapat terus membuat inovasi dan diversifikasi produk, bekerja lebih keras dan lebih giat lagi agar semua tujuan serta visi dan misi perusahaan dapat tercapai.</p><p>Direksi PT Pusri Palembang mengucapkan terimakasih kepada semua pihak yang telah memberikan kontribusi bagi PT Pusri Palembang baik secara langsung maupun tidak langsung. Mari bersama-sama lebih semangat lagi dalam bekerja “Menuju Pusri Jaya 2030”. Selamat Tahun Baru 2017, semoga di Tahun 2017 lebih banyak lagi prestasi yang akan kita raih dan kita semua menjadi pribadi yang lebih baik lagi dari tahun sebelumnya.Palembang, 30 Desember 2016<b>Humas Pusri</b></p>','PT Pupuk Sriwidjaja Palembang (Pusri)','Pupuk, Urea, Pupuk Subsidi, Pupuk Non Subsidi, Amoniak','PT Pupuk Sriwidjaja Palembang (Pusri) adalah Badan Usaha Milik Negara yang didirikan sebagai pelopor produsen pupuk urea di Indonesia',1,NULL,NULL),(3,'en','Pusri prepare seed prime','pusri-prepare-seed-prime','PALEMBANG, Sripo - PT Pupuk Sriwidjaja (Pusri) Palembang turn back the rice harvest in the village of Daya Utama, Muara Padang, Banyuasin, Thursday (9/2).','<p>On the sidelines of the rice harvest, the Director of Human Resources & General, Bob Indriarto revealed that PT Pusri will be set up of seeds are expected to be resistant to pests. These seeds intended for kelompoj farmer (Poktan) established partners PT Pusri.</p><p>\"Right now we\'ve got the results of research Ciherang pest-resistant seeds and harvest time is faster which is only three months. These seeds will we channeled the target Poktan Pusri, \"he explained.</p><p>Not only seeds, PT Pusri as executor Movement Program Increased Food Production bebasis Corporation (GP3K) is also channeling funds Partnership Program and Community Development (CSR) in five locations namely, Banyuasin, Musirawas, Ogan Ogan Ilir (OKI), OKI East and Lampung. Where from all five areas, Banyuasin get a large enough portion.</p><p>\"50 percent were in Banyuasin and the remaining 50 percent is divided into other areas. 2016 last partnership funds that we distribute, especially in the region around Rp 8 billion. As for 2017 is not much different, however, if later there are farmers who are interested in our partnership program, PT Pusri in 2017 had allocated Rp 16 billion, \"he explained.</p><p>Bob hopes, the distribution of the partnership program can help farmers when entering the growing season. \"For that reason, we hope that farmers can harvest better and the number increased so that the lending program this partnership can go smoothly. Our PT Pusri are ready to help nurture Poktan so successful harvest, \"he said. This partnership fund distribution is given one satunyake Village Main Power, the mouth of Padang, the location of the rice harvest ekmarin. Where there are six Poktan being trained partners PT Psuri, with a land area of ​​310 hectares.</p><p>\"Thank God, this time very encouraging harvest yields for just one hectare ranges from 9.6 tons. In the next planting season we hope to rise again especially with the support of superior seedlings Pusri. At least our future expectations per hectare can produce 12 tons of rice, \"said Bob.\nHe added that, for the region Banyuasin, Poktan fostered by PT Pusri now numbering 94 Poktan with a total land area of ​​4738 hectares.</p>','PT Pupuk Sriwidjaja Palembang (Pusri)','Fertilizer, Urea, fertilizer subsidies, fertilizer Unsubsidized, Ammonia','PT Pupuk Sriwidjaja Palembang (Pusri) is a State Owned Enterprise which was established as a pioneer manufacturer of urea fertilizer in Indonesia',2,NULL,NULL),(4,'id','Pusri siapkan bibit unggul','pusri-siapkan-bibit-unggul','PALEMBANG, SRIPO – PT Pupuk Sriwidjaja (Pusri) Palembang kembali lakukan panen raya padi di Desa Daya Utama, Kecamatan Muara Padang, Kabupaten Banyuasin, Kamis (9/2).','<p>Disela-sela kegiatan panen raya padi tersebut, Direktur SDM & Umum, Bob Indriarto mengungkapkan bahwa PT Pusri nantinya akan menyiapkan bibit unggul yang diharapkan dapat tahan serangan hama. Bibit ini diperuntukkan bagi kelompoj tani (Poktan) mitra binaan PT Pusri.</p><p>“Saat ini kita sudah siapkan hasil riset bibit Ciherang yang tahan hama serta masa panennya lebih cepat yakni hanya tiga bulan. Bibit ini akan kita salurkan pada Poktan binaan Pusri, “jelasnya.</p><p>Tidak hanya bibit unggul, PT Pusri sebagai pelaksana Program Gerakan Peningkatan Produksi Pangan Bebasis Korporasi (GP3K) ini juga menyalurkan dana Program Kemitraan dan Bina Lingkungan (PKBL) di lima lokasi yakni, Banyuasin, Musirawas, Ogan Komering Ilir (OKI), OKI Timur dan Lampung. Dimana dari ke lima wilayah tersebut, Banyuasin mendapatkan porsi cukup besar.</p><p>“50 persen berada di Banyuasin dan 50 persen sisanya terbagi ke daerah lainnya. Tahun 2016 lalu, dana kemitraan yang kami salurkan khususnya di wilayah ini berkisar Rp 8 Miliar. Sedangkan untuk tahun 2017 ini tak jauh berbeda, namun, jika nantinya masih ada petani yang berminat untuk program kemitraan kami, PT Pusri di 2017 sudah mengalokasikan dana Rp 16 Miliar, “jelasnya.</p><p>Bob berharap, penyaluran program kemitraan tersebut dapat membantu para petani saat memasuki masa tanam. “Untuk itulah, kami berharap panen petani bisa lebih baik dan jumlahnya meningkat sehingga program penyaluran pinjaman kemitraan ini dapat berjalan lancar. Kami PT Pusri pun siap membantu membina Poktan agar hasil panen berhasil,“ ungkapnya. Penyaluran dana kemitraan ini diberikan salah satunyake Desa Daya Utama, muara Padang yang menjadi lokasi panen raya padi ekmarin. Dimana terdapat enam Poktan yang menjadi mitra binaan PT Psuri, dengan luas lahan 310 Hektar.</p><p>“Alhamdulillah, panen kali ini amat menggembirakan hasil panen untuk satu hektar saja berkisar 9,6 ton. Di masa tanam berikutnya kami berharap dapat meningkat lagi terlebih dengan dukungan bibit unggul Pusri. Setidaknya kedepan harapan kami per hektar dapat menghasilkan 12 ton padi, “jelas Bob.\nDitambahkannya, untuk di wilayah Banyuasin, Poktan binaan PT Pusri kini berjumlah 94 Poktan dengan total lahan 4738 Hektar.</p>','PT Pupuk Sriwidjaja Palembang (Pusri)','Pupuk, Urea, Pupuk Subsidi, Pupuk Non Subsidi, Amoniak','PT Pupuk Sriwidjaja Palembang (Pusri) adalah Badan Usaha Milik Negara yang didirikan sebagai pelopor produsen pupuk urea di Indonesia',2,NULL,NULL);
/*!40000 ALTER TABLE `news_and_event_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo`
--

DROP TABLE IF EXISTS `seo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(45) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo`
--

LOCK TABLES `seo` WRITE;
/*!40000 ALTER TABLE `seo` DISABLE KEYS */;
INSERT INTO `seo` VALUES (1,'seo:landing',NULL,NULL);
/*!40000 ALTER TABLE `seo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seo_trans`
--

DROP TABLE IF EXISTS `seo_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seo_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `h1` varchar(100) DEFAULT NULL,
  `meta_keyword` text,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `seo_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_seo_trans_1_idx` (`seo_id`),
  CONSTRAINT `fk_seo_trans_1` FOREIGN KEY (`seo_id`) REFERENCES `seo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seo_trans`
--

LOCK TABLES `seo_trans` WRITE;
/*!40000 ALTER TABLE `seo_trans` DISABLE KEYS */;
INSERT INTO `seo_trans` VALUES (1,'en',NULL,'Fertilizer, Urea, fertilizer subsidies, fertilizer Unsubsidized, Ammonia','PT Pupuk Sriwidjaja Palembang (Pusri)','PT Pupuk Sriwidjaja Palembang (Pusri) is a State Owned Enterprise which was established as a pioneer manufacturer of urea fertilizer in Indonesia',1,NULL,NULL),(2,'id',NULL,'Pupuk, Urea, Pupuk Subsidi, Pupuk Non Subsidi, Amoniak','PT Pupuk Sriwidjaja Palembang (Pusri)','PT Pupuk Sriwidjaja Palembang (Pusri) adalah Badan Usaha Milik Negara yang didirikan sebagai pelopor produsen pupuk urea di Indonesia',1,NULL,NULL);
/*!40000 ALTER TABLE `seo_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_menu`
--

DROP TABLE IF EXISTS `sub_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_menu` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `is_active` int(1) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `menu_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(1) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_menu`
--

LOCK TABLES `sub_menu` WRITE;
/*!40000 ALTER TABLE `sub_menu` DISABLE KEYS */;
INSERT INTO `sub_menu` VALUES (1,1,1,1,NULL,NULL,NULL),(11,1,2,2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `sub_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_menu_trans`
--

DROP TABLE IF EXISTS `sub_menu_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_menu_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `sub_menu_id` int(10) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_menu_trans`
--

LOCK TABLES `sub_menu_trans` WRITE;
/*!40000 ALTER TABLE `sub_menu_trans` DISABLE KEYS */;
INSERT INTO `sub_menu_trans` VALUES (1,'id','Profil','profil',1,NULL,NULL),(2,'en','Profile','profile',1,NULL,NULL),(3,'id','Tata Nilai Perusahaan','tata-nilai-perusahaan',1,NULL,NULL),(4,'en','Company Value','company-value',1,NULL,NULL),(5,'id','Pengelolaan','pengelolaan',1,NULL,NULL),(6,'en','Management','management',1,NULL,NULL),(7,'id','Pengadaan','pengadaan',1,NULL,NULL),(8,'en','Procurement','procurement',1,NULL,NULL),(9,'id','Sertifikasi','sertifikasi',1,NULL,NULL),(10,'en','Certifications','certifications',1,NULL,NULL),(11,'id','Visi, Misi & Makna Perusahaan','visi-misi-perusahaan',1,NULL,NULL),(12,'en','Vision, Mission and Meaning Company','vision-mission-meaning-company',1,NULL,NULL),(13,'id','Identitas Perusahaan','identitas-perusahaan',1,NULL,NULL),(14,'en','Company identity','company-identity',1,NULL,NULL),(15,'id','Makna Logo','makna-logo',1,NULL,NULL),(16,'en','Meaning of Logo','meaning-of-ogo',1,NULL,NULL),(17,'id','Perjalanan Kami','perjalanan-kami',1,NULL,NULL),(18,'en','Our Journey','our-journey',1,NULL,NULL),(19,'id','Anak Perusahaan','anak-perusahaan',1,NULL,NULL),(20,'en','Subsidiary','subsidiary',1,NULL,NULL),(23,'id','Urea','urea',11,NULL,NULL),(24,'en','Urea','ureas',11,NULL,NULL),(25,'id','NPK Fusion','npk-fusion',11,NULL,NULL),(26,'en','NPK Fusion','npk-fusions',11,NULL,NULL),(27,'id','Amonia','amonia',11,NULL,NULL),(28,'en','Ammonia','ammonia',11,NULL,NULL),(29,'id','Produk Riset','produk-riset',11,NULL,NULL),(30,'en','Research','research',11,NULL,NULL);
/*!40000 ALTER TABLE `sub_menu_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `order` int(2) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `category_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tag_1_idx` (`category_id`),
  CONSTRAINT `fk_tag_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,1,1,7,NULL,NULL),(2,2,1,7,NULL,NULL),(3,3,1,5,NULL,NULL),(4,4,1,1,NULL,NULL),(5,5,1,1,NULL,NULL);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_trans`
--

DROP TABLE IF EXISTS `tag_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(65) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `tag_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_tag_trans_1_idx` (`tag_id`),
  CONSTRAINT `fk_tag_trans_1` FOREIGN KEY (`tag_id`) REFERENCES `tag_trans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_trans`
--

LOCK TABLES `tag_trans` WRITE;
/*!40000 ALTER TABLE `tag_trans` DISABLE KEYS */;
INSERT INTO `tag_trans` VALUES (1,'en','Latest News','latest-news',1,NULL,NULL),(2,'id','Berita Terkini','berita-terkini',1,NULL,NULL),(3,'en','Mass Media','mass-media',2,NULL,NULL),(4,'id','Media Massa','media-massa',2,NULL,NULL),(5,'en','Good Corporate Governance Overview','good-corporate-governance-overview',3,NULL,NULL),(6,'id','Sekilas Good Corporate Governance','sekilas-good-corporate-governance',3,NULL,NULL),(7,'en','GP3k Overview','gp3k-overview',4,NULL,NULL),(8,'id','Sekilas GP3K','sekilas-gp3k',4,NULL,NULL),(9,'en','GP3k Progress Report','gp3k-progress-report',5,NULL,NULL),(10,'id','Laporan Perkembangan GP3K','laporan-perkembangan-gp3k',5,NULL,NULL);
/*!40000 ALTER TABLE `tag_trans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `top_menu`
--

DROP TABLE IF EXISTS `top_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `top_menu` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `is_active` int(1) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `top_menu`
--

LOCK TABLES `top_menu` WRITE;
/*!40000 ALTER TABLE `top_menu` DISABLE KEYS */;
INSERT INTO `top_menu` VALUES (1,1,1,NULL,NULL),(2,1,2,NULL,NULL),(3,1,3,NULL,NULL),(4,1,4,NULL,NULL),(5,1,5,NULL,NULL),(6,1,6,NULL,NULL),(7,1,7,NULL,NULL);
/*!40000 ALTER TABLE `top_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `top_menu_trans`
--

DROP TABLE IF EXISTS `top_menu_trans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `top_menu_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `top_menu_id` int(5) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_top_menu_trans_1_idx` (`top_menu_id`),
  CONSTRAINT `fk_top_menu_trans_1` FOREIGN KEY (`top_menu_id`) REFERENCES `top_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `top_menu_trans`
--

LOCK TABLES `top_menu_trans` WRITE;
/*!40000 ALTER TABLE `top_menu_trans` DISABLE KEYS */;
INSERT INTO `top_menu_trans` VALUES (1,'id','Beranda','beranda',1,NULL,NULL),(2,'en','Home','home',1,NULL,NULL),(3,'id','Peta Situs','peta-situs',2,NULL,NULL),(4,'en','Site Map','site-mao',2,NULL,NULL),(5,'id','Tautan','tautan',3,NULL,NULL),(6,'en','Link','link',3,NULL,NULL),(7,'id','Stok Pupuk','stok-pupuk',4,NULL,NULL),(8,'en','Stock','stock',4,NULL,NULL),(9,'id','Karir','karir',5,NULL,NULL),(10,'en','Career','career',5,NULL,NULL),(11,'id','Email Website','email-website',6,NULL,NULL),(12,'en','Web Mail','web-mail',6,NULL,NULL),(13,'id','Pertanyaan Bantuan','pertanyaan-bantuan',7,NULL,NULL),(14,'en','FAQ','faq',7,NULL,NULL);
/*!40000 ALTER TABLE `top_menu_trans` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-12  1:05:47
