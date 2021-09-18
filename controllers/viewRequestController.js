const { DBRef } = require('mongodb');
const db = require('../models/db.js')
const User = require('../models/UserModel.js');

const PubRequest = require('../models/PubRequestModel.js');

const viewRequestController = {
    getIndex: (req , res) => {
        console.log('VIEW REQUESTS!')
        if(req.session.userID) {

            const query = {
                userID : req.session.userID
            };

            db.findOne(User, query, {}, function(result) {

                let user_name = result.name;

                if (result != null) {
                    let viewFlag = false;
                    let mReqFlag = false;
                    let mUserFlag = false;

                    let filter = {};

                    if (result.role === "Publicity and Creatives") {
                        viewFlag = true;
                        filter["pubName"] = result.name;
                    } 
                    
                    else if (result.role === "Secretariat") {
                        viewFlag = true;
                        mReqFlag = true;
                        filter["secName"] = result.name;
                    } 
                    
                    else if (result.role === "Administrator") {
                        viewFlag = true;
                        mReqFlag = true;
                        mUserFlag = true;
                    }



                    request_data = [];

                    const temp_ac = result.assigned_committee.split(" ");
                    console.log('=================');
                    console.log(temp_ac);
                    console.log('=================');

                    db.findMany(PubRequest , filter , {} , function(result){
                        for (i of result) {
                                if(temp_ac.includes(i.committee)){
                                let temp_data = {};

                                temp_data["submitted_date"] = i.submitted_date;

                                temp_data["request_id"] = i.request_id;

                                temp_data["reqname"] = i.reqname;
                                temp_data["committee"] = i.committee;
                                temp_data["activity_name"] = i.activity_name;
                                temp_data["description"] = i.description;
                                temp_data["start_date"] = i.start_date.toISOString().replace(/T/, ' ').replace(/\..+/, '').replace('00:00:00' , ' ');;
                                temp_data["start_time"] = i.start_time;
                                temp_data["end_date"] = i.end_date.toISOString().replace(/T/, ' ').replace(/\..+/, '').replace('00:00:00' , ' ');;
                                temp_data["end_time"] = i.end_time;
                                temp_data["venue"] = i.venue;
                                temp_data["theme"] = i.theme;
                                temp_data["pubType"] = i.pubType;
                                temp_data["posting_date"] = i.posting_date.toISOString().replace(/T/, ' ').replace(/\..+/, '').replace('00:00:00' , ' ');
                                temp_data["posting_time"] = i.posting_time;
                                temp_data["postevent"] = i.postevent;
                                temp_data["links"] = i.links;
                                temp_data["details"] = i.details;
                                temp_data["comments"] = i.comments;
                                temp_data["specialRequest"] = i.specialRequest;
                                temp_data["pubLink"] = i.pubLink;
                                temp_data["pubName"] = i.pubName;
                                temp_data["secName"] = i.secName;
                                temp_data["caption"] = i.caption;
                                temp_data["status"] = i.status;

                                temp_data["secreFlag"] = false;
                                temp_data["pubsFlag"] = false;

                                if (temp_data['comments'] === ''){
                                    temp_data['commnets'] = 'None';
                                }

                                if (temp_data['specialRequest'] === ''){
                                    temp_data['specialRequest'] = 'None';
                                }
                                
                                temp_data['nsFlag'] = false;
                                temp_data['ipFlag'] = false;
                                temp_data['fFlag'] = false;

                                if( temp_data['status'] === "Not Started"){
                                    temp_data['nsFlag'] = true;
                                }
                                else if( temp_data['status'] === "In Progress"){
                                    temp_data['ipFlag'] = true;
                                }
                                else if( temp_data['status'] === "Finished"){
                                    temp_data['fFlag'] = true;
                                }

                                if(req.session.role === "Secretariat"){
                                    temp_data["secreFlag"] = true;
                                    request_data.push(temp_data);
                                }
                                else if (req.session.role === "Publicity and Creatives"){
                                    temp_data["pubsFlag"] = true;
                                    request_data.push(temp_data);
                                }
                                else if (req.session.role === "Administrator"){
                                    let addFlag = false;
                                    if(temp_data["pubName"] === user_name){
                                        temp_data["pubsFlag"] = true;
                                        addFlag = true;
                                    }

                                    if(temp_data["secName"] === user_name){
                                        temp_data["secreFlag"] = true;
                                        addFlag = true;
                                    }

                                    if(addFlag){
                                        request_data.push(temp_data);
                                    }
                                }
                            }
                        }

                        const details = {
                            viewFlag : viewFlag,
                            mReqFlag : mReqFlag, 
                            mUserFlag : mUserFlag,
                            request_data : request_data
                        }
                        console.log(request_data);
                        res.render('view_requests', details);
                    });
                } else {
                    res.redirect('/');
                }


            });
        } else {
            res.redirect('/');
        }
    },

    updateStatus: (req , res) => {
        changes = {
            status : req.query.status
        }
        db.updateOne(PubRequest, {request_id: req.query.request_id}, changes, function(result){
            res.send(result);
        });
    },

    updatePubLink: (req , res) => {
        changes = {
            pubLink : req.query.pubLink
        }
        db.updateOne(PubRequest, {request_id: req.query.request_id}, changes, function(result){
            res.send(result);
        });
    },

    updateCaption: (req , res) => {
        changes = {
            caption : req.query.caption
        }
        db.updateOne(PubRequest, {request_id: req.query.request_id}, changes, function(result){
            res.send(result);
        });
    }
}

module.exports = viewRequestController;