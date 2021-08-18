var mongoose = require('mongoose');

var PubRequestSchema = new mongoose.Schema({
    reqname: {
        type : String,
        required: true
    },
    
    committee: {
        type : String,
        required: true
    },

    activity_name: {
        type : String,
        required: true
    },

    description: {
        type : String,
        required: true
    },
    
    start_date: {
        type : Date,
        required: true
    },
    

    start_time: {
        type : String,
        required: true
    },

    end_date: {
        type : Date,
        required: true
    },
    
    end_time: {
        type : String,
        required: true
    },

    venue: {
        type : String,
        required: true
    },

    theme: {
        type : String,
        required: false
    },

    pubType: {
        type : String,
        required: true
    },
    
    posting_date: {
        type : Date,
        required: true
    },
    
    posting_time: {
        type : String,
        required: true
    },

    postevent : {
        type : String,
        required: true
    },

    links : {
        type : String,
        required: false
    },

    details: {
        type : String,
        required: false
    },

    comments: {
        type : String,
        required: false
    },

    specialRequest: {
        type : String,
        required: false
    },

    status: {
        type : String,
        required: true
    },

    userID: {
        type : String,
        required: true
    },
});

module.exports = mongoose.model('PubRequest', PubRequestSchema, 'pubrequest')