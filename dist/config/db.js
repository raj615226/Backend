"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PGPORT;
const pool = new pg_1.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: port,
    // ssl:{
    //     rejectUnauthorized:false
    // }
});
pool.connect((err) => {
    if (err)
        throw err;
    console.log("connect with db");
});
exports.default = pool;
