$(document).ready(function(){

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
        const theme = validator.trim($('#theme').val());
        const posting_date = validator.trim($('#posting_date').val());
        const posting_time = validator.trim($('#posting_time').val());
        const links = validator.trim($('#files_url').val());
        const details = validator.trim($('#details').val());
        const comments = validator.trim($('#comments').val());
        const specialRequest = validator.trim($('#specialRequest').val());


        const reqnameEmpty = validator.isEmpty(reqname);
        const committeeEmpty = validator.isEmpty(committee);
        const activity_nameEmpty = validator.isEmpty(activity_name);
        const descriptionEmpty = validator.isEmpty(description);
        const start_dateEmpty = validator.isEmpty(start_date);
        const start_timeEmpty = validator.isEmpty(start_time);
        const end_dateEmpty = validator.isEmpty(end_date);
        const end_timeEmpty = validator.isEmpty(end_time);
        const venueEmpty = validator.isEmpty(venue);
        const themeEmpty = validator.isEmpty(theme);
        const posting_dateEmpty = validator.isEmpty(posting_date);
        const posting_timeEmpty = validator.isEmpty(posting_time);
        const linksEmpty = validator.isEmpty(links);
        const detailsEmpty = validator.isEmpty(details);
        const commentsEmpty = validator.isEmpty(comments);
        const specialRequestEmpty = validator.isEmpty(specialRequest);

        return !reqnameEmpty && !committeeEmpty && !activity_nameEmpty && !descriptionEmpty && !start_dateEmpty && !start_timeEmpty && !end_dateEmpty && !end_timeEmpty && !venueEmpty && !themeEmpty && !posting_dateEmpty && !posting_timeEmpty && !linksEmpty && !detailsEmpty && !commentsEmpty && !specialRequestEmpty;
    }

    function isValidEventDates(field, callback){
        const start_date = validator.trim($('#start_date').val());
        const start_time = validator.trim($('#start_time').val());
        const end_date = validator.trim($('#end_date').val());
        const end_time = validator.trim($('#end_time').val());
        
        const tempError = $('#errorTime')


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
                    tempError.text('Dates are Invalid');
                    return false;
                }
            }
            else{
                tempError.text('Dates are Invalid');
                return false
            }
        }
        else
            return false;
    }

    function isRadiosValid (field, callback){
        let valid1 = false;
        let valid2 = false;
        const postevent = $(".postevent:checked").val();
        const pubType = $(".pubType:checked").val();

        if(pubType){
            if (pubType === "type_other"){

                const other = validator.trim($('#type_other_value').val());
                const otherEmpty = validator.isEmpty(other);
                valid1 = !otherEmpty;
                $('#type_other_value').prop('disabled', false);
            }
            else{
                $('#type_other_value').prop('disabled', true);
                valid1 = true;
            }
        }

        if (postevent){
            valid2 = true;
        }
        return valid1 && valid2
    }

    function validateField (field, fieldName, error){
        const value = validator.trim(field.val());
        const empty = validator.isEmpty(value);

        const tempError = $('#error')
        const radioError = $('#radioerror')
        
        if(empty) {
            field.prop('value', '');
            tempError.text('Some Fields are empty.');
        }
        else
            tempError.text('');
        
        const filled = isFilled();
        const datesValid = isValidEventDates(field);
        const radioValid = isRadiosValid(field);
        
        if(radioValid) {
            radioError.text('')
        }
        else{
            radioError.text('Put input in radios');
        }

        tempError.text(filled + " " + datesValid + " " + radioValid);

        if (filled && datesValid && radioValid) {
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

    $('#theme').keyup(function () {
        validateField($('#theme'), 'Theme', $('#usernameError'));
    });

    $('.pubType').change(function () {
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

    $('#files_url').keyup(function () {
        validateField($('#files_url'), 'Other Files', $('#usernameError'));
    });

    $('#details').keyup(function () {
        validateField($('#details'), 'Details', $('#usernameError'));
    });

    $('#comments').keyup(function () {
        validateField($('#comments'), 'Comments', $('#usernameError'));
    });

    $('#specialRequest').keyup(function () {
        validateField($('#specialRequest'), 'Speecial Request', $('#usernameError'));
    });

    $('#type_other_value').keyup(function () {
        validateField($('#type_other_value'), 'Other', $('#usernameError'));
    });
});