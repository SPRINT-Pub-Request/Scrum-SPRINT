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
            return res.redirect('/add_request');
        } 

        req.session.httpCode = 404;
        res.redirect('/failed')
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