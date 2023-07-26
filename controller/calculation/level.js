'use strict';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { consoleBar, timeLog } from '../../lib/common.js';
import { writeDbRentInfo } from '../../lib/rentdb.js';
import { pool } from '../../lib/connect.js';

const createLevelInfo = async () => {
    const query = 'INSERT INTO levelInfo (name, gu, dong, jibun, size, tradePrice, rentPrice, persent) SELECT r.name, r.gu, r.dong, r.jibun, r.size, t.tradePrice, r.rentPrice, (r.rentPrice/t.tradePrice * 100) AS percent FROM rentInfo AS r JOIN tradeInfo AS t ON r.gu = t.gu AND r.dong = t.dong AND r.jibun = t.jibun AND r.size = t.size;';

    const results = {};
    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error');
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }

    consoleBar();
    timeLog('[INSERT DB][level] // ' + JSON.stringify(results));

};

const calculateLevel = async () => {
    const query = 'UPDATE levelInfo SET level = CASE WHEN percent < 80 THEN 1 WHEN percent BETWEEN 80 AND 80 THEN 2 WHEN percent BETWEEN 90 AND 100 THEN 3 ELSE 4 END;';
    
    const results = {};
    results.result = true;
    results.error = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query);
        } catch (err) {
            results.result = false;
            results.error.push('Query Error');
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }

    consoleBar();
    timeLog('[UPDATE DB][level] // ' + JSON.stringify(results));
};

export { createLevelInfo, calculateLevel };