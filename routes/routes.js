const express = require('express');
const passport = require('passport');

const requestController = require('../controllers/requestController.js');
const loginController = require('../controllers/loginController.js');
const usersController = require('../controllers/usersController.js');
const passportSetup = require('../controllers/passportSetup.js');
const mailController = require('../controllers/mailController.js');
const viewRequestController = require('../controllers/viewRequestController.js');

const app = express();

// Login Controllers
app.post('/login',  passport.authenticate('google', { scope: ['profile', 'email'] }));
app.post('/logout' ,  loginController.logout);
app.get('/login/callback',  passport.authenticate('google', { failureRedirect: '/failed' }), loginController.googleLogin);
app.get('/'  , loginController.getIndex);
app.get('/failed' , loginController.loginFailed);

// Request Controllers
app.get('/post_request', requestController.addRequest);
app.get('/add_request' ,  requestController.getIndex)
app.get('/manage_requests' ,  requestController.getManageReq);
app.get('/getPubRequest' , requestController.getPubRequest);
app.get('/savePubChanges' , requestController.savePubChanges);
app.get('/getAssignedSec' , requestController.getAssignedSec);
app.get('/getAssignedPub' , requestController.getAssignedPub);
app.get('/checkCommittee' , requestController.checkCommittee);
app.get('/checkRole' , requestController.checkRole);
app.get('/deleteRequest' , requestController.deleteRequest);

// User Controllers
app.get('/updateUser' , usersController.updateUser);
app.get('/manage_users', usersController.getIndex);
app.get('/deleteUser', usersController.deleteUser);
app.get('/getUser', usersController.getUserInfo);
app.get('/checkAdmins', usersController.adminsAvailable);
app.get('/getName', usersController.getName);
app.get('/getNoAssigned' , usersController.getNoAssigned);
app.get('/checkInProgress' , usersController.checkInProgress);
app.get('/addUser', usersController.addUser);
app.get('/getRole' , usersController.getRole);

//View Request Controllers
app.get('/view_requests', viewRequestController.getIndex);
app.get('/updateStatus', viewRequestController.updateStatus);
app.get('/updatePubLink', viewRequestController.updatePubLink);
app.get('/updateCaption', viewRequestController.updateCaption);

// Mail Controllers
app.get('/sendNotif' , mailController.sendNotif);
app.get('/sendNewAssign' , mailController.sendNewAssign);
app.get('/sendDeletedNotif' , mailController.sendDeletedNotif);

module.exports = app;