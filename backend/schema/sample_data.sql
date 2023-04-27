/*
 * group-1-lottopool sample_data.sql
 * (c) 2023 FSU-SP2023-SELab group1
 *
 * NOTE: This file is not automatically run by the backend.
 *   It is intended only for use as a tool by the developers.
 */

/* Pre-generate UUIDs for foreign keys */

SET @agency_uuid = CAST(UUID() as UUID);
SET @pool1_uuid = CAST(UUID() as UUID);
SET @pool2_uuid = CAST(UUID() as UUID);
SET @user_id = CAST("github|10553730" as VARCHAR(100));

/* Inserts */

INSERT INTO `lottopool`.`agency` VALUES (
    @agency_uuid, 
    "Florida Lottery",
    "250 Marriott Drive, Tallahassee, FL 32301",
    "(850) 487-7707"
);

INSERT INTO `lottopool`.`pools` VALUES (
    @pool1_uuid, "Powerball for Dec. 31st", @agency_uuid,
    "2023-01-01 00:00:00", "2023-12-31 23:59:59",
    1000000.0, 3.0, 0
), (
    @pool2_uuid, "Powerball for Dec. 31st", @agency_uuid,
    "2023-01-01 00:00:00", "2023-12-31 23:59:59", 
    250000.0, 3.0, 1
);

INSERT INTO `lottopool`.`tickets` VALUES (
    UUID(), @pool1_uuid, @user_id,
    NULL, "LOT40:WPD01XNMNJNS042023396922", 1, 0
), (
    UUID(), @pool2_uuid, @user_id,
    NULL, "LOT40:WPD01XNMNJNS042023396923", 1, 0
);

INSERT INTO `lottopool`.`balances` VALUES (
    @user_id, 250000.0
);