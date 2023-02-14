CREATE TABLE `pools`(
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `start` DATETIME NOT NULL,
    `end` DATETIME NOT NULL,
    `jackpot` DOUBLE NOT NULL,
    `ticket_price` DOUBLE NOT NULL,
    `won` TINYINT(1) NOT NULL,
    `agency_id` CHAR(36) NOT NULL
);
ALTER TABLE
    `pools` ADD PRIMARY KEY `pools_id_primary`(`id`);
CREATE TABLE `tickets`(
    `id` CHAR(36) NOT NULL,
    `pool_id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `value` DOUBLE NOT NULL,
    `picture_url` VARCHAR(255) NOT NULL,
    `bought` TINYINT(1) NOT NULL
);
ALTER TABLE
    `tickets` ADD PRIMARY KEY `tickets_id_primary`(`id`);
CREATE TABLE `users`(
    `id` CHAR(36) NOT NULL,
    `auth0_id` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD PRIMARY KEY `users_id_primary`(`id`);
CREATE TABLE `paid_in`(
    `id` CHAR(36) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `pool_id` CHAR(36) NOT NULL,
    `agency_id` CHAR(36) NOT NULL
);
ALTER TABLE
    `paid_in` ADD PRIMARY KEY `paid_in_id_primary`(`id`);
CREATE TABLE `paid_out`(
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `pool_id` CHAR(36) NOT NULL,
    `amount` DOUBLE NOT NULL
);
ALTER TABLE
    `paid_out` ADD PRIMARY KEY `paid_out_id_primary`(`id`);
CREATE TABLE `agency`(
    `id` CHAR(36) NOT NULL,
    `name` BIGINT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `agency` ADD PRIMARY KEY `agency_id_primary`(`id`);
ALTER TABLE
    `pools` ADD CONSTRAINT `pools_agency_id_foreign` FOREIGN KEY(`agency_id`) REFERENCES `agency`(`id`);
ALTER TABLE
    `tickets` ADD CONSTRAINT `tickets_pool_id_foreign` FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`);
ALTER TABLE
    `tickets` ADD CONSTRAINT `tickets_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `paid_in` ADD CONSTRAINT `paid_in_pool_id_foreign` FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`);
ALTER TABLE
    `paid_out` ADD CONSTRAINT `paid_out_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `paid_out` ADD CONSTRAINT `paid_out_pool_id_foreign` FOREIGN KEY(`pool_id`) REFERENCES `pools`(`id`);
ALTER TABLE
    `paid_in` ADD CONSTRAINT `paid_in_agency_id_foreign` FOREIGN KEY(`agency_id`) REFERENCES `agency`(`id`);