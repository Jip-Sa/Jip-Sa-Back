'use strict';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { consoleBar, timeLog } from '../../lib/common.js';

const getTradingFromOpenApi = async (locationCode, yearMonth) => {
    const tradeUrl = process.env.TRADE_ENDPOINT;
    const serviceKey = process.env.SERVICE_KEY;

    const url = tradeUrl + '?serviceKey=' + serviceKey + '&LAWD_CD=' + locationCode + '&DEAL_YMD=' + yearMonth;

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
            results.data.push([items[i].단지, items[i].거래금액, items[i].시군구, items[i].법정동, items[i].지번]);

        }
        console.log(results);

    } catch (err) {
        results.result = false;
        results.error.push('[ERROR][OPEN API] fetching data');
    }

    consoleBar();
    timeLog('[OPEN API] trade called // ' + JSON.stringify(results));
};

export { getTradingFromOpenApi };
