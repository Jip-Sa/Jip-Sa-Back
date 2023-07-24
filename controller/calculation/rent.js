'use strict';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { consoleBar, timeLog } from '../../lib/common.js';
import { writeDbRentInfo } from '../../lib/rentdb.js';

const getRentFromOpenApi = async (locationCode, yearMonth) => {
    const rentUrl = process.env.RENT_ENDPOINT;
    const serviceKey = process.env.SERVICE_KEY1;

    const url = rentUrl + '?serviceKey=' + serviceKey + '&LAWD_CD=' + locationCode + '&DEAL_YMD=' + yearMonth;

    const results = {};
    results.result = true;
    results.error = [];
    results.data = [];
    try {
        const response = await axios.get(url, {
            responseType: 'text',
            headers: {
                'Content-Type': 'text/xml',
            },
        });

        const jsonData = JSON.parse(response.data);
        const items = jsonData.response.body.items.item;

        for (let i = 0; i < items.length; i++) {
            if (items[i].월세 == 0) {
                const dataItem = {
                    year: items[i].년,
                    month: items[i].월,
                    name: items[i].단지,
                    gu: items[i].시군구,
                    dong: items[i].법정동,
                    jibun: items[i].지번,
                    size: items[i].전용면적,
                    rentPrice: items[i].보증금
                };
                results.data.push(dataItem);
            }
        }

        for (let i = 0; i < results.data.length; i++) {
            await writeDbRentInfo(locationCode, results.data[i]);
        }



    } catch (err) {
        results.result = false;
        results.error.push('[ERROR][OPEN API] fetching data');
    }

    consoleBar();
    timeLog('[OPEN API] trade called // ' + JSON.stringify(results.data.length) + ' assets are enter');
};

export { getRentFromOpenApi };
