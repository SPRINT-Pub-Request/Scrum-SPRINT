$(document).ready(function() {

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

    $('#edit-caption').on('click', function(){
        
    });

    $('.status').on('change', function(){
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