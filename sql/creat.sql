DROP SCHEMA IF EXISTS jipsa;
CREATE SCHEMA IF NOT EXISTS jipsa DEFAULT CHARACTER SET utf8;
USE jipsa;

-- --------------------------------

DROP TABLE IF EXISTS jipsa.officetelInfo;

CREATE TABLE IF NOT EXISTS jipsa.officetelInfo (
    Id INT,
    location VARCHAR(10),
    name VARCHAR(20),
    gu VARCHAR(20),
    dong VARCHAR(20),
    jibun VARCHAR(20),
    size VARCHAR(10),
    tradePrice INT(1),
    rendPrice INT,
    level TINYINT(1),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    PRIMARY KEY(Id)
);