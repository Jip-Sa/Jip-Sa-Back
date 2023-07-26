'use strict';
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import config from '../config/config.js';
import { pool } from './connect.js';
import { consoleBar, timeLog } from './common.js';

// ------------- writeDbRentInfo ---------------

const writeDbRentInfo = async (location, RentInfo) => {
    const query = 'INSERT INTO rentInfo(year, month, location ,name, gu, dong, jibun, size, rentPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); ';
    
    const queryData = [
        RentInfo.year,
        RentInfo.month,
        location,
        RentInfo.name.trim(),
        RentInfo.gu.trim(),
        RentInfo.dong.trim(),
        RentInfo.jibun.trim(),
        RentInfo.size,
        RentInfo.rentPrice
    ];

    const results ={};
    results.result = true;
    results.error = [];
    results.rentInfo = RentInfo;

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
    timeLog('[INSERT DB][RENT] called // ' + JSON.stringify(results));    

    return results;
};

export { writeDbRentInfo };