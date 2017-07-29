-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ebtke_sipeda
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ebtke_sipeda
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ebtke_sipeda` DEFAULT CHARACTER SET utf8 ;
USE `ebtke_sipeda` ;

-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`jenis_energi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`jenis_energi` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `jenis_energi_terbarukan` VARCHAR(100) NOT NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`lokasi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`lokasi` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desa` VARCHAR(45) NULL,
  `kecamatan_id` INT(5) NULL,
  `kabupaten_id` INT(5) NULL,
  `provinsi_id` INT(5) NULL,
  `latitude` VARCHAR(50) NULL,
  `longitude` VARCHAR(50) NULL,
  `luas_wilayah` INT(10) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `kabupaten_id_UNIQUE` (`kabupaten_id` ASC),
  UNIQUE INDEX `provinsi_id_UNIQUE` (`provinsi_id` ASC),
  UNIQUE INDEX `kecamatan_id_UNIQUE` (`kecamatan_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`perusahaan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`perusahaan` (
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  `nama_perusahaan` VARCHAR(100) NOT NULL,
  `type_perusahaan` VARCHAR(60) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nama_perusahaan_UNIQUE` (`nama_perusahaan` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`energi_terbarukan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`energi_terbarukan` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tahun` INT(4) NULL,
  `nama_proyek` VARCHAR(100) NULL,
  `tahun_ppa` INT(4) NULL,
  `tahun_pelaksanaan` INT(4) NULL,
  `tahun_operasi` INT(4) NULL,
  `potensi` INT(10) NULL COMMENT 'MW',
  `target_kapasitas` INT(10) NULL COMMENT 'MW',
  `kapasitas_terpasang` INT(10) NULL COMMENT 'MW',
  `kapasitas_produksi` INT(10) NULL COMMENT 'MW',
  `produksi_tahunan` INT(10) NULL COMMENT 'MW',
  `rencana_pembangunan` INT(10) NULL COMMENT 'MW',
  `grid` ENUM('On Gird', 'Off Gird') NULL,
  `total_investasi` INT(20) NULL,
  `sumber_pendanaan` INT(1) NULL COMMENT 'APBN/Non APBN',
  `emisi_gas` INT(20) NULL,
  `penyerapan_tenaga_kerja` INT(10) NULL,
  `jumlah_bangunan` INT(10) NULL,
  `sumber_data` VARCHAR(100) NULL,
  `is_publish` INT(1) NULL,
  `lokasi_id` INT(4) NULL,
  `keterangan` TEXT NULL,
  `jenis_energi_id` INT(4) NULL,
  `perusahaan_id` INT(4) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_energi_terbarukan_1_idx` (`jenis_energi_id` ASC),
  INDEX `fk_energi_terbarukan_2_idx` (`lokasi_id` ASC),
  INDEX `fk_energi_terbarukan_3_idx` (`perusahaan_id` ASC),
  CONSTRAINT `fk_energi_terbarukan_1`
    FOREIGN KEY (`jenis_energi_id`)
    REFERENCES `ebtke_sipeda`.`jenis_energi` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_energi_terbarukan_2`
    FOREIGN KEY (`lokasi_id`)
    REFERENCES `ebtke_sipeda`.`lokasi` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_energi_terbarukan_3`
    FOREIGN KEY (`perusahaan_id`)
    REFERENCES `ebtke_sipeda`.`perusahaan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`jenis_kegiatan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`jenis_kegiatan` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nama_kegiatan` VARCHAR(45) NOT NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`energi_efisiensi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`energi_efisiensi` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `objek_kegiatan` VARCHAR(100) NOT NULL,
  `jenis_produksi` VARCHAR(100) NOT NULL,
  `kapasitas_produksi` VARCHAR(40) NULL,
  `usia_objek_kegiatan` VARCHAR(40) NULL,
  `tahun_perencanaan` INT(4) NULL,
  `tahun_pelaksanaan` INT(4) NULL,
  `lamanya_pelaksanaan` INT(4) NULL,
  `hasil_kegiatan` VARCHAR(70) NULL,
  `penghematan_energi` INT(10) NULL,
  `penghematan_biaya_energi` INT(10) NULL,
  `penurunan_emisi_gas` VARCHAR(70) NULL,
  `total_investasi` INT(10) NOT NULL,
  `tenaga_kerja` INT(10) NULL,
  `sumber_data` VARCHAR(100) NULL,
  `is_publish` INT(1) NULL,
  `keterangan` TEXT NULL,
  `perusahaan_id` INT(10) NULL,
  `lokasi_id` INT(5) NULL,
  `jenis_kegiatan_id` INT(5) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_energi_efisiensi_1_idx` (`jenis_kegiatan_id` ASC),
  INDEX `fk_energi_efisiensi_2_idx` (`lokasi_id` ASC),
  INDEX `fk_energi_efisiensi_3_idx` (`perusahaan_id` ASC),
  CONSTRAINT `fk_energi_efisiensi_1`
    FOREIGN KEY (`jenis_kegiatan_id`)
    REFERENCES `ebtke_sipeda`.`jenis_kegiatan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_energi_efisiensi_2`
    FOREIGN KEY (`lokasi_id`)
    REFERENCES `ebtke_sipeda`.`lokasi` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_energi_efisiensi_3`
    FOREIGN KEY (`perusahaan_id`)
    REFERENCES `ebtke_sipeda`.`perusahaan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`technical_assistance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`technical_assistance` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `judul_topik` VARCHAR(200) NOT NULL,
  `request_topik` VARCHAR(200) NULL,
  `penyelenggara_kegiatan` VARCHAR(200) NOT NULL,
  `tujuan` TEXT NOT NULL,
  `tahun_perencanaan` INT(4) NULL,
  `lamanya_pelaksanaan` INT(4) NULL,
  `tahun_pelaksanaan` INT(4) NULL,
  `target_peserta` INT(10) NULL COMMENT 'Individu, pemerintah',
  `target_jumlah_peserta` INT(10) NULL,
  `jumlah_peserta` INT(10) NULL,
  `sasaran_peserta` VARCHAR(100) NULL,
  `jenis_institusi_peserta` VARCHAR(100) NULL,
  `total_biaya` INT(10) NULL,
  `sumber_pendanaan` VARCHAR(70) NULL,
  `is_monitoring` INT(1) NULL,
  `is_publish` INT(1) NULL,
  `sumber_data` VARCHAR(70) NULL,
  `keterangan` TEXT NULL,
  `perusahaan_id` INT(10) NULL,
  `lokasi_id` INT(5) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_technical_assistance_1_idx` (`lokasi_id` ASC),
  INDEX `fk_technical_assistance_2_idx` (`perusahaan_id` ASC),
  CONSTRAINT `fk_technical_assistance_1`
    FOREIGN KEY (`lokasi_id`)
    REFERENCES `ebtke_sipeda`.`lokasi` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_technical_assistance_2`
    FOREIGN KEY (`perusahaan_id`)
    REFERENCES `ebtke_sipeda`.`perusahaan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`potensi_energi_terbarukan`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`potensi_energi_terbarukan` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tahun` INT(4) NULL,
  `terbukti_kapasitas` INT(10) NULL,
  `prosfek_kapasitas` VARCHAR(45) NULL,
  `spekulasi_kapasitas` VARCHAR(45) NULL,
  `rencana_pembangunan` INT(10) NULL,
  `kapasitas_dimanfaatkan` INT(10) NULL,
  `kapasitas_dikembangkan` INT(10) NULL,
  `wilayah_kerja` VARCHAR(50) NULL,
  `sumber_data` VARCHAR(100) NULL,
  `keterangan` TEXT NULL,
  `is_publish` INT(1) NULL,
  `luas_wilayah` INT(10) NULL,
  `perusahaan_id` INT(10) NULL,
  `lokasi_id` INT(5) NULL,
  `jenis_energi_id` INT(5) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_potensi_energi_terbarukan_1_idx` (`lokasi_id` ASC),
  INDEX `fk_potensi_energi_terbarukan_2_idx` (`perusahaan_id` ASC),
  INDEX `fk_potensi_energi_terbarukan_3_idx` (`jenis_energi_id` ASC),
  CONSTRAINT `fk_potensi_energi_terbarukan_1`
    FOREIGN KEY (`lokasi_id`)
    REFERENCES `ebtke_sipeda`.`lokasi` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_potensi_energi_terbarukan_2`
    FOREIGN KEY (`perusahaan_id`)
    REFERENCES `ebtke_sipeda`.`perusahaan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_potensi_energi_terbarukan_3`
    FOREIGN KEY (`jenis_energi_id`)
    REFERENCES `ebtke_sipeda`.`jenis_energi` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`capacity_building`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`capacity_building` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topik_kegiatan` VARCHAR(100) NULL,
  `request_topik` VARCHAR(100) NULL,
  `penyelenggara_kegiatan` VARCHAR(100) NULL,
  `tahun_perencanaan` INT(4) NULL,
  `tanggal_pelaksanaan` DATE NULL,
  `tahun_pelaksanaan` INT(4) NULL,
  `target_peserta` INT(10) NULL,
  `realisasi_peserta` INT(10) NULL,
  `sasaran_peserta` VARCHAR(70) NULL,
  `jenis_institusi_peserta` INT(1) NULL COMMENT 'Praktisi\nInstitusi Pemerintah\nBUMN dan Swasta',
  `total_biaya` INT(10) NULL,
  `sumber_pendanaan` INT(1) NULL COMMENT 'APBN\nNon APBN',
  `sertifikasi_kompetensi` INT(1) NULL COMMENT 'YES\nNO',
  `sumber_data` VARCHAR(45) NULL,
  `is_publish` INT(1) NULL,
  `keterangan` TEXT NULL,
  `lokasi_id` INT(5) NULL,
  `jenis_kegiatan_id` INT(5) NULL,
  `perusahaan_id` INT(10) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_capacity_building_1_idx` (`lokasi_id` ASC),
  INDEX `fk_capacity_building_2_idx` (`jenis_kegiatan_id` ASC),
  INDEX `fk_capacity_building_3_idx` (`perusahaan_id` ASC),
  CONSTRAINT `fk_capacity_building_1`
    FOREIGN KEY (`lokasi_id`)
    REFERENCES `ebtke_sipeda`.`lokasi` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_capacity_building_2`
    FOREIGN KEY (`jenis_kegiatan_id`)
    REFERENCES `ebtke_sipeda`.`jenis_kegiatan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_capacity_building_3`
    FOREIGN KEY (`perusahaan_id`)
    REFERENCES `ebtke_sipeda`.`perusahaan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ebtke_sipeda`.`kegiatan_study`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ebtke_sipeda`.`kegiatan_study` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `topik_kegiatan` VARCHAR(255) NULL,
  `tujuan_kegiatan` VARCHAR(255) NULL,
  `penyelenggara_kegiatan` VARCHAR(150) NULL,
  `tahun_perencanaan` INT(4) NULL,
  `lamanya_pelaksanaan` INT(4) NULL,
  `tahun_pelaksanaan` INT(4) NULL,
  `objek_studi` VARCHAR(100) NULL,
  `lingkup_studi` VARCHAR(100) NULL,
  `metode_studi` VARCHAR(100) NULL,
  `jumlah_sample` INT(10) NULL,
  `total_biaya` INT(10) NULL,
  `sumber_pendanaan` VARCHAR(60) NULL,
  `sumber_data` VARCHAR(100) NULL,
  `is_publish` INT(1) NULL,
  `keterangan` TEXT NULL,
  `lokasi_id` INT(5) NULL,
  `perusahaan_id` INT(10) NULL,
  `created_at` DATE NULL,
  `updated_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_kegiatan_study_1_idx` (`lokasi_id` ASC),
  INDEX `fk_kegiatan_study_2_idx` (`perusahaan_id` ASC),
  CONSTRAINT `fk_kegiatan_study_1`
    FOREIGN KEY (`lokasi_id`)
    REFERENCES `ebtke_sipeda`.`lokasi` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_kegiatan_study_2`
    FOREIGN KEY (`perusahaan_id`)
    REFERENCES `ebtke_sipeda`.`perusahaan` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
