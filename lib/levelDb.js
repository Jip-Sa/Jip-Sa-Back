'use strict';
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from './common.js';

// ------------- getLevel ---------------

const getLevel = async (req, res) => {
    const query = 'SELECT size, percent FROM levelInfo WHERE gu = ? AND dong = ? AND jibun = ? order by size;';

    const gu = req.query.gu;
    const dong = req.query.dong;
    const jibun = req.query.jibun;

    const queryData = [gu.trim(), dong.trim(), jibun.trim()];

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.percent = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
            for(let i = 0;i<rows.length;i++){
                results.percent.push(rows[i]);
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
    timeLog('[GET][level] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getLevelMax ---------------


const getMaxLevel = async (req, res) => {
    const query = 'SELECT size, percent FROM levelInfo WHERE gu = ? AND dong = ? AND jibun = ? ORDER BY percent DESC LIMIT 1;';

    const gu = req.query.gu;
    const dong = req.query.dong;
    const jibun = req.query.jibun;

    const queryData = [gu.trim(), dong.trim(), jibun.trim()];

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.percent = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
            for(let i = 0;i<rows.length;i++){
                results.percent.push(rows[i]);
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
    timeLog('[GET][level-max] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

export { getLevel, getMaxLevel };