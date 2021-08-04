const express = require('express');
const session = require('express-session')
const passport = require('passport');
const requestController = require('../controllers/requestController.js');
const loginController = require('../controllers/loginController.js');
const passportSetup = require('../controllers/passportSetup.js');
const app = express();

app.post('/login', loginController.redirectHome, passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/login/callback', passport.authenticate('google', { failureRedirect: '/failed' }), loginController.googleLogin);

app.get('/'  , loginController.getIndex);

app.get('/failed' , loginController.redirectHome, loginController.loginFailed);

app.post('/logout' , loginController.redirectLogin , loginController.logout);

app.get('/add_request' , loginController.redirectHome,  requestController.getIndex)
app.post('/add_request', requestController.postRequest);

module.exports = app;
