const mongodb = require('mongodb');
const db = require('../models/db.js')
const User = require('../models/UserModel.js');
const Settings = require('../models/Settings.js');
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

                    /*db.insertOne(Settings, {id_given : '1'}, function(flag) {
                        res.render('add_request', details);
                    });*/

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
                            temp_data["request_id"] = i.request_id;
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
                            temp_data["submitted_date"] = i.submitted_date;
                            
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
    
        try {
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
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    },

    getAssignedSec: (req , res) => {

        try {
            
            db.findMany(User, {} , {} , function(result) {
                secNames = [];

                const committee = req.query.committee;

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
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    },

    savePubChanges: (req , res) => {

        try {
            
            const newChanges = {
                status : req.query.status,
                caption : req.query.caption,
                pubLink : req.query.pubLink,
                request_id: req.query.request_id.toString()
            }

            db.updateOne(PubRequest , {request_id : newChanges.request_id} , {
                $set : {
                    status: newChanges.status,
                    caption : newChanges.caption,
                    pubLink : newChanges.pubLink 
                }
            } , function(result) {
                if(result) {
                    res.send(true);
                } else {
                    res.send(false);
                }
            });

        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    },

    checkRole: (req , res) => {
        const email = req.query.email;
        
        try {
            db.findOne(User , {email : email} , {} , function(result) {
                const userName = result.name;
                let inProgress = false;

                db.findMany(PubRequest , {pubName : userName} , {} , function(result) {
                    if(result) 
                        for(i of result)
                            if(i.status === "In Progress")
                                inProgress = true;
                    
                        db.findMany(PubRequest, {secName : userName} , {} , function(result) {
                            if(result) 
                                for(i of result)
                                    if(i.status === "In Progress")
                                        inProgress = true;

                            res.send(inProgress);
                        });
                });

            });
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    },

    checkCommittee: (req , res) => {
        const email = req.query.email;
        const assigned_committee = req.query.assigned_committee.split(" "); 
        
        try {
            db.findOne(User , {email : email} , {} , function(result) {
                let committeeInProgress = [];
                const userName = result.name;

                db.findMany(PubRequest , {pubName :  userName} , {} , function(result) {

                    for(i of result) {
                        if(i.status === "In Progress")
                            committeeInProgress.push(i.committee);
                    }

                    db.findMany(PubRequest , {secName : userName} , {} , function(result) {
                        for(i of result) {
                            if(i.status === "In Progress")
                                committeeInProgress.push(i.committee);
                        }
                        
                        let uniqueCommittee = []
                        for(k = 0; k < committeeInProgress.length; k++) {
                            if(uniqueCommittee.indexOf(committeeInProgress[k]) === -1) 
                                uniqueCommittee.push(committeeInProgress[k]);
                        }

                        let temp = 0;
                        for(i = 0; i < uniqueCommittee.length; i++) {
                            for(j = 0; j < assigned_committee.length; j++) {
                                if(uniqueCommittee[i] === assigned_committee[j])
                                    temp++;
                            }
                        }

                        if(temp === uniqueCommittee.length)
                            res.send(false);
                        else 
                            res.send(true);

                    });
                });
            });
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    }, 

    getPubRequest: (req , res) => {
        const request_id = req.query.request_id;

        db.findOne(PubRequest , {request_id : request_id} , {} , function(result) {
            console.log(result)
            res.send(result);
        });
    },

    deleteRequest: (req , res) => {

        try {
            const request_id = req.query.request_id;

            db.deleteOne(PubRequest , {request_id : request_id}  , function(result) {
                if(result) {
                    res.send(request_id);
                } else {
                    res.send(result);
                }
            });
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }

    },

    addRequest: (req, res) => {

        try {
            db.findOne(Settings , {} , {} , function(result) {
                const reqname = req.query.reqname;
                const committee = req.query.committee;
                const activity_name = req.query.activity_name;
                const description = req.query.description;
                const start_date = req.query.start_date;
                const start_time = req.query.start_time;
                const end_date = req.query.end_date;
                const end_time = req.query.end_time;
                const venue = req.query.venue;
                const theme = req.query.theme;
                const posting_date = req.query.posting_date;
                const posting_time = req.query.posting_time;
                const postevent = req.query.postevent;
                const links = req.query.links;
                const details = req.query.details;
                const comments = req.query.comments;
                const specialRequest = req.query.specialRequest;
                const request_id = (parseInt(result.id_given) + 1).toString();
                
                db.updateOne(Settings , {} , {
                    $set : {
                        id_given : request_id
                    }
                } , function(result) {});
                
                let pubType = req.query.pubType;
                
                if(pubType == 'other') {
                    pubType = req.query.other;
                }

                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = today.getFullYear();
                

                db.findMany(User , {} , {} , function(result) {
                    
                    let peopleInPubCommittee = "";
                    let peopleInSecCommittee = "";

                    for(i = 0; i < result.length; i++) {

                        let personAssigned = [];
                        personAssigned = result[i].assigned_committee.split(' ');

                        for(j = 0; j < personAssigned.length; j++) {
                            if(personAssigned[j] === committee && result[i].role === "Administrator" && result[i].name !== "Not Signed In Yet"){
                                if(peopleInPubCommittee === "" && peopleInSecCommittee === "") {
                                    peopleInPubCommittee += result[i].name;
                                    peopleInSecCommittee += result[i].name;
                                } else if(peopleInPubCommittee === "" && peopleInSecCommittee !== "") {
                                    peopleInPubCommittee += result[i].name;
                                    peopleInSecCommittee += ("," + result[i].name);
                                } else if(peopleInPubCommittee !== "" && peopleInSecCommittee === "") {
                                    peopleInPubCommittee += ("," + result[i].name);
                                    peopleInSecCommittee += result[i].name;
                                } else {
                                    peopleInPubCommittee += ("," + result[i].name);
                                    peopleInSecCommittee += ("," + result[i].name);
                                }

                                break;
                            }
                            else if(personAssigned[j] === committee && result[i].role === "Publicity and Creatives" && result[i].name !== "Not Signed In Yet"){
                                if(peopleInPubCommittee === "") {
                                    peopleInPubCommittee += result[i].name;
                                } else 
                                    peopleInPubCommittee += ("," + result[i].name);

                                break;
                            } else if(personAssigned[j] === committee && result[i].role === "Secretariat" && result[i].name !== "Not Signed In Yet"){
                                if(peopleInSecCommittee === "") {
                                    peopleInSecCommittee += result[i].name;
                                } else 
                                    peopleInSecCommitee += ("," + result[i].name);

                                break;
                            }
                        }
                    }
                    
                    console.log("Pubs Assigned : " + peopleInPubCommittee);
                    console.log("Sec Assigned : " + peopleInSecCommittee);

                    const pubrequest = {
                        request_id,
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
                        links : links,
                        details,
                        comments,
                        specialRequest,
                        pubLink: 'N/A',
                        caption: 'N/A',
                        status: 'Not Started',
                        pubName: peopleInPubCommittee,
                        secName: peopleInSecCommittee,
                        submitted_date : yyyy + "-" + mm + "-" + dd,
                    }

                    console.log("submitted date: "+ pubrequest.submitted_date);
                    console.log("request_id: " + request_id);
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
                    console.log("Links : " + links);
                
                    db.insertOne(PubRequest, pubrequest, function(flag) {
                        console.log(flag);
                        res.send(flag);
                    });

                });


                
            });
                
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }

    }   
}

module.exports = requestController;