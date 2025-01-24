const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors=require("cors");
const config = require('./config');
const corsOptions ={
   origin:'*', 
   credentials:true,         
   optionSuccessStatus:200,
}


const app =  express();
app.use(cors(corsOptions)) 
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/Tra_cuu_Nhan_vien_Du_lieu', express.static(path.join(__dirname, "Tra_cuu_Nhan_vien_Du_lieu")))
const loichaoRoutes = require('./routes/loichao-routes');
const jsonRoutes = require('./routes/json-routes');
const nhanvienRoutes = require('./routes/nhanvien-routes');
app.use('/',jsonRoutes.routes);
app.use('/api',loichaoRoutes.routes);
app.use('/api',nhanvienRoutes.routes);


app.listen(config.port, () => console.log(`App is listening on url ${config.url}`));