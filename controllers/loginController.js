// TODO: Will Add Session 

const loginController = {

    getIndex: function (req , res) { 
        res.render('login');
    },

    googleLogin: function (req , res) {

        account = {
            hd: req.user._json.hd,
            domain: req.user._json.domain
        }

        if (account.hd === "dlsu.edu.ph" && account.domain === "dlsu.edu.ph") {
            return res.redirect('/add_request');
        }
        else
            res.redirect('/failed')
    } ,

    loginFailed: function(req , res) {
        res.render('login_fail')
    },

    logout: function(req , res) {
        res.redirect('/');
    },

}

module.exports = loginController;