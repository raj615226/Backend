import express,{Express,Response,Request, RequestHandler} from 'express';
import Pool from '../config/db';
import dotenv from 'dotenv';
import { createprofileService, verifyemailService } from '../service/userService';
interface type {
    status:string,
    msg:string,
    data?:any
}
dotenv.config();
export const createprofileController:RequestHandler=async(req:Request,res:Response)=>{
    let response :type = {
        status: 'error',
        msg: 'Something went wrong.',
     }
     try{
        const datas:any=req.body;
        const query:any=await createprofileService(Pool,datas)
        if(query.rowCount > 0){
            response = {
                status: 'success',
                msg: 'Created successfully.',
            }
        } else {
            response = {
                status: 'failed',
                msg: 'There is a problem while inserting data. Please try again later.',

            }
        }
    } catch (error) {
        console.log(error)
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        }
    } finally {
        res.send(response)
    }
}
export const verifyemailController:RequestHandler=async(req:Request,res:Response)=>{
    let response :type = {
        status: 'error',
        msg: 'Something went wrong.',
     }
     try{
        const datas:any=req.body;
        const query:any=await verifyemailService(Pool,datas)
        console.log(query.rowCount)
        if(query.rowCount > 0){
            response = {
                status: 'failed',
                msg: 'Already Register.',
            }
        } else {
            response = {
                status: 'success',
                msg: 'Email Verify go next page',

            }
        }
    } catch (error) {
        console.log(error)
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        }
    } finally {
        res.send(response)
    }
}