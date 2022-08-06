//express imports
import express from 'express';
import cors from  'cors';
//server .env import
import 'dotenv/config';
//database imports
import { AppDataSource } from './data-source';
import 'reflect-metadata'

import mainRouter from './routes';
import initialization from './services/initialization';

const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}

//Establish database connection
AppDataSource.initialize()
.then(async ()=>{
    console.log("Data source has benn initializated!")
    await initialization();


    const app = express();

    app.set('view engine', 'ejs')
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(mainRouter);

    const PORT = process.env.PORT;

    app.listen(PORT , () => {
        console.log("server started at port: " + PORT);
    })
})
.catch((error)=>{
console.log("error during database initialization :"+error);
})