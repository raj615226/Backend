import { Pool  } from 'pg';
import dotenv from "dotenv"
dotenv.config()

const port:any=process.env.PGPORT;
const pool=new Pool({
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
    database:process.env.PGDATABASE,
    host: process.env.PGHOST,
    port:port,
    ssl:{
        rejectUnauthorized:false
    }
})
pool.connect((err) => {
    if (err) throw err
console.log("connect with db")
})


export default pool;
    
