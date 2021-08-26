
$(document).ready(function () {

    let emailUser = "";
    let userRole = "";
    
    $.get('/getNoAssigned' , {} , function(result){
        const namesCommittee = ["Activities" , "Finance" , "HRD" , "Externals" , "TND" , "P-EVP" , "SocioCivic" , "Pubs"];
        let committee = [];

        for(i = 0; i < 8; i++) {
            if(result[i] == false) {
                if(committee.length == 0)
                    committee.push(namesCommittee[i]);
                else
                    committee.push(" " + namesCommittee[i]);
            }
        }

        if(committee.length != 0) 
            alert("There are no Pubs or Secretariat officers assigned to the following committee: \n" + committee + "\n");  
    });


    $('#users_data').on('click', '.delete', function () {

        const email = $(this).parent().siblings('.emailInfo').text();
        emailUser = email

        const user = {
            name : $(this).parent().siblings('.nameInfo').text()
        } 

        $.get('/checkInProgress' , user , function(result) {
            if(result == false) {
                $.get('/checkAdmins', {}, function(result) {
                    if (result.length == 1){
                        $("#removeuserModal").modal('hide');
                        alert('Only 1 Admin Left! Assign someone as Admin');
                    }
                    else {
                        $("#removeuserModal").modal('show');
                    }
                });
            }
            else {
                $("#removeuserModal").modal('hide');
                alert("Unable to delete user \nUser current has on progress work.");
            }
            
        });
        
    });

    $('#btnRemoveUser').click(function () {
        const email = emailUser;
        $.get('/deleteUser', {email: email}, function(result){
            location.reload();
        });
    });

    $('#btn-edit').click(function(){
        $.get('/checkAdmins', {}, function(result){
            if (result.length > 1 || userRole !== "Administrator"){
                $('#role').prop('disabled', false);
            }
            else{
                $('#role').prop('disabled', true);
            }
        });
    });

    $('#btn-save').click(function(){
        
        const committees = ["Activities", "Finance","HRD","Externals","TND","P-EVP","SocioCivic", "Pubs"]
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
            role : role,
        }
            $.get('/checkCommittee' , user , function(res) {
                if(res == false) {
                    $.get('/updateUser', user, function(result) {       
            
                        location.reload();
                        if(result) {
                            $.get('/sendNotif' , user , function(ans) {
                                alert(ans);
                            });
                        } else {
                            alert('Updating User Failed, Please Refresh and Try Again!')
                        }
                    });
                } else {
                    alert('Cannot Removed Assigned Committee, as the user currently has in progress work for that committee');
                }
                
    
            });
    
    });


    var Modal = document.getElementById('userdetailsModal');
    
    Modal.addEventListener('show.bs.modal', function (event) {
        //Modal on Open event handler
    });
    
    Modal.addEventListener('hidden.bs.modal', function (event) {
        //Modal on Close event handler
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
        emailUser = email;
        
        $.get('/getUser', {email: email}, function(result){
            userRole = result.role;

            if(result.role !== "Requester"){
                $('#committee').prop('disabled', false);

                $('#Activities').prop('disabled', false);
                $('#Finance').prop('disabled', false);
                $('#HRD').prop('disabled', false);
                $('#Externals').prop('disabled', false);
                $('#TND').prop('disabled', false);
                $('#P-EVP').prop('disabled', false);
                $('#Secretariat').prop('disabled', false);
                $('#SocioCivic').prop('disabled', false);
                $('#Pubs').prop('disabled', false);
            }
            else{
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
            }

            $('#userEmail').text(result.email);
            $('#userName').text(result.name);
            $('#role').val(result.role);
            const arr_ac = result.assigned_committee.split(" ");   
            
            for (let i = 0; i < arr_ac.length; i++){
                tempCheck = "#" + arr_ac[i];
                $(tempCheck).prop('checked', true);
            }
        });
        
    });

    $('#role').change(function(){
        const role = $('#role').val();

        if (role === "Requester"){
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
        }
        else{
            $('#Activities').prop('disabled', false);
            $('#Finance').prop('disabled', false);
            $('#HRD').prop('disabled', false);
            $('#Externals').prop('disabled', false);
            $('#TND').prop('disabled', false);
            $('#P-EVP').prop('disabled', false);
            $('#Secretariat').prop('disabled', false);
            $('#SocioCivic').prop('disabled', false);
            $('#Pubs').prop('disabled', false);
        }
    })
});