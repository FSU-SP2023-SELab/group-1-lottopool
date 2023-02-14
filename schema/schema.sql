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
DROP TABLE IF EXISTS `lottopool`.`users`;
DROP TABLE IF EXISTS `lottopool`.`paid_in`;
DROP TABLE IF EXISTS `lottopool`.`paid_out`;
DROP TABLE IF EXISTS `lottopool`.`agency`;

/* Make tables */

CREATE TABLE `lottopool`.`users`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `auth0_id` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`agency`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` BIGINT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`pools`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `start` DATETIME NOT NULL,
    `end` DATETIME NOT NULL,
    `jackpot` DOUBLE NOT NULL,
    `ticket_price` DOUBLE NOT NULL,
    `won` TINYINT NOT NULL,
    `agency_id` INT NOT NULL,
    FOREIGN KEY(`agency_id`) REFERENCES `agency`(`id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`tickets`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `pool_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    `value` DOUBLE NOT NULL,
    `picture_url` VARCHAR(255) NOT NULL,
    `acquired` TINYINT NOT NULL,
    FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`paid_in`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `amount` DOUBLE NOT NULL,
    `pool_id` INT NOT NULL,
    `agency_id` INT NOT NULL,
    FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`),
    FOREIGN KEY(`agency_id`) REFERENCES `agency`(`id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `lottopool`.`paid_out`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `pool_id` INT NOT NULL,
    `amount` DOUBLE NOT NULL,
    FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `users`(`id`),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_general_ci;

/* Make views */

/* TODO: Add views for commonly used queries later */
