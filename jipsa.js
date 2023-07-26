'use strict';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config/config.js';
import { ping } from './controller/system.js';
import { consoleBar, timeLog } from './lib/common.js';
import { levelMacro, rentMacro, tradeMacro } from './controller/macro.js';
import { getLeastRent, getLeastRentByDong, getLeastRentByGu, getLeastTrade, getLeastTradeByDong, getLeastTradeByGu, getRentInfo, getRentInfoByDong, getTradeInfo, getTradeInfoByDong } from './lib/db.js';
import { getRentSizeInfo, getTradeSizeInfo } from './lib/size.js';

// ------------------ router set -----------------

const serverPort = config.SERVER_PORT;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const router = express.Router();

// -------------------- api --------------------

router.route('/ping').get(ping);
router.route('/tradeInfo').get(getTradeInfo);
router.route('/rentInfo').get(getRentInfo);
router.route('/tradeInfo-dong').get(getTradeInfoByDong);
router.route('/rentInfo-dong').get(getRentInfoByDong);
router.route('/leastTrade-dong').get(getLeastTradeByDong);
router.route('/leastRent-dong').get(getLeastRentByDong);
router.route('/leastTrade').get(getLeastTrade);
router.route('/leastRent').get(getLeastRent);
router.route('/leastTrade-gu').get(getLeastTradeByGu);
router.route('/leastRent-gu').get(getLeastRentByGu);
router.route('/sizeTrade').get(getTradeSizeInfo);
router.route('/sizeRent').get(getRentSizeInfo);

// -------------------- Macro --------------------

// rentMacro();
// tradeMacro();
// levelMacro();

// ---------------- server start -----------------

app.use('/Jipsa/api/v1', router);
app.listen(serverPort);
consoleBar();
timeLog('Test Server Started');