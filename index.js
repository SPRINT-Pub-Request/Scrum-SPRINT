// TODO: Will Reformat Code to follow airbnb standards
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const hbs = require('hbs')
const session = require('express-session')
const routes = require('./routes/routes.js');

const passport = require('passport')

const app = express()

port = process.env.PORT;
hostname = process.env.HOSTNAME;
sessionSecret = process.env.SESSION_SECRET;
sessionName = process.env.SESSION_NAME;

var sessionLifeTime = 1000 * 60 * 60 * 2;// Session Last for 2 Hours

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:true} ));

app.use(passport.initialize())
app.use(passport.session())

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
        sameSite: true
    }
}));

app.use('/' , routes);


app.listen(port, hostname, () => {
    console.log('Server running at:');
    console.log('http://' + hostname + ':' + port);
});