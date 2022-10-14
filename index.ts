import express,{Express,Request,Response} from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import userRouter from'./router/userRouter';
import cors from'cors';

dotenv.config();

const app: Express = express();
app.use(bodyparser.json())
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4000;
app.use(userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});