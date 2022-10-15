"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyemailController = exports.createprofileController = void 0;
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const userService_1 = require("../service/userService");
dotenv_1.default.config();
const createprofileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const datas = req.body;
        const query = yield (0, userService_1.createprofileService)(db_1.default, datas);
        if (query.rowCount > 0) {
            response = {
                status: 'success',
                msg: 'Created successfully.',
            };
        }
        else {
            response = {
                status: 'failed',
                msg: 'There is a problem while inserting data. Please try again later.',
            };
        }
    }
    catch (error) {
        console.log(error);
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        };
    }
    finally {
        res.send(response);
    }
});
exports.createprofileController = createprofileController;
const verifyemailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const datas = req.body;
        const query = yield (0, userService_1.verifyemailService)(db_1.default, datas);
        console.log(query.rowCount);
        if (query.rowCount > 0) {
            response = {
                status: 'failed',
                msg: 'Already Register.',
            };
        }
        else {
            response = {
                status: 'success',
                msg: 'Email Verify go next page',
            };
        }
    }
    catch (error) {
        console.log(error);
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        };
    }
    finally {
        res.send(response);
    }
});
exports.verifyemailController = verifyemailController;
