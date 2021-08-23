const { DBRef } = require('mongodb');

const db = require('../models/db.js')
const User = require('../models/UserModel.js');

const PubRequest = require('../models/PubRequestModel.js');

const requestController = {
    getIndex: (req , res) => {

        if(req.session.userID) {

            const query = {
                userID : req.session.userID
            };

            db.findOne(User, query, {}, function(result) {
                if (result != null) {
                    let viewFlag = false;
                    let mReqFlag = false;
                    let mUserFlag = false;

                    if (result.role === "Publicity and Creatives") {
                        viewFlag = true;
                    } else if (result.role === "Secretariat") {
                        viewFlag = true;
                        mReqFlag = true;
                    } else if (result.role === "Administrator") {
                        viewFlag = true;
                        mReqFlag = true;
                        mUserFlag = true;
                    }

                    const details = {
                        viewFlag : viewFlag,
                        mReqFlag : mReqFlag,
                        mUserFlag : mUserFlag
                    }

                    res.render('add_request', details);
                } else {
                    res.redirect('/');
                }


            });
        } else {
            res.redirect('/');
        }
    },

    getManageReq: (req , res) => {
        if(req.session.userID) {

            const query = {
                userID : req.session.userID
            };

            db.findOne(User, query, {}, function(result) {
                if (result != null) {
                    let viewFlag = false;
                    let mReqFlag = false;
                    let mUserFlag = false;

                    if (result.role === "Publicity and Creatives") {
                        viewFlag = true;
                    } else if (result.role === "Secretariat") {
                        viewFlag = true;
                        mReqFlag = true;
                    } else if (result.role === "Administrator") {
                        viewFlag = true;
                        mReqFlag = true;
                        mUserFlag = true;
                    }

                    const details = {
                        viewFlag : viewFlag,
                        mReqFlag : mReqFlag,
                        mUserFlag : mUserFlag
                    }

                    res.render('manage_requests', details);
                } else {
                    res.redirect('/');
                }

            });

        } else {
            res.redirect('/');
        }
    },

    getViewReq: (req , res) => {
        if(req.session.userID) {

            const query = {
                userID : req.session.userID
            };

            db.findOne(User, query, {}, function(result) {
                if (result != null) {
                    let viewFlag = false;
                    let mReqFlag = false;
                    let mUserFlag = false;

                    if (result.role === "Publicity and Creatives") {
                        viewFlag = true;
                    } else if (result.role === "Secretariat") {
                        viewFlag = true;
                        mReqFlag = true;
                    } else if (result.role === "Administrator") {
                        viewFlag = true;
                        mReqFlag = true;
                        mUserFlag = true;
                    }

                    const details = {
                        viewFlag : viewFlag,
                        mReqFlag : mReqFlag,
                        mUserFlag : mUserFlag
                    }

                    res.render('view_requests', details);
                } else {
                    res.redirect('/');
                }

            });
            
        } else {
            res.redirect('/');
        }
    },

    loadViewReq : (req , res) => {

        console.log("test");
        // Will Connect to Design When Available
        if(req.session.role === "Administrator") {

            // This will show all request 
            db.findMany(PubRequest , {} , {} , function(result){
                console.log(result);
                
                
                // Will be implemented when front-end is available, will be placed so that admin can choose what people assigned to that committee gonna do the work
                
                const query = {
                    committee : result.committee
                }

                db.findMany(PubRequest , {} , {} , function(result){
                    for(let i = 0; i < result.length; i++)
                    {
                        //Test Purposes Only
                        console.log(result[i].committee);
                        
                        db.findMany(User , {committee : result[i].committee} , {} , function(result){
                            console.log(result)
                        });
                    }
                });

                
                

            });
            

        } else {

            // This will view only request assigned to you, Will connect to front-end when the 'view whats assigned to me button is up' 
            const query = {
                userID : req.session.userID
            }

            db.findMany(PubRequest , query , {} , function(result){
                console.log(result);
            });
        }



    },
    postRequest: (req, res) => {

        const reqname = req.body.reqname;
        const committee = req.body.committee;
        const activity_name = req.body.activity_name;
        const description = req.body.description;
        const start_date = req.body.start_date;
        const start_temp_time = req.body.start_time;
        const end_date = req.body.end_date;
        const end_temp_time = req.body.end_time;
        const venue = req.body.venue;
        const theme = req.body.theme;
        const posting_date = req.body.posting_date;
        const posting_temp_time = req.body.posting_time;
        const postevent = req.body.postevent;
        const links = req.body.files_url;
        const details = req.body.details;
        const comments = req.body.comments;
        const specialRequest = req.body.specialRequest;

        const start_time = start_temp_time.toString();
        const end_time = end_temp_time.toString();
        const posting_time = posting_temp_time.toString();

        let pubType = req.body.pubType;
        
        if(pubType == 'other') {
            pubType = req.body.Other;
        }
        
        const pubrequest = {
            reqname, 
            committee,
            activity_name,
            description,
            start_date,
            start_time,
            end_date,
            end_time,
            venue,
            theme,
            pubType,
            posting_date,
            posting_time,
            postevent,
            links,
            details,
            comments,
            specialRequest,
            userID : req.session.userID,
            pubStatus : 'Not Started',
            pubLink: 'N/A',
            caption: 'N/A',
            captionStatus: 'Not Started',
            pubUserID: 'Not Assigned',
            secUserID: 'Not Assigned'
        }
        

        // Test 
        console.log("reqname: " + reqname);
        console.log("committee: " + committee);
        console.log("activty_name: " + activity_name);
        console.log("description: " + description);
        console.log("start_date: " + start_date);
        console.log("start_time " + start_time);
        console.log("end_date: " + end_date);
        console.log("end_time: " + end_time);
        console.log("venue: " + venue);
        console.log("theme: " + theme);
        console.log("posting_date: " + posting_date);
        console.log("posting_time: " + posting_time);
        console.log("details: " + details);
        console.log("comments: " + comments);
        console.log("specialRequest: " + specialRequest);
        console.log("Pub Type: " + pubType);
        console.log("Post Event: " + postevent);
        console.log("User ID: " + details.userID);
        
        db.insertOne(PubRequest, pubrequest, function(flag) {
            console.log(flag);
            if (flag) {
                res.send('Inputs saved in database');
            }
            else {
                res.send('error in database')
            }
        });
    }
}

module.exports = requestController;