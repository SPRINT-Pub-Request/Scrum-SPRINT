const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const hbs = require('hbs');
const session = require('express-session');
const nodemailer = require('nodemailer');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const routes = require('./routes/routes.js');
const db = require('./models/db.js');

const passport = require('passport');

const app = express();

db.connect();

port = process.env.PORT || 3000;
hostname = process.env.HOSTNAME || '0.0.0.0';
sessionSecret = process.env.SESSION_SECRET;
sessionName = process.env.SESSION_NAME;

// Session Last for 2 Hours
const sessionLifeTime = 1000 * 60 * 60 * 2;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:true} ));

app.use(passport.initialize());
app.use(passport.session());

app.use('/favicon.ico', express.static('public/img/favicon.ico'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + `/views/partials`);

app.use(express.static('public'));

app.use(session({
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    cookie:{
        maxAge: sessionLifeTime,
    } ,
    store: MongoStore.create({mongoUrl: process.env.DB_URL})
}));

app.use('/' , routes);

app.use((req , res) => {
    if(req.session.userID === null) {
        req.session.httpCode = 404;
        res.redirect('/failed');    
    } else {
        req.session.httpCode = 200;
        res.redirect('/add_request');
    }
});

// Using 5000 for it to work in heroku
app.listen(port, hostname, () => {
    console.log('Server running at:');
    console.log('http://' + "localhost" + ':' + port);
});