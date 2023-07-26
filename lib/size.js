'use strict';
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from './common.js';

// ------------- getTradeSizeInfo ---------------

const getTradeSizeInfo = async (req, res) => {
    const query = 'SELECT DISTINCT size FROM jipsa.tradeInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ? AND TRIM(jibun) = ?;';

    const gu = req.query.gu;
    const dong = req.query.dong;
    const jibun = req.query.jibun;

    const queryData = [gu, dong, jibun];

    const results = {};
    results.result = true;
    results.error = [];

    results.count = 0;
    results.gu = gu;
    results.dong = dong;
    results.jibun = jibun;
    results.size = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
            results.count = rows.length;
            for (let i = 0 ; i < rows.length; i++) {
                results.size.push(rows[i].size);
            }
        } catch (err) {
            results.result = false;
            results.error.push('Query Error');
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }
    res.send(results);
    consoleBar();
    
    timeLog('[GET][sizeTrade] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));


};

// ------------- getRentSizeInfo ---------------

const getRentSizeInfo = async (req, res) => {
    const query = 'SELECT DISTINCT size FROM jipsa.rentInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ? AND TRIM(jibun) = ?;';

    const gu = req.query.gu;
    const dong = req.query.dong;
    const jibun = req.query.jibun;

    const queryData = [gu, dong, jibun];

    const results = {};
    results.result = true;
    results.error = [];

    results.count = 0;
    results.gu = gu;
    results.dong = dong;
    results.jibun = jibun;
    results.size = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
            results.count = rows.length;
            for (let i = 0 ; i < rows.length; i++) {
                results.size.push(rows[i].size);
            }
        } catch (err) {
            results.result = false;
            results.error.push('Query Error');
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }
    res.send(results);
    consoleBar();
    
    timeLog('[GET][sizeRent] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

export { getTradeSizeInfo, getRentSizeInfo };