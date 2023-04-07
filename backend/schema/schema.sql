/*
 * group-1-lottopool schema.sql
 * (c) 2023 FSU-SP2023-SELab group1
 */

/* Drop database if exists */

DROP DATABASE IF EXISTS `lottopool`;
CREATE DATABASE `lottopool`;

/* Drop tables if they exist */

DROP TABLE IF EXISTS `lottopool`.`pools`;
DROP TABLE IF EXISTS `lottopool`.`tickets`;
DROP TABLE IF EXISTS `lottopool`.`paid_in`;
DROP TABLE IF EXISTS `lottopool`.`paid_out`;
DROP TABLE IF EXISTS `lottopool`.`agency`;

/* Also drop legacy tables */

DROP TABLE IF EXISTS `lottopool`.`users`;

/* Make tables */

CREATE TABLE `lottopool`.`agency`(
    `id` UUID UNIQUE NOT NULL,
    `name` VARCHAR(255),
    `address` VARCHAR(255),
    `phone` VARCHAR(20),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`pools`(
    `id` UUID UNIQUE NOT NULL,
    `name` VARCHAR(255),
    `agency_id` UUID,
    `start` DATETIME,
    `end` DATETIME,
    `jackpot` DOUBLE,
    `ppt` DOUBLE,
    `won` TINYINT,
    FOREIGN KEY(`agency_id`) REFERENCES `agency`(`id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`tickets`(
    `id` UUID UNIQUE NOT NULL,
    `pool_id` UUID,
    `user_id` VARCHAR(100),
    `value` DOUBLE,
    `picture_url` VARCHAR(255),
    `acquired` TINYINT,
    FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`income`(
    `id` UUID UNIQUE NOT NULL,
    `amount` DOUBLE,
    `pool_id` UUID,
    `agency_id` UUID,
    FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`),
    FOREIGN KEY(`agency_id`) REFERENCES `agency`(`id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`payouts`(
    `id` UUID UNIQUE NOT NULL,
    `user_id` VARCHAR(100),
    `pool_id` UUID,
    `amount` DOUBLE,
    FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

/* Make views */

/* TODO: Add views for commonly used queries later */
