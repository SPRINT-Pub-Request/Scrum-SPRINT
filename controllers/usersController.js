const { DBRef } = require('mongodb');
const nodemailer = require('nodemailer');
const db = require('../models/db.js')
const User = require('../models/UserModel.js');

const PubRequest = require('../models/PubRequestModel.js');

const usersController = {
    
    getIndex: (req , res) => {  
        console.log(req.session.role);
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
            console.log('\nuserName = ' + result.name + '\nuserEmail = ' + result.email + '\nrole = ' + result.role + '\ncommittee = ' + result.committee);
            
            if(newRole !== result.role || newCommittee !== result.committee) {
                
                try {
                    db.updateOne(User , { email : result.email } , {
                        $set : {
                            role : newRole,
                            committee : newCommittee
                        }, 
                    });
                } catch(err) {
                    console.log(err);
                    res.redirect('/logout');
                }

            } else {
                res.redirect('/sendNotif');           
            }

            res.redirect('/manage_users');
        });
        

    }
}

module.exports = usersController;