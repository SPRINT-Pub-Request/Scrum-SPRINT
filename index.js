// TODO: Will Reformat Code to follow airbnb standards

const dotenv = require('dotenv').config()
const hbs = require('hbs')
const passport = require('passport')
const bodyparser = require('body-parser')
const session = require('express-session')
const express = require('express')
const routes = require('./routes/routes.js');
const app = express()

const {
    port = PORT,
    hostname = HOSTNAME,
} = process.env

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + `/views/partials`);

app.use(express.static('public'));

app.use('/' , routes);


app.listen(port, hostname, () => {
    console.log('Server running at:');
    console.log('http://' + hostname + ':' + port);
});