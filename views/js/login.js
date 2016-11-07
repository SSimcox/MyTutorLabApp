/**
 * Created by Steven on 11/4/2016.
 */
var login = true;
var aNumberReg = /^\d{8}$/;
var studentNameReg = /^[A-Za-z]+\s[A-Za-z]+$/;
$(document).ready(function(){
    $('#confirm-a-number').hide();
    $('#confirm-span').hide();
    $('#sign-in').on('change', toggleLogin);
    $('#first-time').on('change', toggleLogin);
    $('#login-button').on('click', function(e){
        e.preventDefault();
        if(login){
            loginFunction();
        }
        else{
            signUpFunction();
        }
    });
});

var toggleLogin = function(){
    if(!login){
        $('#login-button').html("Log In");
        $('#confirm-a-number').hide(400);
        $('#confirm-span').hide(400);
    }
    else{
        $('#login-button').html("Sign Up");
        $('#confirm-a-number').show(400);
        $('#confirm-span').show(400);
    }
    login = !login;
};

var loginFunction = function(){
    var name = $('#first-name').val().toLowerCase()+" "+$('#last-name').val().toLowerCase();
    var aNumber = $('#a-number').val();
    $.post('/login',{userName: name, number: aNumber}, function(data){
        loggedIn();
    }).fail(function(jqXHR, textStatus, errorThrown){
        loginFailed();
        $('#first-name').focus().select();
    });
};

var signUpFunction = function(){
    var name = $('#first-name').val().toLowerCase() +" "+ $('#last-name').val().toLowerCase();
    var aNumber = $('#a-number').val();
    if($('#confirm-first-name').val().toLowerCase() +" "+$('#confirm-last-name').val().toLowerCase() !== name || $("#confirm-a-number").val() !== aNumber){
        alert("Make sure your values are the same in the confirm inputs");
        $('#confirm-first-name').val("");
        $('#confirm-last-name').val("");
        $("#confirm-a-number").val("");
        return;
    }
    var nameMatch = studentNameReg.exec(name);
    var numberMatch = aNumberReg.exec(aNumber);
    if(!nameMatch || !numberMatch)
    {
        alert("Make sure your name matches exactly and your a number does not include the letter 'A' and no white space");
        return;
    }

    $.post('/',{userName: name, number: aNumber}, function(data){
        signedUp();
    }).fail(function(jqXHR, textStatus, errorThrown){
        signUpFailed(jqXHR.status);
    });
};

var signedUp = function(){
    alert("You are now signed up for the tutor lab. Fill out the form to get some help!");
    redirect();
};

var signUpFailed = function(status){
    if(status == 401) {
        alert("Your name and number are already in the server, please log in");
        $('#confirm-first-name').val("");
        $('#confirm-last-name').val("");
        $('#confirm-a-number').val("");
        $('#first-time').trigger('change');
        $('#sign-in').prop('checked', true);
    }
    else
        alert("Something went wrong on our server, Please try again");
};

var loggedIn = function(){
    alert("You are now logged in. Fill out the form to get some help!");
    redirect();
};

var loginFailed = function(){
    alert("Login Failed: Name or A# do not match system records");
};

var redirect = function(){

};