
const db = require('../models/db.js')

const User = require('../models/UserModel.js');

const loginController = {
    
    getIndex: (req , res) => {  

        try {
            if(req.session.userID) 
                res.redirect('/add_request');
            else 
                res.render('login');
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
        
    },

    googleLogin: (req , res) => {
        
        try {
            const { domain } =  req.user._json;
            
            if(domain === "dlsu.edu.ph") {
                req.session.userID = req.user.id;
                req.session.httpCode = 200;
                req.session.email = req.user.email;
                
                const user = {
                    email : req.user.email,
                };

                db.findOne(User, user, {}, function(result) {
                    if(result != null) {
                        console.log(result);
                        //If user got added by administrator, and first time logging in
                        if (result.name === "Not Signed In Yet"){
                            console.log("1");

                            newUser = {
                                userID : req.user.id,
                                name : req.user.displayName
                            }

                            req.session.role = result.role;
                            req.session.userID = req.user.id;
                            req.session.httpCode = 200;
                            db.updateOne(User, user, newUser, function(result){
                                res.redirect('/add_request');
                            });
                        }
                        
                        //User is already in db and already logged in before
                        else{
                            console.log("2");
                            req.session.role = result.role;
                            req.session.userID = req.user.id;
                            req.session.httpCode = 200;

                            console.log(req.session.role)
                            res.redirect('/add_request');
                        }

                    } else {
                        console.log("3");
                        //New user logging in
                        //change role to test views in sidebar, or change value in mongoDB
                        const userAdd = {
                            userID : req.user.id,
                            name : req.user.displayName,
                            email : req.user.email,
                            committee : "None",
                            role : "Requester",
                            assigned_committee: ""
                        };
                        
                        req.session.role = userAdd.role;

                        db.insertOne(User, userAdd, function(flag) {
                            if(flag) {
                                res.redirect('/add_request');
                            } else {
                                res.redirect('/failed');
                            }
                        });
                    }
                });
            } else {
                req.session.httpCode = 404;
                res.redirect('/failed');
            }
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    } ,

    loginFailed: (req , res) => {

        if(req.session.userID) {
            res.redirect('/add_request');
        } else if(req.session.httpCode === 404) {
            req.session.destroy(err => {
            if(err) {
                res.redirect('/');
            }});
            
            res.clearCookie(sessionName);
            res.render('login_fail');
        } else {
            res.redirect('/');
        }
    },

    logout: (req , res) => {

        req.session.destroy(err => {
        if(err) {
            return res.redirect('/');
        }});

        res.clearCookie(sessionName);
        res.redirect('/');
    },

}

module.exports = loginController;