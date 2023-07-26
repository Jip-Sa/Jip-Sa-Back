'use strict';
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from './common.js';

// ------------- getTradeInfo ---------------

const getTradeInfo = async (req, res) => {
    const query = 'SELECT * FROM tradeInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ? AND TRIM(jibun) = ?;';
    
    const gu = req.query.gu;
    const dong = req.query.dong;
    const jibun = req.query.jibun;

    const queryData = [gu, dong, jibun];

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
            for(let i = 0; i<rows.length;i++){
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
    timeLog('[GET][tradeInfo] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// ------------- getRentInfo ---------------

const getRentInfo = async (req, res) => {
    const query = 'SELECT * FROM rentInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ? AND TRIM(jibun) = ?;';
    
    const gu = req.query.gu;
    const dong = req.query.dong;
    const jibun = req.query.jibun;

    const queryData = [gu, dong, jibun];

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
            for(let i = 0; i<rows.length;i++){
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
    timeLog('[GET][rentInfo] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getTradeInfoByDong ---------------

const getTradeInfoByDong = async (req, res) => {
    const query = 'SELECT * FROM tradeInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ?;';
    
    const gu = req.query.gu;
    const dong = req.query.dong;

    const queryData = [gu, dong];

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
            for(let i = 0; i<rows.length;i++){
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
    timeLog('[GET][rentInfo-dong] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getRentInfoByDong ---------------

const getRentInfoByDong = async (req, res) => {
    const query = 'SELECT * FROM rentInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ?;';
    
    const gu = req.query.gu;
    const dong = req.query.dong;

    const queryData = [gu, dong];

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
            for(let i = 0; i<rows.length;i++){
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
    timeLog('[GET][rentInfo-dong] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));

};

// ------------- getLeastTradeByDong ---------------

const getLeastTradeByDong = async (req, res) => {
    const query = 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(tradePrice) AS tradePrice, MAX(created) AS created FROM tradeInfo WHERE TRIM(gu) = ? AND TRIM(dong) = ? GROUP BY name, gu, dong, jibun;';

    const gu = req.query.gu;
    const dong = req.query.dong;
    const queryData = [gu, dong];

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
            for(let i = 0; i<rows.length;i++){
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

    const queryData = [gu, dong];

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
            for(let i = 0; i<rows.length;i++){
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
    const query= 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(tradePrice) AS tradePrice, MAX(created) AS created FROM jipsa.tradeInfo GROUP BY name, gu, dong, jibun;';
    
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
            for(let i = 0; i<rows.length;i++){
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

const getLeastRent = async (req, res) => {
    const query= 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(rentPrice) AS rentPrice, MAX(created) AS created FROM jipsa.rentInfo GROUP BY name, gu, dong, jibun;';
    
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
            for(let i = 0; i<rows.length;i++){
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

const getLeastTradeByGu = async (req, res) => {
    const query= 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(tradePrice) AS tradePrice, MAX(created) AS created FROM jipsa.tradeInfo WHERE TRIM(gu) = ? GROUP BY name, gu, dong, jibun;';
    
    const gu = req.query.gu;

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.officetel = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, gu);
            results.count = rows.length;
            console.log(rows);
            for(let i = 0; i<rows.length;i++){
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

const getLeastRentByGu = async (req, res) => {
    const query= 'SELECT name, gu, dong, jibun, MAX(size) AS size, MAX(year) AS year, MAX(month) AS month, MAX(rentPrice) AS rentPrice, MAX(created) AS created FROM jipsa.rentInfo WHERE TRIM(gu) = ? GROUP BY name, gu, dong, jibun;';

    const gu = req.query.gu;

    const results = {};
    results.result = true;
    results.count = 0;
    results.error = [];
    results.officetel = [];

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, gu);
            results.count = rows.length;
            console.log(rows);
            for(let i = 0; i<rows.length;i++){
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


export { getTradeInfo, getRentInfo, getTradeInfoByDong, getRentInfoByDong, getLeastTradeByDong, getLeastRentByDong, getLeastTrade, getLeastRent, getLeastTradeByGu, getLeastRentByGu };