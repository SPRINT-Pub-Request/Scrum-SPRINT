
$(document).ready(function () {

    function deleteUser(field, error){
        var reqname =  validator.trim($('#name').val());
        $.get('/deleteUser', {reqname :reqname}, function(result){});
        location.reload();
        alert('User Deleted Successfully!');
    }

    $('#btnRemoveUser').click(function () {
        deleteUser($('#name'), $('#error'));
    });
});
