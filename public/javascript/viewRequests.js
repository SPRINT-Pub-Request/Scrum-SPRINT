let editor;

$(document).ready(function() {

    let idModalAccess = "";
    let mediaEdit;
    let captionEdit;
    let filter = "all";

    $('.request-item').sort(filterSDAscending).appendTo('.container-requests');

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
        $("#edit-media-input").val(mediaEdit.attr("href"));
    });

    $(".editMediaBox").on('click', '.media_link_href', function(){
        if($(this).attr("href") === "N/A"){
            alert("No Media Link");
            return false;
        }
    });

    $(".editMediaBox").on('click', '.related_files_href', function(){
        if($(this).attr("href") === ""){
            alert("No Related Files Link");
            return false;
        }
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
        $('#reqChanges').show().delay(3000).fadeOut();
    });

    $(".editCaptionBox").on('click', '.edit-captionbtn', function(){
        idModalAccess = $(this).parent().parent().siblings('.row').children().children().siblings('.request_id_hidden').text();
        captionEdit = $(this).parent().siblings('.caption-cut');
        const caption = captionEdit.html();
        $("textarea#edit-caption-input").html(myEditor.data.set(caption));
    });
    
    $("#btnSaveCaption").click(function(){
        const caption = $("textarea#edit-caption-input").html(myEditor.getData()).text().replace(/<(.|\n)*?>/g, '');

        $.get('/updateCaption', {request_id : idModalAccess, caption : caption}, function(result){
            if(result){
                captionEdit.html(caption);
                $('#reqChanges').show().delay(3000).fadeOut();
            }
            else{
                alert("Fail");
            }
        });
    });

    $('.status').on('change', function(){
        var status = $(this).val();
        var request_id = $(this).siblings('.request_id_hidden').text();
        switch(status){
            case "Not Started" :
                $(this).css("background-color", "#c94628");
                $('#reqChanges').show().delay(3000).fadeOut();
                break;

            case "In Progress" : 
                $(this).css("background-color", "#dd975e");
                $('#reqChanges').show().delay(3000).fadeOut();
                break;

            case "Finished" : 
                $(this).css("background-color", "#509375");
                $.get('/sendMailDone' , {request_id : request_id, status : status} , function(result) {
                    if(result === false) {
                        alert("An Error Occured, Requester Not Notifieid\nAdmin ERROR: This might be a mail error");
                    }
                    else{
                        $(this).css("background-color", "#509375");
                        $('#requestSent').show().delay(3000).fadeOut();
                    }
                });
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

    $("#filter-date").change(function(){
        filter = $("#filter-date").val();

        if(filter === "Posting Date (asc.)"){
            $('.request-item').sort(filterPDAscending).appendTo('.container-requests');
        }
        else if (filter === "Posting Date (desc.)"){
            $('.request-item').sort(filterPDDescending).appendTo('.container-requests');
        }
        else if (filter === "Date Submitted (asc.)"){
            $('.request-item').sort(filterSDAscending).appendTo('.container-requests');
        }
        else if (filter === "Date Submitted (desc.)"){
            $('.request-item').sort(filterSDDescending).appendTo('.container-requests');
        }
        else if (filter === "Start Date (asc.)"){
            $('.request-item').sort(filterStartDAscending).appendTo('.container-requests');
        }
        else if (filter === "Start Date (desc.)"){
            $('.request-item').sort(filterStartDDescending).appendTo('.container-requests');
        }
        else if (filter === "End Date (asc.)"){
            $('.request-item').sort(filterEndDAscending).appendTo('.container-requests');
        }
        else if (filter === "End Date (desc.)"){
            $('.request-item').sort(filterEndDDescending).appendTo('.container-requests');
        }
        else if (filter === "Alphabetical"){
            $('.request-item').sort(filterAlphabetical).appendTo('.container-requests');
        }
    });

    //POSTING DATE FILTER

    function filterPDDescending (a, b){

        let date1 = $(a).find(".posting_date_sort").text();
        date1 = date1.split('-');
        date1 = new Date(date1[0], date1[1] - 1, date1[2]);

        let date2 = $(b).find(".posting_date_sort").text();
        date2 = date2.split('-');
        date2 = new Date(date2[0], date2[1] - 1, date2[2]);


        return date2 - date1;
    }

    function filterPDAscending(a, b){

        let date1 = $(a).find(".posting_date_sort").text();
        date1 = date1.split('-');
        date1 = new Date(date1[0], date1[1] - 1, date1[2]);

        let date2 = $(b).find(".posting_date_sort").text();
        date2 = date2.split('-');
        date2 = new Date(date2[0], date2[1] - 1, date2[2]);


        return date1 - date2;
    }

    //SUBMITTED DATE FILTER

    function filterSDDescending (a, b){

        let date1 = $(a).find(".submitted_date_sort").text();
        date1 = date1.split('-');
        date1 = new Date(date1[0], date1[1] - 1, date1[2]);
        let date2 = $(b).find(".submitted_date_sort").text();
        date2 = date2.split('-');
        date2 = new Date(date2[0], date2[1] - 1, date2[2]);


        return date2 - date1;
    }

    function filterSDAscending(a, b){

        let date1 = $(a).find(".submitted_date_sort").text();
        date1 = date1.split('-');
        date1 = new Date(date1[0], date1[1] - 1, date1[2]);
        let date2 = $(b).find(".submitted_date_sort").text();
        date2 = date2.split('-');
        date2 = new Date(date2[0], date2[1] - 1, date2[2]);


        return date1 - date2;
    }

    //START DATE FILTER
    
    function filterStartDAscending(a, b){

        const text1 = $(a).find(".sded-sort").text().split(" ")[1];
        const text2 = $(b).find(".sded-sort").text().split(" ")[1];
        
        let date1 = text1.split('-');
        date1 = new Date(date1[0], date1[1] - 1, date1[2]);

        let date2 = text2.split('-');
        date2 = new Date(date2[0], date2[1] - 1, date2[2]);


        return date1 - date2;
    }

    function filterStartDDescending(a, b){

        const text1 = $(a).find(".sded-sort").text().split(" ")[1];
        const text2 = $(b).find(".sded-sort").text().split(" ")[1];
        
        let date1 = text1.split('-');
        date1 = new Date(date1[0], date1[1] - 1, date1[2]);

        let date2 = text2.split('-');
        date2 = new Date(date2[0], date2[1] - 1, date2[2]);


        return date2 - date1;
    }


    //END DATE FILTER

    function filterEndDAscending(a, b){

        const text1 = $(a).find(".sded-sort").html().split(" ")[6];
        const text2 = $(b).find(".sded-sort").html().split(" ")[6];
        
        let date1 = text1.split('-');
        date1 = new Date(date1[0], date1[1] - 1, date1[2]);

        let date2 = text2.split('-');
        date2 = new Date(date2[0], date2[1] - 1, date2[2]);


        return date1 - date2;
    }

    function filterEndDDescending(a, b){

        const text1 = $(a).find(".sded-sort").html().split(" ")[6];
        const text2 = $(b).find(".sded-sort").html().split(" ")[6];
        
        let date1 = text1.split('-');
        date1 = new Date(date1[0], date1[1] - 1, date1[2]);

        let date2 = text2.split('-');
        date2 = new Date(date2[0], date2[1] - 1, date2[2]);


        return date2 - date1;
    }

    //ALPHABETICAL FILTER

    function filterAlphabetical(a, b){

        const name1 = $(a).find(".activity-name").text();
        const name2 = $(b).find(".activity-name").text();

        if (name1 > name2){
            return 1;
        }
        else (name2 > name1)
            return -1;
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