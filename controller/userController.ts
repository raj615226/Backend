import express,{Express,Response,Request, RequestHandler} from 'express';
import Pool from '../config/db';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { createprofileService, verifyemailService, loginService, logutService } from '../service/userService';
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
export const  loginController:RequestHandler=async(req:Request,res:Response)=>{
    let response:type = {
        status: 'error',
        msg: 'Something went wrong.'
    }
    try {
        const data=req.body;
        const query:any=await verifyemailService(Pool,data)
        if(query.rowCount > 0){
            var jwtstring:any=process.env.JWT_SECRET;
            const datas=query.rows[0].email;
            const token = jwt.sign({_id:datas},jwtstring, { expiresIn: '7 days' })
            const querytoken=await loginService(Pool,data,token)
            if(querytoken.rowCount > 0){
                const responseData = {
                    JwtToken:querytoken.rows[0].token,
                }
            response={
                status:'success',
                msg:'Login successfully',
                data:responseData
            }
        }
    else {
            response = {
                status: 'failed',
                msg: 'There is a problem while inserting data. Please try again later.',
           }
        }
        }
        else{
            response = {
                status: 'failed',
                msg: 'Enter a valid email',
           }

        }
    }catch (error) {
        console.log(error)
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'
        }
    } finally {
        res.send(response)
    }
        
}
export const logutController:RequestHandler=async(req:Request,res:Response)=>{
    let response :type = {
        status: 'error',
        msg: 'Something went wrong.',
     }
     try{
        const token:any =req.header('Authorization')?.replace('Bearer','')
        const jwtstring:any= process.env.JWT_SECRET
        const decoded:any= jwt.verify(token,jwtstring)
        const queryData = await logutService(Pool,decoded._id)
        if(queryData.rowCount > 0){
            response={
                status:'success',
                msg:'Logout successfully'
            }
        }
        else{
            response = {
                status: 'success',
                msg: 'No data found.',
        }
     }
    } catch(err){
        console.log(err)
        response = {
            status: 'error',
            msg: 'Ops! Something went wrong. Please try again later.'

        }
} finally {
    res.send(response)
}
}