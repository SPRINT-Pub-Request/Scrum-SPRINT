$(document).ready(function(){
    
    $(function(){
        var dtToday = new Date();
    
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
    
        if(month < 10)
            month = '0' + month.toString();
        if(day < 10)
            day = '0' + day.toString();
    
        var maxDate = year + '-' + month + '-' + day;    
        $('#start_date').attr('min', maxDate);
        $('#end_date').attr('min', maxDate);
        $('#posting_date').attr('min', maxDate);
    });

    $('#submit').on('click' , function(){
        
        if($('#postevent_no').prop('checked')) 
            post_event = "no";
        else 
            post_event = "yes";

        const pubRequest = {
            reqname : $('#reqname').val(),
            committee : $('#committee').val(),
            activity_name : $('#activity_name').val(),
            description : $('#description').val(),
            start_date : $('#start_date').val(),
            start_time : $('#start_time').val().toString(),
            end_date : $('#end_date').val(),
            end_time : $('#end_time').val().toString(),
            venue : $('#venue').val(),
            theme : $('#theme').val(),
            pubType : $('.pubType:checked').val(),
            posting_date : $('#posting_date').val(),
            posting_time : $('#posting_time').val().toString(),
            postevent : post_event,
            links : $('#files_url').val(),
            details : $('#details').val(),
            comments : $('#comments').val(),
            specialRequest : $('#specialRequest').val(),
            other : $('#type_other_value').val()
        }
        
        $.post('/add_request' , pubRequest , function(result) {
            if(result) {
                alert("Successfully Added Request!");
                location.reload();
            }
            else {
                alert("Request Failed! Try again!");
                location.reload();
            }
        });
    });

    function isFilled(){

        const reqname = validator.trim($('#reqname').val());
        const committee = validator.trim($('#committee').val());
        const activity_name = validator.trim($('#activity_name').val());
        const description = validator.trim($('#description').val());
        const start_date = validator.trim($('#start_date').val());
        const start_time = validator.trim($('#start_time').val());
        const end_date = validator.trim($('#end_date').val());
        const end_time = validator.trim($('#end_time').val());
        const venue = validator.trim($('#venue').val());
        const posting_date = validator.trim($('#posting_date').val());
        const posting_time = validator.trim($('#posting_time').val());
        const pubType_other = validator.trim($('#type_other_value').val());


        const reqnameEmpty = validator.isEmpty(reqname);
        const committeeEmpty = validator.isEmpty(committee);
        const activity_nameEmpty = validator.isEmpty(activity_name);
        const descriptionEmpty = validator.isEmpty(description);
        const start_dateEmpty = validator.isEmpty(start_date);
        const start_timeEmpty = validator.isEmpty(start_time);
        const end_dateEmpty = validator.isEmpty(end_date);
        const end_timeEmpty = validator.isEmpty(end_time);
        const venueEmpty = validator.isEmpty(venue);
        const posting_dateEmpty = validator.isEmpty(posting_date);
        const posting_timeEmpty = validator.isEmpty(posting_time);

        var pubType_otherEmpty;
        if($('#type_other_value').prop('disabled'))
            pubType_otherEmpty = false;
        else {
            pubType_otherEmpty = validator.isEmpty(pubType_other);
        }
        
        return !reqnameEmpty && !committeeEmpty && !activity_nameEmpty && !descriptionEmpty && !start_dateEmpty && !start_timeEmpty && !end_dateEmpty && !end_timeEmpty && !venueEmpty && !posting_dateEmpty && !posting_timeEmpty && !pubType_otherEmpty;
    }

    function isValidEventDates(field, callback){
        const start_date = validator.trim($('#start_date').val());
        const start_time = validator.trim($('#start_time').val());
        const end_date = validator.trim($('#end_date').val());
        const end_time = validator.trim($('#end_time').val());
        
        const tempError = $('#date_error')


        if(start_date && end_date){
            if(start_date < end_date){
                tempError.text('');
                return true;
            }
            else if (start_date == end_date){
                
                if(start_time < end_time){
                    tempError.text('');
                    return true;
                }
                else{
                    tempError.text('Dates are invalid');
                    return false;
                }
            }
            else{
                tempError.text('Dates are invalid');
                return false
            }
        }
        else
            return false;
    }


    function validateField (field, fieldName, error){
        const value = validator.trim(field.val());
        const empty = validator.isEmpty(value);

        const tempError = $('#error')
        
        if(empty) {
            field.prop('value', '');
            $(field).addClass('error');
        }
        else
            $(field).removeClass('error');
        
        const filled = isFilled();
        const datesValid = isValidEventDates(field);
    
        //tempError.text(filled + " " + datesValid);

        if (filled && datesValid) {
            $('#submit').prop('disabled', false);
        } else {
            $('#submit').prop('disabled', true);
        }
    }

    $('#reqname').keyup(function () {
        validateField($('#reqname'), 'Name', $('#reqnameError'));
    });
    
    $('#committee').change(function () {
        validateField($('#committee'), 'Committee', $('#usernameError'));
    });
    
    $('#activity_name').keyup(function () {
        validateField($('#activity_name'), 'Activity Name', $('#usernameError'));
    });

    $('#description').keyup(function () {
        validateField($('#description'), 'Description', $('#usernameError'));
    });
    
    $('#start_date').change(function () {
        validateField($('#start_date'), 'Start Date', $('#usernameError'));
    });

    $('#start_time').change(function () {
        validateField($('#start_time'), 'Start Time', $('#usernameError'));
    });

    $('#end_date').change(function () {
        validateField($('#end_date'), 'End Date', $('#usernameError'));
    });

    $('#end_time').change(function () {
        validateField($('#end_time'), 'End Time', $('#usernameError'));
    });

    $('#venue').keyup(function () {
        validateField($('#venue'), 'Venue', $('#usernameError'));
    });

    $('.pubType').change(function () {
        var selected = $('.pubType:checked').val();
        
        if(selected == 'video'){
            $("#type-message").css('visibility', 'visible');
            $("#type_other_value").css('visibility', 'hidden');
            $("#type_other_value").prop('disabled', true);
        }
        else if(selected == 'other'){
            $("#type-message").css('visibility', 'hidden');
            $("#type_other_value").css('visibility', 'visible');
            $("#type_other_value").prop('disabled', false);
        }
        else {
            $("#type-message").css('visibility', 'hidden');
            $("#type_other_value").css('visibility', 'hidden');
            $("#type_other_value").prop('disabled', true);
        }

        validateField($('.pubType'), 'Pub Type', $('#usernameError'));
    });

    $('#posting_date').change(function () {
        validateField($('#posting_date'), 'Posting Date', $('#usernameError'));
    });

    $('#posting_time').change(function () {
        validateField($('#posting_time'), 'Posting Time', $('#usernameError'));
    });

    $('.postevent').change(function () {
        validateField($('.postevent'), 'Post Event', $('#usernameError'));
    });

    $('#type_other_value').keyup(function () {
        validateField($('#type_other_value'), 'Other', $('#usernameError'));
    });
});