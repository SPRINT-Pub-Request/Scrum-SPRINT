const express = require('express');

const loginController = require('../controllers/loginController.js');

const app = express();

app.get('/login' , googleLogin)







module.exports = app;
