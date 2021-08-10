$(document).ready(function(){

    function isFilled(){
        const reqname = validator.trim($('#reqname').val());
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
        const details = req.body.details;
        const comments = req.body.comments;
        const specialRequest = req.body.specialRequest;
    }

});