var mongoose = require('mongoose');


var SettingsSchema = new mongoose.Schema({

    id_given: {
        type : String ,
        required:true
    }

});

module.exports = mongoose.model('Settings', SettingsSchema, 'settings')