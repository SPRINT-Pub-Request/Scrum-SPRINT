
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

    $('#btn-edit').click(function(){
        $('#committee').prop('disabled', false);
        $('#role').prop('disabled', false);

        $('#comm_Activities').prop('disabled', false);
        $('#comm_Finance').prop('disabled', false);
        $('#comm_HRD').prop('disabled', false);
        $('#comm_Externals').prop('disabled', false);
        $('#comm_TND').prop('disabled', false);
        $('#comm_P-EVP').prop('disabled', false);
        $('#comm_Secretariat').prop('disabled', false);
        $('#comm_SocioCivic').prop('disabled', false);
    });


    var Modal = document.getElementById('userdetailsModal');
    
    Modal.addEventListener('show.bs.modal', function (event) {
        //Modal on Open event handler
        
    })
    
    Modal.addEventListener('hidden.bs.modal', function (event) {
        //Modal on Close event handler

        $('#committee').prop('disabled', true);
        $('#role').prop('disabled', true);

        $('#comm_Activities').prop('disabled', true);
        $('#comm_Finance').prop('disabled', true);
        $('#comm_HRD').prop('disabled', true);
        $('#comm_Externals').prop('disabled', true);
        $('#comm_TND').prop('disabled', true);
        $('#comm_P-EVP').prop('disabled', true);
        $('#comm_Secretariat').prop('disabled', true);
        $('#comm_SocioCivic').prop('disabled', true);
    })
});