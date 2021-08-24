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
        const email = req.query.email;

        let details = {
            flag : false
        }
        
        db.findOne(User ,  {email:email}, {} , function(result) {

            if (req.session.userID == result.userID){
                req.session.destroy(err => {
                    if(err) {
                        return res.redirect('/');
                }});
            
                res.clearCookie(sessionName);
                res.redirect('/');
            }

            db.deleteOne(User, {email : email}, function(result){
                if(result)
                    details.flag= true;
                res.send(details);
            });
        });
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
        
        db.updateOne(User , { email : email } , {
            $set : {
                role : newUser.role,
                assigned_committee : newUser.assigned_committee
            }
        } , function(result) {
            if(result) {
                res.send(result);
            } else {
                res.send(result);
            }

        });

    },

    getEmail: (req , res) => {
        const userID = req.session.userID;

        db.findOne(User , {userID : userID} , {} , function(result){
            res.send(result.email);
        });
    },

    getUserInfo: (req , res) => {
        const email = req.query.email;
        
        db.findOne(User ,  {email : email}, {} , function(result) {
            res.send(result);
        });
    },

    getNoAssigned:(req , res) => {

        console.log("Get No Assigned");
        
        const namesCommittee = ["Activities" , "Finance" , "HRD" , "Externals" , "TND" , "P-EVP" , "SocioCivic" , "Pubs"];
        let committee = [false , false , false , false , false , false , false , false];


        db.findMany(User, {}, {}, function(result){
            for (let i = 0; i < result.length; i++){
                for (let j = 0; j < namesCommittee.length; j++){
                    console.log(result[i].assigned_committee.indexOf(namesCommittee[j]))
                    if (result[i].assigned_committee.indexOf(namesCommittee[j]) != -1){
                        committee[j] = true;
                    }
                }
            }
            console.log(committee);
            res.send(committee);
        })

    },

    adminsAvailable: (req, res) => {
        db.findMany(User, {role : "Administrator"}, {}, function(result){   

            console.log(result);
            res.send(result);
        });
    }
}

module.exports = usersController;