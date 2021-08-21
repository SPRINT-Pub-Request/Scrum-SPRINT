$(document).ready(function () {
    
    $.get('/getEmail' , {} , function(result) {
        $('#email').text(result);
    });
    
});