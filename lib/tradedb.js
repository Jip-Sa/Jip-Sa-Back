'use strict';
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from './common.js';

// ------------- writeDbTradeInfo ---------------

const writeDbTradeInfo = async (location, TradeInfo) => {
    const query = 'INSERT INTO tradeInfo(year, month, location ,name, gu, dong, jibun, size, tradePrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); ';
    
    const queryData = [
        TradeInfo.year,
        TradeInfo.month,
        location,
        TradeInfo.name.trim(),
        TradeInfo.gu.trim(),
        TradeInfo.dong.trim(),
        TradeInfo.jibun.trim(),
        TradeInfo.size,
        TradeInfo.tradePrice
    ];

    const results ={};
    results.result = true;
    results.error = [];
    results.dong = TradeInfo.dong.trim();
    results.tradeInfo = TradeInfo;

    try {
        const connection = await pool.getConnection(async conn => conn);
        try {
            const [rows, fields] = await connection.query(query, queryData);
            results.locationNum = location;
        } catch (err) {
            results.result = false;
            results.result.push('Query Error');
        }
        connection.release();
    } catch (err) {
        results.result = false;
        results.error.push('DB Error');
    }
    consoleBar();
    timeLog('[INSERT DB][TRADE] called // ' + JSON.stringify(results));    

    return results;
};

export { writeDbTradeInfo };