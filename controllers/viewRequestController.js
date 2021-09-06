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

                    const temp_ac = result.assigned_committee.split(" ");
                    console.log('=================');
                    console.log(temp_ac);
                    console.log('=================');

                    db.findMany(PubRequest , {} , {} , function(result){
                        for (i of result) {
                                if(temp_ac.includes(i.committee)){
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
    }
}

module.exports = viewRequestController;