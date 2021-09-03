var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

    userID:{
        type : String,
        required : false
    },

    name: {
        type : String,
        required: false
    },
    
    email: {
        type : String,
        required: true
    },

    role: {
        type : String,
        required: true
    },

    assigned_committee: {
        type : String,
        required: false
    },
});

module.exports = mongoose.model('User', UserSchema, 'user')