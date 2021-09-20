$(document).ready(function() {
    
    $.get('/getRole' , {} , function(result) {
        if(result === "Secretariat") 
            $('.bi-trash-fill').css("visibility" , "hidden");
    });


    $('#request_data tr').each(function() {
        if($(this).find('#pubNameee').text() === "") {
            $(this).find('#pubNameee').text("Not Assigned");
        } 

        if($(this).find('#secNameee').text() === "") {
            $(this).find('#secNameee').text("Not Assigned");
        }
    });

    $('#requeststable tbody tr').each(function(){
        var status = $(this).children('.status-col').text();

        switch(status){
            case "Not Started" :
                $(this).css("background", "#c9462873");
                break;

            case "In Progress" : 
                $(this).css("background", "#dd975e73");
                break;

            case "Finished" : 
                $(this).css("background", "#50937573");
                break;
        }

    });

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
                if(result === request_id) { 
                    $('#request_data tr').each(function() {
                        if($(this).children(".activity_id").text() === request_id){
                            //alert("Successfully Deleted Request");
                            $('#reqDel').show().delay(3000).fadeOut();
                            $(this).hide();
                            $(this).remove();
                        }
                    });
                } else {
                    alert("An Error Occured, Please Try deleting again later");
                    location.reload();
                }
                
            });
                    
        });
    });

    $('#btn-save').on('click' , function() {
        
        const pubChanges = {
            pubLink : $('#medialink').val(),
            status : $('#status').val(),
            caption : $('#caption').val(),
            request_id: $('#req_id').val()
        }

        $.get('/savePubChanges' , pubChanges , function(result) {
            if(result) {
                $('#reqUpdate').show().delay(3000).fadeOut();
                setTimeout(location.reload.bind(location) , 3500);
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
            

            let pubNames = result.pubName.split(',');
            let secNames = result.secName.split(',');

            $('#assignedPub').empty();
            $('#assignedSec').empty();

            if(result.pubName === "" && result.secName === "") {
                $('#assignedPub').append($('<div>' , {
                        text : "Not Assigned",
                        class : "pubs"
                }));

                $('#assignedSec').append($('<div>' , {
                        text : "Not Assigned",
                        class : "secs"
                }));
            } else if(result.secName === "") {
                $('#assignedSec').append($('<div>' , {
                        text : "Not Assigned",
                        class : "secs"
                }));
            } else if(result.pubNames === "") {
                $('#assignedPub').append($('<div>' , {
                        text : "Not Assigned",
                        class : "pubs"
                }));
            } else {
                for(i = 0; i < pubNames.length; i++) {
                    $('#assignedPub').append($('<div>' , {
                        text : pubNames[i],
                        class : "pubs"
                    }));
                }

                for(i = 0; i < secNames.length; i++) {
                    $('#assignedSec').append($('<div>' , {
                        text : secNames[i],
                        class : "secs"
                    }));
                }
            }
            
            var date = result.start_date.split('T')[0];
            $('#medialink').val(result.pubLink);
            $('#status').val(result.status);
            $('.dateSub').text(date);
            $('#req_id').val(result.request_id);
            $('#reqname').val(result.reqname);
            $('#committee').val(result.committee);
            $('#activity_name').val(result.activity_name);
            $('#description').val(result.description);
            $('#start_date').val(date);
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
            $('#caption').val(result.caption.replace(/(<([^>]+)>)/ig,""));
            

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
            
            
        });
    });
});