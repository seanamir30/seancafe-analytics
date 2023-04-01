import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ConnectOptions } from 'mongoose';
import { analyticsController } from './src/controllers/analytics.controller';
import mongoose from 'mongoose';

dotenv.config();

const whitelist = /^https?:\/\/([a-z0-9]+\.)?seancafe\.com(:\d{1,5})?(\/.*)?$/;

const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200
}

const app: Express = express();
const port = process.env.PORT;
const mongoDbUrl = process.env.MONGO_DB_URL || '';

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }));

app.use(analyticsController)

mongoose.connect(mongoDbUrl, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    } as ConnectOptions)
    .then(()=>{
        console.log('connected to the database')
    })

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});