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
exports.logutController = exports.loginController = exports.verifyemailController = exports.createprofileController = void 0;
const db_1 = __importDefault(require("../config/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("../service/userService");
dotenv_1.default.config();
const createprofileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const datas = req.body;
        const hashpassword = yield bcrypt_1.default.hash(datas.password, 12);
        const query = yield (0, userService_1.createprofileService)(db_1.default, datas, hashpassword);
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
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {
        status: 'error',
        msg: 'Something went wrong.'
    };
    try {
        const data = req.body;
        const query = yield (0, userService_1.verifyemailService)(db_1.default, data);
        if (query.rowCount > 0) {
            var hashpassword = query.rows[0].password;
            var isMatch = yield bcrypt_1.default.compare(data.password, hashpassword);
            if (isMatch) {
                var jwtstring = process.env.JWT_SECRET;
                const datas = query.rows[0].email;
                const token = jsonwebtoken_1.default.sign({ _id: datas }, jwtstring, { expiresIn: '7 days' });
                const querytoken = yield (0, userService_1.loginService)(db_1.default, data, token);
                if (querytoken.rowCount > 0) {
                    const responseData = {
                        JwtToken: querytoken.rows[0].token,
                    };
                    response = {
                        status: 'success',
                        msg: 'Login successfully',
                        data: responseData
                    };
                }
                else {
                    response = {
                        status: 'failed',
                        msg: 'There is a problem while inserting data. Please try again later.',
                    };
                }
            }
            else {
                return response = {
                    status: 'success',
                    msg: 'Enter a valid password.',
                };
            }
        }
        else {
            response = {
                status: 'failed',
                msg: 'Enter a valid email',
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
exports.loginController = loginController;
const logutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let response = {
        status: 'error',
        msg: 'Something went wrong.',
    };
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer', '');
        const jwtstring = process.env.JWT_SECRET;
        const decoded = jsonwebtoken_1.default.verify(token, jwtstring);
        const queryData = yield (0, userService_1.logutService)(db_1.default, decoded._id);
        if (queryData.rowCount > 0) {
            response = {
                status: 'success',
                msg: 'Logout successfully'
            };
        }
        else {
            response = {
                status: 'success',
                msg: 'No data found.',
            };
        }
    }
    catch (err) {
        console.log(err);
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        };
    }
    finally {
        res.send(response);
    }
});
exports.logutController = logutController;
