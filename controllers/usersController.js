const usersController = {
    
    getIndex: (req , res) => {  
        if(req.session.userID) {
            res.render('manage_users');
        } else {
            res.redirect('/');
        }
    }
}

module.exports = usersController;