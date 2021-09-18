$(document).ready(function () {

    let emailUser = "";
    let userRole = "";

    $('.users_data tr').each(function() {

        const name = $(this).find('.nameInfo').text()

        $.get('/checkInProgress' , {name} , function(result) {
            $('.users_data tr').each(function() {
                if(name == $(this).find('.nameInfo').text()) {
                    if(result) {
                        $(this).find('#inProgressInfo').text("Yes");
                    } else {
                        $(this).find('#inProgressInfo').text("No");
                    }
                }
            });

        });

    });



    $.get('/getNoAssigned' , {} , function(result){
        const namesCommittee = ["Activities" , "Finance" , "HRD" , "Externals" , "TND" , "P-EVP" , "SocioCivic" , "Secretariat"];
        let committee = [];

        for(i = 0; i < 8; i++) {
            if(result[i] == false) {
                if(committee.length == 0)
                    committee.push(namesCommittee[i]);
                else
                    committee.push(" " + namesCommittee[i]);
            }
        }

        if(committee.length != 0) {
            $('.inline-warning').show();
            
            $('.inline-warning').html("<span>WARNING</span> <div>There are no Pubs or Secretariat officers assigned to the following committees: <br> " + committee + "</div>");
        } else {
            $('.inline-warning').hide();
        }
    });

    $('#filter-requesters').on('click' , function() {
        $('#users_data').each(function() {
            
            const role = $(this).children().siblings('.roleInfo').text().trim();
            if(role === "Requester") 
                $(this).hide();
        });
    });


    $('#users_data').on('click', '.delete', function () {

        emailUser = $(this).parent().siblings('.emailInfo').text().trim();

        const role = $(this).parent().siblings('.roleInfo').text().trim();

        const user = {
            name : $(this).parent().siblings('.nameInfo').text().trim()
        } 

        $.get('/checkInProgress' , user , function(result) {
            if(result == false) {
                if(role === "Administrator"){   
                    $.get('/checkAdmins', {email: emailUser}, function(result) {
                        if (result.length == 1){
                            $("#removeuserModal").modal('hide');
                            alert('Only 1 Admin Left! Assign someone as Admin');
                        }
                        else {
                            $("#removeuserModal").modal('show');
                        }
                    });
                }
                else{
                    $("#removeuserModal").modal('show');
                }
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
            if(result)
            {
                const email = emailUser;
                $.get('/sendDeletedNotif' , {email : email} , function(result) {
                   if(result) {
                        alert("Successfully Deleted User and Notified");
                        location.reload();
                   } else {
                        alert("Failed to Delete User\n ERROR for Admins: This might be a email issue");
                        location.reload();
                   }
                });
            } else {
                alert("Failed to Delete User\n ERROR for Admins: This might be a backend issue");
                location.reload();
            }
        });
    });


    $('#btn-save').click(function(){
        
        const committees = ["Activities", "Finance","HRD","Externals","TND","P-EVP","SocioCivic", "Secretariat"]
        const email = $('#userEmail').text().trim();
        const role = $('#role').val().trim();
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
                    
                    $('tr.users_info').each(function() {
                        if(user.email == $(this).find('.emailInfo').text().trim()){
                            $(this).find('.roleInfo').text(user.role);
                            $(this).find('.assigned_committee').text(user.assigned_committee);
                        }
                    });

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

        $('#userEmail').text("Loading...");
        $('#userName').text("Loading...");
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
        $('#Secretariat').prop('disabled', true);

        $('#Activities').prop('checked', false);
        $('#Finance').prop('checked', false);
        $('#HRD').prop('checked', false);
        $('#TND').prop('checked', false);
        $('#P-EVP').prop('checked', false);
        $('#SocioCivic').prop('checked', false);
        $('#Secretariat').prop('checked', false);
        $('#Externals').prop('checked', false);
    });

    $('#users_data').on('click', '.edit', function () {
        //your code here
        const email = $(this).parent().siblings('.emailInfo').text().trim();
        emailUser = email;
        const role = $(this).parent().siblings('.roleInfo').text().trim();
        userRole = role;
        const name = $(this).parent().siblings('.nameInfo').text().trim();
        $.get('/getUser', {email: email}, function(result){
            userRole = result.role;

            if(result.role === "Requester"){
                $('#Activities').prop('disabled', true);
                $('#Finance').prop('disabled', true);
                $('#HRD').prop('disabled', true);
                $('#Externals').prop('disabled', true);
                $('#TND').prop('disabled', true);
                $('#P-EVP').prop('disabled', true);
                $('#Secretariat').prop('disabled', true);
                $('#SocioCivic').prop('disabled', true);
                $('#Secretariat').prop('disabled', true);
                $('#Activities').prop('checked', false);
                $('#Finance').prop('checked', false);
                $('#HRD').prop('checked', false);
                $('#TND').prop('checked', false);
                $('#P-EVP').prop('checked', false);
                $('#SocioCivic').prop('checked', false);
                $('#Secretariat').prop('checked', false);
                $('#Externals').prop('checked', false);

            } else if(result.role != "Requester") {

                $('#committee').prop('disabled', false);
                $('#Activities').prop('disabled', false);
                $('#Finance').prop('disabled', false);
                $('#HRD').prop('disabled', false);
                $('#Externals').prop('disabled', false);
                $('#TND').prop('disabled', false);
                $('#P-EVP').prop('disabled', false);
                $('#Secretariat').prop('disabled', false);
                $('#SocioCivic').prop('disabled', false);
           }
           
            $.get('/checkInProgress' , {name} , function(result) {
                if(result == false) {
                    if(role === "Administrator") {
                        $.get('/checkAdmins', {}, function(result){
                            if (result == false && name !== "Not Signed In Yet") {
                                $('#role').prop('disabled', true);
                            }
                            else{
                                $('#role').prop('disabled', false);
                            }
                        });
                    } else {
                        $('#role').prop('disabled', false);
                    }
                } 
                else 
                    $('#role').prop('disabled', true);
            });


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
            $('#Secretariat').prop('disabled', true);
            $('#Activities').prop('checked', false);
            $('#Finance').prop('checked', false);
            $('#HRD').prop('checked', false);
            $('#TND').prop('checked', false);
            $('#P-EVP').prop('checked', false);
            $('#SocioCivic').prop('checked', false);
            $('#Secretariat').prop('checked', false);
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

            $('#Secretariat').prop('disabled', false);

        }
    })

    $('#add_email').keyup(function () {
        const value = $('#add_email').val();
        const email = value.split("@");

        //TODO: check if email is valid dlsu email
        if(email[1] === "dlsu.edu.ph" && email[0].trim() !== ""){
            $.get('/getUser', {email : value}, function(result){
                if(result) {
                    $('#add_user').prop('disabled', true);
                }
                else{
                    $('#add_user').prop('disabled', false);
                }
             });
        }

        else {
            $('#add_user').prop('disabled', true);
        }
    });

    $('#add_user').on('click' , function () {
        const email = $('#add_email').val();
        const role = $('#add_role').val();
         
        userss = {
            email : email,
            role : role
        };

        $.get('/addUser' , userss, function(result) {
            if(result) {
                alert("User added!");
                location.reload();
            } else {
                alert("Add User Failed");
            }
        });

    });

    var hide = function() { 
        $("#filter-requesters").html('Show Requesters');

        $('tr.users_info').each(function() {
            
            const role = $(this).children('.roleInfo').text();

            if(role === "Requester") 
                $(this).hide();
        
        });


    }
    var show = function() { 
        $("#filter-requesters").html('Hide Requesters');

        $('tr.users_info').each(function() {
            
            $(this).show();
        
        });
            
    }

    $('#filter-requesters').showtoggle(hide, show);
});

$.fn.showtoggle = function(a, b) {
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