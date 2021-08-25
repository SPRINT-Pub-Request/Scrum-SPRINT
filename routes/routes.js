const express = require('express');
const passport = require('passport');

const requestController = require('../controllers/requestController.js');
const loginController = require('../controllers/loginController.js');
const usersController = require('../controllers/usersController.js');
const passportSetup = require('../controllers/passportSetup.js');
const mailController = require('../controllers/mailController.js');

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
app.get('/getPubRequest' , requestController.getPubRequest);
app.get('/savePubChanges' , requestController.savePubChanges);
app.get('/getAssignedSec' , requestController.getAssignedSec);
app.get('/getAssignedPub' , requestController.getAssignedPub);

// User Controllers
app.get('/updateUser' , usersController.updateUser);
app.get('/manage_users', usersController.getIndex);
app.get('/deleteUser', usersController.deleteUser);
app.get('/getUser', usersController.getUserInfo);
app.get('/checkAdmins', usersController.adminsAvailable);
app.get('/getEmail', usersController.getEmail);
app.get('/getNoAssigned' , usersController.getNoAssigned);

// Mail Controllers
app.get('/sendNotif' , mailController.sendNotif);

module.exports = app;