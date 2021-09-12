let editor;

$(document).ready(function() {

    let idModalAccess = "";
    let mediaEdit;
    let captionEdit;
    let filter = "all";

    $('.status').each(function(){
        var status = $(this).val();
        
        switch(status){
            case "Not Started" :
                $(this).css("background-color", "#c94628");
                break;

            case "In Progress" : 
                $(this).css("background-color", "#dd975e");
                break;

            case "Finished" : 
                $(this).css("background-color", "#509375");
                break;
        }

    });

    var toggleOn = function() { 
        headerDiv = $(this).parent().parent();

        headerDiv.siblings('.extra-info').removeClass('hidden');
        headerDiv.siblings('.caption').children('.request-field-content').removeClass('caption-cut');
        $(this).find('.expand-icon#down').addClass('hidden');
        $(this).find('.expand-icon#up').removeClass('hidden');
    }
    var toggleOff = function() { 
        headerDiv = $(this).parent().parent();

        headerDiv.siblings('.extra-info').addClass('hidden');
        headerDiv.siblings('.caption').children('.request-field-content').addClass('caption-cut');
        $(this).find('.expand-icon#up').addClass('hidden');
        $(this).find('.expand-icon#down').removeClass('hidden');
    }

    $('.btn-expand-info').infotoggle(toggleOn, toggleOff);

    $('.edit-captionbtn').on('click', function(){
    });

    $(".editMediaBox").on('click', '.edit-media', function(){
        idModalAccess = $(this).parent().parent().siblings(".request_id_hidden").text();
        mediaEdit = $(this).siblings(".media_link_href");
    });

    $("#edit-media-input").keyup(function(){
        const link = $("#edit-media-input").val();
        if (link.substring(0,8) === "https://"){
            $("#btnSaveMedia").prop("disabled", false);
        }
        else{
            $("#btnSaveMedia").prop("disabled", true);
        }
    });

    $("#btnSaveMedia").click(function(){
        const link = $("#edit-media-input").val();
        mediaEdit.attr("href", link);
        $.get('/updatePubLink', {request_id : idModalAccess, pubLink : link}, function(result){});
    });

    $(".editCaptionBox").on('click', '.edit-captionbtn', function(){
        idModalAccess = $(this).parent().parent().siblings('.row').children().children().siblings('.request_id_hidden').text();
        captionEdit = $(this).parent().siblings('.caption-cut');
    });
    
    $("#btnSaveCaption").click(function(){
        const caption = $("textarea#edit-caption-input").html(myEditor.getData()).text();
        captionEdit.html(caption);
        $.get('/updateCaption', {request_id : idModalAccess, caption : caption}, function(result){});
    });

    $('.status').on('change', function(){
        var status = $(this).val();
        var request_id = $(this).siblings('.request_id_hidden').text();
        switch(status){
            case "Not Started" :
                $(this).css("background-color", "#c94628");
                break;

            case "In Progress" : 
                $(this).css("background-color", "#dd975e");
                break;

            case "Finished" : 
                $(this).css("background-color", "#509375");
                break;
        }
        $.get('/updateStatus', {request_id : request_id, status : status}, function(result){
            filterByStatus(filter);
        });
    });

    $("#filter-status").change(function(){
        filter = $("#filter-status").val();
        
        filterByStatus(filter);
    });

    function filterByStatus (status){
        $('.request-item').each(function(){
            if (status != "all"){
                const filter = $(this).children().children().children().siblings(".status").val();

                if(filter !== status){
                    $(this).hide();
                }
                else{
                    $(this).show();
                }
            }
            else{
                $(this).show();
            }

        });
    }
});

$.fn.infotoggle = function(a, b) {
    return this.each(function() {
        var clicked = false;
        $(this).on('click',function() {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }
            clicked = true;
            return a.apply(this, arguments);
        });
    });
};