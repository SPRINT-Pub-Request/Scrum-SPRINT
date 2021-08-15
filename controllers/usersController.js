const { DBRef } = require('mongodb');
const nodemailer = require('nodemailer');
const db = require('../models/db.js')
const User = require('../models/UserModel.js');

const PubRequest = require('../models/PubRequestModel.js');

const usersController = {
    
    getIndex: (req , res) => {  
        if(req.session.userID /*&& req.session.role === 'Administrator'*/) {
            res.render('manage_users');
        } else {
            res.redirect('/add_requests');
        }
    },

    deleteUser: (req, res) => {
        var reqname = req.query.reqname;
        console.log("------Del User--------");
        console.log("REQ NAME: " + reqname);
        details = {
            error: ""
        }

        db.deleteOne(User, {name : reqname}, function(result){
        });
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
                
                    db.updateOne(User , { email : result.email } , {
                        $set : {
                            role : newRole,
                            committee : newCommittee
                        }, 
                    });
                    req.session.mailReceiver = result.email;
                return res.redirect('/sendNotif');  
            } 
            
        
            res.redirect('/manage_users');
        });
        

    }
}

module.exports = usersController;