var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    userID:{
        type : String,
        required : true
    },

    name: {
        type : String,
        required: true
    },
    
    email: {
        type : String,
        required: true
    },

    role: {
        type : String,
        required: true
    },
});

module.exports = mongoose.model('User', UserSchema, 'user')