// TODO: Will Add Session 
const loginController = {
    
    getIndex: (req , res) => {  
        if(req.session.userID)
            res.redirect('/add_request');
        else
            res.render('login');
    },

    googleLogin: (req , res) => {

        const domain =  req.user._json.domain;

        if(domain === "dlsu.edu.ph") {
            req.session.userID = req.user.id;
            return res.redirect('/add_request');
        }
        else
            res.redirect('/failed')

    } ,

    loginFailed: (req , res) => {
        if(req.session.userID)
            res.redirect('/add_request');
        else
            res.render('login_fail')
    },

    logout: (req , res) => {

        req.session.destroy(err => {
        if(err) {
            return res.redirect('/')
        }});

        res.clearCookie(sessionName)
        res.redirect('/');
    },

}

module.exports = loginController;