const { DBRef } = require('mongodb');
const nodemailer = require('nodemailer');
const db = require('../models/db.js')
const User = require('../models/UserModel.js');

const PubRequest = require('../models/PubRequestModel.js');

const usersController = {
    
    getIndex: (req , res) => {  
        if(req.session.userID /*&& req.session.role === 'Administrator'*/){
            let viewFlag = false;
            let mReqFlag = false;
            let mUserFlag = false;

            if (req.session.role === "Publicity and Creatives") {
                viewFlag = true;
            } else if (req.session.role === "Secretariat") {
                viewFlag = true;
                mReqFlag = true;
            } else if (req.session.role === "Administrator") {
                viewFlag = true;
                mReqFlag = true;
                mUserFlag = true;
            }

            const details = {
                viewFlag : viewFlag,
                mReqFlag : mReqFlag,
                mUserFlag : mUserFlag
            }
            res.render('manage_users', details);
        } else {
            res.redirect('/add_requests');
        }
    },

    deleteUser: (req, res) => {
        var reqname = req.query.reqname;

        details = {
            error: ""
        }

        db.findOne(User ,  {name : reqname}, {} , function(result) {

            if (req.session.userID != result.userID){
                db.deleteOne(User, {name : reqname}, function(result){
                });
            }
            else{
                console.log('Cant Delete Your Own Account');
            }


        });
    },

    updateUser: (req , res) => {

        const newRole = req.body.role;
        const newAC = req.body.assigned_committee;
        
        const query = {
            name : req.body.name
        }

        db.findOne(User , query , {} , function(result) {

            //Test Purposes
            //console.log('\nemail = ' + result.email  +  '\nAC = ' + newAC + '\nrole = ' + result.role + '\nsession role = ' + req.session.role);
            console.log('email = ' + result.email);
            console.log('assigned new committee = ' + newAC);
            console.log('role = ' + result.role);
            /*
            if(newRole !== result.role) {
                console.log('Hello');
            } else {
                console.log('Failed');
                res.redirect('/manage_users');
            }*/

            if (req.session.userID == result.userID && result.role === 'Administrator' && newRole !== 'Administrator'){ //If an Administrator tries to demote himself/herself
                console.log('Cant demote yourself (an administrator)');
                res.redirect('/manage_users');
            }
            else{//Valid Updating User
                db.updateOne(User , { email : result.email } , {
                    $set : {
                        role : newRole,
                        assigned_committee : newAC
                    }, 
                });
                req.session.role = newRole;
                req.session.mailReceiver = result.email;

                return res.redirect('/sendNotif');  
            }
        });
    }
}

module.exports = usersController;