import express from 'express';
import cors from "cors";
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';



import UserRoute from './routes/UserRoute.js';

import { Koneksi } from './config/MongoDB.js';

dotenv.config();

const app = express();


app.use(express.json());


// =============   Set Up Socket io  ==================


app.use(express.json());




app.set('trust proxy', 1)

app.use(cors());





app.use(UserRoute);



app.use('/', (req,res)=> {
    res.send(" Server  ")
})


app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...'+ process.env.APP_PORT);
});



