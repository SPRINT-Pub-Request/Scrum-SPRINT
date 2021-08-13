const express = require('express');
const passport = require('passport');

const requestController = require('../controllers/requestController.js');
const loginController = require('../controllers/loginController.js');
const usersController = require('../controllers/usersController.js');
const passportSetup = require('../controllers/passportSetup.js');

const app = express();

// Login Controllers
app.post('/login',  passport.authenticate('google', { scope: ['profile', 'email'] }));
app.post('/logout' ,  loginController.logout);
app.get('/login/callback',  passport.authenticate('google', { failureRedirect: '/failed' }), loginController.googleLogin);
app.get('/'  , loginController.getIndex);
app.get('/failed' , loginController.loginFailed);

// Request Controllers
app.post('/add_request', requestController.postRequest);
app.get('/add_request' ,  requestController.getIndex)
app.get('/manage_requests' ,  requestController.getManageReq);
app.get('/view_requests' ,  requestController.getViewReq);

// User Controllers
app.post('/updateUser' , usersController.updateUser);
app.get('/manage_users', usersController.getIndex);

module.exports = app;