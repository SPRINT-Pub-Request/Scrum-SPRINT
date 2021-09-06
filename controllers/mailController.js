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

    sendNotif: (req , res) => {

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

    },

    sendNewAssign: (req , res) => {
        
        const request_id = req.query.request_id;

        db.findOne(PubRequest , {request_id : request_id} , {} , function(result) {
            if(result.pubName != "Not Assigned") {
                db.findOne(User , {name : result.pubName} , {} , function(user) {

                    const options = {
                        from : process.env.MAIL_AUTHEMAIL,
                        to : user.email,
                        subject : "Request Changes",
                        text : "Good day " + user.name + "!\nThis is to notify you that you might have been assigned to a request or there are changes to the request \n\nActivity Name: " + result.activity_name + "\nStatus : "  + result.status +  "\nAssigned Pubs: " + result.pubName + "\nAssigned Secretariat: " + result.secName + "\nCaption: " + result.caption + "\npubLink : " + result.pubLink 
                    }

                    transporter.sendMail(options, (err , info) => {
                        if(err) {
                            console.log(err);
                            res.send('Fail to Notify User! Please Refresh and Try again');
                        }
                        
                        console.log("Server has sent mail, Info: " + info.response);
                        res.send('Successfully Assigned and Notified User!');
                    });
                });
            } 
            else if(result.secName != "Not Assigned") {
                db.findOne(User , {name : result.secName} , {} , function(user) {

                    const options = {
                        from : process.env.MAIL_AUTHEMAIL,
                        to : user.email,
                        subject : "Request Changes",
                        text : "Good day " + user.name + "!\nThis is to notify you that you might have been assigned to a request or there are changes to the request \n\nActivity Name: " + result.activity_name + "\nStatus : "  + result.status +  "\nAssigned Pubs: " + result.pubName + "\nAssigned Secretariat: " + result.secName + "\nCaption: " + result.caption + "\npubLink : " + result.pubLink 
                    }

                    transporter.sendMail(options, (err , info) => {
                        if(err) {
                            console.log(err);
                            res.send('Fail to Notify User! Please Refresh and Try again');
                        }
                        
                        console.log("Server has sent mail, Info: " + info.response);
                        res.send('Successfully Assigned and Notified User!');
                    });
                });
            }


        });
    }




}

module.exports = mailController;