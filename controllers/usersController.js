const { DBRef } = require('mongodb');
const nodemailer = require('nodemailer');
const db = require('../models/db.js')
const User = require('../models/UserModel.js');

const PubRequest = require('../models/PubRequestModel.js');

const usersController = {
    
    getIndex: (req , res) => { 
        if(req.session.userID && req.session.role === 'Administrator'){
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
        
        try {
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
                    db.deleteOne(User, {email : email}, function(result){
                        if(result)
                            details.flag= true;
                        res.send(details);
                    });
                } else {
                    db.deleteOne(User, {email : email}, function(result){
                        if(result)
                            details.flag= true;
                        res.send(details);
                    });
                }

            });
        } catch(err) {
            console.log(err);
            res.redirect('/logout');
        }
        
    },

    updateUser: (req , res) => {

        try {
            let transfer = false;
            const email = req.query.email;
            const role = req.query.role;
            const assigned_committee = req.query.assigned_committee;

            newUser ={
                email : email,
                role : role,
                assigned_committee : assigned_committee
            }
            

            db.findOne(User, {email : email}, {}, function(result){
                if (result.userID === req.session.userID){
                    transfer = true;
                    console.log("transfer true!");
                    req.session.role = newUser.role;
                }

                db.updateOne(User , { email : email } , {
                    $set : {
                        role : newUser.role,
                        assigned_committee : newUser.assigned_committee
                    }
                } , function(result) {
                    if(result) {
                        if(transfer){
                            req.session.role = newUser.role;
                        }
                        res.send(result);
                    } else {
                        res.send(result);
                    }
        
                });
            });

        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
        
    },

    getName: (req , res) => {
        const userID = req.session.userID;

        db.findOne(User , {userID : userID} , {} , function(result){
            res.send(result.name);
        });
    },

    getUserInfo: (req , res) => {
        const email = req.query.email;
        console.log()
        db.findOne(User ,  {email : email}, {} , function(result) {
            res.send(result);
        });
    },

    checkInProgress: (req , res) => {
        
        try {

            const name = req.query.name;
            let inProgress = false;

            if(name !== "Not Signed In Yet") {
                db.findOne(PubRequest , {pubName : name} , {} , function(result) {
                    if(result) {
                        if(result.status === "In Progress") {
                            inProgress = true; 
                            res.send(inProgress);
                        } else {
                            db.findOne(PubRequest , {secName : name} , {} , function(result) {
                                if(result.status === "In Progress") {
                                    inProgress = true;
                                    res.send(inProgress);
                                } else 
                                    res.send(inProgress)
                            });
                        }
                    }

                });
            } else {
                res.send(inProgress);
            }

        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    
        
    },


    getNoAssigned:(req , res) => {
        
        const namesCommittee = ["Activities" , "Finance" , "HRD" , "Externals" , "TND" , "P-EVP" , "SocioCivic" , "Secretariat"];
        let committee = [false , false , false , false , false , false , false , false];

        try {
            db.findMany(User, {}, {}, function(result){
                for (let i = 0; i < result.length; i++) {
                    for (let j = 0; j < namesCommittee.length; j++) {
                        if(result[i].assigned_committee != "Not Assigned")
                            if (result[i].assigned_committee.indexOf(namesCommittee[j]) != -1)
                                committee[j] = true;
                    }
                }

                res.send(committee);
            })
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
        

    },

    adminsAvailable: (req, res) => {
        
        const email = req.query.email;
        
        try {
            db.findMany(User, {role : "Administrator"}, {}, function(result){   
                if(result.length === 1) {
                    db.findOne(User , {email : email} , {} , function(result) {
                        if(result.role !== "Administrator")
                            res.send(false);
                        else
                            res.send(true)
                    });
                } else {
                    res.send(false);
                }
                
            });

        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    },

    addUser : (req, res) => {
        email = req.query.email;
        role = req.query.role;

        user = {
            userID : "",
            name : "Not Signed In Yet",
            email : email,
            role : role,
            assigned_committee: ""
        }

        console.log(user);

        db.insertOne(User, user, function(flag) {
            res.send(flag);
        });
    }
}

module.exports = usersController;