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


-- Dumping database structure for ebtke_sipeda
CREATE DATABASE IF NOT EXISTS `ebtke_sipeda` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ebtke_sipeda`;

-- Dumping structure for table ebtke_sipeda.capacity_building
CREATE TABLE IF NOT EXISTS `capacity_building` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topik_kegiatan` varchar(100) DEFAULT NULL,
  `request_topik` varchar(100) DEFAULT NULL,
  `penyelenggara_kegiatan` varchar(100) DEFAULT NULL,
  `tahun_perencanaan` date DEFAULT NULL,
  `tahun_pelaksanaan` date DEFAULT NULL,
  `target_peserta` int(10) DEFAULT NULL,
  `realisasi_peserta` int(10) DEFAULT NULL,
  `sasaran_peserta` varchar(70) DEFAULT NULL,
  `jenis_institusi_peserta` int(1) DEFAULT NULL COMMENT 'Praktisi\nInstitusi Pemerintah\nBUMN dan Swasta',
  `total_biaya` int(10) DEFAULT NULL,
  `sumber_pendanaan` varchar(40) DEFAULT NULL COMMENT 'APBN\nNon APBN',
  `sertifikasi_kompetensi` int(1) DEFAULT NULL COMMENT 'YES\nNO',
  `sumber_data` varchar(45) DEFAULT NULL,
  `is_publish` int(1) DEFAULT NULL,
  `keterangan` text,
  `lokasi_id` int(5) NOT NULL,
  `jenis_kegiatan_id` int(5) NOT NULL,
  `perusahaan_id` int(10) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_capacity_building_1_idx` (`lokasi_id`),
  KEY `fk_capacity_building_2_idx` (`jenis_kegiatan_id`),
  KEY `fk_capacity_building_3_idx` (`perusahaan_id`),
  CONSTRAINT `fk_capacity_building_1` FOREIGN KEY (`lokasi_id`) REFERENCES `lokasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_capacity_building_2` FOREIGN KEY (`jenis_kegiatan_id`) REFERENCES `jenis_kegiatan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_capacity_building_3` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.capacity_building: ~0 rows (approximately)
DELETE FROM `capacity_building`;
/*!40000 ALTER TABLE `capacity_building` DISABLE KEYS */;
/*!40000 ALTER TABLE `capacity_building` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.energi_efisiensi
CREATE TABLE IF NOT EXISTS `energi_efisiensi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `objek_kegiatan` varchar(100) NOT NULL,
  `jenis_produksi` varchar(100) NOT NULL,
  `kapasitas_produksi` varchar(40) DEFAULT NULL,
  `usia_objek_kegiatan` varchar(40) DEFAULT NULL,
  `tahun_perencanaan` int(4) DEFAULT NULL,
  `tahun_pelaksanaan` int(4) DEFAULT NULL,
  `lamanya_pelaksanaan` int(4) DEFAULT NULL,
  `hasil_kegiatan` varchar(70) DEFAULT NULL,
  `penghematan_energi` int(10) DEFAULT NULL,
  `penghematan_biaya_energi` int(10) DEFAULT NULL,
  `penurunan_emisi_gas` varchar(70) DEFAULT NULL,
  `total_investasi` int(10) NOT NULL,
  `tenaga_kerja` int(10) DEFAULT NULL,
  `sumber_data` varchar(100) DEFAULT NULL,
  `is_publish` int(1) DEFAULT NULL,
  `keterangan` text,
  `perusahaan_id` int(10) DEFAULT NULL,
  `lokasi_id` int(5) DEFAULT NULL,
  `jenis_kegiatan_id` int(5) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_energi_efisiensi_1_idx` (`jenis_kegiatan_id`),
  KEY `fk_energi_efisiensi_2_idx` (`lokasi_id`),
  KEY `fk_energi_efisiensi_3_idx` (`perusahaan_id`),
  CONSTRAINT `fk_energi_efisiensi_1` FOREIGN KEY (`jenis_kegiatan_id`) REFERENCES `jenis_kegiatan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_energi_efisiensi_2` FOREIGN KEY (`lokasi_id`) REFERENCES `lokasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_energi_efisiensi_3` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.energi_efisiensi: ~0 rows (approximately)
DELETE FROM `energi_efisiensi`;
/*!40000 ALTER TABLE `energi_efisiensi` DISABLE KEYS */;
/*!40000 ALTER TABLE `energi_efisiensi` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.energi_terbarukan
CREATE TABLE IF NOT EXISTS `energi_terbarukan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tahun` int(4) DEFAULT NULL,
  `nama_proyek` varchar(100) DEFAULT NULL,
  `tahun_ppa` int(4) DEFAULT NULL,
  `tahun_pelaksanaan` int(4) DEFAULT NULL,
  `tahun_operasi` int(4) DEFAULT NULL,
  `potensi` int(10) DEFAULT NULL COMMENT 'MW',
  `target_kapasitas` int(10) DEFAULT NULL COMMENT 'MW',
  `kapasitas_terpasang` int(10) DEFAULT NULL COMMENT 'MW',
  `kapasitas_produksi` int(10) DEFAULT NULL COMMENT 'MW',
  `produksi_tahunan` int(10) DEFAULT NULL COMMENT 'MW',
  `rencana_pembangunan` int(10) DEFAULT NULL COMMENT 'MW',
  `grid` enum('On Gird','Off Gird') DEFAULT NULL,
  `total_investasi` int(20) DEFAULT NULL,
  `sumber_pendanaan` int(1) DEFAULT NULL COMMENT 'APBN/Non APBN',
  `emisi_gas` int(20) DEFAULT NULL,
  `penyerapan_tenaga_kerja` int(10) DEFAULT NULL,
  `jumlah_bangunan` int(10) DEFAULT NULL,
  `sumber_data` varchar(100) DEFAULT NULL,
  `is_publish` int(1) DEFAULT NULL,
  `lokasi_id` int(4) DEFAULT NULL,
  `keterangan` text,
  `jenis_energi_id` int(4) DEFAULT NULL,
  `perusahaan_id` int(4) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_energi_terbarukan_1_idx` (`jenis_energi_id`),
  KEY `fk_energi_terbarukan_2_idx` (`lokasi_id`),
  KEY `fk_energi_terbarukan_3_idx` (`perusahaan_id`),
  CONSTRAINT `fk_energi_terbarukan_1` FOREIGN KEY (`jenis_energi_id`) REFERENCES `jenis_energi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_energi_terbarukan_2` FOREIGN KEY (`lokasi_id`) REFERENCES `lokasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_energi_terbarukan_3` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.energi_terbarukan: ~0 rows (approximately)
DELETE FROM `energi_terbarukan`;
/*!40000 ALTER TABLE `energi_terbarukan` DISABLE KEYS */;
/*!40000 ALTER TABLE `energi_terbarukan` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.jenis_energi
CREATE TABLE IF NOT EXISTS `jenis_energi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jenis_energi_terbarukan` varchar(100) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.jenis_energi: ~0 rows (approximately)
DELETE FROM `jenis_energi`;
/*!40000 ALTER TABLE `jenis_energi` DISABLE KEYS */;
/*!40000 ALTER TABLE `jenis_energi` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.jenis_kegiatan
CREATE TABLE IF NOT EXISTS `jenis_kegiatan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_kegiatan` varchar(45) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.jenis_kegiatan: ~0 rows (approximately)
DELETE FROM `jenis_kegiatan`;
/*!40000 ALTER TABLE `jenis_kegiatan` DISABLE KEYS */;
/*!40000 ALTER TABLE `jenis_kegiatan` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.kegiatan_study
CREATE TABLE IF NOT EXISTS `kegiatan_study` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topik_kegiatan` varchar(255) DEFAULT NULL,
  `tujuan_kegiatan` varchar(255) DEFAULT NULL,
  `penyelenggara_kegiatan` varchar(150) DEFAULT NULL,
  `tahun_perencanaan` int(4) DEFAULT NULL,
  `lamanya_pelaksanaan` int(4) DEFAULT NULL,
  `tahun_pelaksanaan` int(4) DEFAULT NULL,
  `objek_studi` varchar(100) DEFAULT NULL,
  `lingkup_studi` varchar(100) DEFAULT NULL,
  `metode_studi` varchar(100) DEFAULT NULL,
  `jumlah_sample` int(10) DEFAULT NULL,
  `total_biaya` int(10) DEFAULT NULL,
  `sumber_pendanaan` varchar(60) DEFAULT NULL,
  `sumber_data` varchar(100) DEFAULT NULL,
  `is_publish` int(1) DEFAULT NULL,
  `keterangan` text,
  `lokasi_id` int(5) DEFAULT NULL,
  `perusahaan_id` int(10) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_kegiatan_study_1_idx` (`lokasi_id`),
  KEY `fk_kegiatan_study_2_idx` (`perusahaan_id`),
  CONSTRAINT `fk_kegiatan_study_1` FOREIGN KEY (`lokasi_id`) REFERENCES `lokasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_kegiatan_study_2` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.kegiatan_study: ~0 rows (approximately)
DELETE FROM `kegiatan_study`;
/*!40000 ALTER TABLE `kegiatan_study` DISABLE KEYS */;
/*!40000 ALTER TABLE `kegiatan_study` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.lokasi
CREATE TABLE IF NOT EXISTS `lokasi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desa` varchar(45) DEFAULT NULL,
  `kecamatan_id` int(5) DEFAULT NULL,
  `kabupaten_id` int(5) DEFAULT NULL,
  `provinsi_id` int(5) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  `luas_wilayah` int(10) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kabupaten_id_UNIQUE` (`kabupaten_id`),
  UNIQUE KEY `provinsi_id_UNIQUE` (`provinsi_id`),
  UNIQUE KEY `kecamatan_id_UNIQUE` (`kecamatan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.lokasi: ~0 rows (approximately)
DELETE FROM `lokasi`;
/*!40000 ALTER TABLE `lokasi` DISABLE KEYS */;
/*!40000 ALTER TABLE `lokasi` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.perusahaan
CREATE TABLE IF NOT EXISTS `perusahaan` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nama_perusahaan` varchar(100) NOT NULL,
  `type_perusahaan` varchar(60) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `is_active` int(1) NOT NULL DEFAULT '0',
  `alamat` text,
  `npwp` int(11) NOT NULL,
  `pimpinan_perusahaan` varchar(70) NOT NULL,
  `kepemilikan_saham` varchar(200) NOT NULL,
  `pic_name` varchar(50) NOT NULL,
  `pic_phone_number` varchar(15) NOT NULL,
  `pic_email` varchar(25) NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nama_perusahaan_UNIQUE` (`nama_perusahaan`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.perusahaan: ~1 rows (approximately)
DELETE FROM `perusahaan`;
/*!40000 ALTER TABLE `perusahaan` DISABLE KEYS */;
INSERT INTO `perusahaan` (`id`, `nama_perusahaan`, `type_perusahaan`, `email`, `password`, `remember_token`, `is_active`, `alamat`, `npwp`, `pimpinan_perusahaan`, `kepemilikan_saham`, `pic_name`, `pic_phone_number`, `pic_email`, `created_at`, `updated_at`) VALUES
	(1, 'PT Asia System', 'Consultan IT', 'enginering@ars.co.id', '$2y$10$jWqW0ETc23XTaaDtjktAw.XRvdet5BnBHauvmJLPBCWNfbyvI3YNy', 'fvNRhEqIpu5CzzB7nn0ksli9sEiYnqxPiPg94jBRBK4ANL2jfyCtFGxYtWjE', 1, NULL, 0, '', '', '', '', '', '2017-05-04', '2017-05-04');
/*!40000 ALTER TABLE `perusahaan` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.potensi_energi_terbarukan
CREATE TABLE IF NOT EXISTS `potensi_energi_terbarukan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tahun` int(4) DEFAULT NULL,
  `terbukti_kapasitas` int(10) DEFAULT NULL,
  `prosfek_kapasitas` varchar(45) DEFAULT NULL,
  `spekulasi_kapasitas` varchar(45) DEFAULT NULL,
  `rencana_pembangunan` int(10) DEFAULT NULL,
  `kapasitas_dimanfaatkan` int(10) DEFAULT NULL,
  `kapasitas_dikembangkan` int(10) DEFAULT NULL,
  `wilayah_kerja` varchar(50) DEFAULT NULL,
  `sumber_data` varchar(100) DEFAULT NULL,
  `keterangan` text,
  `is_publish` int(1) DEFAULT NULL,
  `luas_wilayah` int(10) DEFAULT NULL,
  `perusahaan_id` int(10) DEFAULT NULL,
  `lokasi_id` int(5) DEFAULT NULL,
  `jenis_energi_id` int(5) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_potensi_energi_terbarukan_1_idx` (`lokasi_id`),
  KEY `fk_potensi_energi_terbarukan_2_idx` (`perusahaan_id`),
  KEY `fk_potensi_energi_terbarukan_3_idx` (`jenis_energi_id`),
  CONSTRAINT `fk_potensi_energi_terbarukan_1` FOREIGN KEY (`lokasi_id`) REFERENCES `lokasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_potensi_energi_terbarukan_2` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_potensi_energi_terbarukan_3` FOREIGN KEY (`jenis_energi_id`) REFERENCES `jenis_energi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.potensi_energi_terbarukan: ~0 rows (approximately)
DELETE FROM `potensi_energi_terbarukan`;
/*!40000 ALTER TABLE `potensi_energi_terbarukan` DISABLE KEYS */;
/*!40000 ALTER TABLE `potensi_energi_terbarukan` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.privilage_perusahaan
CREATE TABLE IF NOT EXISTS `privilage_perusahaan` (
  `id` int(11) NOT NULL,
  `name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.privilage_perusahaan: ~0 rows (approximately)
DELETE FROM `privilage_perusahaan`;
/*!40000 ALTER TABLE `privilage_perusahaan` DISABLE KEYS */;
INSERT INTO `privilage_perusahaan` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'Sipeda Privilage', 'Sipeda Privilage', 'Sipeda Privilage', NULL, NULL);
/*!40000 ALTER TABLE `privilage_perusahaan` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.role_perusahaan
CREATE TABLE IF NOT EXISTS `role_perusahaan` (
  `perusahaan_id` int(10) NOT NULL,
  `privilage_id` int(10) NOT NULL,
  PRIMARY KEY (`perusahaan_id`,`privilage_id`),
  KEY `fk_role_perusahaan_2_idx` (`privilage_id`),
  CONSTRAINT `fk_role_perusahaan_1` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role_perusahaan_2` FOREIGN KEY (`privilage_id`) REFERENCES `privilage_perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.role_perusahaan: ~0 rows (approximately)
DELETE FROM `role_perusahaan`;
/*!40000 ALTER TABLE `role_perusahaan` DISABLE KEYS */;
INSERT INTO `role_perusahaan` (`perusahaan_id`, `privilage_id`) VALUES
	(1, 1);
/*!40000 ALTER TABLE `role_perusahaan` ENABLE KEYS */;

-- Dumping structure for table ebtke_sipeda.technical_assistance
CREATE TABLE IF NOT EXISTS `technical_assistance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul_topik` varchar(200) NOT NULL,
  `request_topik` varchar(200) DEFAULT NULL,
  `penyelenggara_kegiatan` varchar(200) NOT NULL,
  `tujuan` text NOT NULL,
  `tahun_perencanaan` int(4) DEFAULT NULL,
  `lamanya_pelaksanaan` int(4) DEFAULT NULL,
  `tahun_pelaksanaan` int(4) DEFAULT NULL,
  `target_peserta` int(10) DEFAULT NULL COMMENT 'Individu, pemerintah',
  `target_jumlah_peserta` int(10) DEFAULT NULL,
  `jumlah_peserta` int(10) DEFAULT NULL,
  `sasaran_peserta` varchar(100) DEFAULT NULL,
  `jenis_institusi_peserta` varchar(100) DEFAULT NULL,
  `total_biaya` int(10) DEFAULT NULL,
  `sumber_pendanaan` varchar(70) DEFAULT NULL,
  `is_monitoring` int(1) DEFAULT NULL,
  `is_publish` int(1) DEFAULT NULL,
  `sumber_data` varchar(70) DEFAULT NULL,
  `keterangan` text,
  `perusahaan_id` int(10) DEFAULT NULL,
  `lokasi_id` int(5) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_technical_assistance_1_idx` (`lokasi_id`),
  KEY `fk_technical_assistance_2_idx` (`perusahaan_id`),
  CONSTRAINT `fk_technical_assistance_1` FOREIGN KEY (`lokasi_id`) REFERENCES `lokasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_technical_assistance_2` FOREIGN KEY (`perusahaan_id`) REFERENCES `perusahaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table ebtke_sipeda.technical_assistance: ~0 rows (approximately)
DELETE FROM `technical_assistance`;
/*!40000 ALTER TABLE `technical_assistance` DISABLE KEYS */;
/*!40000 ALTER TABLE `technical_assistance` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
