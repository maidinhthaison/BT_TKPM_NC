import express from 'express';
import { config } from './config.js';
import bodyParser from 'body-parser';
import cors from 'cors';

import configServiceRoutes from './routes/configServiceRoutes.js';

const corsOptions ={
   origin:'*', 
   credentials:true,         
   optionSuccessStatus:200,
}

const app =  express();
app.use(cors(corsOptions)) 
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api',configServiceRoutes.routes);


app.listen(config.port, () => console.log(`Config Service is listening on url ${config.url}`));
