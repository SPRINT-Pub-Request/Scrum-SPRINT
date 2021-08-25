$(document).ready(function () {
    
    $.get('/getName' , {} , function(result) {
        $('#name').text(result);
    });

    currLoc = $(location).attr('pathname');

    if(currLoc == "/add_request") {
        $('#add_request').addClass('nav-active')
        $('#add_request#view_request').removeClass('nav-active');
        $('#manage_users').removeClass('nav-active');
        $('#manage_request').removeClass('nav-active');
    } else if(currLoc == "/view_request") {
        $('#view_request').addClass('nav-active')
        $('#add_request').removeClass('nav-active');
        $('#manage_users').removeClass('nav-active');
        $('#manage_request').removeClass('nav-active');
    } else if(currLoc == "/manage_users") {
        $('#manage_users').addClass('nav-active')
        $('#view_request').removeClass('nav-active');
        $('#add_request').removeClass('nav-active');
        $('#manage_request').removeClass('nav-active');
    } else if(currLoc == "/manage_requests") {
        $('#manage_requests').addClass('nav-active')
        $('#view_request').removeClass('nav-active');
        $('#manage_users').removeClass('nav-active');
        $('#add_request').removeClass('nav-active');
    }

});