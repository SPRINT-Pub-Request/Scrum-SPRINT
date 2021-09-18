const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const db = require('../models/db.js')
const User = require('../models/UserModel.js');
const PubRequest = require('../models/PubRequestModel.js');

const transporter = nodemailer.createTransport( {
    service: "hotmail",
    auth: {
        user : process.env.MAIL_AUTHEMAIL,
        pass : process.env.MAIL_AUTHPASS
    }
});

const mailController = {

    sendDeletedNotif: (req , res) => {
        try {

            const query = {
                email : req.query.email
            }
            
            const options = {
                    from : process.env.MAIL_AUTHEMAIL,
                    to : query.email,
                    subject : "Account Changes",
                    text : "Good day!" + " \nThis is to notify you that your account has been deleted"
            }

            transporter.sendMail(options, (err , info) => {
                if(err) {
                    console.log(err);
                    res.send(false);
                } 
                
                console.log("Server has sent mail, Info: " + info.response);
                res.send(true);
            });

        } catch(err) {
            console.log(err);
            res.redirect(false);
        }


    },

    sendNotif: (req , res) => {

        try {
            const query = {
                email : req.query.email
            }

            db.findOne(User , query , {} , function(result) {
                
                console.log(result);
                const options = {
                    from : process.env.MAIL_AUTHEMAIL,
                    to : result.email,
                    subject : "Account Changes",
                    text : "Good day " + result.name + "!\nThis is to notify you that there are changes to your account \n\nRole : "  + result.role + "\nAssigned Committee : " + result.assigned_committee
                }

                transporter.sendMail(options, (err , info) => {
                    if(err) {
                        console.log(err);
                        res.send('Fail to Notify User! Please Refresh and Try again');
                    }
                    
                    console.log("Server has sent mail, Info: " + info.response);
                    res.send('Successfully Updated and Notified User!');
                });
            });
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    },

    sendNewAssign: (req , res) => {
        
        try {

            const committee = req.query.committee;
            let users = [];

            db.findMany(User , {} , {} , function(flag) {
                if(flag) {
                    for(j = 0; j < flag.length; j++) {

                        if(flag[j].assigned_committee !== "") {
                            const userCommittee = flag[j].assigned_committee.split(" ");

                            for(i = 0; i < userCommittee.length; i++) {
                                if(userCommittee[i] === committee) {
                                    users.push(flag[j].email);
                                    break;
                                }
                            }
                        }

                    }

                    const options = {
                        from : process.env.MAIL_AUTHEMAIL,
                        to : users,
                        subject : "Request Added to your Assigned Committee",
                        text : "Good day" +  "!\nThis is to notify you there is a new request in your assigned committee \n\n"
                    }

                    transporter.sendMail(options, (err , info) => {
                        if(err) {
                            console.log(err);
                            res.send(false);
                        } else {
                            console.log("Server has sent all mail, Info: " + info.response);
                            res.send(true);
                        }
                                        
                    });

                } else {
                    res.send(false);
                }
            });

            
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    }




}

module.exports = mailController;