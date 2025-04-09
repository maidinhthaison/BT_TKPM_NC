import express from 'express';
import { config } from './config.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import nhanvienRoutes from './routes/user-routes.js';

const corsOptions ={
   origin:'*', 
   credentials:true,         
   optionSuccessStatus:200,
}
// Recreate __dirname variable
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app =  express();
app.use(cors(corsOptions)) 
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'Du_Lieu_Khach_San')));

app.use('/api',nhanvienRoutes.routes);


app.listen(config.port, () => console.log(`User Service is listening on url ${config.url}`));
