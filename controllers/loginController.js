// TODO: Will Add Session 
const loginController = {

    getIndex: function (req , res) { 
        res.render('login');
    },

    googleLogin: function (req , res) {
        var userID = req.session;

        account = {
            hd: req.user._json.hd,
            domain: req.user._json.domain
        }

        if (account.hd === "dlsu.edu.ph" && account.domain === "dlsu.edu.ph") {
            req.session.userID = req.user.id;
            console.log(req.session)
            return res.redirect('/add_request');
        }
        else
            res.redirect('/failed')
    } ,

    loginFailed: function(req , res) {
        res.render('login_fail')
    },

    logout: function(req , res) {

        req.session.destroy(err => {
        if(err) {
            return res.redirect('/')
        }});

        res.clearCookie(sessionName)
        res.redirect('/');
    },

    redirectHome : function(req , res , next) {
        console.log(req.session);
        if(req.session.userID) {
            res.redirect('/add_request');
        }
        else {
            next();
        }
    },

    redirectLogin : function(req , res , next) {
        if(!req.session.userID){
            res.redirect('/')
        }
        else{
            next();
        }
    }

}

module.exports = loginController;