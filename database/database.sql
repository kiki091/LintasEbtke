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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_banner`
--

LOCK TABLES `main_banner` WRITE;
/*!40000 ALTER TABLE `main_banner` DISABLE KEYS */;
INSERT INTO `main_banner` VALUES (1,'banner:landing','filename_001.jpg',1,1,NULL,NULL,NULL),(2,'banner:landing','filename_002.jpg',1,1,NULL,NULL,NULL),(3,'banner:landing','filename_003.jpg',1,1,NULL,NULL,NULL),(4,'banner:landing','filename_004.jpg',1,1,NULL,NULL,NULL);
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
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'thumbnail_002.jpg','edukasi-masyarakat-zona-panas-bumi-hadir-di-taman-pintar-yogyakarta',1,1,NULL,NULL,NULL),(2,'thumbnail_002.jpg','hemat-energi-upaya-mencapai-energi-berkeadilan',2,1,NULL,NULL,NULL);
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
  CONSTRAINT `fk_news_related_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_related`
--

LOCK TABLES `news_related` WRITE;
/*!40000 ALTER TABLE `news_related` DISABLE KEYS */;
INSERT INTO `news_related` VALUES (1,1,2),(2,2,1);
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
  `side description` text,
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news_trans`
--

LOCK TABLES `news_trans` WRITE;
/*!40000 ALTER TABLE `news_trans` DISABLE KEYS */;
INSERT INTO `news_trans` VALUES (1,'id','Edukasi Masyarakat, Zona Panas Bumi Hadir di Taman Pintar Yogyakarta','YOGYAKARTA - Guna memberikan edukasi tentang pemanfaatan dan pengembangan panas bumi di Indonesia, Kementerian Energi dan Sumber Daya Mineral (ESDM) bekerja sama dengan PT Pertamina Geothermal Energy (PGE) dan Pemerintah Kota Yogyakarta menghadirkan Zona Panas Bumi di Taman Pintar Yogyakarta yang mulai dibuka untuk umum hari ini, Jumat (26/5). Zona Panas Bumi diresmikan dengan pengguntingan pita bersama Direktur Jenderal Energi Baru, Terbarukan, dan Konservasi Energi yang diwakili oleh Direktur Panas Bumi Yunus Saefulhak, Direktur Utama PGE Irfan Zainuddin, dan Wakil Walikota Yogyakarta Heru Purwadi.','Dalam sambutannya, Yunus Saefulhak menyampaikan bahwa selain tingginya biaya investasi, salah satu kendala pengembangan panas bumi adalah resistensi masyarakat, dimana masih banyak persepsi masyarakat yang harus diluruskan karena menganggap kegiatan pengembangan panas bumi berbahaya bagi lingkungan. Padahal justru sebaliknya, panas bumi merupakan energi bersih yang menjadi tumpuan masa depan bangsa.','\"Kita berada di sini dalam rangka mewariskan energi bersih untuk masa depan. (Diharapkan) dengan edukasi tentang panas bumi di Taman Pintar ini resistensi masyarakat akan turun, dan pengembangan panas bumi akan dapat sesuai target nasional,\" papar Yunus.\n\nTaman pintar ini merupakan destinasi wisata dengan pengunjung 1 juta lebih per tahunnya yang sebagian besar adalah pelajar usia sekolah dasar dan menengah. Oleh karena itu, lanjut Yunus, Taman Pintar diharapkan dapat mengedukasi para orang tua melalui penuturan anak-anaknya selepas berkunjung. \"Anak ini yang akan bercerita kepada orangtuanya kalau panas bumi adalah air yang ditanak sehingga keluar uap. Jadi tidak berbahaya, berbeda dengan energi fosil atau penambangan lainnya,\" tambah Yunus.\n\nYunus mengungkapkan, dari 28000 MW potensi panas bumi nasional saat ini yang sudah dimanfaatkan baru sekitar 1700 MW atau 6,2%. Saat ini sudah 9 Wilayah Kerja Panasbumi (WKP) sudah berproduksi, semuanya ramah lingkungan dan sustainable. \"Asal lingkungan di atasnya dijaga baik, uap dari lubang tersebut akan dapat terus dimanfaatkan, bahkan (PLTP) Kamojang hingga saat ini dapat beroperasi tanpa bahan bakar lainnya,\" ujarnya.\n\nYunus berharap, dalam 1-2 tahun ke depan keberadaan Zona Panas Bumi di Taman Pintar dapat mengubah persepsi panas bumi membahayakan dan mencemari lingkungan. \"Dalam pembangunan infrastuktur panas bumi memang ada yg dibongkar, namun sangat kecil, hanya 1-10% dibanding penambangan yg lain. Disini pengunjung diberikan pemahaman yang komprehensif bahwa panas bumi ini adalah energi yang ramah lingkungan, sustainable, dan memberikan dampak ekonomi bagi daerah penghasil,\" pungkas Yunus. (KHR)','Edukasi Masyarakat, Zona Panas Bumi Hadir di Taman Pintar Yogyakarta -  Kementerian ESDM Republik Indonesia','Edukasi Masyarakat, Zona Panas Bumi, Yogyakarta, Kementerian ESDM','YOGYAKARTA - Guna memberikan edukasi tentang pemanfaatan dan pengembangan panas bumi di Indonesia, Kementerian Energi dan Sumber Daya Mineral (ESDM)',NULL,NULL,1),(2,'en','Community Education, Geothermal Zone Present at Taman Pintar Yogyakarta','YOGYAKARTA - To provide education on geothermal utilization and development in Indonesia, the Ministry of Energy and Mineral Resources (ESDM) in cooperation with PT Pertamina Geothermal Energy (PGE) and the Government of Yogyakarta presents the Geothermal Zone in Taman Pintar Yogyakarta which is open to the public Today, Friday (26/5). The Geothermal Zone was inaugurated with ribbon cutting with the Director General of New Energy, Renewable Energy and Energy Conservation represented by Director of Geothermal Yunus Saefulhak, PGE President Director Irfan Zainuddin and Vice Mayor of Yogyakarta Heru Purwadi.','In his speech, Yunus Saefulhak said that in addition to the high investment cost, one of the obstacles of geothermal development is the community resistance, where there are still many people\'s perceptions that must be straightened out as the geothermal development activities are harmful to the environment. In fact, on the contrary, geothermal is a clean energy that becomes the future of the nation.','\"We are here in order to pass on clean energy for the future.\" (Hopefully) with education on geothermal in Taman Pintar this community resistance will come down, and geothermal development will be able to fit the national target, \"Yunus said.\n\nThis smart park is a tourist destination with more than 1 million visitors per year, most of them are elementary and middle school students. Therefore, continued Yunus, Taman Pintar is expected to educate the parents through the narrative of his children after visiting. \"This child who will tell his parents if the geothermal is water that is dipan so steam out, so harmless, unlike the fossil energy or other mining,\" added Yunus.\n\nYunus revealed, of 28000 MW of the current national geothermal potential that has been utilized only about 1700 MW or 6.2%. Currently, 9 Working Areas of Panasbumi (WKP) are already in production, all are environmentally friendly and sustainable. \"The origin of the environment on it is well guarded, steam from the hole will continue to be utilized, even (PLTP) Kamojang until now can operate without other fuel,\" he said.\n\nYunus hopes that within the next 1-2 years the existence of Geothermal Zone in Taman Pintar can change the geothermal perception of harm and pollute the environment. \"In the construction of geothermal infrastructure there are indeed dismantled, but very small, only 1-10% compared to other mining.There visitors are given a comprehensive understanding that this geothermal energy is environmentally friendly, sustainable, and provide economic impacts for producing areas , \"Yunus concluded. (KHR)','Community Education, Geothermal Zone Present at Taman Pintar Yogyakarta - Ministry of ESDM Republic of Indonesia','Community Education, Geothermal Zone, Yogyakarta, Ministry of ESDM','YOGYAKARTA - To provide education on geothermal utilization and development in Indonesia, the Ministry of Energy and Mineral Resources (ESDM)',NULL,NULL,1),(3,'id','Hemat Energi Upaya Mencapai Energi Berkeadilan','EBTKE-- Energi merupakan pintu gerbang menuju ke peradaban modern. Hampir tidak ada kegiatan manusia modern yang tidak menggunakan energi.','Lantaran, energi tidak hanya berfungsi sebagai alat dukung strategis dalam pembangunan suatu bangsa tetapi juga sekaligus berfungsi sebagai salah satu indikator kemajuan suatu bangsa.','Hal ini dikatakan oleh Direktur Konservasi Farida Zed dalam Acara Kampanye Hemat Energi “Potong 10%\", di Makassar, Minggu, 21 Mei 2017.\n\n\"Kebutuhan energi nasional terus meningkat dari waktu ke waktu sejalan dengan pertumbuhan pembangunan dan pertambahan jumlah penduduk. Selama 10 tahun terakhir, pertumbuhan konsumsi energi rata-rata naik sebesar 7 persen per tahun dan sampai saat ini 94 persen dari kebutuhan energi nasional masih dipenuhi dari sumber energi fosil yang tidak terbarukan yaitu minyak bumi, gas bumi dan batubara,\"ujar dia dalam sambutannya.\n\nNamun, lanjut dia, di sisi lain, sumber daya energi fosil terus mengalami penurunan, dengan kondisi seperti itu Pemerintah terus melakukan upaya untuk mencari dan mengembangkan pemanfaatan sumber energi terbarukan guna menjaga stabilitas suplai energi dalam negeri.\n\n\"Di samping upaya untuk mencari alternatif sumber energi terbarukan, maka upaya untuk melakukan penghematan energi memiliki peran sangat strategis,\"tutur Farida.\n\nMenurut dia, besarnya potensi penghematan energi ini membawa masyarakat dunia bersepakat untuk menempatkan penghematan energi (energi efisiensi) sebagai sumber energi pertama (first fuel). \"Hal ini sekaligus mengamanatkan bahwa sebelum kita menggunakan jenis energi apapun (termasuk energi terbarukan) maka yang perlu dilakukan terlebih dahulu adalah melakukan penghematan,\"tambahnya\n\nDengan demikian, lebih lanjut Farida mengatakan, maka gerakan untuk melakukan penghematan energi bukan lagi sebagai sebuah retorika tetapi merupakan bagian dari tanggung jawab moral pribadi, masyarakat, Badan Usaha dan seluruh komponen bangsa untuk melaksanakan penghematan dalam menggunakan energi.\n\n\"Di negara-negara maju, perilaku hemat energi sudah menjadi bagian dari budaya dan gaya hidup sehari-hari,\"tegasnya.\n\nSementara di Indonesia, Farida menjelaskan, hemat energi masih belum disadari manfaat dan peran strategisnya. \"Bila kita menengok ke beberapa negara maju, gerakan hemat energi justru diinisiasi oleh masyarakat, melalui kelompok- individu untuk melakukan upaya penghematan energi. Hemat energi adalah menggunakan energi secara bijak yaitu efisien dan rasional tanpa mengurangi kenyamanan, kesehatan & produktivitas,\"kata dia.\n\nBerangkat dari kenyataan diatas, Farida menekankan, Aksi Gerakan Hemat Energi “Potong 10%” bertujuan untuk mendorong kesadaran masyarakat mengenai hemat energi dan menjadikan hemat energi sebagai gaya hidup. Hal ini merupakan upaya untuk mencapai energi berkeadilan.\n\n\"Dengan melakukan penghematan konsumsi energi, maka kita dapat memberikan akses energi kepada Saudara-Saudara kita yang berada di daerah terpencil,\"tandasnya\n\nDari studi yang pernah dilakukan, lebih jauh, Farida mengungkapkan, terdapat potensi penghematan energi di berbagai sektor penggunaan energi seperti Rumah Tangga, Industri, Transportasi maupun di Gedung Komersial dan Fasilitas Umum dengan variasi mulai dari 10% - 40%. Menghemat 1 kilowatt hour (kWh) jauh lebih murah dan lebih mudah dibandingkan dengan memproduksi 1 kWh.\n\n\"Apabila kita menghemat penggunaan energi sebesar 10% dari penggunaan saat ini sebagaimana tema dari kampanye kita hari ini, maka dapat menunda pembangunan pembangkit listrik sebesar 2 GW yang nilainya sekitar Rp 18,4 Triliun,\"pungkasnya. (RWS)','Hemat Energi Upaya Mencapai Energi Berkeadilan','Hemat Energi, Upaya Mencapai Energi Berkeadilan, Kementerian ESDM','EBTKE-- Energi merupakan pintu gerbang menuju ke peradaban modern. Hampir tidak ada kegiatan manusia modern yang tidak menggunakan energi.',NULL,NULL,2),(4,'en','Save Energy Efforts to Achieve Energy Justice','EBTKE-- Energy is the gateway to modern civilization. There is hardly any modern human activity that does not use energy.','Because, energy not only serves as a strategic support tool in the development of a nation but also serves as one of the indicators of progress of a nation.','This was said by Farida Zed Conservation Director in the \"10% Cut Energy Saving Campaign\" Event, in Makassar, Sunday, May 21, 2017.\n\n\"National energy needs continue to increase from time to time in line with the growth of development and population growth Over the past 10 years, the average growth in energy consumption has increased by 7 percent per year and to date 94 percent of the national energy needs are still met from sources Non-renewable fossil fuels such as petroleum, natural gas and coal, \"he said in his speech.\n\nHowever, he continued, on the other hand, fossil energy resources continue to decline, with conditions like that the Government continues to make efforts to seek and develop the utilization of renewable energy sources in order to maintain the stability of domestic energy supply.\n\n\"In addition to efforts to find alternative renewable energy sources, then efforts to make energy savings have a very strategic role,\" said Farida.\n\nAccording to him, the magnitude of this energy saving potential brings the world community to agree on putting energy savings (energy efficiency) as the first fuel source. \"It is at once mandated that before we use any kind of energy (including renewable energy) then what needs to be done first is to make savings,\" he added\n\nThus, Farida further said, the movement to make energy savings is no longer as a rhetoric but is part of personal moral responsibility, society, business entities and all components of the nation to implement savings in energy use.\n\n\"In developed countries, energy-saving behavior has become part of the culture and everyday lifestyle,\" he said.\n\nWhile in Indonesia, Farida explained, energy saving is still not realized the benefits and strategic role. \"If we look to some developed countries, the movement of energy saving is actually initiated by the society, through groups to make energy saving efforts Energy efficient is to use energy wisely that is efficient and rational without reducing comfort, health & productivity,\" he said.\n\nBased on the above facts, Farida emphasized, \"10% Cut Energy Efficiency Movement\" aims to encourage public awareness about energy saving and energy-saving lifestyle. This is an attempt to achieve justice.\n\n\"By saving energy consumption, then we can provide energy access to our brothers who are in remote areas,\" he said\n\nFarida stated that there are potential energy savings in various energy sectors such as Household, Industry, Transportation or Commercial Building and Public Facilities with variations ranging from 10% - 40%. Saving 1 kilowatt hour (kWh) is much cheaper and easier than producing 1 kWh.\n\n\"If we save energy usage by 10% of current usage as the theme of our campaign today, then it can delay the construction of 2 GW power plant which is worth Rp 18.4 Trillion,\" he concluded. (RWS)','Save Energy Efforts to Achieve Energy Justice','Save Energy, Effort to Achieve Energy Justice, Ministry of Energy and Mineral Resources','EBTKE-- Energy is the gateway to modern civilization. There is hardly any modern human activity that does not use energy.',NULL,NULL,2);
/*!40000 ALTER TABLE `news_trans` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-29  0:39:33
