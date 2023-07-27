DROP SCHEMA IF EXISTS jipsa;
CREATE SCHEMA IF NOT EXISTS jipsa DEFAULT CHARACTER SET utf8;
USE jipsa;

-- --------------------------------

DROP TABLE IF EXISTS jipsa.tradeInfo;

CREATE TABLE IF NOT EXISTS jipsa.tradeInfo (
    Id INT NOT NULL AUTO_INCREMENT,
    year VARCHAR(10),
    month VARCHAR(10),
    location VARCHAR(10),
    name VARCHAR(30),
    gu VARCHAR(20),
    dong VARCHAR(20),
    jibun VARCHAR(20),
    size VARCHAR(10),
    tradePrice VARCHAR(10),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    PRIMARY KEY(Id)
);

-- --------------------------------

DROP TABLE IF EXISTS jipsa.rentInfo;

CREATE TABLE IF NOT EXISTS jipsa.rentInfo (
    Id INT NOT NULL AUTO_INCREMENT,
    year VARCHAR(10),
    month VARCHAR(10),
    location VARCHAR(10),
    name VARCHAR(30),
    gu VARCHAR(20),
    dong VARCHAR(20),
    jibun VARCHAR(20),
    size VARCHAR(10),
    rentPrice VARCHAR(10),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    PRIMARY KEY(Id)
);

-- --------------------------------

DROP TABLE IF EXISTS jipsa.levelInfo;

CREATE TABLE IF NOT EXISTS jipsa.levelInfo (
    Id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    gu VARCHAR(20),
    dong VARCHAR(20),
    jibun VARCHAR(20),
    size VARCHAR(10),
    tradePrice VARCHAR(10),
    rentPrice VARCHAR(10),
    percent DECIMAL(10, 2),
    level TINYINT(1),
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
    PRIMARY KEY(Id)
);