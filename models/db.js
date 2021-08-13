const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

/* local db is temporary - matt
 *
 * process.env.DB_URL
 */
 
const url = 'mongodb://localhost:27017/Sprint-PubRequest-Tracker';

const PubRequest = require('./PubRequestModel.js');
const User = require('./UserModel.js');

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {

    connect: function () {
        mongoose.connect(url, options, (error) => {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, (error, result) => {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, (error, result) => {
            if(error) return callback(false);
            return callback(result);
        });
    },


    findMany: function(model, query, projection, callback) {
        model.find(query, projection, (error, result) => {
            if(error) return callback(false);
            return callback(result);
        });
    },

    updateOne: function(model, filter, update) {
        model.updateOne(filter, update, (error, result) => {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update) {
        model.updateMany(filter, update, (error, result) => {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions) {
        model.deleteOne(conditions,  (error, result) => {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions) {
        model.deleteMany(conditions, (error, result) => {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}

module.exports = database;
