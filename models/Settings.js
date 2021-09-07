var mongoose = require('mongoose');


var SettingsSchema = new mongoose.Schema({

    id_given: {
        type : Number ,
        required:true
    }

});

module.exports = mongoose.model('Settings', SettingsSchema, 'settings')