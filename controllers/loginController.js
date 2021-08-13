
const db = require('../models/db.js')

const User = require('../models/UserModel.js');

const loginController = {
    
    getIndex: (req , res) => {  

        if(req.session.userID) {
            res.redirect('/add_request');
        }

        res.render('login');
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

            db.findOne(User, user, projection, (result) => {
                if(result != null) {
                    return res.redirect('/add_request');
                }
                else {
                    //change role to test views in sidebar, or change value in mongoDB
                    const userAdd = {
                        userID : req.user.id,
                        name : req.user.displayName,
                        email : req.user.email,
                        role : "Publicity and Creatives"
                    };
        
                    db.insertOne(User, userAdd, (flag) => {
                        if(flag) {
                            res.redirect('/add_request');
                        }
                        else {
                            return res.redirect('/failed');
                        }
                    });
                }
            });
        }
        else{
            req.session.httpCode = 404;
            return res.redirect('/failed');
        }
    } ,

    loginFailed: (req , res) => {

        if(req.session.userID) {
            res.redirect('/add_request');
        } else if(req.session.httpCode === 404) {
            req.session.destroy(err => {
            if(err) {
                return res.redirect('/');
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