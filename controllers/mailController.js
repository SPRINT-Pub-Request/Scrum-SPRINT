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
            email : req.session.mailReceiver
        }

        db.findOne(User , query , {} , function(result) {
            
            const options = {
                from : process.env.MAIL_AUTHEMAIL,
                to : result.email,
                subject : "Account Changes",
                text : "Good day " + result.name + "!\nThis is to notify you that there are changes to your account \n\nRole : "  + result.role + "\nCommittee : " + result.committee
            }

            transporter.sendMail(options, (err , info) => {
                if(err) {
                    console.log(err);
                    res.redirect('/logout');
                }
                
                console.log("Server has sent mail, Info: " + info.response);
                res.redirect('/manage_users');
            });
        });

    },

    sendNewAssign: (req , res) => {
        
        // Will be used in future US
    }




}

module.exports = mailController;