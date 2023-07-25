'use strict';
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { consoleBar, timeLog } from '../../lib/common.js';
import { writeDbRentInfo } from '../../lib/rentdb.js';

