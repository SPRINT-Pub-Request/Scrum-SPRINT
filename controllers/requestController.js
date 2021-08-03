const requestController = {
    getIndex: function(req , res) {
        res.render('add_request')
    },

    postRequest: function (req, res){


        const reqname = req.body.reqname;
        const committee = req.body.committee;
        const activity_name = req.body.activity_name;
        const description = req.body.description;
        const start_date = req.body.start_date;
        const start_time = req.body.start_time;
        const end_date = req.body.end_date;
        const end_time = req.body.end_time;
        const venue = req.body.venue;
        const theme = req.body.theme;
        const posting_date = req.body.posting_date;
        const posting_time = req.body.posting_time;
        const details = req.body.details;
        const comments = req.body.comments;
        const specialRequest = req.body.specialRequest;

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
        
        res.send('Inputs ok!');
    }
}

module.exports = requestController;