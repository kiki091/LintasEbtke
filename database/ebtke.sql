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


-- Dumping database structure for ebtke
CREATE DATABASE IF NOT EXISTS `ebtke` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ebtke`;

-- Dumping structure for table ebtke.company_history
CREATE TABLE IF NOT EXISTS `company_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(200) DEFAULT NULL,
  `downloaded` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.company_history: ~0 rows (approximately)
DELETE FROM `company_history`;
/*!40000 ALTER TABLE `company_history` DISABLE KEYS */;
INSERT INTO `company_history` (`id`, `file`, `downloaded`, `created_at`, `updated_at`) VALUES
	(1, '', NULL, NULL, '2017-08-03 17:31:10');
/*!40000 ALTER TABLE `company_history` ENABLE KEYS */;

-- Dumping structure for table ebtke.company_history_trans
CREATE TABLE IF NOT EXISTS `company_history_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `title` varchar(150) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `introduction` text,
  `description_left` text,
  `description_right` text,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_keyword` varchar(150) DEFAULT NULL,
  `meta_description` text,
  `company_history_id` int(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_company_history_trans_1_idx` (`company_history_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.company_history_trans: ~2 rows (approximately)
DELETE FROM `company_history_trans`;
/*!40000 ALTER TABLE `company_history_trans` DISABLE KEYS */;
INSERT INTO `company_history_trans` (`id`, `locale`, `title`, `slug`, `introduction`, `description_left`, `description_right`, `meta_title`, `meta_keyword`, `meta_description`, `company_history_id`, `created_at`, `updated_at`, `created_by`) VALUES
	(9, 'id', 'Apa itu lintas ?', 'pa-itu-lintas', '<p><strong>Apa itu lintas ?&nbsp;</strong>LINTAS EBTKE adalah kepanjangan dari Layanan Informasi dan Investasi Energi Baru, Terbarukan dan Konservasi Energi.</p>', '<p><span class="first-letter">S</span>ecara umum, LINTAS EBTKE akan menjadi poros informasi EBTKE dimana sistem teknologi informasi yang diterapkan akan membantu pengunjung menemukan informasi yang dibutuhkannya dengan cepat. Selain itu, adanya kantor LINTAS EBTKE memungkinkan masyarakat untuk berkunjung dan melakukan konsultasi tatap muka dengan staf yang kompeten dan ditugaskan di LINTAS EBTKE.</p><p>Hanya sebagian kecil dari potensi energi terbarukan dan konservasi energi indonesia yang sudah dimanfaatkan. Untuk mengoptimalkan pemanfaatan potensi tersebut, perlu komunikasi dan kerjasama yang erat antar pemangku kepentingan sehingga kegiatan / proyek EBTKE dapat segera terlaksana.</p>', '<p>Ditengarai masih adanya kebutuhan yang belum terpenuhi dari pemerintah daerah, industri, pengembangan proyek, univeersitas dan lembaga penelitian, investor, lembaga pembiayaan serta masyarakat umum akan informasi kebijakan dan penerapan EBTKE. Para pemangku kepentingan ini memerlukan informasi terbaik dan terkinimengenai peraturan yang berlaku, teknologi dan implementasinya, pendanaan dan investasi, kesempatan kerjasama, bahkan bantuan teknis untuk merencanakan penerapan EBTKE.</p><p>Informasi dari LINTAS EBTKE diharapkan dapat memfasilitasi kerjasama antar pemangku kepentingan ini agar pemanfaatan dan penerapan EBTKE dapat meningkat.</p>', 'Meta Title', 'Meta Keyword', 'Meta Description', 1, '2017-08-03 17:31:10', '2017-08-03 17:31:10', 1),
	(10, 'en', 'Whats is lintas ?', 'hats-is-lintas', '<p>LINTAS EBTKE is an extension of the New and Renewable Energy Information and Investment Service and Energy Conservation.</p>', '<p><span class="first-letter">I</span>n general, LINTAS EBTKE will become the axis of EBTKE information where the information technology system applied will help the visitor find the information they need quickly. In addition, the EBTKE LINTAS office enables people to visit and conduct face-to-face consultations with competent staff and assigned to EBTKE Traffic.</p><p>Only a small part of Indonesia renewable energy potential and energy conservation have been utilized. To optimize the utilization of such potentials, communication and close cooperation between stakeholders is essential so that EBTKE activities / projects can be implemented immediately..</p>', '<p>It is suspected that there are still unmet needs of local government, industry, project development, univeersitas and research institutes, investors, financial institutions and the general public for information policy and EBTKE implementation. These stakeholders need the best and most current information on the applicable regulations, technology and implementation, funding and investment, cooperation opportunities, and even technical assistance for planning the implementation of EBTKE.</p><p>Information from LINTAS EBTKE is expected to facilitate cooperation among these stakeholders so that the utilization and application of EBTKE can increase.</p>', 'Meta Title', 'Meta Keyword', 'Meta Description', 1, '2017-08-03 17:31:10', '2017-08-03 17:31:10', 1);
/*!40000 ALTER TABLE `company_history_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.contact_us
CREATE TABLE IF NOT EXISTS `contact_us` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(40) NOT NULL,
  `question` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.contact_us: ~0 rows (approximately)
DELETE FROM `contact_us`;
/*!40000 ALTER TABLE `contact_us` DISABLE KEYS */;
INSERT INTO `contact_us` (`id`, `fullname`, `email`, `question`, `message`, `created_at`) VALUES
	(3, 'kiki kurniawan', 'sheqbo@gmail.com', '', 'asfasf adgfas asgas', '2017-08-19 06:10:24');
/*!40000 ALTER TABLE `contact_us` ENABLE KEYS */;

-- Dumping structure for table ebtke.energy_conservation
CREATE TABLE IF NOT EXISTS `energy_conservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.energy_conservation: ~0 rows (approximately)
DELETE FROM `energy_conservation`;
/*!40000 ALTER TABLE `energy_conservation` DISABLE KEYS */;
INSERT INTO `energy_conservation` (`id`, `thumbnail`, `is_active`, `order`, `created_at`, `updated_at`, `created_by`) VALUES
	(18, 'energy_conservation__lintas__ebtke596b9de5bab01_692x381.jpg', 1, 2, '2017-07-16 10:20:14', '2017-07-16 17:09:57', 1);
/*!40000 ALTER TABLE `energy_conservation` ENABLE KEYS */;

-- Dumping structure for table ebtke.energy_conservation_trans
CREATE TABLE IF NOT EXISTS `energy_conservation_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `title` varchar(100) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `introduction` text,
  `description` text,
  `description_maps` text,
  `meta_title` varchar(150) DEFAULT NULL,
  `meta_keyword` varchar(200) DEFAULT NULL,
  `meta_description` text,
  `energy_conservation_id` int(10) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_energy_conservation_trans_1_idx` (`energy_conservation_id`),
  CONSTRAINT `fk_energy_conservation_trans_1` FOREIGN KEY (`energy_conservation_id`) REFERENCES `energy_conservation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.energy_conservation_trans: ~2 rows (approximately)
DELETE FROM `energy_conservation_trans`;
/*!40000 ALTER TABLE `energy_conservation_trans` DISABLE KEYS */;
INSERT INTO `energy_conservation_trans` (`id`, `locale`, `title`, `slug`, `introduction`, `description`, `description_maps`, `meta_title`, `meta_keyword`, `meta_description`, `energy_conservation_id`, `created_at`, `updated_at`) VALUES
	(43, 'id', 'Rencana Strategis Kementerian ESDM', 'encana-trategis-ementerian', '<p><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Rencana Strategis Kementerian ESDM Tahun 2015-2019 (</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><b>&ldquo;Renstra</b></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><b>KESDM 2015-2019&rdquo;</b></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">) merupakan penjabaran operasional dari Visi dan Misi Presiden dan Wakil Presiden yang telah diformilkan melalui Peraturan Presiden Nomor 2 Tahun 2015 tentang Rencana Pembangunan Jangka Menengah Nasional Tahun 2015-2019 (</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><b>&ldquo;RPJMN 2015-2019&rdquo;</b></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">).</font></font></font></p>', '<p><span class="first-letter">R</span>enstra KESDM 2015-2019 merupakan horizon perencanaan kedepan yang mencakup&nbsp;mapping&nbsp;kondisi sektor ESDM 5 tahun terakhir, sasaran 5 tahun kedepan, strategi untuk mencapai sasaran, dan indikasi kerangka pendanaan 5 tahun kedepan.</p><p lang="en-US"><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Sektor ESDM merupakan sektor yang bobot teknisnya tinggi, sehingga intervensi kepentingan sulit mendapatkan tempat. Hal tersebut memberikan ruang gerak lebih luas bagi pengambilan keputusan dan penerapan kebijakan sektor ESDM yang lebih bersih, transparan, dan progresif.</font></font></font></p><p lang="en-US"><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Puluhan tahun yang lalu sumber daya energi dikuras tanpa ada upaya serius untuk mempertahankan cadangan.&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>Revenue&nbsp;</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">dari sumber daya energi tidak diinvestasikan secara maksimal untuk membangun infrastruktur energi. Dampaknya saat ini, cadangan energi menipis dan infrastruktur energi terbatas. Sehingga, infrastruktur menjadi salah satu fokus pembangunan 5 tahun ke depan. Pembangkit listrik 35.000 MW, infrastruktur energi terbarukan, kilang minyak, LNG terminal pipa transmisi dan jaringan gas, SPBG, depot, dan&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>smelter&nbsp;</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">merupakan sebagian dari infrastruktur energi yang akan dipercepat pembangunannya.&nbsp;</font></font></font></p><p lang="en-US"><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Hambatan birokrasi,&nbsp;perizinan, lahan akan diselesaikan dan dipercepat dengan terobosan serta pendekatan yang tepat. Kedepan, diversifikasi dan konservasi energi tidak lagi menjadi alternatif. Mulai sekarang, akan dilakukan hal-hal besar yang membuat energi baru terbarukan dan konservasi energi menjadi&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>mainstream</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">.</font></font></font></p><p lang="en-US"><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Renstra KESDM 2015-2019 ini tidak berhenti menjadi sebuah dokumen saja, tetapi menjadi&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>guidence</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">&nbsp;bagi KESDM dan&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>stakeholders&nbsp;</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">dalam melakukan pengelolaan energi dan sumber daya mineral kedepan. Renstra KESDM ini juga merupakan&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>living document&nbsp;</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">dan tidak kaku terhadap perubahan sesuai perkembangan tahun berjalan.</font></font></font></p>', NULL, 'Rencana Strategis Kementerian ESDM', 'Rencana Strategis Kementerian ESDM', 'Rencana Strategis Kementerian ESDM', 18, '2017-07-16 17:09:57', '2017-07-16 17:09:57'),
	(44, 'en', 'Rencana Strategis Kementerian ESDM english', 'encana-trategis-ementerian-english', '<p><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Rencana Strategis Kementerian ESDM Tahun 2015-2019 (</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><b>&ldquo;Renstra</b></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><b>KESDM 2015-2019&rdquo;</b></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">) merupakan penjabaran operasional dari Visi dan Misi Presiden dan Wakil Presiden yang telah diformilkan melalui Peraturan Presiden Nomor 2 Tahun 2015 tentang Rencana Pembangunan Jangka Menengah Nasional Tahun 2015-2019 (</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><b>&ldquo;RPJMN 2015-2019&rdquo;</b></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">).</font></font></font></p>', '<p><span class="first-letter">R</span>enstra KESDM 2015-2019 merupakan horizon perencanaan kedepan yang mencakup&nbsp;mapping&nbsp;kondisi sektor ESDM 5 tahun terakhir, sasaran 5 tahun kedepan, strategi untuk mencapai sasaran, dan indikasi kerangka pendanaan 5 tahun kedepan.</p><p lang="en-US"><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Sektor ESDM merupakan sektor yang bobot teknisnya tinggi, sehingga intervensi kepentingan sulit mendapatkan tempat. Hal tersebut memberikan ruang gerak lebih luas bagi pengambilan keputusan dan penerapan kebijakan sektor ESDM yang lebih bersih, transparan, dan progresif.</font></font></font></p><p lang="en-US"><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Puluhan tahun yang lalu sumber daya energi dikuras tanpa ada upaya serius untuk mempertahankan cadangan.&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>Revenue&nbsp;</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">dari sumber daya energi tidak diinvestasikan secara maksimal untuk membangun infrastruktur energi. Dampaknya saat ini, cadangan energi menipis dan infrastruktur energi terbatas. Sehingga, infrastruktur menjadi salah satu fokus pembangunan 5 tahun ke depan. Pembangkit listrik 35.000 MW, infrastruktur energi terbarukan, kilang minyak, LNG terminal pipa transmisi dan jaringan gas, SPBG, depot, dan&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>smelter&nbsp;</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">merupakan sebagian dari infrastruktur energi yang akan dipercepat pembangunannya.&nbsp;</font></font></font></p><p lang="en-US"><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Hambatan birokrasi,&nbsp;perizinan, lahan akan diselesaikan dan dipercepat dengan terobosan serta pendekatan yang tepat. Kedepan, diversifikasi dan konservasi energi tidak lagi menjadi alternatif. Mulai sekarang, akan dilakukan hal-hal besar yang membuat energi baru terbarukan dan konservasi energi menjadi&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>mainstream</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">.</font></font></font></p><p lang="en-US"><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">Renstra KESDM 2015-2019 ini tidak berhenti menjadi sebuah dokumen saja, tetapi menjadi&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>guidence</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">&nbsp;bagi KESDM dan&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>stakeholders&nbsp;</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">dalam melakukan pengelolaan energi dan sumber daya mineral kedepan. Renstra KESDM ini juga merupakan&nbsp;</font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2"><i>living document&nbsp;</i></font></font></font><font color="#000000"><font face="Calibri-Regular, serif"><font size="2">dan tidak kaku terhadap perubahan sesuai perkembangan tahun berjalan.</font></font></font></p>', NULL, 'Rencana Strategis Kementerian ESDM', 'Rencana Strategis Kementerian ESDM', 'Rencana Strategis Kementerian ESDM', 18, '2017-07-16 17:09:57', '2017-07-16 17:09:57');
/*!40000 ALTER TABLE `energy_conservation_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.event
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` tinyint(3) DEFAULT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `total_view` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.event: ~3 rows (approximately)
DELETE FROM `event`;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` (`id`, `thumbnail`, `is_active`, `order`, `date_start`, `date_end`, `total_view`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'thumbnail_002.jpg', 1, 1, '2017-05-16 08:05:30', '2017-05-16 23:05:34', NULL, '2017-05-16 08:05:30', '2017-05-16 08:05:30', 1),
	(2, 'event__lintas__ebtke596047b62cf6a_577x305.jpg', 1, 2, '2017-08-07 08:30:00', '2017-08-07 17:30:00', 1, '2017-07-08 02:47:18', '2017-07-08 05:33:09', 1),
	(3, 'event__lintas__ebtke59a245e1d5a13_577x305.jpg', 1, 3, '2017-08-27 10:00:53', '2017-08-27 10:30:57', 0, '2017-08-27 04:09:05', NULL, 1);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;

-- Dumping structure for table ebtke.event_images
CREATE TABLE IF NOT EXISTS `event_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `event_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_images_1_idx` (`event_id`),
  CONSTRAINT `fk_event_images_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.event_images: ~4 rows (approximately)
DELETE FROM `event_images`;
/*!40000 ALTER TABLE `event_images` DISABLE KEYS */;
INSERT INTO `event_images` (`id`, `filename`, `created_at`, `updated_at`, `event_id`) VALUES
	(1, 'event__lintas__ebtke596047b62cf6a_930x493.jpg', '2017-07-08 02:47:18', '2017-07-08 02:47:18', 2),
	(3, 'event__lintas__ebtke596072291cfbc_930x493_2.jpg', '2017-07-08 05:48:25', '2017-07-08 05:48:25', 2),
	(4, 'event__lintas__ebtke59a245e1d5a13_930x493.jpg', '2017-08-27 04:09:05', '2017-08-27 04:09:05', 3),
	(5, 'event__lintas__ebtke59a245e1d5a13_930x493_2.jpg', '2017-08-27 04:09:05', '2017-08-27 04:09:05', 3);
/*!40000 ALTER TABLE `event_images` ENABLE KEYS */;

-- Dumping structure for table ebtke.event_trans
CREATE TABLE IF NOT EXISTS `event_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `title` varchar(150) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `introduction` text,
  `description` text,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_keyword` varchar(150) DEFAULT NULL,
  `meta_description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `event_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_event_trans_1_idx` (`event_id`),
  CONSTRAINT `fk_event_trans_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.event_trans: ~6 rows (approximately)
DELETE FROM `event_trans`;
/*!40000 ALTER TABLE `event_trans` DISABLE KEYS */;
INSERT INTO `event_trans` (`id`, `locale`, `title`, `slug`, `introduction`, `description`, `meta_title`, `meta_keyword`, `meta_description`, `created_at`, `updated_at`, `event_id`) VALUES
	(1, 'id', 'Test Event', 'test-event', '<p>\n<span class="first-letter">E</span>BTKE-- Kedutaan Besar Perancis untuk Indonesia, yang diwakili oleh Konsular Ekonomi Pascal Furth beserta kumpulan pengusaha Perancis dibidang Energi dan Energi Terbarukan atau French Renewable Energy for Indonesia (FREGI) mengadakan acara Breakfast Meeting, Rabu, 17 Mei 2017, di Jakarta.</p>', '<p>\nDalam kesempatan tersebut, pihak Perancis mengundang Pemerintah Indonesia yang diwakili oleh Direktur Jenderal Energi Baru Terbarukan dan Konservasi Energi (Dirjen EBTKE), Kementerian Energi dan Sumber Daya Mineral (ESDM) Rida Mulyana beserta jajaran antara lain Sekretaris Direktorat Jenderal (Sesditjen) EBTKE Dadan Kusdiana, Direktur Panas Bumi Yunus Yunus Saefulhak dan Kepala Subdirektorat Penyiapan Program Aneka Energi Baru dan Energi Terbarukan Ibu Ida Nuryatin Finahari.</p>\n<p>\nAcara ini menjadi sarana bagi Pemerintah Indonesia dan FREGI untuk berdiskusi dan bertukar informasi terkait pengembangan serta pengusahaan energi terbarukan di Indonesia.</p>\n<p>\nAdapun isu yang dibahas antara lain  implementasi Peraturan Menteri (Permen) nomor 10 dan 12 tahun 2017, mekanisme penghitungan Biaya Pokok Produksi (BPP),  proses penentuan kuota dan sistem lelang pembangkit listrik tenaga surya (PLTS) dan pembangkit listrik tenaga angin (PLTB) potensi insentif untuk pengembang energi baru terbarukan, perbedaan pengusahaan panas bumi serta minyak dan gas (Migas), dan isu-isu menarik lainnya.</p>\n<p>\nBreakfast meeting ini juga dihadiri oleh institusi perancis seperti, Agence Française de Développement (AFD), Business France, Kamar Dagang dan Industri Indonesia (Kadin Indonesia).</p>', 'Pemerintah dan Stakeholder Diskusikan Pengembangan EBT', 'Pengembangan EBT', 'Pemerintah dan Stakeholder Diskusikan Pengembangan EBT', NULL, NULL, 1),
	(2, 'en', 'Event Example', 'event-example', '<p>\n<span class="first-letter">E</span>BTKE-- The French Embassy for Indonesia, represented by the Consular Economy of Pascal Furth and a collection of French entrepreneurs in the Renewable Energy for Indonesia (FREGI) field organized the Breakfast Meeting on Wednesday, May 17, 2017, in Jakarta.</p>', '<p>\nOn the occasion, the French invited the Government of Indonesia represented by the Director General of Renewable Energy and Energy Conservation (DG EBTKE), Ministry of Energy and Mineral Resources (ESDM) Rida Mulyana along with Secretary of Directorate General (Sesditjen) EBTKE Dadan Kusdiana, Director of Geothermal Yunus Yunus Saefulhak and Head of Subdirectorate of New Energy and Renewable Energy Renewal Program for Ida Nuryatin Finahari.</p>\n<p>\nThis event is a means for the Government of Indonesia and FREGI to discuss and exchange information related to the development and exploitation of renewable energy in Indonesia.</p>\n<p>\nThe issues discussed include the implementation of Ministerial Regulation (Permen) number 10 and 12 of 2017, the mechanism of calculating Cost of Production (BPP), the process of determining the quota and auction system of solar power plants (PLTS) and wind power plants (PLTB) potential Incentives for renewable energy developers, geothermal and oil and gas (oil and gas) concessions, and other interesting issues.</p>\n<p>\nBreakfast meeting is also attended by french institutions such as, Agence Française de Développement (AFD), Business France, Chamber of Commerce and Industry of Indonesia (Kadin Indonesia).</p>', 'Government and Stakeholders Discuss Development of EBT', 'Discuss Development of EBT', 'Government and Stakeholders Discuss Development of EBT', NULL, NULL, 1),
	(11, 'id', 'Title Indonesian edit', 'Title-Indonesian-edit', '<p>Introduction&nbsp;<b>(Indonesian)&nbsp;edit</b></p>', '<p>Description&nbsp;<b>(Indonesian)&nbsp;edit</b></p>', 'Meta Title edit', 'Meta Keyword edit', 'Meta Description edit', '2017-07-08 05:33:09', '2017-07-08 05:33:09', 2),
	(12, 'en', 'Title English edit', 'Title-English-edit', '<p>Introduction&nbsp;<b>(English)&nbsp;edit</b></p>', '<p>Description&nbsp;<b>(English)&nbsp;edit</b></p>', 'Meta Title edit', 'Meta Keyword edit', 'Meta Description edit', '2017-07-08 05:33:09', '2017-07-08 05:33:09', 2),
	(13, 'id', 'Title Indonesian', 'title-indonesian', '<p>Introduction&nbsp;<b>(Indonesian)</b></p>', '<p>Description&nbsp;<b>(Indonesian)</b></p>', 'Meta Title', 'Meta Keyword', 'Meta Description', '2017-08-27 04:09:05', '2017-08-27 04:09:05', 3),
	(14, 'en', 'Title English', 'title-english', '<p>Introduction&nbsp;<b>(English)</b></p>', '<p>Description&nbsp;<b>(English)</b></p>', 'Meta Title', 'Meta Keyword', 'Meta Description', '2017-08-27 04:09:05', '2017-08-27 04:09:05', 3);
/*!40000 ALTER TABLE `event_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.file_upload
CREATE TABLE IF NOT EXISTS `file_upload` (
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

-- Dumping data for table ebtke.file_upload: ~0 rows (approximately)
DELETE FROM `file_upload`;
/*!40000 ALTER TABLE `file_upload` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_upload` ENABLE KEYS */;

-- Dumping structure for table ebtke.file_upload_trans
CREATE TABLE IF NOT EXISTS `file_upload_trans` (
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

-- Dumping data for table ebtke.file_upload_trans: ~0 rows (approximately)
DELETE FROM `file_upload_trans`;
/*!40000 ALTER TABLE `file_upload_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_upload_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.green_pages
CREATE TABLE IF NOT EXISTS `green_pages` (
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
  `green_pages_category_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `greeen_pages_category_idx` (`green_pages_category_id`),
  CONSTRAINT `greeen_pages_category` FOREIGN KEY (`green_pages_category_id`) REFERENCES `green_pages_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.green_pages: ~2 rows (approximately)
DELETE FROM `green_pages`;
/*!40000 ALTER TABLE `green_pages` DISABLE KEYS */;
INSERT INTO `green_pages` (`id`, `thumbnail`, `office_name`, `slug`, `is_active`, `order`, `phone_number`, `fax_number`, `email`, `postal_code`, `website`, `created_at`, `updated_at`, `created_by`, `green_pages_category_id`) VALUES
	(1, 'pt-asia-pragon.png', 'PT. Asia Pragon', 'pt-asia-pragon', 1, 1, '+6222 6032953', '+6222 6072077', 'office@asiaparagon.com', 40184, 'http://asiaparagon.com/ap/', NULL, '2017-07-10 16:14:07', NULL, 1),
	(2, 'greenpages__lintas__ebtke597631120ed77_pt-enercon.jpg', 'PT ENERCON EQUIPMENT COMPANY', '-', 1, 2, '+62 21 7941182', '+62 21 7941184', 'info@enercon.co.id', 12740, 'http://www.enercon.co.id', NULL, '2017-07-24 17:40:34', NULL, 1);
/*!40000 ALTER TABLE `green_pages` ENABLE KEYS */;

-- Dumping structure for table ebtke.green_pages_category
CREATE TABLE IF NOT EXISTS `green_pages_category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `is_active` int(1) NOT NULL,
  `order` int(2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.green_pages_category: ~5 rows (approximately)
DELETE FROM `green_pages_category`;
/*!40000 ALTER TABLE `green_pages_category` DISABLE KEYS */;
INSERT INTO `green_pages_category` (`id`, `is_active`, `order`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, NULL, NULL),
	(2, 1, 2, NULL, NULL),
	(3, 1, 3, NULL, NULL),
	(4, 1, 4, NULL, NULL),
	(5, 1, 5, NULL, NULL);
/*!40000 ALTER TABLE `green_pages_category` ENABLE KEYS */;

-- Dumping structure for table ebtke.green_pages_category_trans
CREATE TABLE IF NOT EXISTS `green_pages_category_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `green_pages_category_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_green_cat_1_idx` (`green_pages_category_id`),
  CONSTRAINT `fk_green_cat_1` FOREIGN KEY (`green_pages_category_id`) REFERENCES `green_pages_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.green_pages_category_trans: ~10 rows (approximately)
DELETE FROM `green_pages_category_trans`;
/*!40000 ALTER TABLE `green_pages_category_trans` DISABLE KEYS */;
INSERT INTO `green_pages_category_trans` (`id`, `locale`, `title`, `slug`, `created_at`, `updated_at`, `green_pages_category_id`) VALUES
	(1, 'id', 'Penyedia jasa konsultan teknik', 'penyedia-jasa-konsultan-teknik', NULL, NULL, 1),
	(2, 'en', 'Technical consultant services provider', 'technical-consultant-services-provider', NULL, NULL, 1),
	(3, 'id', 'Penyedia jasa konstruksi (kontraktor)', 'penyedia-jasa-konstruksi', NULL, NULL, 2),
	(4, 'en', 'Construction service provider', 'construction-service-provider', NULL, NULL, 2),
	(5, 'id', 'Perusahaan manufaktur', 'perusahaan-manufaktur', NULL, NULL, 3),
	(6, 'en', 'Manufacturing company', 'manufacturing-company', NULL, NULL, 3),
	(7, 'id', 'Penyedia jasa pengadaan', 'penyedia-jasa-pengadaan', NULL, NULL, 4),
	(8, 'en', 'Providers of procurement services', 'providers-of-procurement-services', NULL, NULL, 4),
	(9, 'id', 'Lembaga keuangan', 'lembaga-keuangan', NULL, NULL, 5),
	(10, 'en', 'Financial institutions', 'financial-institutions', NULL, NULL, 5);
/*!40000 ALTER TABLE `green_pages_category_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.green_pages_images
CREATE TABLE IF NOT EXISTS `green_pages_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(150) DEFAULT NULL,
  `green_pges_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_green_pges_images_1_idx` (`green_pges_id`),
  CONSTRAINT `fk_green_pges_images_1` FOREIGN KEY (`green_pges_id`) REFERENCES `green_pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.green_pages_images: ~2 rows (approximately)
DELETE FROM `green_pages_images`;
/*!40000 ALTER TABLE `green_pages_images` DISABLE KEYS */;
INSERT INTO `green_pages_images` (`id`, `filename`, `green_pges_id`, `created_at`, `updated_at`) VALUES
	(1, 'greenpages__lintas__ebtke5963a287cd64b_930x493.jpg', 1, '2017-07-10 15:51:35', '2017-07-10 15:51:35'),
	(5, 'greenpages__lintas__ebtke5964a1a909364_930x493.jpg', 1, '2017-07-11 10:00:09', '2017-07-11 10:00:09');
/*!40000 ALTER TABLE `green_pages_images` ENABLE KEYS */;

-- Dumping structure for table ebtke.green_pages_trans
CREATE TABLE IF NOT EXISTS `green_pages_trans` (
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
  CONSTRAINT `fk_green_pges_trans_1` FOREIGN KEY (`green_pges_id`) REFERENCES `green_pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.green_pages_trans: ~4 rows (approximately)
DELETE FROM `green_pages_trans`;
/*!40000 ALTER TABLE `green_pages_trans` DISABLE KEYS */;
INSERT INTO `green_pages_trans` (`id`, `locale`, `address`, `introduction`, `description`, `meta_title`, `meta_keyword`, `meta_description`, `green_pges_id`, `created_at`, `updated_at`) VALUES
	(9, 'id', '<p>Jalan Kiwi No. 25 Andir - Bandung, West Java, Indonesia.&nbsp;edit</p>', '<p><b>PT ASIA PARAGON</b> adalah perusahaan yang bergerak dalam bidang energi, design, enginering, teknologi informasi, kontraktor umum dan perdagangan. PT ASIA PARAGON berbasis di Bandung dan Jakarta, didirikan pada tahun 2005 oleh sejumlah profesional muda yang sudah berpengalaman dalam menangani berbagai proyek baik nasional maupun internasional. PT ASIA PARAGON terus berinovasi dan menciptakan jaringan komunikasi dan kerjasama global dengan semua institusi nasional dan internasional juga dengan para ahli baik secara individual maupun kelembagaan dalam bidang terkait.</p>', '<p><b>PT ASIA PARAGON terdiri dari beberapa divisi yang meliputi :</b></p><p>1. Business consultant, 2. Developer, 3. Construction, 4. Engineering Management Consultant, 5. Assessement Engineering, 6. Organic Farming</p><p>Proyek-proyek terkait dengan energi umumnya ditangani oleh divisi business consultant, engineering management consultant, construction dan assessment engineering.</p><p><b>Produk/Jasa:</b></p><p>(1) Studi kelayakan, pengembangan dan konstruksi pembangkit listrik dari energi terbarukan (2) Survei potensi energi terbarukan (3) Studi terkait RAN-GRK (4) Pengadaan dan pemasangan generator listrik (5) Pengadaan dan pemasangan EnMS (Energy Management System) (6) Audit energi di industri dan bangunan (7) Kajian akademis terhadap kebijakan dan aturan terkait energi (8) Pengadaaan dan pemasangan lampu hemat energi dan lampu tenaga surya</p><p><b>Rekam jejak:</b></p><p>Pengalaman-pengalaman PT Asia Paragon terkait dengan bidang energi di antaranya:</p><p>1. Feasibility Study Industri PV (Photovoltaic), BPPT 2. Pengembangan nilai tambah di bidang energi alternatif 3. Survey Potensi Panasbumi Star Energi 4. Survey Potensi Panasbumi di Sulawesi 5. Studi Rencana &nbsp;Aksi Nasional (RAN) Antisipasi Sektor Transportasi Menghadapi Climate Change 6. Studi Kelayakan PLTMH Kabupaten Bantaeng 7. Pemasangan Kincir Angin Untuk Pengairan di Garut (Cibolang dan Pameungpeuk) 8. Pemasanggan Lampu PJU tenaga surya di Maluku 9. PUSRI, Studi Kelayakan Pembangkit Listrik dan Steam 10. Studi Kelayakan untuk Pengembangan Tenaga Listrik dan Steam di Pabrik Kujang 11. PDT Sollar Cell Sulawesi 12. PDT Sollar Cell Jatim 13. PDT Sollar Cell Bali 14. Studi Kelayakan untuk PLTA Labuhan Bajo, Kabupaten Manggarai 15. Studi Kelayakan Kincir Angin di Pangkal Pinang 16. Studi Kelayakan Panasbumi di Aceh 17. Studi Kelayakan Panasbumi di Jaboi, Sabang 18. Studi Kelayakan Panasbumi di Sabang 19. Audit Energi Sektor Industri Kimia dan Makanan</p>', 'PT ASIA PARAGON', 'PT ASIA PARAGON', 'PT ASIA PARAGON adalah perusahaan yang bergerak dalam bidang energi, design, enginering, teknologi informasi, kontraktor umum dan perdagangan', 1, '2017-07-10 16:14:07', '2017-07-10 16:14:07'),
	(10, 'en', '<p>Kiwi Street No. 25 Andir - Bandung, West Java, Indonesia.</p>', '<p><b>PT ASIA PARAGON </b> is a company engaged in energy, design, enginering, information technology, general contracting and trading. PT ASIA PARAGON is based in Bandung and Jakarta, established in 2005 by a number of young professionals who have experience in handling various projects both nationally and internationally. PT ASIA PARAGON continues to innovate and create a global communication and cooperation network with all national and international institutions as well as experts both individually and institutionally in related fields.</p>', '<p><b>PT ASIA PARAGON consists of several divisions which include: </b></p><p>1. Business consultant, 2. Developer, 3. Construction, 4. Engineering Management Consultants, 5. Assessment Engineering, 6. Organic Farming</p><p>Energy-related projects are generally handled by business consultant divisions, engineering management consultants, construction and assessment engineering.</p><p><b>Products / Services: </b></p><p>(1) Feasibility study, development and construction of power plant from renewable energy (2) Survey of potential renewable energy (3) Related studies of RAN-GRK (4) Procurement and installation of electrical generators (5) Procurement and installation of EnMS (Energy Management System) (6) Energy audits in industries and buildings (7) Academic review of energy-related policies and rules (8) Procurement and installation of energy saving lamps and solar powered lamps</p><p><b>Track record: </b></p><p>The experiences of PT Asia Paragon related to the energy sector include:</p><p>1. Feasibility Study of PV Industry (Photovoltaic), BPPT 2. The development of added value in the field of alternative energy 3. Survey of Potential Star Energy Geothermal 4. Survey of Geothermal Potential in Sulawesi 5. National Action Plan Study (RAN) Transportation Transportation Anticipation Facing Climate Change 6. Feasibility Study of PLTMH of Bantaeng Regency 7. Installation of Windmills for Watering in Garut (Cibolang and Pameungpeuk) 8. Pemasanggan PJU lamp solar power in Maluku 9. PUSRI, Feasibility Study of Power Station and Steam 10. Feasibility Study for Development of Electricity and Steam at Kujang Plant 11. PDT Sollar Cell Sulawesi 12. PDT Sollar Cell Jatim 13. PDT Sollar Cell Bali 14. Feasibility Study for Labuhan Bajo Hydroelectric Power Plant, Manggarai Regency 15. Feasibility Study of Windmills in Pangkal Pinang 16. Feasibility Study of Geothermal in Aceh 17. Feasibility Study of Geothermal in Jaboi, Sabang 18. Feasibility Study of Geothermal in Sabang 19. Energy Audit of Chemical and Food Industry Sectors</p>', 'PT ASIA PARAGON', 'PT ASIA PARAGON', 'PT ASIA PARAGON is a company engaged in energy, design, enginering, information technology, general contracting and trading', 1, '2017-07-10 16:14:07', '2017-07-10 16:14:07'),
	(13, 'id', '<p>Gedung Aldevco Octagon II - 4th Floor Jalan Warung Jati Barat Raya No. 75 Jakarta 12740, Indonesia</p>', '<p><b>PT ENERCON EQUIPMENT COMPANY</b> adalah sebuah perusahaan yang dapat membantu memberikan solusi-solusi berkaitan dengan permasalahan lingkungan dan efisiensi energi. PT ENERCON EQUIPMENT COMPANY fokus pada solusi-solusi yang ril dan inovatif dalam rangka menjawab permintaan yang terus meningkat berkaitan dengan pengurangan konsumsi energi dan polusi udara dalam sektor komersial dan industri di Indonesia. Perusahaan mempromosikan sistem manajemen lingkungan melalui penggunaan teknologi tinggi dan ramah lingkungan. Missi dari ENERCON adalah To successfully deliver the most effective energy management solution, by means of bringing clean, reliable and affordable energy technologies to Indonesia marketplace.</p>', '<p><b>Produk/Jasa:</b><br />1. Menyediakan jasa inspeksi dan mengidentifikasi potensi-potensi penghematan energi dan pengurangan polusi udara..<br />2. Melakukan survey lengkap untuk menilai tingkat efisiensi energi yang sudah ada di suatu fasilitas industri dan sekaligus mengidentifikasi potensi-potensi masalah yang mungkin akan dihadapi serta solusinya.<br />3. Membantu pembuatan proposal yang fokus pada solusi-solusi praktis tentang proyek efisiensi energi yang disertai dengan bahasan detil tentang biaya, analisa keuntungan dan keekonomiannya.<br />4. Vendor dari beberapa peralatan yang berkaitan dengan Energi Saving, Compressed Air &amp; Gas, Air Pollution Control, E-Power Systems, E-Controller and Energy Audit.</p><p><b>Rekam jejak:</b><br />1. Telah melakukan pemasangan alat-alat teknologi-teknologi tinggi dan bersih di berbagai industri, seperti farmasi, makanan dan minuman, semen, pertambangan, otomotif dan lain-lain, seperti E-power systems, E-controller, dan sistem kompressor.<br />2. Beberapa perusahaan yang pernah menjadi client ENERCON adalah: Aneka Tambang (Antam), Asahimas Flat Glass Tbk, Astra Daihatsu Motor, Astra Otopart Tbk, Coca Cola, Glaxo Welcome Indonesia, Gillette, Fahrenheit Pratapa Nirmala, Indomilk Group, Indah Kiat Pulp &amp; Paper, Kalbe Farma, Kota Minyak Automation, Landsen Group, Mattel Indonesia, Medco LPG Kaji, Mekar Jaya Armana, Multistrada Arah SaranaTbk, Mitra Karsa, New Armada, Panasonic, Pfizer Indonesia, Semen Batu Raja, Suzuki Indonesia, Sibelco, Sanggar Sarana Baja, United Tractor P E, Ultra Prima Artaboga dan lain-lain</p>', 'PT ENERCON EQUIPMENT COMPANY', 'PT ENERCON EQUIPMENT COMPANY', 'PT ENERCON EQUIPMENT COMPANY', 2, '2017-07-24 17:40:34', '2017-07-24 17:40:34'),
	(14, 'en', '<p>Aldevco Octagon II Building - 4th Floor Warung Jati Barat Raya Street Number 75 Jakarta 12740, Indonesia</p>', '<p><b>PT ENERCON EQUIPMENT COMPANY</b> is a company that can help provide solutions related to environmental issues and energy efficiency. PT ENERCON EQUIPMENT COMPANY focuses on real and innovative solutions in response to the growing demand for reducing energy consumption and air pollution in the commercial and industrial sectors of Indonesia. The company promotes environmental management system through the use of high technology and environmentally friendly. The mission of ENERCON is to deliver the most effective energy management solution, by means of bringing clean, reliable and affordable energy technologies to the Indonesia marketplace.</p>', '<p><b>Products / Services: </b><br />1. Provide inspection services and identify potential energy savings and air pollution reductions ..<br />2. Conduct a full survey to assess the level of energy efficiency that already exists in an industrial facility and also to identify potential problems that may be faced and the solution.<br />3. Assist in the creation of proposals that focus on practical solutions on energy efficiency projects with detailed discussion of costs, profit and economic analysis.<br />4. Vendors of some equipment related to Energy Saving, Compressed Air &amp; Gas, Air Pollution Control, E-Power Systems, E-Controller and Energy Audit.</p><p><b>Track record: </b><br />1. Has been installing high-tech and clean technology tools in various industries, such as pharmaceuticals, food and beverages, cement, mining, automotive and others, such as E-power systems, E-controllers, and compressor systems. &lt; Br /&gt; 2. Some of the companies that have been ENERCON clients are: Aneka Tambang (Antam), Asahimas Flat Glass Tbk, Astra Daihatsu Motor, Astra Otopart Tbk, Coca Cola, Glaxo Welcome Indonesia, Gillette, Fahrenheit Pratapa Nirmala, Indomilk Group, Indah Kiat Pulp &amp; Paper, Kalbe Farma, City Oil Automation, Landsen Group, Mattel Indonesia, Medco LPG Kaji, Mekar Jaya Armana, Multistrada Directions SaranaTbk, Mitra Karsa, New Armada, Panasonic, Pfizer Indonesia, Semen Batu Raja, Suzuki Indonesia, Sibelco, Sanggar Sarana Baja , United Tractor PE, Ultra Prima Artaboga and others</p>', 'PT ENERCON EQUIPMENT COMPANY', 'PT ENERCON EQUIPMENT COMPANY', 'PT ENERCON EQUIPMENT COMPANY', 2, '2017-07-24 17:40:34', '2017-07-24 17:40:34');
/*!40000 ALTER TABLE `green_pages_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.industri
CREATE TABLE IF NOT EXISTS `industri` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.industri: ~0 rows (approximately)
DELETE FROM `industri`;
/*!40000 ALTER TABLE `industri` DISABLE KEYS */;
INSERT INTO `industri` (`id`, `thumbnail`, `is_active`, `order`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'peen2013.jpg', 1, 1, '2017-05-16 08:05:30', '2017-05-16 08:05:30', 1);
/*!40000 ALTER TABLE `industri` ENABLE KEYS */;

-- Dumping structure for table ebtke.industri_trans
CREATE TABLE IF NOT EXISTS `industri_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(45) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `introduction` text,
  `description` mediumtext,
  `meta_title` varchar(80) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `industri_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_industri_trans_1_idx` (`industri_id`),
  CONSTRAINT `fk_industri_trans_1` FOREIGN KEY (`industri_id`) REFERENCES `industri` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.industri_trans: ~2 rows (approximately)
DELETE FROM `industri_trans`;
/*!40000 ALTER TABLE `industri_trans` DISABLE KEYS */;
INSERT INTO `industri_trans` (`id`, `locale`, `title`, `slug`, `introduction`, `description`, `meta_title`, `meta_keyword`, `meta_description`, `created_at`, `updated_at`, `industri_id`) VALUES
	(1, 'id', 'Pencapaian Pelaksanaan Manajemen Energi Di Industri Dan Bangunan Gedung', 'pencapaian-pelaksanaan-manegemen-energi-di-industri-dan-bangunan-gedung', 'Database di bawah ini menyediakan daftar informasi lengkap Auditor Energi, Manajer Energi dan National Expert di Indonesia sebagai sumber informasi dan referensi yang bermanfaat.', '<p>\n<b>Pelaporan Pelaksanaan Manajemen Energi di Industri dan Bangunan Gedung</b>\n</p>\n<p><span class="first-letter">P</span>ada tahun 2015, tercatat sebanyak 66 industri/bangunan yang telah melaporkan pelaksanaan manajemen energi. Jumlah penghematan energi yang dihasilkan melalui pelaksanaan manajemen energi  adalah sebesar 180 Gjoule atau setara 50,158 GWh. Sehingga dari tahun 2012 hingga 2015 tercatat jumlah industri yang melapor adalah sebanyak 101 perusahaan dengan total penghematan energi mencapai 254 GJoule atau setara 70,570 GWh.</p>\n\n<table cellpadding="0" cellspacing="0" class="table--data-style">\n	<tbody>\n		<tr>\n			<td class="header">Perusahaan</td>\n			<td class="header">Sektor</td>\n		</tr>\n		<tr>\n			<td>PT. Pupuk Kujang</td>\n			<td>Industri Pupuk</td>\n		</tr>\n		<tr>\n			<td>PT.  Indonesia Power UPJP Bali – Pesanggrahan</td>\n			<td>Pembangkit Listrik</td>\n		</tr>\n		<tr>\n			<td>PT. YTL Jawa Timur</td>\n			<td>Pembangkit Listrik</td>\n		</tr>\n		<tr>\n			<td>PT. Adaro Indonesia</td>\n			<td>Pertambangan</td>\n		</tr>\n		<tr>\n			<td>PT. Indo Tambangraya Megah</td>\n			<td>Pertambangan</td>\n		</tr>\n		<tr>\n			<td>PT. Semen Indonesia (Persero) Tbk. Pabrik Tuban</td>\n			<td>Industri Semen</td>\n		</tr>\n		<tr>\n			<td>PT. Chevron Pacific Indonesia</td>\n			<td>Ekspl Migas</td>\n		</tr>\n	</tbody>\n</table>\n\n<p>Melakukan pengawasan  dengan pengambilan contoh uji produk Lampu Swabalast pada toko di beberapa kota</p>\n\n<table cellpadding="0" cellspacing="0" class="table--data-style">\n	<tbody>\n		<tr>\n			<td class="header">Kegiatan</td>\n			<td class="header">Lokasi</td>\n			<td class="header">Jadwal</td>\n		</tr>\n		<tr>\n			<td>\n				Melakukan pengawasan  dengan pengambilan contoh uji produk Lampu Swabalast\n			</td>\n			<td>Manado</td>\n			<td>6 Mei 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Solo</td>\n			<td>20 Mei 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Medan</td>\n			<td>4 Juni 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Tangerang</td>\n			<td>25 Juni 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Cirebon</td>\n			<td>30 Juni 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Bali</td>\n			<td>30 Juni 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Yogyakarta</td>\n			<td>12 Agustus 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Batam</td>\n			<td>27 Agustus 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Bogor</td>\n			<td>28 Agustus 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Bekasi</td>\n			<td>10 Oktober 2015</td>\n		</tr>\n	</tbody>\n</table>\n<p>\n	<ul>\n		<li class="data__table_industri">\n			<p>\n			Uji Petik dilaksanakan untuk mengetahui kesesuaian tingkat efisiensi energi lampu swabalast yang beredar di pasaran dibandingkan dalam SDoC\n			</p>\n		</li>\n		<li class="data__table_industri">\n			<p>\n			Sampel uji petik berjumlah 20 (dua puluh) unit lampu untuk setiap tipe dan diambil dari toko, lokasi produksi, dan/atau di tempat penyimpanan barang milik Produsen Dalam Negeri atau Importir.\n			</p>\n		</li>\n	</ul>\n</p>\n<p>\n	<a href="http://lintas.ebtke.esdm.go.id/lintasebtke/konservasi-energi/upload/files/Hasil%20Pengawasan%20Label%20Tanda%20Hemat%20Energi%20untuk%20Lampu%20Swabalast.docx">\n		Berikut adalah dokumen Hasil Pengawasan Label Tanda Hemat Energi untuk Lampu Swabalast\n	</a>\n</p>', 'Pencapaian Pelaksanaan Manajemen Energi Di Industri Dan Bangunan Gedung', 'Pencapaian Pelaksanaan Manajemen Energi Di Industri Dan Bangunan Gedung', 'Pencapaian Pelaksanaan Manajemen Energi Di Industri Dan Bangunan Gedung', '2017-05-16 08:05:30', '2017-05-16 08:05:30', 1),
	(2, 'en', 'Achievement of Energy Management Implementation in Building Industry and Building', 'achivement-of-energy-management-implementation-in-building-industry-and-building', 'The database below provides a complete list of Energy Auditor, Energy Manager and National Expert information in Indonesia as a useful source of information and reference.', '<p>\n<b>Reporting on the Implementation of Energy Management in Building Industry and Building</b>\n</p>\n<p><span class="first-letter">I</span>n 2015, there were 66 industrial / building that has been reported on the implementation of energy management. The amount of energy savings generated through the implementation of energy management is 180 Gjoules or 50.158 GWh equivalent. So that from 2012 to 2015 recorded the number of industries that report is as many as 101 companies with a total energy savings of 254 GJoule or equivalent to 70.570 GWh.</p>\n\n<table cellpadding="0" cellspacing="0" class="table--data-style">\n	<tbody>\n		<tr>\n			<td class="header">Company</td>\n			<td class="header">Sector</td>\n		</tr>\n		<tr>\n			<td>PT. Pupuk Kujang</td>\n			<td>Fertilizer industry</td>\n		</tr>\n		<tr>\n			<td>PT.  Indonesia Power UPJP Bali – Pesanggrahan</td>\n			<td>Power plants</td>\n		</tr>\n		<tr>\n			<td>PT. YTL Jawa Timur</td>\n			<td>Power plants</td>\n		</tr>\n		<tr>\n			<td>PT. Adaro Indonesia</td>\n			<td>Mining</td>\n		</tr>\n		<tr>\n			<td>PT. Indo Tambangraya Megah</td>\n			<td>Mining</td>\n		</tr>\n		<tr>\n			<td>PT. Semen Indonesia (Persero) Tbk. Pabrik Tuban</td>\n			<td>Cement Industry</td>\n		</tr>\n		<tr>\n			<td>PT. Chevron Pacific Indonesia</td>\n			<td>Oil and Gas Exports</td>\n		</tr>\n	</tbody>\n</table>\n\n<p>Supervise by taking samples of Swabalast lamp product test at stores in several cities</p>\n\n<table cellpadding="0" cellspacing="0" class="table--data-style">\n	<tbody>\n		<tr>\n			<td class="header">Activities</td>\n			<td class="header">Location</td>\n			<td class="header">Schedule</td>\n		</tr>\n		<tr>\n			<td>\n				To supervise the test sampling ballasted lamp product\n			</td>\n			<td>Manado</td>\n			<td>6 May 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Solo</td>\n			<td>20 May 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Medan</td>\n			<td>4 June 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Tangerang</td>\n			<td>25 June 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Cirebon</td>\n			<td>30 June 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Bali</td>\n			<td>30 June 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Yogyakarta</td>\n			<td>12 August 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Batam</td>\n			<td>27 August 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Bogor</td>\n			<td>28 August 2015</td>\n		</tr>\n		<tr>\n			<td></td>\n			<td>Bekasi</td>\n			<td>10 October 2015</td>\n		</tr>\n	</tbody>\n</table>\n<p>\n	<ul>\n		<li class="data__table_industri">\n			<p>\n			Pick test was conducted to determine the suitability of energy efficiency level of swabalast lamps on the market compared to SDoC\n			</p>\n		</li>\n		<li class="data__table_industri">\n			<p>\n			Examples of quotation tests are 20 (twenty) light units for each type and taken from a shop, production site, and / or in the storage of goods owned by a Domestic Producer or Importer.\n			</p>\n		</li>\n	</ul>\n</p>\n<p>\n	<a href="http://lintas.ebtke.esdm.go.id/lintasebtke/konservasi-energi/upload/files/Hasil%20Pengawasan%20Label%20Tanda%20Hemat%20Energi%20untuk%20Lampu%20Swabalast.docx">\n		Here are the document Monitoring Results for the Energy Saving Label Signs ballasted lamp\n	</a>\n</p>', 'Achievement of Energy Management', 'Achievement of Energy Management Implementation in Building Industry and Building', 'Achievement of Energy Management Implementation in Building Industry and Building', '2017-05-16 08:05:30', '2017-05-16 08:05:30', 1);
/*!40000 ALTER TABLE `industri_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.investment_services
CREATE TABLE IF NOT EXISTS `investment_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `total_view` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.investment_services: ~2 rows (approximately)
DELETE FROM `investment_services`;
/*!40000 ALTER TABLE `investment_services` DISABLE KEYS */;
INSERT INTO `investment_services` (`id`, `thumbnail`, `is_active`, `order`, `total_view`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'investment_services__lintas__ebtke59649db3b142a_692x381.jpg', 1, 1, NULL, NULL, '2017-07-11 09:43:15', 1),
	(3, 'investment_services__lintas__ebtke59649ec880973_692x381.jpg', 1, 2, 0, '2017-07-11 09:47:52', NULL, 1);
/*!40000 ALTER TABLE `investment_services` ENABLE KEYS */;

-- Dumping structure for table ebtke.investment_services_images
CREATE TABLE IF NOT EXISTS `investment_services_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(150) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `investment_services_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_investment_services_images_idx` (`investment_services_id`),
  CONSTRAINT `fk_investment_services_images` FOREIGN KEY (`investment_services_id`) REFERENCES `investment_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.investment_services_images: ~2 rows (approximately)
DELETE FROM `investment_services_images`;
/*!40000 ALTER TABLE `investment_services_images` DISABLE KEYS */;
INSERT INTO `investment_services_images` (`id`, `filename`, `created_at`, `updated_at`, `investment_services_id`) VALUES
	(1, 'investment_services__lintas__ebtke59649e1a05fe4_930x493.jpg', '2017-07-11 09:44:58', '2017-07-11 09:44:58', 1),
	(3, 'investment_services__lintas__ebtke59649ec880973_930x493.jpg', '2017-07-11 09:47:52', '2017-07-11 09:47:52', 3);
/*!40000 ALTER TABLE `investment_services_images` ENABLE KEYS */;

-- Dumping structure for table ebtke.investment_services_related
CREATE TABLE IF NOT EXISTS `investment_services_related` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `investment_services_id` int(10) DEFAULT NULL,
  `investment_services_related_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_investment_services_related_1_idx` (`investment_services_id`),
  KEY `fk_investment_services_related_2_idx` (`investment_services_related_id`),
  CONSTRAINT `fk_investment_services_related_1` FOREIGN KEY (`investment_services_id`) REFERENCES `investment_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_investment_services_related_2` FOREIGN KEY (`investment_services_related_id`) REFERENCES `investment_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.investment_services_related: ~0 rows (approximately)
DELETE FROM `investment_services_related`;
/*!40000 ALTER TABLE `investment_services_related` DISABLE KEYS */;
INSERT INTO `investment_services_related` (`id`, `investment_services_id`, `investment_services_related_id`) VALUES
	(6, 3, 1);
/*!40000 ALTER TABLE `investment_services_related` ENABLE KEYS */;

-- Dumping structure for table ebtke.investment_services_trans
CREATE TABLE IF NOT EXISTS `investment_services_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `introduction` text,
  `description` text,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `investment_services_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_investment_services_trans_1_idx` (`investment_services_id`),
  CONSTRAINT `fk_investment_services_trans_1` FOREIGN KEY (`investment_services_id`) REFERENCES `investment_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.investment_services_trans: ~4 rows (approximately)
DELETE FROM `investment_services_trans`;
/*!40000 ALTER TABLE `investment_services_trans` DISABLE KEYS */;
INSERT INTO `investment_services_trans` (`id`, `locale`, `title`, `slug`, `introduction`, `description`, `meta_title`, `meta_keyword`, `meta_description`, `investment_services_id`, `created_at`, `updated_at`, `created_by`) VALUES
	(9, 'id', 'POTENSI PENGHEMATAN ENERGI HINGGA 25% edit 2', 'potensi-penghematan-energi-hingga-25-edit-2', '<p>Dengan pertumbuhan ekonomi dan jumlah penduduk yang pesat, Indonesia berkepentingan untuk mengelola dan menggunakan energi seefektif dan seefisien mungkin. Menurut data Bank Dunia, pertumbuhan ekonomi Indonesia meningkat dari 5,7 persen pada tahun 2005 menjadi 5,9 persen pada tahun 2010, dan diproyeksikan mencapai 6,2 persen pada tahun 2011. Sementara populasi Indonesia yang kini mencapai 229 juta penduduk diperkirakan akan meningkat menjadi lebih dari 230 juta pada tahun 2011.&nbsp;edit</p>', '<p><span class="first-letter">S</span>emua pertumbuhan ini tentunya disertai dengan meningkatnya kebutuhan energi akibat bertambahnya jumlah rumah, beragam bangunan komersial serta industri. Jika diasumsikan rata-rata pertumbuhan kebutuhan listrik adalah sebesar 7 persen per tahun selama kurun waktu 30 tahun, maka konsumsi listrik akan meningkat dengan tajam, contohnya pada sektor rumah tangga, konsumsi akan meningkat dari 21,52 gigawatt hour (Gwh) di tahun 2000 menjadi sekitar 444,53 Gwh pada tahun 2030.</p><p>Terdapat empat sektor utama pengguna energi, yaitu sektor rumah tangga, komersial, industri dan transportasi. Saat ini pengguna energi terbesar adalah sektor industri dengan pangsa 44,2 persen. Konsumsi terbesar berikutnya adalah sektor transportasi dengan pangsa 40,6 persen, diikuti dengan sektor rumah tangga sebesar 11,4 persen dan sektor komersial sebesar 3,7 persen.</p><p>Berangkat dari kenyataan sektor industri, rumah tangga dan transportasi merupakan konsumen terbesar energi maka menurut Direktur Konservasi Energi, Maryam Ayuni potensi penghematan tiga sektor tersebut dengan melakukan penghematan antara 15-25 persen. &quot;Ada angka sebesar itu yang bisa dihemat,&quot;kata dia di Jakarta.</p><p>Terkait dengan instruksi presiden (Inpres) nomor 13 tahun 2011 tentang penghematan energi yang kemudian terbitnya tiga peraturan menteri energi dan sumber daya mineral (MESDM) sebagai turunan dari Inpres tersebut yaitu permen nomor 12, 13, 14 dan 15 yang mengatur penghematan energi listrik, bahan bakar minyak, air tanah dan manajemen energi, menurutnya, realisasi penghematannya dari sejak diterapkan hemat energi 1 Juni lalu terdapat penghematan yang cukup signifikan.&quot;Yang cukup signifikan penurunannya di listrik, untuk bahan bakar minyak belum terlalu signifikan,&quot;pungkasnya.(FT)&nbsp;edit</p>', 'POTENSI PENGHEMATAN ENERGI HINGGA 25% edit', 'PENGHEMATAN ENERGI edit', 'POTENSI PENGHEMATAN ENERGI HINGGA 25% edit', 1, '2017-07-11 09:43:15', '2017-07-11 09:43:15', NULL),
	(10, 'en', 'ENERGY SAVING POTENCY UP TO 25% edit', 'energy-saving-potency-up-to-25-edit', '<p>With economic growth and rapid population growth, Indonesia has an interest in managing and using energy as effectively and efficiently as possible. According to World Bank data, Indonesia&#39;s economic growth increased from 5.7 percent in 2005 to 5.9 percent in 2010, and is projected to reach 6.2 percent in 2011. While Indonesia&#39;s current population of 229 million is expected to increase to More than 230 million in 2011.&nbsp;edit</p>', '<p><span class="first-letter">A</span>ll of this growth is certainly accompanied by increasing energy demand due to the increasing number of houses, a variety of commercial buildings and industries. If it is assumed that the average growth of electricity demand is 7 percent per year for 30 years, then electricity consumption will increase sharply, for example in the household sector, consumption will increase from 21.52 gigawatt hour (Gwh) in 2000 to About 444.53 Gwh by 2030.</p><p>There are four main sectors of energy users, namely household, commercial, industrial and transportation sectors. Currently the largest energy user is the industry sector with a share of 44.2 percent. The next largest consumption is the transportation sector with a share of 40.6 percent, followed by the household sector of 11.4 percent and the commercial sector of 3.7 percent.</p><p>Departing from the reality of industrial sector, household and transportation is the biggest consumer of energy, according to Director of Conservation of Energy, Maryam Ayuni potential savings of three sectors by making savings between 15-25 percent. &quot;There are numbers that can be saved,&quot; he said in Jakarta.</p><p>In connection with Presidential Directive (Inpres) number 13 of 2011 on energy savings, which then issued three ministerial regulations of energy and mineral resources (MESDM) as a derivative of the Inpres namely candy number 12, 13, 14 and 15 which regulate the energy saving of electricity, Fuel oil, groundwater and energy management, according to him, the realization of the savings from since applied energy efficiency June 1 ago there is a significant savings. &quot;Significant decrease in electricity, for fuel oil has not been too significant,&quot; he concluded.&nbsp;edit</p>', 'ENERGY SAVING POTENCY UP TO 25% edit', 'ENERGY SAVING edit', 'ENERGY SAVING POTENCY UP TO 25% edit', 1, '2017-07-11 09:43:15', '2017-07-11 09:43:15', NULL),
	(11, 'id', 'Title Indonesian', 'title-indonesian', '<p>Introduction&nbsp;<b>(Indonesian)</b></p>', '<p>Description&nbsp;<b>(Indonesian)</b></p>', 'Meta Title', 'Meta Keyword', 'Meta Description', 3, '2017-07-11 09:47:52', '2017-07-11 09:47:52', NULL),
	(12, 'en', 'Title English', 'title-english', '<p>Introduction&nbsp;<b>(English)</b></p>', '<p>Description&nbsp;<b>(English)</b></p>', 'Meta Title', 'Meta Keyword', 'Meta Description', 3, '2017-07-11 09:47:52', '2017-07-11 09:47:52', NULL);
/*!40000 ALTER TABLE `investment_services_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.list_certified_energy
CREATE TABLE IF NOT EXISTS `list_certified_energy` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(60) NOT NULL,
  `company_name` varchar(70) NOT NULL,
  `province_id` int(5) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(4) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_by` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_list_certified_energy_1_idx` (`province_id`),
  CONSTRAINT `fk_list_certified_energy_1` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.list_certified_energy: ~2 rows (approximately)
DELETE FROM `list_certified_energy`;
/*!40000 ALTER TABLE `list_certified_energy` DISABLE KEYS */;
INSERT INTO `list_certified_energy` (`id`, `fullname`, `company_name`, `province_id`, `is_active`, `order`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'Fullname', 'Company Name', 31, 0, 1, '2017-08-20', '2017-08-20', 1),
	(2, 'Fullname 2', 'Company Name 2', 13, 1, 2, '2017-08-20', '2017-08-20', 1);
/*!40000 ALTER TABLE `list_certified_energy` ENABLE KEYS */;

-- Dumping structure for table ebtke.list_certified_energy_trans
CREATE TABLE IF NOT EXISTS `list_certified_energy_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `sector` varchar(100) NOT NULL,
  `sub_sector` varchar(100) NOT NULL,
  `list_certified_energy_id` int(10) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_list_certified_energy_trans_1_idx` (`list_certified_energy_id`),
  CONSTRAINT `fk_list_certified_energy_trans_1` FOREIGN KEY (`list_certified_energy_id`) REFERENCES `list_certified_energy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.list_certified_energy_trans: ~4 rows (approximately)
DELETE FROM `list_certified_energy_trans`;
/*!40000 ALTER TABLE `list_certified_energy_trans` DISABLE KEYS */;
INSERT INTO `list_certified_energy_trans` (`id`, `locale`, `sector`, `sub_sector`, `list_certified_energy_id`, `created_at`, `updated_at`) VALUES
	(1, 'id', 'Sector (Indonesian)', 'Sub Sector (Indonesian)', 1, '2017-08-20', '2017-08-20'),
	(2, 'en', 'Sector (English)', 'Sub Sector (English)', 1, '2017-08-20', '2017-08-20'),
	(3, 'id', 'Sector (Indonesian)', 'Sub Sector (Indonesian)', 2, '2017-08-20', '2017-08-20'),
	(4, 'en', 'Sector (English)', 'Sub Sector (English)', 2, '2017-08-20', '2017-08-20');
/*!40000 ALTER TABLE `list_certified_energy_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.list_energy_auditor
CREATE TABLE IF NOT EXISTS `list_energy_auditor` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(60) NOT NULL,
  `company_name` varchar(70) NOT NULL,
  `type_auditor` varchar(20) NOT NULL,
  `province_id` int(5) NOT NULL,
  `years` int(4) NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_by` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_list_energy_auditor_1_idx` (`province_id`),
  CONSTRAINT `fk_list_energy_auditor_1` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.list_energy_auditor: ~2 rows (approximately)
DELETE FROM `list_energy_auditor`;
/*!40000 ALTER TABLE `list_energy_auditor` DISABLE KEYS */;
INSERT INTO `list_energy_auditor` (`id`, `fullname`, `company_name`, `type_auditor`, `province_id`, `years`, `is_active`, `order`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'Fullname', 'Company Name', 'internal', 35, 2015, 0, 1, '2017-08-20', '2017-08-20', 1),
	(2, 'Fullname', 'Company Name 2', 'eksternal', 31, 2017, 1, 2, '2017-08-20', '2017-08-20', 1);
/*!40000 ALTER TABLE `list_energy_auditor` ENABLE KEYS */;

-- Dumping structure for table ebtke.list_energy_auditor_trans
CREATE TABLE IF NOT EXISTS `list_energy_auditor_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `sector` varchar(100) NOT NULL,
  `sub_sector` varchar(100) NOT NULL,
  `list_energy_auditor_id` int(10) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_list_energy_auditor_trans_1_idx` (`list_energy_auditor_id`),
  CONSTRAINT `fk_list_energy_auditor_trans_1` FOREIGN KEY (`list_energy_auditor_id`) REFERENCES `list_energy_auditor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.list_energy_auditor_trans: ~4 rows (approximately)
DELETE FROM `list_energy_auditor_trans`;
/*!40000 ALTER TABLE `list_energy_auditor_trans` DISABLE KEYS */;
INSERT INTO `list_energy_auditor_trans` (`id`, `locale`, `sector`, `sub_sector`, `list_energy_auditor_id`, `created_at`, `updated_at`) VALUES
	(1, 'id', 'Sector (Indonesian)', 'Sub Sector (Indonesian)', 1, '2017-08-20', '2017-08-20'),
	(2, 'en', 'Sector (English)', 'Sub Sector (English)', 1, '2017-08-20', '2017-08-20'),
	(3, 'id', 'Sector (Indonesian)', 'Sub Sector (Indonesian)', 2, '2017-08-20', '2017-08-20'),
	(4, 'en', 'Sector (English)', 'Sub Sector (English)', 2, '2017-08-20', '2017-08-20');
/*!40000 ALTER TABLE `list_energy_auditor_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.main_banner
CREATE TABLE IF NOT EXISTS `main_banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `filename` varchar(200) DEFAULT NULL,
  `order` int(2) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.main_banner: ~7 rows (approximately)
DELETE FROM `main_banner`;
/*!40000 ALTER TABLE `main_banner` DISABLE KEYS */;
INSERT INTO `main_banner` (`id`, `key`, `filename`, `order`, `is_active`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'banner:landing', 'filename_001.jpg', 1, 1, NULL, NULL, NULL),
	(2, 'banner:landing', 'filename_002.jpg', 1, 1, NULL, NULL, NULL),
	(3, 'banner:landing', 'filename_003.jpg', 1, 1, NULL, NULL, NULL),
	(4, 'banner:landing', 'filename_004.jpg', 1, 1, NULL, NULL, NULL),
	(5, 'banner:company:history', 'main_banner__lintas__ebtke599588e5d3ce8_1244x829.jpg', 1, 1, '2017-07-09 04:43:40', '2017-08-17 12:15:34', NULL),
	(6, 'banner:company:history', 'main_banner__lintas__ebtke59aa4103c7228_1920x764.jpg', 2, 1, '2017-09-02 05:26:27', '2017-09-02 05:26:27', 1),
	(7, 'banner:company:history', 'main_banner__lintas__ebtke59aa42376f1d8_slider-1.jpg', 3, 1, '2017-09-02 05:31:35', '2017-09-02 05:31:35', 1);
/*!40000 ALTER TABLE `main_banner` ENABLE KEYS */;

-- Dumping structure for table ebtke.main_banner_trans
CREATE TABLE IF NOT EXISTS `main_banner_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `main_banner_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_main_banner_trans_1_idx` (`main_banner_id`),
  CONSTRAINT `fk_main_banner_trans_1` FOREIGN KEY (`main_banner_id`) REFERENCES `main_banner` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.main_banner_trans: ~14 rows (approximately)
DELETE FROM `main_banner_trans`;
/*!40000 ALTER TABLE `main_banner_trans` DISABLE KEYS */;
INSERT INTO `main_banner_trans` (`id`, `locale`, `title`, `created_at`, `updated_at`, `main_banner_id`) VALUES
	(1, 'id', 'Potong 10 Persen Diharapkan Jadi Gaya Hidup Masyarakat', NULL, NULL, 1),
	(2, 'en', 'Cut 10 Percent Expected to Be a Community Lifestyle', NULL, NULL, 1),
	(3, 'id', 'Hemat Energi Upaya Mencapai Energi Berkeadilan', NULL, NULL, 2),
	(4, 'en', 'Save Energy Efforts to Achieve Energy Justice', NULL, NULL, 2),
	(5, 'id', 'Indonesia – Denmark Luncurkan Peta Potensi Angin', NULL, NULL, 3),
	(6, 'en', 'Indonesia - Denmark Launches Potential Wind Map', NULL, NULL, 3),
	(7, 'id', 'Pembangunan Infrastruktur EBTKE di Sumatera Barat', NULL, NULL, 4),
	(8, 'en', 'Infrastructure Development EBTKE in West Sumatra', NULL, NULL, 4),
	(19, 'id', 'Title main banner edit', '2017-08-17 12:15:34', '2017-08-17 12:15:34', 5),
	(20, 'en', 'Title main banner edit', '2017-08-17 12:15:34', '2017-08-17 12:15:34', 5),
	(21, 'id', 'Title Indonesian', '2017-09-02 05:26:27', '2017-09-02 05:26:27', 6),
	(22, 'en', 'Title English', '2017-09-02 05:26:27', '2017-09-02 05:26:27', 6),
	(23, 'id', 'Title Indonesian', '2017-09-02 05:31:35', '2017-09-02 05:31:35', 7),
	(24, 'en', 'Title English', '2017-09-02 05:31:35', '2017-09-02 05:31:35', 7);
/*!40000 ALTER TABLE `main_banner_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.maps_category
CREATE TABLE IF NOT EXISTS `maps_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_active` int(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.maps_category: ~2 rows (approximately)
DELETE FROM `maps_category`;
/*!40000 ALTER TABLE `maps_category` DISABLE KEYS */;
INSERT INTO `maps_category` (`id`, `is_active`, `order`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 1, 1, NULL, NULL, NULL),
	(2, 1, 2, NULL, NULL, NULL);
/*!40000 ALTER TABLE `maps_category` ENABLE KEYS */;

-- Dumping structure for table ebtke.maps_category_trans
CREATE TABLE IF NOT EXISTS `maps_category_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(45) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `maps_category_id` int(3) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_maps_category_trans_1_idx` (`maps_category_id`),
  CONSTRAINT `fk_maps_category_trans_1` FOREIGN KEY (`maps_category_id`) REFERENCES `maps_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.maps_category_trans: ~4 rows (approximately)
DELETE FROM `maps_category_trans`;
/*!40000 ALTER TABLE `maps_category_trans` DISABLE KEYS */;
INSERT INTO `maps_category_trans` (`id`, `locale`, `title`, `maps_category_id`, `created_at`, `updated_at`) VALUES
	(1, 'id', 'Peningkatan Kapasitas', 1, NULL, NULL),
	(2, 'en', 'Peningkatan Kapasitas', 1, NULL, NULL),
	(3, 'id', 'Audit Energy', 2, NULL, NULL),
	(4, 'en', 'Audit Energy', 2, NULL, NULL);
/*!40000 ALTER TABLE `maps_category_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.news
CREATE TABLE IF NOT EXISTS `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `is_active` int(1) DEFAULT NULL,
  `total_view` int(10) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  `tag_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_1_idx` (`tag_id`),
  CONSTRAINT `fk_news_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.news: ~4 rows (approximately)
DELETE FROM `news`;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` (`id`, `thumbnail`, `order`, `is_active`, `total_view`, `created_at`, `updated_at`, `created_by`, `tag_id`) VALUES
	(1, 'thumbnail_002.jpg', 1, 1, 13, '2017-06-07 07:39:45', '2017-06-07 07:39:45', NULL, 1),
	(3, 'thumbnail_002.jpg', 3, 1, 3, '2017-06-07 07:39:45', '2017-06-07 07:39:45', NULL, 2),
	(4, 'latest__news__lintas__ebtke595d187d95fa6_577x305.jpg', 4, 1, 2, '2017-07-05 16:49:01', NULL, 1, 1),
	(5, 'latest__news__lintas__ebtke595d1f99be257_577x305.jpg', 5, 1, 1, '2017-07-05 17:19:21', NULL, 1, 2);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;

-- Dumping structure for table ebtke.news_images
CREATE TABLE IF NOT EXISTS `news_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `news_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_images_1_idx` (`news_id`),
  CONSTRAINT `fk_news_images_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.news_images: ~4 rows (approximately)
DELETE FROM `news_images`;
/*!40000 ALTER TABLE `news_images` DISABLE KEYS */;
INSERT INTO `news_images` (`id`, `filename`, `created_at`, `updated_at`, `news_id`) VALUES
	(1, '930x493.jpg', '2017-07-05 16:49:01', '2017-07-05 16:49:01', 4),
	(9, 'latest__news__lintas__ebtke595fbabe552cd_930x493_2.jpg', '2017-07-07 16:45:50', '2017-07-07 16:45:50', 4),
	(10, 'latest__news__lintas__ebtke596094b26f08b_930x493.jpg', '2017-07-08 08:15:46', '2017-07-08 08:15:46', 5),
	(11, 'latest__news__lintas__ebtke596094b26f08b_930x493_2.jpg', '2017-07-08 08:15:46', '2017-07-08 08:15:46', 5);
/*!40000 ALTER TABLE `news_images` ENABLE KEYS */;

-- Dumping structure for table ebtke.news_related
CREATE TABLE IF NOT EXISTS `news_related` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) DEFAULT NULL,
  `news_related_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_related_1_idx` (`news_id`),
  KEY `fk_news_related_2_idx` (`news_related_id`),
  CONSTRAINT `fk_news_related_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_news_related_2` FOREIGN KEY (`news_related_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.news_related: ~4 rows (approximately)
DELETE FROM `news_related`;
/*!40000 ALTER TABLE `news_related` DISABLE KEYS */;
INSERT INTO `news_related` (`id`, `news_id`, `news_related_id`) VALUES
	(3, 1, 3),
	(4, 5, 4),
	(5, 5, 3),
	(7, 5, 1);
/*!40000 ALTER TABLE `news_related` ENABLE KEYS */;

-- Dumping structure for table ebtke.news_trans
CREATE TABLE IF NOT EXISTS `news_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `introduction` text,
  `description` text,
  `meta_title` varchar(150) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `news_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_news_trans_1_idx` (`news_id`),
  CONSTRAINT `fk_news_trans_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.news_trans: ~8 rows (approximately)
DELETE FROM `news_trans`;
/*!40000 ALTER TABLE `news_trans` DISABLE KEYS */;
INSERT INTO `news_trans` (`id`, `locale`, `title`, `slug`, `introduction`, `description`, `meta_title`, `meta_keyword`, `meta_description`, `created_at`, `updated_at`, `news_id`) VALUES
	(1, 'id', 'Edukasi Masyarakat, Zona Panas Bumi Hadir di Taman Pintar Yogyakarta', 'edukasi-masyarakat-zona-panas-bumi-hadir-di-taman-pintar-yogyakarta', '<p><span class="first-letter">Y</span>OGYAKARTA - Guna memberikan edukasi tentang pemanfaatan dan pengembangan panas bumi di Indonesia, Kementerian Energi dan Sumber Daya Mineral (ESDM) bekerja sama dengan PT Pertamina Geothermal Energy (PGE) dan Pemerintah Kota Yogyakarta menghadirkan Zona Panas Bumi di Taman Pintar Yogyakarta yang mulai dibuka untuk umum hari ini, Jumat (26/5). Zona Panas Bumi diresmikan dengan pengguntingan pita bersama Direktur Jenderal Energi Baru, Terbarukan, dan Konservasi Energi yang diwakili oleh Direktur Panas Bumi Yunus Saefulhak, Direktur Utama PGE Irfan Zainuddin, dan Wakil Walikota Yogyakarta Heru Purwadi.</p>', '<p>"Kita berada di sini dalam rangka mewariskan energi bersih untuk masa depan. (Diharapkan) dengan edukasi tentang panas bumi di Taman Pintar ini resistensi masyarakat akan turun, dan pengembangan panas bumi akan dapat sesuai target nasional," papar Yunus.\n\nTaman pintar ini merupakan destinasi wisata dengan pengunjung 1 juta lebih per tahunnya yang sebagian besar adalah pelajar usia sekolah dasar dan menengah. Oleh karena itu, lanjut Yunus, Taman Pintar diharapkan dapat mengedukasi para orang tua melalui penuturan anak-anaknya selepas berkunjung. "Anak ini yang akan bercerita kepada orangtuanya kalau panas bumi adalah air yang ditanak sehingga keluar uap. Jadi tidak berbahaya, berbeda dengan energi fosil atau penambangan lainnya," tambah Yunus.\n\nYunus mengungkapkan, dari 28000 MW potensi panas bumi nasional saat ini yang sudah dimanfaatkan baru sekitar 1700 MW atau 6,2%. Saat ini sudah 9 Wilayah Kerja Panasbumi (WKP) sudah berproduksi, semuanya ramah lingkungan dan sustainable. "Asal lingkungan di atasnya dijaga baik, uap dari lubang tersebut akan dapat terus dimanfaatkan, bahkan (PLTP) Kamojang hingga saat ini dapat beroperasi tanpa bahan bakar lainnya," ujarnya.\n\nYunus berharap, dalam 1-2 tahun ke depan keberadaan Zona Panas Bumi di Taman Pintar dapat mengubah persepsi panas bumi membahayakan dan mencemari lingkungan. "Dalam pembangunan infrastuktur panas bumi memang ada yg dibongkar, namun sangat kecil, hanya 1-10% dibanding penambangan yg lain. Disini pengunjung diberikan pemahaman yang komprehensif bahwa panas bumi ini adalah energi yang ramah lingkungan, sustainable, dan memberikan dampak ekonomi bagi daerah penghasil," pungkas Yunus. (KHR)</p>', 'Edukasi Masyarakat, Zona Panas Bumi Hadir di Taman Pintar Yogyakarta -  Kementerian ESDM Republik Indonesia', 'Edukasi Masyarakat, Zona Panas Bumi, Yogyakarta, Kementerian ESDM', 'YOGYAKARTA - Guna memberikan edukasi tentang pemanfaatan dan pengembangan panas bumi di Indonesia, Kementerian Energi dan Sumber Daya Mineral (ESDM)', NULL, NULL, 1),
	(2, 'en', 'Community Education, Geothermal Zone Present at Taman Pintar Yogyakarta', 'community-education-geothermal-zone', '<p><span class="first-letter">Y</span>OGYAKARTA - To provide education on geothermal utilization and development in Indonesia, the Ministry of Energy and Mineral Resources (ESDM) in cooperation with PT Pertamina Geothermal Energy (PGE) and the Government of Yogyakarta presents the Geothermal Zone in Taman Pintar Yogyakarta which is open to the public Today, Friday (26/5). The Geothermal Zone was inaugurated with ribbon cutting with the Director General of New Energy, Renewable Energy and Energy Conservation represented by Director of Geothermal Yunus Saefulhak, PGE President Director Irfan Zainuddin and Vice Mayor of Yogyakarta Heru Purwadi.</p>', '<p>"We are here in order to pass on clean energy for the future." (Hopefully) with education on geothermal in Taman Pintar this community resistance will come down, and geothermal development will be able to fit the national target, "Yunus said.\n\nThis smart park is a tourist destination with more than 1 million visitors per year, most of them are elementary and middle school students. Therefore, continued Yunus, Taman Pintar is expected to educate the parents through the narrative of his children after visiting. "This child who will tell his parents if the geothermal is water that is dipan so steam out, so harmless, unlike the fossil energy or other mining," added Yunus.\n\nYunus revealed, of 28000 MW of the current national geothermal potential that has been utilized only about 1700 MW or 6.2%. Currently, 9 Working Areas of Panasbumi (WKP) are already in production, all are environmentally friendly and sustainable. "The origin of the environment on it is well guarded, steam from the hole will continue to be utilized, even (PLTP) Kamojang until now can operate without other fuel," he said.\n\nYunus hopes that within the next 1-2 years the existence of Geothermal Zone in Taman Pintar can change the geothermal perception of harm and pollute the environment. "In the construction of geothermal infrastructure there are indeed dismantled, but very small, only 1-10% compared to other mining.There visitors are given a comprehensive understanding that this geothermal energy is environmentally friendly, sustainable, and provide economic impacts for producing areas , "Yunus concluded. (KHR)</p>', 'Community Education, Geothermal Zone Present at Taman Pintar Yogyakarta - Ministry of ESDM Republic of Indonesia', 'Community Education, Geothermal Zone, Yogyakarta, Ministry of ESDM', 'YOGYAKARTA - To provide education on geothermal utilization and development in Indonesia, the Ministry of Energy and Mineral Resources (ESDM)', NULL, NULL, 1),
	(5, 'id', 'Pemerintah dan Stakeholder Diskusikan Pengembangan EBTKE', 'pemerintah-dan-stakeholder-diskusikan-pengembangan-ebtke', '<p>\n<span class="first-letter">E</span>BTKE-- Kedutaan Besar Perancis untuk Indonesia, yang diwakili oleh Konsular Ekonomi Pascal Furth beserta kumpulan pengusaha Perancis dibidang Energi dan Energi Terbarukan atau French Renewable Energy for Indonesia (FREGI) mengadakan acara Breakfast Meeting, Rabu, 17 Mei 2017, di Jakarta.</p>', '<p>\nDalam kesempatan tersebut, pihak Perancis mengundang Pemerintah Indonesia yang diwakili oleh Direktur Jenderal Energi Baru Terbarukan dan Konservasi Energi (Dirjen EBTKE), Kementerian Energi dan Sumber Daya Mineral (ESDM) Rida Mulyana beserta jajaran antara lain Sekretaris Direktorat Jenderal (Sesditjen) EBTKE Dadan Kusdiana, Direktur Panas Bumi Yunus Yunus Saefulhak dan Kepala Subdirektorat Penyiapan Program Aneka Energi Baru dan Energi Terbarukan Ibu Ida Nuryatin Finahari.</p>\n<p>\nAcara ini menjadi sarana bagi Pemerintah Indonesia dan FREGI untuk berdiskusi dan bertukar informasi terkait pengembangan serta pengusahaan energi terbarukan di Indonesia.</p>\n<p>\nAdapun isu yang dibahas antara lain  implementasi Peraturan Menteri (Permen) nomor 10 dan 12 tahun 2017, mekanisme penghitungan Biaya Pokok Produksi (BPP),  proses penentuan kuota dan sistem lelang pembangkit listrik tenaga surya (PLTS) dan pembangkit listrik tenaga angin (PLTB) potensi insentif untuk pengembang energi baru terbarukan, perbedaan pengusahaan panas bumi serta minyak dan gas (Migas), dan isu-isu menarik lainnya.</p>\n<p>\nBreakfast meeting ini juga dihadiri oleh institusi perancis seperti, Agence Française de Développement (AFD), Business France, Kamar Dagang dan Industri Indonesia (Kadin Indonesia).</p>', 'Pemerintah dan Stakeholder Diskusikan Pengembangan EBT', 'Pengembangan EBT', 'Pemerintah dan Stakeholder Diskusikan Pengembangan EBT', NULL, NULL, 3),
	(6, 'en', 'Government and Stakeholders Discuss Development of EBTKE', 'goverment-and-stakeholders-discuss-development-of-ebtkr', '<p>\n<span class="first-letter">E</span>BTKE-- The French Embassy for Indonesia, represented by the Consular Economy of Pascal Furth and a collection of French entrepreneurs in the Renewable Energy for Indonesia (FREGI) field organized the Breakfast Meeting on Wednesday, May 17, 2017, in Jakarta.</p>', '<p>\nOn the occasion, the French invited the Government of Indonesia represented by the Director General of Renewable Energy and Energy Conservation (DG EBTKE), Ministry of Energy and Mineral Resources (ESDM) Rida Mulyana along with Secretary of Directorate General (Sesditjen) EBTKE Dadan Kusdiana, Director of Geothermal Yunus Yunus Saefulhak and Head of Subdirectorate of New Energy and Renewable Energy Renewal Program for Ida Nuryatin Finahari.</p>\n<p>\nThis event is a means for the Government of Indonesia and FREGI to discuss and exchange information related to the development and exploitation of renewable energy in Indonesia.</p>\n<p>\nThe issues discussed include the implementation of Ministerial Regulation (Permen) number 10 and 12 of 2017, the mechanism of calculating Cost of Production (BPP), the process of determining the quota and auction system of solar power plants (PLTS) and wind power plants (PLTB) potential Incentives for renewable energy developers, geothermal and oil and gas (oil and gas) concessions, and other interesting issues.</p>\n<p>\nBreakfast meeting is also attended by french institutions such as, Agence Française de Développement (AFD), Business France, Chamber of Commerce and Industry of Indonesia (Kadin Indonesia).</p>', 'Government and Stakeholders Discuss Development of EBT', 'Discuss Development of EBT', 'Government and Stakeholders Discuss Development of EBT', NULL, NULL, 3),
	(7, 'id', 'Title IndonesianMeta Title', 'Title-IndonesianMeta-Title', '<p><span class="first-letter">Y</span>OGYAKARTA - Guna memberikan edukasi tentang pemanfaatan dan pengembangan panas bumi di Indonesia, Kementerian Energi dan Sumber Daya Mineral (ESDM) bekerja sama dengan PT Pertamina Geothermal Energy (PGE) dan Pemerintah Kota Yogyakarta menghadirkan Zona Panas Bumi di Taman Pintar Yogyakarta yang mulai dibuka untuk umum hari ini, Jumat (26/5). Zona Panas Bumi diresmikan dengan pengguntingan pita bersama Direktur Jenderal Energi Baru, Terbarukan, dan Konservasi Energi yang diwakili oleh Direktur Panas Bumi Yunus Saefulhak, Direktur Utama PGE Irfan Zainuddin, dan Wakil Walikota Yogyakarta Heru Purwadi.</p>', '<p>&quot;Kita berada di sini dalam rangka mewariskan energi bersih untuk masa depan. (Diharapkan) dengan edukasi tentang panas bumi di Taman Pintar ini resistensi masyarakat akan turun, dan pengembangan panas bumi akan dapat sesuai target nasional,&quot; papar Yunus. Taman pintar ini merupakan destinasi wisata dengan pengunjung 1 juta lebih per tahunnya yang sebagian besar adalah pelajar usia sekolah dasar dan menengah. Oleh karena itu, lanjut Yunus, Taman Pintar diharapkan dapat mengedukasi para orang tua melalui penuturan anak-anaknya selepas berkunjung. &quot;Anak ini yang akan bercerita kepada orangtuanya kalau panas bumi adalah air yang ditanak sehingga keluar uap. Jadi tidak berbahaya, berbeda dengan energi fosil atau penambangan lainnya,&quot; tambah Yunus. Yunus mengungkapkan, dari 28000 MW potensi panas bumi nasional saat ini yang sudah dimanfaatkan baru sekitar 1700 MW atau 6,2%. Saat ini sudah 9 Wilayah Kerja Panasbumi (WKP) sudah berproduksi, semuanya ramah lingkungan dan sustainable. &quot;Asal lingkungan di atasnya dijaga baik, uap dari lubang tersebut akan dapat terus dimanfaatkan, bahkan (PLTP) Kamojang hingga saat ini dapat beroperasi tanpa bahan bakar lainnya,&quot; ujarnya. Yunus berharap, dalam 1-2 tahun ke depan keberadaan Zona Panas Bumi di Taman Pintar dapat mengubah persepsi panas bumi membahayakan dan mencemari lingkungan. &quot;Dalam pembangunan infrastuktur panas bumi memang ada yg dibongkar, namun sangat kecil, hanya 1-10% dibanding penambangan yg lain. Disini pengunjung diberikan pemahaman yang komprehensif bahwa panas bumi ini adalah energi yang ramah lingkungan, sustainable, dan memberikan dampak ekonomi bagi daerah penghasil,&quot; pungkas Yunus. (KHR)</p>', 'Title IndonesianMeta Title', 'Title IndonesianMeta Title', 'Title IndonesianMeta Title', '2017-07-05 16:49:01', '2017-07-05 16:49:01', 4),
	(8, 'en', 'Title English', 'Title-English', '<p><span class="first-letter">Y</span>OGYAKARTA - To provide education on geothermal utilization and development in Indonesia, the Ministry of Energy and Mineral Resources (ESDM) in cooperation with PT Pertamina Geothermal Energy (PGE) and the Government of Yogyakarta presents the Geothermal Zone in Taman Pintar Yogyakarta which is open to the public Today, Friday (26/5). The Geothermal Zone was inaugurated with ribbon cutting with the Director General of New Energy, Renewable Energy and Energy Conservation represented by Director of Geothermal Yunus Saefulhak, PGE President Director Irfan Zainuddin and Vice Mayor of Yogyakarta Heru Purwadi.</p>', '<p>&quot;We are here in order to pass on clean energy for the future.&quot; (Hopefully) with education on geothermal in Taman Pintar this community resistance will come down, and geothermal development will be able to fit the national target, &quot;Yunus said. This smart park is a tourist destination with more than 1 million visitors per year, most of them are elementary and middle school students. Therefore, continued Yunus, Taman Pintar is expected to educate the parents through the narrative of his children after visiting. &quot;This child who will tell his parents if the geothermal is water that is dipan so steam out, so harmless, unlike the fossil energy or other mining,&quot; added Yunus. Yunus revealed, of 28000 MW of the current national geothermal potential that has been utilized only about 1700 MW or 6.2%. Currently, 9 Working Areas of Panasbumi (WKP) are already in production, all are environmentally friendly and sustainable. &quot;The origin of the environment on it is well guarded, steam from the hole will continue to be utilized, even (PLTP) Kamojang until now can operate without other fuel,&quot; he said. Yunus hopes that within the next 1-2 years the existence of Geothermal Zone in Taman Pintar can change the geothermal perception of harm and pollute the environment. &quot;In the construction of geothermal infrastructure there are indeed dismantled, but very small, only 1-10% compared to other mining.There visitors are given a comprehensive understanding that this geothermal energy is environmentally friendly, sustainable, and provide economic impacts for producing areas , &quot;Yunus concluded. (KHR)</p>', 'Title English', 'Title English', 'Title English', '2017-07-05 16:49:01', '2017-07-05 16:49:01', 4),
	(9, 'id', 'Title Indonesian with related news', 'Title-Indonesian-with-related-news', '<p>Introduction&nbsp;<b>(Indonesian)</b></p>', '<p>Description&nbsp;<b>(Indonesian)</b></p>', 'Meta Title', 'Meta Keyword', 'Meta Description', '2017-07-05 17:19:21', '2017-07-05 17:19:21', 5),
	(10, 'en', 'Title English with related news', 'Title-English-with-related-news', '<p>Introduction&nbsp;<b>(English)</b></p>', '<p>Description&nbsp;<b>(English)</b></p>', 'Meta Title', 'Meta Keyword', 'Meta Description', '2017-07-05 17:19:21', '2017-07-05 17:19:21', 5);
/*!40000 ALTER TABLE `news_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_category
CREATE TABLE IF NOT EXISTS `nrecc_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_category: ~4 rows (approximately)
DELETE FROM `nrecc_category`;
/*!40000 ALTER TABLE `nrecc_category` DISABLE KEYS */;
INSERT INTO `nrecc_category` (`id`, `is_active`, `order`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 1, 1, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1),
	(2, 1, 2, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1),
	(3, 1, 3, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1),
	(4, 1, 4, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1);
/*!40000 ALTER TABLE `nrecc_category` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_category_trans
CREATE TABLE IF NOT EXISTS `nrecc_category_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `meta_title` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  `meta_description` text NOT NULL,
  `nrecc_category_id` int(10) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_nrecc_category_trans_1_idx` (`nrecc_category_id`),
  CONSTRAINT `fk_nrecc_category_trans_1` FOREIGN KEY (`nrecc_category_id`) REFERENCES `nrecc_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_category_trans: ~8 rows (approximately)
DELETE FROM `nrecc_category_trans`;
/*!40000 ALTER TABLE `nrecc_category_trans` DISABLE KEYS */;
INSERT INTO `nrecc_category_trans` (`id`, `locale`, `title`, `slug`, `description`, `meta_title`, `meta_keyword`, `meta_description`, `nrecc_category_id`, `created_at`, `updated_at`) VALUES
	(1, 'en', 'Wind Energy', 'wind-energy', 'People have used windmills to harvest wind energy for centuries, but modern technology allows us to convert a windmill’s kinetic energy into electricity that can be stored in batteries or pumped directly into the grid to power homes and businesses.', 'Wind Energy', 'Wind Energy', 'Wind Energy', 1, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(2, 'id', 'Energi Angin', 'energi-angin', 'Orang telah menggunakan kincir angin untuk memanen energi angin selama berabad-abad, namun teknologi modern memungkinkan kita mengubah energi kinetik kincir angin menjadi listrik yang dapat disimpan dalam baterai atau dipompa langsung ke grid untuk memberi kekuatan pada rumah dan bisnis.', 'Energi Angin', 'Energi Angin', 'Energi Angin', 1, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(3, 'en', 'Wave and Hydropower', 'wave-and-hydropower', 'Hydroelectric dams are nothing new, but they do provide some of the most reliable and comparatively sustainable energy used in major metropolitan areas. Some new companies are looking for a new way to use water to generate power by placing turbines in the ocean and converting the movement of waves into electricity that can be piped to the mainland.', 'Wave and Hydropower', 'Wave and Hydropower', 'Wave and Hydropower', 2, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(4, 'id', 'Gelombang dan Tenaga Air', 'gelombang-dan-tenaga-air', 'Bendungan PLTA bukanlah hal yang baru, tapi menyediakan beberapa energi yang paling dapat diandalkan dan relatif berkelanjutan yang digunakan di wilayah metropolitan utama. Beberapa perusahaan baru mencari cara baru untuk menggunakan air untuk menghasilkan tenaga dengan menempatkan turbin di laut dan mengubah pergerakan gelombang menjadi listrik yang bisa disalurkan ke daratan.', 'Gelombang dan Tenaga Air', 'Gelombang dan Tenaga Air', 'Gelombang dan Tenaga Air', 2, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(5, 'en', 'Solar Power', 'solar-power', 'Solar energy is one of the most recognized forms of truly sustainable energy, but the photovoltaic cells in solar panels haven’t been made efficient enough to make solar a cost-effective energy source for individual homes. Large solar farms that can use economies of scale to drive down the cost per kilowatt-hour are slowly becoming mainstream, but when government subsidies for these operations dry up, it will be up to individuals and advocates to keep solar power in the spotlight.', 'Solar Power', 'Solar Power', 'Solar Power', 3, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(6, 'id', 'Tenaga surya', 'tenaga-surya', 'Energi surya adalah salah satu bentuk yang paling dikenal dari energi yang benar-benar berkelanjutan, namun sel fotovoltaik di panel surya belum dibuat cukup efisien untuk membuat sumber energi hemat energi bagi rumah masing-masing. Peternakan surya besar yang dapat menggunakan skala ekonomis untuk menurunkan biaya per kilowatt-hour perlahan menjadi mainstream, namun ketika subsidi pemerintah untuk operasi ini mengering, akan tergantung pada individu dan pendukung untuk menjaga agar tenaga surya tetap dalam sorotan.', 'Tenaga surya', 'Tenaga surya', 'Tenaga surya', 3, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(7, 'en', 'Energy Law and Policy', 'energy-law-and-policy', 'The government has an incredible amount of power to influence the energy market, and lately wind and solar farms have been boosted by state and federal subsidies in the U.S. Some countries have fully committed to either wind or solar as their renewable energy of choice, but the U.S. is big enough to accommodate many types of renewable power sources, and energy policy will play a big part in deciding which sources are developed and deployed fastest.', 'Energy Law and Policy', 'Energy Law and Policy', 'Energy Law and Policy', 4, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(8, 'id', 'Hukum dan Kebijakan Energi', 'hukum-dan-kebijakan-energi', 'Pemerintah memiliki jumlah kekuatan yang luar biasa untuk mempengaruhi pasar energi, dan akhir-akhir ini peternakan angin dan matahari telah didorong oleh subsidi negara bagian dan federal di AS Beberapa negara telah berkomitmen penuh terhadap angin atau matahari sebagai energi pilihan terbarunya, namun AS cukup besar untuk mengakomodasi berbagai jenis sumber daya terbarukan, dan kebijakan energi akan memainkan peran besar dalam menentukan sumber mana yang dikembangkan dan digunakan paling cepat.', 'Hukum dan Kebijakan Energi', 'Hukum dan Kebijakan Energi', 'Hukum dan Kebijakan Energi', 4, '2017-07-05 16:49:01', '2017-07-05 16:49:01');
/*!40000 ALTER TABLE `nrecc_category_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_event
CREATE TABLE IF NOT EXISTS `nrecc_event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(255) DEFAULT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `total_view` int(10) DEFAULT NULL,
  `nrecc_category_id` int(5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_nrecc_event_nrecc_category` (`nrecc_category_id`),
  CONSTRAINT `FK_nrecc_event_nrecc_category` FOREIGN KEY (`nrecc_category_id`) REFERENCES `nrecc_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_event: ~0 rows (approximately)
DELETE FROM `nrecc_event`;
/*!40000 ALTER TABLE `nrecc_event` DISABLE KEYS */;
/*!40000 ALTER TABLE `nrecc_event` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_event_images
CREATE TABLE IF NOT EXISTS `nrecc_event_images` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) DEFAULT NULL,
  `nrecc_event_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_nrecc_event_images_nrecc_event` (`nrecc_event_id`),
  CONSTRAINT `FK_nrecc_event_images_nrecc_event` FOREIGN KEY (`nrecc_event_id`) REFERENCES `nrecc_event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_event_images: ~0 rows (approximately)
DELETE FROM `nrecc_event_images`;
/*!40000 ALTER TABLE `nrecc_event_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `nrecc_event_images` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_event_trans
CREATE TABLE IF NOT EXISTS `nrecc_event_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `title` varchar(150) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `side_description` varchar(255) DEFAULT NULL,
  `description` text,
  `meta_title` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  `meta_description` text NOT NULL,
  `nrecc_event_id` int(10) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_nrecc_event_trans_1_idx` (`nrecc_event_id`),
  CONSTRAINT `fk_nrecc_event_trans_1` FOREIGN KEY (`nrecc_event_id`) REFERENCES `nrecc_event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_event_trans: ~0 rows (approximately)
DELETE FROM `nrecc_event_trans`;
/*!40000 ALTER TABLE `nrecc_event_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `nrecc_event_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_institution
CREATE TABLE IF NOT EXISTS `nrecc_institution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(255) DEFAULT NULL,
  `introduction_images` varchar(255) DEFAULT NULL,
  `description_images` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `nrecc_category_id` int(5) DEFAULT NULL,
  `total_view` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_nrecc_institution_1_idx` (`nrecc_category_id`),
  CONSTRAINT `fk_nrecc_institution_1` FOREIGN KEY (`nrecc_category_id`) REFERENCES `nrecc_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_institution: ~5 rows (approximately)
DELETE FROM `nrecc_institution`;
/*!40000 ALTER TABLE `nrecc_institution` DISABLE KEYS */;
INSERT INTO `nrecc_institution` (`id`, `thumbnail`, `introduction_images`, `description_images`, `is_active`, `order`, `nrecc_category_id`, `total_view`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'Hurricane.jpg', 'Hurricane.jpg', 'Hurricane.jpg', 1, 1, 1, NULL, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1),
	(2, 'Hurricane.jpg', 'Hurricane.jpg', 'Hurricane.jpg', 1, 2, 2, NULL, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1),
	(3, 'Hurricane.jpg', 'Hurricane.jpg', 'Hurricane.jpg', 1, 3, 3, NULL, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1),
	(4, 'Hurricane.jpg', 'Hurricane.jpg', 'Hurricane.jpg', 1, 4, 4, NULL, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1),
	(5, 'Hurricane.jpg', 'Hurricane.jpg', 'Hurricane.jpg', 1, 4, 4, NULL, '2017-07-05 16:49:01', '2017-07-05 16:49:01', 1);
/*!40000 ALTER TABLE `nrecc_institution` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_institution_trans
CREATE TABLE IF NOT EXISTS `nrecc_institution_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `side_description` varchar(255) DEFAULT NULL,
  `description` text,
  `meta_title` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  `meta_description` text NOT NULL,
  `nrecc_institution_id` int(10) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_nrecc_institution_trans_1_idx` (`nrecc_institution_id`),
  CONSTRAINT `fk_nrecc_institution_trans_1` FOREIGN KEY (`nrecc_institution_id`) REFERENCES `nrecc_institution` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_institution_trans: ~10 rows (approximately)
DELETE FROM `nrecc_institution_trans`;
/*!40000 ALTER TABLE `nrecc_institution_trans` DISABLE KEYS */;
INSERT INTO `nrecc_institution_trans` (`id`, `locale`, `slug`, `title`, `introduction`, `side_description`, `description`, `meta_title`, `meta_keyword`, `meta_description`, `nrecc_institution_id`, `created_at`, `updated_at`) VALUES
	(1, 'en', 'iea-closely-monitoring-situation-after-hurricane-harvey', 'IEA closely monitoring situation after Hurricane Harvey', '<p>The IEA is monitoring the situation caused by Hurricane Harvey (Photograph: US National Oceanic and Atmospheric Administration)</p>', '<p>The IEA is monitoring the situation caused by Hurricane Harvey very closely and is in contact with authorities in the United States.</p>', '<p>It is too soon to know how long oil production and refining operations will be disrupted, or the extent of the damage. However, for now, the IEA does not see a need to act as the market is amply supplied. Oil stocks, both crude and products, are well above the five-year average, in the United States as well as globally.</p><p>The situation is being reviewed constantly and the IEA stands ready to act as required.</p>', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 1, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(2, 'id', 'iea-erat-pemantauan-situasi-setelah-badai-harvey', 'IEA memantau situasi dengan ketat setelah Badai Harvey', '<p> IEA memantau situasi yang disebabkan oleh Badai Harvey (Foto: Administrasi Oseanik dan Atmosfer Nasional AS) </ p>', '<p> IEA memantau situasi yang disebabkan oleh Hurricane Harvey sangat erat dan berhubungan dengan pihak berwenang di Amerika Serikat. </ p>', '<p> Terlalu dini untuk mengetahui berapa lama produksi minyak dan operasi penyulingan akan terganggu, atau tingkat kerusakannya. Namun, untuk saat ini, IEA tidak melihat adanya kebutuhan untuk bertindak karena pasar berlimpah. Stok minyak, baik minyak mentah dan produk, jauh di atas rata-rata lima tahun, di Amerika Serikat maupun di seluruh dunia. </p>\n\n<p> Situasi sedang ditinjau terus-menerus dan IEA siap bertindak sesuai kebutuhan. </p>\n', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 1, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(3, 'en', 'iea-closely-monitoring-situation-after-hurricane-harvey-1', 'IEA closely monitoring situation after Hurricane Harvey', '<p>The IEA is monitoring the situation caused by Hurricane Harvey (Photograph: US National Oceanic and Atmospheric Administration)</p>', '<p>The IEA is monitoring the situation caused by Hurricane Harvey very closely and is in contact with authorities in the United States.</p>', '<p>It is too soon to know how long oil production and refining operations will be disrupted, or the extent of the damage. However, for now, the IEA does not see a need to act as the market is amply supplied. Oil stocks, both crude and products, are well above the five-year average, in the United States as well as globally.</p><p>The situation is being reviewed constantly and the IEA stands ready to act as required.</p>', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 2, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(4, 'id', 'iea-erat-pemantauan-situasi-setelah-badai-harvey-1', 'IEA memantau situasi dengan ketat setelah Badai Harvey', '<p> IEA memantau situasi yang disebabkan oleh Badai Harvey (Foto: Administrasi Oseanik dan Atmosfer Nasional AS) </ p>', '<p> IEA memantau situasi yang disebabkan oleh Hurricane Harvey sangat erat dan berhubungan dengan pihak berwenang di Amerika Serikat. </ p>', '<p> Terlalu dini untuk mengetahui berapa lama produksi minyak dan operasi penyulingan akan terganggu, atau tingkat kerusakannya. Namun, untuk saat ini, IEA tidak melihat adanya kebutuhan untuk bertindak karena pasar berlimpah. Stok minyak, baik minyak mentah dan produk, jauh di atas rata-rata lima tahun, di Amerika Serikat maupun di seluruh dunia. </p>\n\n<p> Situasi sedang ditinjau terus-menerus dan IEA siap bertindak sesuai kebutuhan. </p>\n', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 2, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(5, 'en', 'iea-closely-monitoring-situation-after-hurricane-harvey-2', 'IEA closely monitoring situation after Hurricane Harvey', '<p>The IEA is monitoring the situation caused by Hurricane Harvey (Photograph: US National Oceanic and Atmospheric Administration)</p>', '<p>The IEA is monitoring the situation caused by Hurricane Harvey very closely and is in contact with authorities in the United States.</p>', '<p>It is too soon to know how long oil production and refining operations will be disrupted, or the extent of the damage. However, for now, the IEA does not see a need to act as the market is amply supplied. Oil stocks, both crude and products, are well above the five-year average, in the United States as well as globally.</p><p>The situation is being reviewed constantly and the IEA stands ready to act as required.</p>', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 3, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(6, 'id', 'iea-erat-pemantauan-situasi-setelah-badai-harvey-2', 'IEA memantau situasi dengan ketat setelah Badai Harvey', '<p> IEA memantau situasi yang disebabkan oleh Badai Harvey (Foto: Administrasi Oseanik dan Atmosfer Nasional AS) </ p>', '<p> IEA memantau situasi yang disebabkan oleh Hurricane Harvey sangat erat dan berhubungan dengan pihak berwenang di Amerika Serikat. </ p>', '<p> Terlalu dini untuk mengetahui berapa lama produksi minyak dan operasi penyulingan akan terganggu, atau tingkat kerusakannya. Namun, untuk saat ini, IEA tidak melihat adanya kebutuhan untuk bertindak karena pasar berlimpah. Stok minyak, baik minyak mentah dan produk, jauh di atas rata-rata lima tahun, di Amerika Serikat maupun di seluruh dunia. </p>\n\n<p> Situasi sedang ditinjau terus-menerus dan IEA siap bertindak sesuai kebutuhan. </p>\n', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 3, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(7, 'en', 'iea-closely-monitoring-situation-after-hurricane-harvey-3', 'IEA closely monitoring situation after Hurricane Harvey', '<p>The IEA is monitoring the situation caused by Hurricane Harvey (Photograph: US National Oceanic and Atmospheric Administration)</p>', '<p>The IEA is monitoring the situation caused by Hurricane Harvey very closely and is in contact with authorities in the United States.</p>', '<p>It is too soon to know how long oil production and refining operations will be disrupted, or the extent of the damage. However, for now, the IEA does not see a need to act as the market is amply supplied. Oil stocks, both crude and products, are well above the five-year average, in the United States as well as globally.</p><p>The situation is being reviewed constantly and the IEA stands ready to act as required.</p>', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 4, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(8, 'id', 'iea-erat-pemantauan-situasi-setelah-badai-harvey-3', 'IEA memantau situasi dengan ketat setelah Badai Harvey', '<p> IEA memantau situasi yang disebabkan oleh Badai Harvey (Foto: Administrasi Oseanik dan Atmosfer Nasional AS) </ p>', '<p> IEA memantau situasi yang disebabkan oleh Hurricane Harvey sangat erat dan berhubungan dengan pihak berwenang di Amerika Serikat. </ p>', '<p> Terlalu dini untuk mengetahui berapa lama produksi minyak dan operasi penyulingan akan terganggu, atau tingkat kerusakannya. Namun, untuk saat ini, IEA tidak melihat adanya kebutuhan untuk bertindak karena pasar berlimpah. Stok minyak, baik minyak mentah dan produk, jauh di atas rata-rata lima tahun, di Amerika Serikat maupun di seluruh dunia. </p>\n\n<p> Situasi sedang ditinjau terus-menerus dan IEA siap bertindak sesuai kebutuhan. </p>\n', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 4, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(9, 'en', 'iea-closely-monitoring-situation-after-hurricane-harvey-4', 'IEA closely monitoring situation after Hurricane Harvey', '<p>The IEA is monitoring the situation caused by Hurricane Harvey (Photograph: US National Oceanic and Atmospheric Administration)</p>', '<p>The IEA is monitoring the situation caused by Hurricane Harvey very closely and is in contact with authorities in the United States.</p>', '<p>It is too soon to know how long oil production and refining operations will be disrupted, or the extent of the damage. However, for now, the IEA does not see a need to act as the market is amply supplied. Oil stocks, both crude and products, are well above the five-year average, in the United States as well as globally.</p><p>The situation is being reviewed constantly and the IEA stands ready to act as required.</p>', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 'IEA closely monitoring situation after Hurricane Harve', 5, '2017-07-05 16:49:01', '2017-07-05 16:49:01'),
	(10, 'id', 'iea-erat-pemantauan-situasi-setelah-badai-harvey-4', 'IEA memantau situasi dengan ketat setelah Badai Harvey', '<p> IEA memantau situasi yang disebabkan oleh Badai Harvey (Foto: Administrasi Oseanik dan Atmosfer Nasional AS) </ p>', '<p> IEA memantau situasi yang disebabkan oleh Hurricane Harvey sangat erat dan berhubungan dengan pihak berwenang di Amerika Serikat. </ p>', '<p> Terlalu dini untuk mengetahui berapa lama produksi minyak dan operasi penyulingan akan terganggu, atau tingkat kerusakannya. Namun, untuk saat ini, IEA tidak melihat adanya kebutuhan untuk bertindak karena pasar berlimpah. Stok minyak, baik minyak mentah dan produk, jauh di atas rata-rata lima tahun, di Amerika Serikat maupun di seluruh dunia. </p>\n\n<p> Situasi sedang ditinjau terus-menerus dan IEA siap bertindak sesuai kebutuhan. </p>\n', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 'IEA memantau situasi dengan ketat setelah Badai Harve', 5, '2017-07-05 16:49:01', '2017-07-05 16:49:01');
/*!40000 ALTER TABLE `nrecc_institution_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_resources
CREATE TABLE IF NOT EXISTS `nrecc_resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `total_view` int(10) DEFAULT NULL,
  `nrecc_category_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_nrecc_resources_nrecc_category` (`nrecc_category_id`),
  CONSTRAINT `FK_nrecc_resources_nrecc_category` FOREIGN KEY (`nrecc_category_id`) REFERENCES `nrecc_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_resources: ~0 rows (approximately)
DELETE FROM `nrecc_resources`;
/*!40000 ALTER TABLE `nrecc_resources` DISABLE KEYS */;
/*!40000 ALTER TABLE `nrecc_resources` ENABLE KEYS */;

-- Dumping structure for table ebtke.nrecc_resources_trans
CREATE TABLE IF NOT EXISTS `nrecc_resources_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `side_description` varchar(255) DEFAULT NULL,
  `description` text,
  `meta_title` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  `meta_description` text NOT NULL,
  `nrecc_resources_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_nrecc_resources_trans_1_idx` (`nrecc_resources_id`),
  CONSTRAINT `fk_nrecc_resources_trans_1` FOREIGN KEY (`nrecc_resources_id`) REFERENCES `nrecc_resources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.nrecc_resources_trans: ~0 rows (approximately)
DELETE FROM `nrecc_resources_trans`;
/*!40000 ALTER TABLE `nrecc_resources_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `nrecc_resources_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.organization_structure
CREATE TABLE IF NOT EXISTS `organization_structure` (
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

-- Dumping data for table ebtke.organization_structure: ~3 rows (approximately)
DELETE FROM `organization_structure`;
/*!40000 ALTER TABLE `organization_structure` DISABLE KEYS */;
INSERT INTO `organization_structure` (`id`, `fullname`, `thumbnail`, `filename`, `is_active`, `order`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'Ir. Rida Mulyana, MSc', 'Ir-Rida-Mulyana-MSc.jpg', NULL, 1, 1, NULL, NULL, 1),
	(2, 'Dr. Ir. Dadan Kusdiana, M,Sc.', 'Ir-Rida-Mulyana-MSc.jpg', 'structure_01.jpg', 1, 2, NULL, NULL, 1),
	(3, 'Ir. Yunus Saefulhak, M.M., M.T.', 'Ir-Rida-Mulyana-MSc.jpg', 'structure_02.jpg', 1, 3, NULL, NULL, 1);
/*!40000 ALTER TABLE `organization_structure` ENABLE KEYS */;

-- Dumping structure for table ebtke.organization_structure_trans
CREATE TABLE IF NOT EXISTS `organization_structure_trans` (
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

-- Dumping data for table ebtke.organization_structure_trans: ~9 rows (approximately)
DELETE FROM `organization_structure_trans`;
/*!40000 ALTER TABLE `organization_structure_trans` DISABLE KEYS */;
INSERT INTO `organization_structure_trans` (`id`, `locale`, `title_position`, `description`, `created_at`, `updated_at`, `organization_structure_id`) VALUES
	(1, 'id', 'Direktur Jenderal energi baru, terbarukan, dan konservasi energi', '<p>\n<h3>DIREKTUR JENDERAL ENERGI BARU, TERBARUKAN, DAN KONSERVASI ENERGI</h3>\n</p>\n<p>\nDirektorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi mempunyai tugas menyelenggarakan perumusan dan pelaksanaan kebijakan di bidang pembinaan, pengendalian, dan pengawasan kegiatan panas bumi, bioenergi, aneka energi baru dan terbarukan, dan\nkonservasi energi.</p>\n<p>\nDirektorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi terdiri dari 6 unit kerja:</p>\n<ul>\n<li>Sekretariat Direktorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi;</li>\n<li>Direktorat Panas Bumi;</li>\n<li>Direktorat Bioenergi;</li>\n<li>Direktorat Aneka Energi Baru dan Energi Terbarukan;</li>\n<li>Direktorat Konservasi Energi;</li>\n<li>Direktorat Perencanaan dan Pembangunan Infrastruktur EBTKE</li>\n</ul>', NULL, NULL, 1),
	(2, 'en', 'Director General of new, renewable energy, and energy conservation', '<p>\n<h3>DIRECTOR GENERAL OF NEW ENERGY, ENERGY AND ENERGY CONSERVATION</h3>\n</p>\n<p>\nThe Directorate General of New Energy, Renewable Energy and Conservation has the task of organizing the formulation and implementation of policies in the field of fostering, controlling and supervising geothermal, bioenergy, new and renewable energy activities, and\nEnergy conservation.</p>\n<p>\nThe Directorate General of New, Renewable and Energy Conservation consists of 6 work units:</p>\n<ul>\n<li> Secretariat of the Directorate General of New, Renewable Energy and Energy Conservation; </ li>\n<li> Directorate of Geothermal </ li>\n<li> Directorate of Bioenergy; </ li>\n<li> Directorate of New Energy and Renewable Energy </ li>\n<li> Directorate of Energy Conservation; </ li>\n<li> Directorate of Planning and Infrastructure Development EBTKE </ li>\n</ ul>', NULL, NULL, 1),
	(3, 'da', 'Generaldirektør for ny, vedvarende energi og energibesparelse', '<p>\n<h3>DIREKTØR GENEREL AF NY ENERGI, ENERGI OG ENERGIBEVARING</h3>\n</p>\n<p>\nGeneraldirektoratet for Ny Energi, Vedvarende Energi og Bevarelse har til opgave at organisere udformningen og gennemførelsen af politikker inden for fremme, kontrol og overvågning af geotermisk, bioenergi, ny og vedvarende energiaktiviteter, og\nEnergibesparelse.</p>\n<p>\nGeneraldirektoratet for ny, vedvarende energi og energibesparelse består af 6 arbejdsenheder:</p>\n<ul>\n<li> Sekretariat for Generaldirektoratet for vedvarende energi og energibesparelser; </ li>\n<li> Direktoratet Geotermisk; </ li>\n<li> Direktoratet Bioenergi; </ li>\n<li> Direktoratet for Kunst, den Nye Energi og Vedvarende Energi </ li>\n<li> Direktoratet for energibesparelser; </ li>\n<li> Direktoratet for Planlægning og Infrastruktur Udvikling EBTKE </ li>\n</ ul>', NULL, NULL, 1),
	(4, 'id', 'Sekretaris Direktorat Jenderal energi baru, terbarukan, dan konservasi energi', '<p>\n<h3>SEKRETARIS DIREKTORAT JENDERAL ENERGI BARU, TERBARUKAN, DAN KONSERVASI ENERGI</h3>\n</p>\nSekretariat Direktorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi mempunyai tugas melaksanakan koordinasi pelaksanaan tugas, pembinaan dan pemberian dukungan administrasi kepada seluruh unit organisasi di lingkungan Direktorat Jenderal Energi Baru, Terbarukan, dan Konservasi Energi.</p>', NULL, NULL, 2),
	(5, 'en', 'Secretary of Directorate General of new, renewable energy and energy conservation', '<p>\n<h3>SECRETARY OF DIRECTORATE GENERAL OF NEW ENERGY, ENERGY AND CONSERVATION</h3>\n</p>\nSecretariat of the Directorate General of New Energy, Renewable Energy and Conservation has the duty to coordinate the implementation of tasks, guidance and administration support to all organizational units within the Directorate General of New Energy, Renewable Energy and Conservation.</p>', NULL, NULL, 2),
	(6, 'da', 'Generalsekretæren for ny energi, vedvarende, og energibesparelser', '<p>\n<h3>GENERALDIREKTORAT energiminister NY, VEDVARENDE og energibesparelser</h3>\n</p>\n<p>Sekretariatet for Generaldirektoratet for vedvarende energi og energibesparelser har til opgave at koordinere gennemførelsen af de opgaver, coaching og yde administrativ støtte til alle organisatoriske enheder inden for Generaldirektoratet for vedvarende energi og energibesparelser.</p>', NULL, NULL, 2),
	(7, 'id', 'Direktur Panas Bumi', '<p>\n<h3>DIREKTUR PANAS BUMI</h3>\n</p>\n<p>Direktorat Panas Bumi mempunyai tugas melaksanakan perumusan dan pelaksanaan kebijakan, penyusunan norma, standar, prosedur, dan kriteria, pemberian bimbingan teknis dan supervisi, evaluasi dan pelaporan, serta pengendalian dan pengawasan di bidang penyiapan program, pengawasan eksplorasi dan eksploitasi, pelayanan dan bimbingan usaha, investasi, dan kerja sama, keteknikan dan lingkungan panas bumi.</p>', NULL, NULL, 3),
	(8, 'en', 'Director of Geothermal', '<p>\n<h3> DIRECTOR OF HOT EARTH </h3>\n</p>\n<p> The Directorate of Geothermal has the task of executing the formulation and execution of policies, the compilation of norms, standards, procedures and criteria, the provision of technical guidance and supervision, evaluation and reporting, as well as control and supervision in the field of program preparation, exploration and exploitation, Business guidance, investment, and cooperation, engineering and geothermal environments. </p>', NULL, NULL, 3),
	(9, 'da', 'Director Geotermisk', '<p>\n<h3> DIREKTØR FOR GEOTERMISK </h3>\n</p>\n<p> Direktoratet Jordvarme har opgaver politikformulering og implementering, udarbejdelse af normer, standarder, procedurer og kriterier, der giver teknisk vejledning og supervision, evaluering og rapportering, samt kontrol og tilsyn inden for områderne forberedelse program, overvågning af efterforskning og udnyttelse, service og vejledning af virksomheder, investeringer og samarbejde, teknik og geotermisk miljø. </p>', NULL, NULL, 3);
/*!40000 ALTER TABLE `organization_structure_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.potentials
CREATE TABLE IF NOT EXISTS `potentials` (
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

-- Dumping data for table ebtke.potentials: ~0 rows (approximately)
DELETE FROM `potentials`;
/*!40000 ALTER TABLE `potentials` DISABLE KEYS */;
/*!40000 ALTER TABLE `potentials` ENABLE KEYS */;

-- Dumping structure for table ebtke.potentials_city_region
CREATE TABLE IF NOT EXISTS `potentials_city_region` (
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

-- Dumping data for table ebtke.potentials_city_region: ~0 rows (approximately)
DELETE FROM `potentials_city_region`;
/*!40000 ALTER TABLE `potentials_city_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `potentials_city_region` ENABLE KEYS */;

-- Dumping structure for table ebtke.potentials_region
CREATE TABLE IF NOT EXISTS `potentials_region` (
  `id` int(10) NOT NULL,
  `region_name` varchar(70) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `region_name_UNIQUE` (`region_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.potentials_region: ~0 rows (approximately)
DELETE FROM `potentials_region`;
/*!40000 ALTER TABLE `potentials_region` DISABLE KEYS */;
/*!40000 ALTER TABLE `potentials_region` ENABLE KEYS */;

-- Dumping structure for table ebtke.province
CREATE TABLE IF NOT EXISTS `province` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `latitude` decimal(10,10) DEFAULT NULL,
  `longitude` decimal(10,10) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table ebtke.province: ~34 rows (approximately)
DELETE FROM `province`;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` (`id`, `name`, `latitude`, `longitude`, `created_at`, `updated_at`, `created_by`) VALUES
	(11, 'ACEH', NULL, NULL, NULL, NULL, NULL),
	(12, 'SUMATERA UTARA', NULL, NULL, NULL, NULL, NULL),
	(13, 'SUMATERA BARAT', NULL, NULL, NULL, NULL, NULL),
	(14, 'RIAU', NULL, NULL, NULL, NULL, NULL),
	(15, 'JAMBI', NULL, NULL, NULL, NULL, NULL),
	(16, 'SUMATERA SELATAN', NULL, NULL, NULL, NULL, NULL),
	(17, 'BENGKULU', NULL, NULL, NULL, NULL, NULL),
	(18, 'LAMPUNG', NULL, NULL, NULL, NULL, NULL),
	(19, 'KEPULAUAN BANGKA BELITUNG', NULL, NULL, NULL, NULL, NULL),
	(21, 'KEPULAUAN RIAU', NULL, NULL, NULL, NULL, NULL),
	(31, 'DKI JAKARTA', NULL, NULL, NULL, NULL, NULL),
	(32, 'JAWA BARAT', NULL, NULL, NULL, NULL, NULL),
	(33, 'JAWA TENGAH', NULL, NULL, NULL, NULL, NULL),
	(34, 'DI YOGYAKARTA', NULL, NULL, NULL, NULL, NULL),
	(35, 'JAWA TIMUR', NULL, NULL, NULL, NULL, NULL),
	(36, 'BANTEN', NULL, NULL, NULL, NULL, NULL),
	(51, 'BALI', NULL, NULL, NULL, NULL, NULL),
	(52, 'NUSA TENGGARA BARAT', NULL, NULL, NULL, NULL, NULL),
	(53, 'NUSA TENGGARA TIMUR', NULL, NULL, NULL, NULL, NULL),
	(61, 'KALIMANTAN BARAT', NULL, NULL, NULL, NULL, NULL),
	(62, 'KALIMANTAN TENGAH', NULL, NULL, NULL, NULL, NULL),
	(63, 'KALIMANTAN SELATAN', NULL, NULL, NULL, NULL, NULL),
	(64, 'KALIMANTAN TIMUR', NULL, NULL, NULL, NULL, NULL),
	(65, 'KALIMANTAN UTARA', NULL, NULL, NULL, NULL, NULL),
	(71, 'SULAWESI UTARA', NULL, NULL, NULL, NULL, NULL),
	(72, 'SULAWESI TENGAH', NULL, NULL, NULL, NULL, NULL),
	(73, 'SULAWESI SELATAN', NULL, NULL, NULL, NULL, NULL),
	(74, 'SULAWESI TENGGARA', NULL, NULL, NULL, NULL, NULL),
	(75, 'GORONTALO', NULL, NULL, NULL, NULL, NULL),
	(76, 'SULAWESI BARAT', NULL, NULL, NULL, NULL, NULL),
	(81, 'MALUKU', NULL, NULL, NULL, NULL, NULL),
	(82, 'MALUKU UTARA', NULL, NULL, NULL, NULL, NULL),
	(91, 'PAPUA BARAT', NULL, NULL, NULL, NULL, NULL),
	(94, 'PAPUA', NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `province` ENABLE KEYS */;

-- Dumping structure for table ebtke.renewable_energy
CREATE TABLE IF NOT EXISTS `renewable_energy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` tinyint(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.renewable_energy: ~0 rows (approximately)
DELETE FROM `renewable_energy`;
/*!40000 ALTER TABLE `renewable_energy` DISABLE KEYS */;
/*!40000 ALTER TABLE `renewable_energy` ENABLE KEYS */;

-- Dumping structure for table ebtke.renewable_energy_trans
CREATE TABLE IF NOT EXISTS `renewable_energy_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `title` varchar(150) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `introduction` text,
  `description` text,
  `meta_title` varchar(80) DEFAULT NULL,
  `meta_keyword` varchar(150) DEFAULT NULL,
  `meta_description` text,
  `renewable_energy_id` int(10) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_renewable_energy_trans_1_idx` (`renewable_energy_id`),
  CONSTRAINT `fk_renewable_energy_trans_1` FOREIGN KEY (`renewable_energy_id`) REFERENCES `renewable_energy` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.renewable_energy_trans: ~0 rows (approximately)
DELETE FROM `renewable_energy_trans`;
/*!40000 ALTER TABLE `renewable_energy_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `renewable_energy_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.seo
CREATE TABLE IF NOT EXISTS `seo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `key` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.seo: ~13 rows (approximately)
DELETE FROM `seo`;
/*!40000 ALTER TABLE `seo` DISABLE KEYS */;
INSERT INTO `seo` (`id`, `key`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'seo:landing:news', '2017-06-07 10:15:33', NULL, 1),
	(2, 'seo:company:organization-structure', '2017-06-07 10:15:33', NULL, 1),
	(3, 'seo:company:history', '2017-06-07 10:15:33', NULL, 1),
	(4, 'seo:company:vision-mission', '2017-06-07 10:15:33', NULL, 1),
	(5, 'seo:company:scope-of-services', '2017-06-07 10:15:33', NULL, 1),
	(6, 'seo:white-paper:landing', '2017-06-07 10:15:33', NULL, 1),
	(7, 'seo:home:pages', '2017-07-12 15:22:21', '2017-07-12 15:26:09', 1),
	(8, 'seo:investment-services:procedure', '2017-07-12 16:22:15', '2017-07-12 16:22:15', 1),
	(9, 'seo:investment-services:green-pages', '2017-07-12 16:22:46', '2017-07-12 16:22:46', 1),
	(11, 'seo:landing:event', '2017-07-13 05:04:17', '2017-07-13 05:04:17', 1),
	(12, 'seo:renewable-energy:industri', '2017-07-13 06:03:49', '2017-07-13 06:03:49', 1),
	(13, 'seo:resources:tools', '2017-07-13 12:01:43', '2017-07-13 12:01:43', 1),
	(14, 'seo:resources:white-papers', '2017-07-13 12:02:39', '2017-07-13 12:02:39', 1);
/*!40000 ALTER TABLE `seo` ENABLE KEYS */;

-- Dumping structure for table ebtke.seo_trans
CREATE TABLE IF NOT EXISTS `seo_trans` (
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.seo_trans: ~26 rows (approximately)
DELETE FROM `seo_trans`;
/*!40000 ALTER TABLE `seo_trans` DISABLE KEYS */;
INSERT INTO `seo_trans` (`id`, `locale`, `meta_title`, `meta_keyword`, `meta_description`, `seo_id`, `created_at`, `updated_at`) VALUES
	(1, 'id', 'Kementerian ESDM Republik Indonesia | Berita dan Kegiatan', 'Berita dan Kegiatan', 'Kementerian ESDM Republik Indonesia | Berita dan Kegiatan', 1, '2017-06-07 07:39:45', '2017-06-07 07:39:45'),
	(2, 'en', 'Ministry ESDM Republic Of Indonesia | Event And News', 'Event And News', 'Ministry ESDM Republic Of Indonesia | Event And News', 1, '2017-06-07 07:39:45', '2017-06-07 07:39:45'),
	(3, 'en', 'Organization Structure', 'Organization Structure', 'Organization Structure', 2, '2017-06-07 07:39:45', '2017-06-07 07:39:45'),
	(4, 'id', 'Struktur Organisasi', 'Struktur Organisasi', 'Struktur Organisasi', 2, '2017-06-07 07:39:45', '2017-06-07 07:39:45'),
	(5, 'en', 'Company History', 'Company History', 'Company History', 3, '2017-06-07 07:39:45', '2017-06-07 07:39:45'),
	(6, 'id', 'Sejarah Perusahaan', 'Sejarah Perusahaan', 'Sejarah Perusahaan', 3, '2017-06-07 07:39:45', '2017-06-07 07:39:45'),
	(7, 'id', 'Cakupan pelayanan LINTAS', 'Cakupan pelayanan LINTAS', 'Cakupan pelayanan LINTAS', 5, '2017-06-14 11:36:24', '2017-06-14 11:36:24'),
	(8, 'en', 'LINTAS scope of works', 'LINTAS scope of works', 'LINTAS scope of works', 5, '2017-06-14 11:36:24', '2017-06-14 11:36:24'),
	(9, 'id', 'Menjadi gerbang energi bersih di Indonesia', 'Menjadi gerbang energi bersih di Indonesia', 'Menjadi gerbang energi bersih di Indonesia', 4, '2017-06-14 11:36:24', '2017-06-14 11:36:24'),
	(10, 'en', 'Gateway to clean energy in Indonesia - Lintas energi bersih Indonesia', 'Gateway to clean energy in Indonesia - Lintas energi bersih Indonesia', 'Gateway to clean energy in Indonesia - Lintas energi bersih Indonesia', 4, '2017-06-14 11:36:24', '2017-06-14 11:36:24'),
	(11, 'en', 'white papers', 'white papers', 'white papers', 6, '2017-06-14 11:36:24', '2017-06-14 11:36:24'),
	(12, 'id', 'kertas putih', 'kertas putih', 'kertas putih', 6, '2017-06-14 11:36:24', '2017-06-14 11:36:24'),
	(17, 'id', 'Lintas EBTKE Kementrian ESDM', 'EBTKE, ESDM, Lintas, Kementrian ESDM', 'Lintas EBTKE Kementrian ESDM', 7, '2017-07-12 15:26:09', '2017-07-12 15:26:09'),
	(18, 'en', 'Lintas EBTKE Kementrian ESDM', 'EBTKE, ESDM, Lintas, Kementrian ESDM', 'Lintas EBTKE Kementrian ESDM', 7, '2017-07-12 15:26:09', '2017-07-12 15:26:09'),
	(19, 'id', 'Meta Title', 'Meta Keyword', 'Meta Description', 8, '2017-07-12 16:22:15', '2017-07-12 16:22:15'),
	(20, 'en', 'Meta Title', 'Meta Keyword', 'Meta Description', 8, '2017-07-12 16:22:15', '2017-07-12 16:22:15'),
	(21, 'id', 'Meta Title', 'Meta Keyword', 'Meta Description', 9, '2017-07-12 16:22:46', '2017-07-12 16:22:46'),
	(22, 'en', 'Meta Title', 'Meta Keyword', 'Meta Description', 9, '2017-07-12 16:22:46', '2017-07-12 16:22:46'),
	(27, 'id', 'SEO LANDING EVENT', 'SEO LANDING EVENT', 'SEO LANDING EVENT', 11, '2017-07-13 05:04:17', '2017-07-13 05:04:17'),
	(28, 'en', 'SEO LANDING EVENT', 'SEO LANDING EVENT', 'SEO LANDING EVENT', 11, '2017-07-13 05:04:17', '2017-07-13 05:04:17'),
	(29, 'id', 'SEO RENEWABLE INDUSTRI', 'SEO RENEWABLE INDUSTRI', 'SEO RENEWABLE INDUSTRI', 12, '2017-07-13 06:03:49', '2017-07-13 06:03:49'),
	(30, 'en', 'SEO RENEWABLE INDUSTRI', 'SEO RENEWABLE INDUSTRI', 'SEO RENEWABLE INDUSTRI', 12, '2017-07-13 06:03:49', '2017-07-13 06:03:49'),
	(31, 'id', 'SEO TOOLS', 'SEO TOOLS', 'SEO TOOLS', 13, '2017-07-13 12:01:43', '2017-07-13 12:01:43'),
	(32, 'en', 'SEO TOOLS', 'SEO TOOLS', 'SEO TOOLS', 13, '2017-07-13 12:01:43', '2017-07-13 12:01:43'),
	(33, 'id', 'SEO WHITE PAPERS', 'SEO WHITE PAPERS', 'SEO WHITE PAPERS', 14, '2017-07-13 12:02:39', '2017-07-13 12:02:39'),
	(34, 'en', 'SEO WHITE PAPERS', 'SEO WHITE PAPERS', 'SEO WHITE PAPERS', 14, '2017-07-13 12:02:39', '2017-07-13 12:02:39');
/*!40000 ALTER TABLE `seo_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.subscribe
CREATE TABLE IF NOT EXISTS `subscribe` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.subscribe: ~0 rows (approximately)
DELETE FROM `subscribe`;
/*!40000 ALTER TABLE `subscribe` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscribe` ENABLE KEYS */;

-- Dumping structure for table ebtke.tag
CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.tag: ~2 rows (approximately)
DELETE FROM `tag`;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` (`id`, `thumbnail`, `order`, `is_active`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, NULL, 1, 1, '2017-06-22 16:31:51', '2017-06-22 16:31:51', NULL),
	(2, NULL, 1, 1, '2017-06-22 16:31:51', '2017-06-22 16:31:51', NULL);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;

-- Dumping structure for table ebtke.tag_trans
CREATE TABLE IF NOT EXISTS `tag_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `title` varchar(50) NOT NULL,
  `introduction` text,
  `slug` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_tag_trans_1_idx` (`tag_id`),
  CONSTRAINT `fk_tag_trans_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.tag_trans: ~4 rows (approximately)
DELETE FROM `tag_trans`;
/*!40000 ALTER TABLE `tag_trans` DISABLE KEYS */;
INSERT INTO `tag_trans` (`id`, `locale`, `title`, `introduction`, `slug`, `created_at`, `updated_at`, `tag_id`) VALUES
	(1, 'id', 'Berita', 'Lorem Ipsum adalah teks dummy dari industri percetakan dan typesetting. Lorem Ipsum telah menjadi teks dummy standar industri sejak tahun 1500-an, ketika seorang printer yang tidak dikenal mengambil satu jenis makanan dan mengacaknya untuk membuat buku spesimen tipe.', 'berita', '2017-06-22 16:31:51', '2017-06-22 16:31:51', 1),
	(2, 'en', 'News', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ', 'news', '2017-06-22 16:31:51', '2017-06-22 16:31:51', 1),
	(3, 'id', 'Acara', 'Lorem Ipsum adalah teks dummy dari industri percetakan dan typesetting. Lorem Ipsum telah menjadi teks dummy standar industri sejak tahun 1500-an, ketika seorang printer yang tidak dikenal mengambil satu jenis makanan dan mengacaknya untuk membuat buku spesimen tipe.', 'acara', '2017-06-22 16:31:51', '2017-06-22 16:31:51', 2),
	(4, 'en', 'Event', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ', 'event', '2017-06-22 16:31:51', '2017-06-22 16:31:51', 2);
/*!40000 ALTER TABLE `tag_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.tools
CREATE TABLE IF NOT EXISTS `tools` (
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
  `url` varchar(150) NOT NULL,
  `file_size` varchar(10) DEFAULT NULL,
  `thumbnail` varchar(150) DEFAULT NULL,
  `order` int(5) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  UNIQUE KEY `filename_UNIQUE` (`filename`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.tools: ~0 rows (approximately)
DELETE FROM `tools`;
/*!40000 ALTER TABLE `tools` DISABLE KEYS */;
/*!40000 ALTER TABLE `tools` ENABLE KEYS */;

-- Dumping structure for table ebtke.tools_related
CREATE TABLE IF NOT EXISTS `tools_related` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tools_id` int(10) DEFAULT NULL,
  `tools_related_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tools_related_1_idx` (`tools_id`),
  KEY `fk_tools_related_2_idx` (`tools_related_id`),
  CONSTRAINT `fk_tools_related_1` FOREIGN KEY (`tools_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tools_related_2` FOREIGN KEY (`tools_related_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.tools_related: ~0 rows (approximately)
DELETE FROM `tools_related`;
/*!40000 ALTER TABLE `tools_related` DISABLE KEYS */;
/*!40000 ALTER TABLE `tools_related` ENABLE KEYS */;

-- Dumping structure for table ebtke.tools_trans
CREATE TABLE IF NOT EXISTS `tools_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) DEFAULT NULL,
  `description` text,
  `meta_title` varchar(150) DEFAULT NULL,
  `meta_keyword` varchar(150) DEFAULT NULL,
  `meta_description` text,
  `tools_id` int(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tools_trans_1_idx` (`tools_id`),
  CONSTRAINT `fk_tools_trans_1` FOREIGN KEY (`tools_id`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.tools_trans: ~0 rows (approximately)
DELETE FROM `tools_trans`;
/*!40000 ALTER TABLE `tools_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `tools_trans` ENABLE KEYS */;

-- Dumping structure for table ebtke.white_paper
CREATE TABLE IF NOT EXISTS `white_paper` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `thumbnail` varchar(150) DEFAULT NULL,
  `file` varchar(150) DEFAULT NULL,
  `downloaded` int(10) DEFAULT NULL,
  `rating` int(10) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `order` int(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_by` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.white_paper: ~2 rows (approximately)
DELETE FROM `white_paper`;
/*!40000 ALTER TABLE `white_paper` DISABLE KEYS */;
INSERT INTO `white_paper` (`id`, `thumbnail`, `file`, `downloaded`, `rating`, `is_active`, `order`, `created_at`, `updated_at`, `created_by`) VALUES
	(1, 'white_papers__lintas__ebtke5964b61f504cf_invisible_apps.JPG', 'white_papers__lintas__ebtke_invisible_apps.pdf', NULL, NULL, 1, 1, '2017-06-14 17:33:43', '2017-07-11 11:45:58', 1),
	(2, 'white_papers__lintas__ebtke5964e47562b07_505x377.jpg', 'white_papers__lintas__ebtke5964e47562b07_doc1.pdf', 0, 0, 1, 2, '2017-07-11 14:45:09', '2017-07-11 14:45:09', 1);
/*!40000 ALTER TABLE `white_paper` ENABLE KEYS */;

-- Dumping structure for table ebtke.white_paper_trans
CREATE TABLE IF NOT EXISTS `white_paper_trans` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `locale` varchar(2) NOT NULL,
  `title` varchar(100) NOT NULL,
  `slug` varchar(150) DEFAULT NULL,
  `description` text,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_keyword` varchar(100) DEFAULT NULL,
  `meta_description` text,
  `white_paper_id` int(10) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_UNIQUE` (`slug`),
  KEY `fk_1_idx` (`white_paper_id`),
  CONSTRAINT `fk_1` FOREIGN KEY (`white_paper_id`) REFERENCES `white_paper` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke.white_paper_trans: ~4 rows (approximately)
DELETE FROM `white_paper_trans`;
/*!40000 ALTER TABLE `white_paper_trans` DISABLE KEYS */;
INSERT INTO `white_paper_trans` (`id`, `locale`, `title`, `slug`, `description`, `meta_title`, `meta_keyword`, `meta_description`, `white_paper_id`, `created_at`, `updated_at`) VALUES
	(7, 'id', 'Kedatangan Aplikasi Yang Memungkinkan edit', 'kedatangan-aplikasi-yang-memungkinkan-edit', '<p>Akui saja, kita telah menjadi budak layar kita sendiri, beberapa bahkan berbicara tentang &#39;generasi layar&#39; dan mereka benar.<br /><br />Dengan perangkat baru yang beredar di pasaran seperti jam tangan pintar dan Apple TV, waktu layar kita meningkat setiap hari. Tapi seberapa cerdas dan menjadi layar ini? Mari kita ceritakan semuanya tentang itu!</p>', 'Meta Title', 'Meta Keyword', 'Meta Description', 1, '2017-07-11 11:27:27', '2017-07-11 11:27:27'),
	(8, 'en', 'The arrival of the Invisible Apps', 'the-arrival-of-the-invisible-apps', '<p>Admit it, we have become slaves of our own screens, some even speak of the &#39;screen generation&#39; and they are right.<br /><br />With the new devices that are out on the market such as smart watches and Apple TV&rsquo;s, our screen time increases every day. But how intelligent are and become these screens? Let us tell you all about it!</p>', 'Meta Title', 'Meta Keyword', 'Meta Description', 1, '2017-07-11 11:27:27', '2017-07-11 11:27:27'),
	(9, 'id', 'Title Indonesian', 'itle-ndonesian', '<p>Description&nbsp;<b>(Indonesian)</b></p>', 'Meta Title', 'Meta Keyword', 'Meta Description', 2, '2017-07-11 14:45:09', '2017-07-11 14:45:09'),
	(10, 'en', 'Title English', 'itle-nglish', '<p>Description&nbsp;<b>(English)</b></p>', 'Meta Title', 'Meta Keyword', 'Meta Description', 2, '2017-07-11 14:45:09', '2017-07-11 14:45:09');
/*!40000 ALTER TABLE `white_paper_trans` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
