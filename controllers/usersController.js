const { DBRef } = require('mongodb');

const db = require('../models/db.js')
const User = require('../models/UserModel.js');

const PubRequest = require('../models/PubRequestModel.js');

const usersController = {
    
    getIndex: (req , res) => {  
        if(req.session.userID) {
            res.render('manage_users');
        } else {
            res.redirect('/');
        }
    },

    updateUser: (req , res) => {

        const { role , committee } = req.body;
        
        const query = {
            name : req.body.name
        }

        db.findOne(User , query , {} , function(result) {

            //Test Purposes
            console.log("userName = " + result.name + "\nuserEmail = " + result.email + "\nrole = " + result.role + "\ncommittee = " + result.committee);
        });
        

    }
}

module.exports = usersController;