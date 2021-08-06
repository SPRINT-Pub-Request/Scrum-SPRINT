// TODO: Will Reformat Code to follow airbnb standards
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const hbs = require('hbs');
const session = require('express-session');

const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const routes = require('./routes/routes.js');
const db = require('./models/db.js');

const passport = require('passport');

const app = express();

db.connect();

port = process.env.PORT;
hostname = process.env.HOSTNAME;
sessionSecret = process.env.SESSION_SECRET;
sessionName = process.env.SESSION_NAME;

var sessionLifeTime = 1000 * 60 * 60 * 2;// Session Last for 2 Hours

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:true} ));

app.use(passport.initialize());
app.use(passport.session());

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
    req.session.httpCode = 404;
    res.redirect('/failed');
});

app.listen(port, hostname, () => {
    console.log('Server running at:');
    console.log('http://' + hostname + ':' + port);
});