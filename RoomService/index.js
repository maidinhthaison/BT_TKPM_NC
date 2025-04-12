import express from 'express';
import { config } from './config.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import roomRoutes from './routes/roomRoutes.js';

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

app.use(express.static(path.join(__dirname, 'Du_Lieu_Phong')));

app.use('/api',roomRoutes.routes);


app.listen(config.port, () => console.log(`Room Service is listening on url ${config.url}`));
