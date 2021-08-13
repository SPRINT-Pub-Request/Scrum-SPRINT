const { DBRef } = require('mongodb');

const db = require('../models/db.js')
const User = require('../models/UserModel.js');

const PubRequest = require('../models/PubRequestModel.js');

const usersController = {
    
    getIndex: (req , res) => {  
        if(req.session.userID && req.session.role === "Administrator") {
            res.render('manage_users');
        } else {
            res.redirect('/add_requests');
        }
    },

    updateUser: (req , res) => {

        const newRole = req.body.role;
        const newCommittee = req.body.committee;
        
        const query = {
            name : req.body.name
        }

        db.findOne(User , query , {} , function(result) {

            //Test Purposes
            console.log("userName = " + result.name + "\nuserEmail = " + result.email + "\nrole = " + result.role + "\ncommittee = " + result.committee);
        
            db.updateOne(User , { email : result.email } , {
                $set : {
                    role : newRole,
                    committee : newCommittee
                }, 
                function(){

            }});
        
        });
        

    }
}

module.exports = usersController;