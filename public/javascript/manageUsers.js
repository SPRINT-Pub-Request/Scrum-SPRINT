
$(document).ready(function () {

    function deleteUser(field, error){
        $.get('/deleteUser', {}, function(result){});
        location.reload();
        alert('User Deleted Successfully!');
    }

    $('#btnRemoveUser').click(function () {
        alert('delete');
        deleteUser($('#name'), $('#error'));
    });

    $('#btn-edit').click(function(){
        $('#committee').prop('disabled', false);
        $('#role').prop('disabled', false);

        $('#Activities').prop('disabled', false);
        $('#Finance').prop('disabled', false);
        $('#HRD').prop('disabled', false);
        $('#Externals').prop('disabled', false);
        $('#TND').prop('disabled', false);
        $('#P-EVP').prop('disabled', false);
        $('#Secretariat').prop('disabled', false);
        $('#SocioCivic').prop('disabled', false);
        $('#Pubs').prop('disabled', false);
    });

    $('#btn-save').click(function(){
        
        const committees = ["Activities", "Finance","HRD","Externals","TND","P-EVP","SocioCivic", "Pubs",]
        const email = $('#userEmail').text();
        const role = $('#role').val();
        let assigned_committee = "";

        for (let i = 0; i < committees.length; i++){
            tempCheck = "#" + committees[i];
            if($(tempCheck).prop("checked") == true){
                assigned_committee += committees[i] + " ";
            }
        }

        assigned_committee = assigned_committee.trim();

        const user = {
            email : email,
            assigned_committee : assigned_committee,
            role : role
        }

        $.get('/updateUser', user, function(result){
            alert(result);
        });
    });


    var Modal = document.getElementById('userdetailsModal');
    
    Modal.addEventListener('show.bs.modal', function (event) {
        //Modal on Open event handler
    });
    
    Modal.addEventListener('hidden.bs.modal', function (event) {
        //Modal on Close event handler

        location.reload();

        $('#committee').prop('disabled', true);
        $('#role').prop('disabled', true);

        $('#Activities').prop('disabled', true);
        $('#Finance').prop('disabled', true);
        $('#HRD').prop('disabled', true);
        $('#Externals').prop('disabled', true);
        $('#TND').prop('disabled', true);
        $('#P-EVP').prop('disabled', true);
        $('#Secretariat').prop('disabled', true);
        $('#SocioCivic').prop('disabled', true);
        $('#Pubs').prop('disabled', true);

        $('#Activities').prop('checked', false);
        $('#Finance').prop('checked', false);
        $('#HRD').prop('checked', false);
        $('#TND').prop('checked', false);
        $('#P-EVP').prop('checked', false);
        $('#SocioCivic').prop('checked', false);
        $('#Pubs').prop('checked', false);
        $('#Externals').prop('checked', false);
    });

    $('#users_data').on('click', '.edit', function () {
        //your code here
        const email = $(this).parent().siblings('.emailInfo').text();

        $.get('/getUser', {email: email}, function(result){
            $('#userEmail').text(result.email);
            $('#name').text(result.name);
            $('#role').val(result.role);
            const arr_ac = result.assigned_committee.split(" ");   
            
            for (let i = 0; i < arr_ac.length; i++){
                tempCheck = "#" + arr_ac[i];
                $(tempCheck).prop('checked', true);
            }
        });
        
    });

    $('#users_data').on('click', '.delete', function () {
        //your code here
        const email = $(this).parent().siblings('.emailInfo').text();

        $.get('/deleteUser', {email: email}, function(result){
            $('#userEmail').text(result.email);
            $('#name').text(result.name);
            $('#role').val(result.role);
            const arr_ac = result.assigned_committee.split(" ");   
            
            for (let i = 0; i < arr_ac.length; i++){
                tempCheck = "#" + arr_ac[i];
                $(tempCheck).prop('checked', true);
            }
        });
        
    });
});