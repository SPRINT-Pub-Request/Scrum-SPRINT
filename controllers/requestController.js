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
                    
                    request_data = [];

                    db.findMany(PubRequest , {} , {} , function(result){
                        for (i of result) {
                            let temp_data = {};

                            temp_data["reqname"] = i.reqname;
                            temp_data["committee"] = i.committee;
                            temp_data["activity_name"] = i.activity_name;
                            temp_data["description"] = i.description;
                            temp_data["start_date"] = i.start_date;
                            temp_data["start_time"] = i.start_time;
                            temp_data["end_date"] = i.end_date;
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
                            
                            request_data.push(temp_data);
                        }

                        const details = {
                            viewFlag : viewFlag,
                            mReqFlag : mReqFlag, 
                            mUserFlag : mUserFlag,
                            request_data : request_data
                        }
                    
                        res.render('manage_requests', details);
                    });
                    
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

    getAssignedPub: (req , res) => {

        db.findMany(User , {} , {} , function(result){
            pubNames = [];

            const committee  = req.query.committee;
            
            arrCommittee = []; 

            for(i of result) {
                
                arrCommittee = i.assigned_committee.split(" ");

                
                for(j = 0; j < arrCommittee.length; j++) {
                    if(arrCommittee[j] === committee) 
                        if(i.role === 'Publicity and Creatives' || i.role === 'Administrator') {
                            pubNames.push(i.name);
                            break;
                        } 
                }

            }

            if(pubNames.length != 0)
                res.send(pubNames);
            else
                res.send(false);

        });

    },

    getAssignedSec: (req , res) => {

        db.findMany(User, {} , {} , function(result) {
            secNames = [];
            const committee = req.query.committee;
            const namesCommittee = ["Activities" , "Finance" , "HRD" , "Externals" , "TND" , "P-EVP" , "SocioCivic" , "Pubs"];
            
            arrCommittee = []; 

                for(i of result) {
                    
                    arrCommittee = i.assigned_committee.split(" ");

                    
                    for(j = 0; j < arrCommittee.length; j++) {
                        if(arrCommittee[j] === committee) 
                            if(i.role === 'Secretariat' || i.role === 'Administrator') {
                                secNames.push(i.name);
                                break;
                            } 
                    }

                }

                if(secNames.length != 0)
                    res.send(secNames);
                else
                    res.send(false);
        });

    },

    savePubChanges: (req , res) => {

        const newChanges = {
            status : req.query.status,
            pubName : req.query.pubName,
            secName : req.query.secName,
            caption : req.query.caption,
            pubLink : req.query.pubLink,
            activity_name : req.query.activity_name
        }
        
        if(newChanges.pubName === null)
            newChanges.pubName = "Not Assigned";
        else if(newChanges.secName === null)
            newChanges.secName = "Not Assigned";

        db.updateOne(PubRequest , {activity_name : newChanges.activity_name} , {
            $set : {
                status: newChanges.status,
                pubName : newChanges.pubName,
                secName : newChanges.secName,
                caption : newChanges.caption,
                pubLink : newChanges.pubLink 
            }
        } , function(result) {
            if(result) {
                res.send(result);
            } else {
                res.send(false);
            }
        });

    },

    checkCommittee: (req , res) => {
        const email = req.query.email;
        const assigned_committee = req.query.assigned_committee.split(" "); 
        
        
        db.findOne(User , {email : email} , {} , function(result) {
            let committeeInProgress = [];
            const userName = result.name;

            db.findMany(PubRequest , {pubName :  userName} , {} , function(result) {

                for(i of result) {
                    if(i.status === "In Progress")
                        committeeInProgress.push(i.committee);
                }

            });

            db.findMany(PubRequest , {secName : userName} , {} , function(result) {

                for(i of result) {
                    if(i.status === "In Progress")
                        committeeInProgress.push(i.committee);
                }

            });

            let uniqueCommittee = []
            for(k = 0; k < committeeInProgress.length; k++) {
                if(uniqueCommittee.indexOf(committeeInProgress[k]) === -1) 
                    uniqueCommittee.push(committeeInProgress[k]);
            }

            console.log(uniqueCommittee); 


            let temp = 0;
            for(i = 0; i < uniqueCommittee.length; i++) {
                for(j = 0; j < assigned_committee.length; j++) {
                    if(uniqueCommittee[i] === assigned_committee[j])
                        temp++;
                }
            }

           console.log(temp);
           if(temp === uniqueCommittee.length)
               res.send(false);
           else 
               res.send(true);


           
        
        });
    }, 

    getPubRequest: (req , res) => {
        const activity_name = req.query.activity_name;

        db.findOne(PubRequest , {activity_name: activity_name} , {} , function(result) {
            console.log(result)
            res.send(result);
        });
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
            pubLink: 'N/A',
            caption: 'N/A',
            status: 'Not Started',
            pubName: 'Not Assigned',
            secName: 'Not Assigned'
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

        
        db.insertOne(PubRequest, pubrequest, function(flag) {
            console.log(flag);
            if (flag) {
                res.redirect('/add_request');
            }
            else {
                res.redirect('/add_request');
            }
        });
    }
}

module.exports = requestController;