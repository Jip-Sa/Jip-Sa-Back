'use strict';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config/config.js';
import { ping } from './controller/system.js';
import { consoleBar, timeLog } from './lib/common.js';
import { getTradingFromOpenApi } from './controller/calculation/trade.js';
import { getRentFromOpenApi } from './controller/calculation/rent.js';
import { rentMacro, tradeMacro } from './controller/macro.js';
import { getRentInfo, getTradeInfo } from './lib/db.js';

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


// -------------------- Macro --------------------

//rentMacro();
//tradeMacro();

// ---------------- server start -----------------

app.use('/Jipsa/api/v1', router);
app.listen(serverPort);
consoleBar();
timeLog('Test Server Started');