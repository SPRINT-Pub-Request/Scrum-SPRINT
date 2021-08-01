// TODO: Will Reformat Code to follow airbnb standards

const dotenv = require('dotenv').config()
const hbs = require('hbs')
const passport = require('passport')
const bodyparser = require('body-parser')
const session = require('express-session')
const express = require('express')

const app = express()

const {
    port = PORT,
    hostname = HOSTNAME,
} = process.env

app.set('view engine', 'hbs');

app.use(express.static('images'));

app.get('/' , (req , res) => {
    res.render("login");
});



app.listen(port, hostname, () => {
    console.log('Server running at:');
    console.log('http://' + hostname + ':' + port);
});