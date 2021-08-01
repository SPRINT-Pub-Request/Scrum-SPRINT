const express = require('express');
const passport = require('passport');
const requestController = require('../controllers/requestController.js');
const loginController = require('../controllers/loginController.js');
const passportSetup = require('../controllers/passportSetup.js');
const app = express();

app.post('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/login/callback', passport.authenticate('google', { failureRedirect: '/failed' }), loginController.googleLogin);

app.get('/' , loginController.getIndex);

app.get('/failed' , loginController.loginFailed);

app.post('/logout' , loginController.logout);

app.get('/add_request' , requestController.getIndex)

module.exports = app;