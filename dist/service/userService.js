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
exports.getdataService = exports.verifyemailService = exports.createprofileService = void 0;
const createprofileService = (Pool, datas, password) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO public.user_details(name,email,phonenumber,department,address,city,state,country,pincode) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *;`;
    const querydata = [datas.name, datas.email, datas.phone, datas.department, datas.address, datas.city, datas.state, datas.country, datas.pincode];
    return yield Pool.query(query, querydata);
});
exports.createprofileService = createprofileService;
const verifyemailService = (Pool, datas) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM public.user_details WHERE email=$1 AND name=$2 AND department=$3;`;
    const querydata = [datas.email, datas.name, datas.department];
    return yield Pool.query(query, querydata);
});
exports.verifyemailService = verifyemailService;
// export const loginService:any=async(Pool:any,datas:any,token:any)=>{
//     const query=`UPDATE public.user_details SET token = $2 WHERE email= $1 RETURNING *;`
//     const querydata:any[]=[datas.email,token]
//     return await Pool.query(query,querydata)
// }
// export const logutService:any=async(Pool:any,datas:any)=>{
//     const query=`UPDATE public.user_details SET token = null WHERE email= ${datas} RETURNING *;`
//     return await Pool.query(query)
// }
const getdataService = (Pool, datas) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM public.user_details;`;
    const querydata = [datas.email, datas.name, datas.department];
    return yield Pool.query(query, querydata);
});
exports.getdataService = getdataService;
