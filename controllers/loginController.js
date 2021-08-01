const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const dotenv = require('dotenv');
dotenv.config();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

const loginController = {

    googleLogin: function (req , res) {

        account = {
            hd: req.user._json.hd,
            domain: req.user._json.domain
        }

        if (account.hd === "dlsu.edu.ph" && account.domain === "dlsu.edu.ph") {
            return res.redirect('/main');
        }

        res.redirect('/failed')
    }
}