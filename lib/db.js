'use strict';
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from './common.js';

// ------------- getTradeInfo ---------------

const getTradeInfo = async (req, res) => {
    const query = 'SELECT * FROM tradeInfo WHERE gu = ? AND dong = ? AND jibun = ?;';
    
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
    const query = 'SELECT * FROM rentInfo WHERE gu = ? AND dong = ? AND jibun = ?;';
    
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
    const query = 'SELECT * FROM tradeInfo WHERE gu = ? AND dong = ?;';
    
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
    const query = 'SELECT * FROM rentInfo WHERE gu = ? AND dong = ?;';
    
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

export { getTradeInfo, getRentInfo, getTradeInfoByDong, getRentInfoByDong };