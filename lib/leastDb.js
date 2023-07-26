'use strict';
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from './common.js';


// ------------- getLeastTradeByDong ---------------

const getLeastTradeByDong = async (req, res) => {
    const query = 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(tradePrice) AS tradePrice, MAX(created) AS created FROM tradeInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ? GROUP BY name, gu, dong, jibun;';

    const gu = req.query.gu;
    const dong = req.query.dong;
    const queryData = [gu.trim(), dong.trim()];

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.officetel = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
            results.count = rows.length;
            for (let i = 0; i < rows.length; i++) {
                results.officetel.push(rows[i]);
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
    timeLog('[GET][leastTrade-dong] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getLeastRentByDong ---------------

const getLeastRentByDong = async (req, res) => {
    const query = 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(rentPrice) AS rentPrice, MAX(created) AS created FROM rentInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ? GROUP BY name, gu, dong, jibun;';

    const gu = req.query.gu;
    const dong = req.query.dong;

    const queryData = [gu.trim(), dong.trim()];

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.officetel = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
            results.count = rows.length;
            for (let i = 0; i < rows.length; i++) {
                results.officetel.push(rows[i]);
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
    timeLog('[GET][leastRent-dong] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getLeastTrade ---------------


const getLeastTrade = async (req, res) => {
    const query = 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(tradePrice) AS tradePrice, MAX(created) AS created FROM jipsa.tradeInfo GROUP BY name, gu, dong, jibun;';

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.officetel = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query);
            results.count = rows.length;
            console.log(rows);
            for (let i = 0; i < rows.length; i++) {
                results.officetel.push(rows[i]);
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
    timeLog('[GET][leastTrade] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getLeastRent ---------------

const getLeastRent = async (req, res) => {
    const query = 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(rentPrice) AS rentPrice, MAX(created) AS created FROM jipsa.rentInfo GROUP BY name, gu, dong, jibun;';

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.officetel = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query);
            results.count = rows.length;
            console.log(rows);
            for (let i = 0; i < rows.length; i++) {
                results.officetel.push(rows[i]);
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
    timeLog('[GET][leastRent] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getLeastTradeByGu ---------------

const getLeastTradeByGu = async (req, res) => {
    const query = 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(tradePrice) AS tradePrice, MAX(created) AS created FROM jipsa.tradeInfo WHERE TRIM(gu) = ? GROUP BY name, gu, dong, jibun;';

    const gu = req.query.gu;

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.officetel = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, gu.trim());
            results.count = rows.length;
            console.log(rows);
            for (let i = 0; i < rows.length; i++) {
                results.officetel.push(rows[i]);
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
    timeLog('[GET][leastTrade-gu] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getLeastRentByGu ---------------

const getLeastRentByGu = async (req, res) => {
    const query = 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(rentPrice) AS rentPrice, MAX(created) AS created FROM jipsa.rentInfo WHERE TRIM(gu) = ? GROUP BY name, gu, dong, jibun;';

    const gu = req.query.gu;

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.officetel = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, gu.trim());
            results.count = rows.length;
            console.log(rows);
            for (let i = 0; i < rows.length; i++) {
                results.officetel.push(rows[i]);
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
    timeLog('[GET][leastRent-gu] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

export { getLeastRent, getLeastTrade, getLeastRentByDong, getLeastTradeByDong, getLeastTradeByGu, getLeastRentByGu }