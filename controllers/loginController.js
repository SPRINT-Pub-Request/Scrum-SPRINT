// TODO: Will Add Session 
const loginController = {
    
    getIndex: (req , res) => {  
        if(req.session.userID)
            res.redirect('/add_request');
        else
            res.render('login');
    },

    googleLogin: (req , res , err) => {

        const { domain } =  req.user._json.domain;

        try{
            if (account.domain === "dlsu.edu.ph") {
                req.session.userID = req.user.id;
                return res.redirect('/add_request');
            }
            else
                res.redirect('/failed')
        }
        catch(err){
            return res.redirect('/');
        }
        
    } ,

    loginFailed: (req , res) => {
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