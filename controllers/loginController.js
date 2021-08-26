
const db = require('../models/db.js')

const User = require('../models/UserModel.js');

const loginController = {
    
    getIndex: (req , res) => {  

        if(req.session.userID) {
            res.redirect('/add_request');
        }
        else {
            res.render('login');
        }
    },

    googleLogin: (req , res) => {
        
        const { domain } =  req.user._json;
        
        if(domain === "dlsu.edu.ph") {
            req.session.userID = req.user.id;
            req.session.httpCode = 200;
            
            const user = {
                userID : req.user.id,
            };

            projection = 'userID';

            db.findOne(User, user, projection, function(result) {
                if(result != null) {

                    db.findOne(User , user , {} , function(result) {
                        req.session.role = result.role;
                        req.session.userID = req.user.id;
                        req.session.httpCode = 200;
                        res.redirect('/add_request');
                    });

                } else {
                    //change role to test views in sidebar, or change value in mongoDB
                    const userAdd = {
                        userID : req.user.id,
                        name : req.user.displayName,
                        email : req.user.email,
                        committee : "None",
                        role : "Administrator",
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