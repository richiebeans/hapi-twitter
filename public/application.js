$(document).ready(function(){
  $('#submit').click(function(){
    //declare input variables
    var name = $('#name');
    var email = $('#email');
    var password = $('#password');
    var username = $('#username');


    //prevent form from redirecting
    event.preventDefault();

    //Sign up
    $.ajax({
      type: 'POST',
      url: '/users',
      data: {
        user: {
          name: name.val(),
          email: email.val(),
          password: password.val(),
          username: username.val()
        }
      },
      dataType: 'JSON',
      success: function(response){
        console.log(response);
       },
      error: function(xhr, status, error){
        $('#signup-form-message').text(xhr.responseText);
      }
    });
  });


  $('#log-in').click(function(){
    //declare input variables
    //prevent form from redirecting
    event.preventDefault();

    var si_password = $('#si_password');
    var si_username = $('#si_username');
    //Sign in
    $.ajax({
      type: 'POST',
      url: '/sessions',
      data: {
        user: {
          username: si_username.val(),
          password: si_password.val()
        }
      },
      dataType: 'JSON',
      xhrFields: {
        withCredentials: true
      },
      success: function(response){
        if (response.authenticated) {
          window.location.href = "posts";
          console.log(response)
        }
      },
      error: function(xhr, status, error){
        console.log(xhr.responseText);
      }
    });
  });
});