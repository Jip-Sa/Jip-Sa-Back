'use strict';
import { consoleBar, timeLog, resSend } from "../lib/common.js";
import seoulLocationCode from "../config/seoulLocationCode.js";
import yearCode from "../config/yearCode.js";
import { getTradingFromOpenApi } from "./calculation/trade.js";
import { getRentFromOpenApi } from "./calculation/rent.js";
import { calculateLevel, createLevelInfo } from "./calculation/level.js";

// -------- Trade 4 year Macro At Seoul ----------

const tradeMacro = async () => {
    for (let i = 0; i < seoulLocationCode.SEOUL.GU.length; i++) {
        const location = seoulLocationCode.SEOUL.GU[i];
        for (let j = 0; j < yearCode.YEAR2019_2021.length; j++) {
            const year = yearCode.YEAR2019_2021[j];
            console.log("[TRADE][2019-2021][MACRO] location : " + location + " year = " + year);
            await getTradingFromOpenApi(location, year);
        }
        for (let j = 0; j < yearCode.YEAR2021_2023.length; j++) {
            const year = yearCode.YEAR2021_2023[j];
            console.log("[TRADE][2021-2023][MACRO] location : " + location + " year = " + year);
            await getTradingFromOpenApi(location, year);
        }
    }
};

// -------- Rent 4 year Macro At Seoul ----------

const rentMacro = async () => {
    for (let i = 0; i < seoulLocationCode.SEOUL.GU.length; i++) {
        const location = seoulLocationCode.SEOUL.GU[i];
        for (let j = 0; j < yearCode.YEAR2019_2021.length; j++) {
            const year = yearCode.YEAR2019_2021[j];
            console.log("[RENT][2019-2021][MACRO] location : " + location + " year = " + year);
            await getRentFromOpenApi(location, year);
        }
        for (let j = 0; j < yearCode.YEAR2021_2023.length; j++) {
            const year = yearCode.YEAR2021_2023[j];
            console.log("[RENT][2021-2023][MACRO] location : " + location + " year = " + year);
            await getRentFromOpenApi(location, year);
        }
    }
};

const levelMacro = async () => {
    await createLevelInfo();
    console.log("[LEVEL][MACRO] create");
    await calculateLevel();
    console.log("[LEVEL][MACRO] calculate");
};

export { tradeMacro, rentMacro, levelMacro };