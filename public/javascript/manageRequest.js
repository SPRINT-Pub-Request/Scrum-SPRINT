$(document).ready(function() {
    let Modal = document.getElementById('requestdetailsModal');
    
    Modal.addEventListener('show.bs.modal' , function(event){
        $('.selectedPub').remove();
        $('.selectedSec').remove();
    });

    Modal.addEventListener('hide.bs.modal' , function(event) {
        $('#status').prop('disabled', true);
        $('#medialink').prop('disabled', true);
        $('#caption').prop('disabled' , true);
        $('#assignPub').prop('disabled' , true);
        $('#assignSec').prop('disabled', true);

    });

    $('#btn-edit').on('click' , function() {
        $('#status').prop('disabled', false);
        $('#medialink').prop('disabled', false);
        $('#caption').prop('disabled' , false);
        $('#assignPub').prop('disabled' , false);
        $('#assignSec').prop('disabled', false);
    });

    $('#request_data').on('click' , '#btn_delete' , function() {
        const request_id = $(this).parent().siblings('.activity_id').text();
        
        $('#btnRemoveRequest').on('click' , function() {
            $.get('/deleteRequest' , {request_id} , function(result) {
                if(result) { 
                    alert("Successfully Deleted Request");
                    location.reload();
                } else 
                    alert("An Error Occured, Please Try deleting again later");
                    location.reload();
            });
                    
        });
    });

    $('#btn-save').on('click' , function() {
        
        const pubChanges = {
            pubLink : $('#medialink').val(),
            status : $('#status').val(),
            pubName : $('#assignPub').val(),
            secName : $('#assignSec').val(),
            caption : $('#caption').val(),
            request_id: $('#req_id').val()
        }

        $.get('/savePubChanges' , pubChanges , function(result) {
            if(result) {
                $.get('/sendNewAssign', pubChanges , function(result) {
                    if(result == false)
                        alert("Successfully Updated Changes!")
                    else
                        alert(result);
                    location.reload();
                });
            }
            else {
                alert("An Error Occured, Nothing was Updated \nPlease Try again later");
                location.reload();
            }
        });


    });


    $('#request_data').on('click' , '.edit' , function() {

        const request_id = $(this).parent().siblings('.activity_id').text();
    
        $.get('/getPubRequest' , {request_id}, (result) => {


            $('#medialink').val(result.pubLink);
            $('#status').val(result.status);
            $('#caption').val(result.caption);
            $('#assignPub').val(result.pubName);
            $('#assignSec').val(result.secName);

            $('#req_id').val(result.request_id);
            $('#reqname').val(result.reqname);
            $('#committee').val(result.committee);
            $('#activity_name').val(result.activity_name);
            $('#description').val(result.description);
            $('#start_date').val(result.start_date.split('T')[0]);
            $('#start_time').val(result.start_time);
            $('#end_date').val(result.end_date.split('T')[0]);
            $('#end_time').val(result.end_time);
            $('#venue').val(result.venue);
            $('#theme').val(result.theme);
            $('#posting_date').val(result.posting_date.split('T')[0]);
            $('#posting_time').val(result.posting_time);
            $('#files_url').val(result.links);
            $('#details').text(result.details);
            $('#comments').text(result.comments);
            $('#specialRequest').text(result.specialRequest);

            const pubTypes = ["#type_poster" , "#type_album" , "#type_video" , "#type_fbcover"]
            let other = false;

            for(i = 0; i < pubTypes.length; i++) {
                let pubType = '#type_' + result.pubType;

                if(pubTypes[i] == pubType)
                    $(pubType).prop('checked' , true);

                if(i == pubTypes.length - 1)
                    other = true;
            }
            
            if(other == true) {
                $('#type_other').prop('checked' , true);
                $('#type_other_value').val(result.pubType);
            }
            
            if(result.postevent == 'yes')
                $('#postevent_yes').prop('checked' , true);
            else
                $('#postevent_no').prop('checked' , true);
            
            
            const activity = {
                committee : result.committee
            } 

            
            $.get('/getAssignedSec' , activity , function(res) {

                for(i = 0; i < res.length; i++) {
                    if(res[i] == result.secName) {
                        $('#assignSec').append($('<option>', {
                            value : res[i],
                            text : res[i],
                            class : "selectedSec",
                            selected : true
                        }));
                    }
                    else if(res[i] != "Not Signed In Yet"){
                        $('#assignSec').append($('<option>', {
                            value : res[i],
                            text : res[i],
                            class : "selectedSec"
                        }));
                    }
                }

            });


            $.get('/getAssignedPub' , activity , function(res) {

                for(i = 0; i < res.length; i++)
                    if(res[i] == result.pubName) {
                        $('#assignPub').append($('<option>', {
                            value : res[i],
                            text : res[i],
                            selected : true,
                            class : "selectedPub"
                        }));
                    }
                    else if(res[i] != "Not Signed In Yet"){
                        $('#assignPub').append($('<option>', {
                            value : res[i],
                            text : res[i],
                            class : "selectedPub"
                        }));
                    }
            });
            

        });
    });

});