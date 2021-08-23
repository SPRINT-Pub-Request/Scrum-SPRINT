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
        
        // Will be used in future US
    }




}

module.exports = mailController;