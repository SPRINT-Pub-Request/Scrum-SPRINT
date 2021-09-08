$(document).ready(function() {

    var toggleOn = function() { 
        $('#extra-info').removeClass('hidden');
        $('#caption').removeClass('caption-cut');
        $('.expand-icon#down').addClass('hidden');
        $('.expand-icon#up').removeClass('hidden');
    }
    var toggleOff = function() { 
        $('#extra-info').addClass('hidden');
        $('#caption').addClass('caption-cut');
        $('.expand-icon#up').addClass('hidden');
        $('.expand-icon#down').removeClass('hidden');
    }

    $('.btn-expand-info').infotoggle(toggleOn, toggleOff);

    $('#edit-caption').on('click', function(){
        
    });

    $('#status').on('change', function(){
        var status = $('#status').val();

        console.log(status);
        
        switch(status){
            case "Not Started" :
                $('#status').css("background-color", "#c94628");
                break;

            case "In Progress" : 
                $('#status').css("background-color", "#dd975e");
                break;

            case "Finished" : 
                $('#status').css("background-color", "#509375");
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