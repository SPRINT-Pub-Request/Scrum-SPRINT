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

            users_data = [];
            db.findMany(User, {}, {}, function(result){                
                for (i of result){
                    let temp_data = {};
                    temp_data["email"] = i.email;
                    temp_data["name"] = i.name;
                    temp_data["role"] = i.role;

                    if(i.assigned_committee === ""){
                        temp_data["assigned_committee"] = "None"
                    }
                    else
                        temp_data["assigned_committee"] = i.assigned_committee;

                    temp_data["userID"] = i.userID;
                    users_data.push(temp_data);
                }

                const details = {
                    viewFlag : viewFlag,
                    mReqFlag : mReqFlag,
                    mUserFlag : mUserFlag,
                    users_data : users_data
                }

                res.render('manage_users', details);
            });
        } else {
            res.redirect('/add_requests');
        }
    },

    deleteUser: (req, res) => {

        console.log("DELETE USER");
        /*
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


        });*/
    },

    updateUser: (req , res) => {

        const email = req.query.email;
        const role = req.query.role;
        const assigned_committee = req.query.assigned_committee;

        newUser ={
            email : email,
            role : role,
            assigned_committee : assigned_committee
        }

        db.updateOne(User , { email : email } , newUser, function(flag){
            if (flag){
                res.send(true);
            }
            else{
                res.send(false);
            }
        });

    },

    getUserInfo: (req , res) => {
        const email = req.query.email;

        db.findOne(User ,  {email : email}, {} , function(result) {
            res.send(result)
        });
    }
}

module.exports = usersController;