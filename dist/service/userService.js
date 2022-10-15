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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyemailService = exports.createprofileService = void 0;
const createprofileService = (Pool, datas) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO public.user_details(name,email,phone_number,gender,address,fathername,platform,mothername) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;`;
    const querydata = [datas.name, datas.email, datas.phonenumber, datas.gender, datas.address, datas.fathername, datas.platform, datas.mothername];
    return yield Pool.query(query, querydata);
});
exports.createprofileService = createprofileService;
const verifyemailService = (Pool, datas) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM public.user_details WHERE email=$1;`;
    const querydata = [datas.email];
    return yield Pool.query(query, querydata);
});
exports.verifyemailService = verifyemailService;
