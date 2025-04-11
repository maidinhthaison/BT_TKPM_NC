import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {engine} from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8000;
app.use(express.static('public'))
app.use(express.json())

app.engine('.hbs', engine({ 
    extname: '.hbs' ,
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'}));

app.set('view engine', '.hbs');
app.set('views', './views');

const fakeApi = () => {
return [
        {
            name: 'Katarina',
            lane: 'midlaner'
        },
        {
            name: 'Jayce',
            lane: 'toplaner'
        },
        {
            name: 'Heimerdinger',
            lane: 'toplaner'
        },
        {
            name: 'Zed',
            lane: 'midlaner'
        },
        {
            name: 'Azir',
            lane: 'midlaner'
        }
];
}

app.get('/', (req, res) => {
    res.render('main', {layout: 'index', suggestedChamps: fakeApi(), listExists: true});
});
app.get('/login', (req, res) => {
    res.render('login', {layout: 'loginLayout'});
});
app.get('/about', (req, res) => {
    res.render('about', {layout: 'aboutLayout'});
});

app.get('/contact', (req, res) => {
    res.render('contact', {layout: 'contactLayout'});
});

app.listen(port, () => console.log(`App listening to port ${port}`));