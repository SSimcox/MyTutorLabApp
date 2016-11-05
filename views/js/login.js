/**
 * Created by Steven on 11/4/2016.
 */
var login = true;
var aNumberReg = /^\d{8}$/;
var studentNameReg = /^[A-Za-z]+\s[A-Za-z]+$/;
$(document).ready(function(){
    $('#confirm-a-number').hide();
    $('#confirm-student-name').hide();
    $('#sign-in').on('change', toggleLogin);
    $('#first-time').on('change', toggleLogin);
    $('#class-selector').on('change', setTeachers);
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
        $('#confirm-student-name').hide(400);
    }
    else{
        $('#login-button').html("Sign Up");
        $('#confirm-a-number').show(400);
        $('#confirm-student-name').show(400);
    }
    login = !login;
    console.log(login);
};

var loginFunction = function(){
    var name = $('#student-name').val().toLowerCase();
    var aNumber = $('#a-number').val();
    $.post('/login',{userName: name, number: aNumber}, function(data){
        loggedIn();
    }).fail(function(){
        loginFailed();
    });
};

var signUpFunction = function(){
    var name = $('#student-name').val().toLowerCase();
    var aNumber = $('#a-number').val();
    if($('#confirm-student-name').val().toLowerCase() !== name || $("#confirm-a-number").val() !== aNumber){
        alert("Make sure your values are the same in the confirm inputs");
        $('#confirm-student-name').val("");
        $("#confirm-a-number").val("");
        return;
    }
    var nameMatch = studentNameReg.exec(name);
    var numberMatch = aNumberReg.exec(aNumber);
    if(!nameMatch || !numberMatch)
    {
        alert("Make sure your name only has one space and your a number does not include the letter 'A' and no white space");
        return;
    }

    $.post('/',{userName: name, number: aNumber}, function(data){
        signedUp();
    }).fail(function(){
        signUpFailed();
    });
};

var signedUp = function(){
    alert("You are now signed up for the tutor lab. Fill out the form to get some help!");
    showForm();
};

var signUpFailed = function(){
    alert("Something went wrong on our server, Please try again");
};

var loggedIn = function(){
    alert("You are now logged in. Fill out the form to get some help!");
};

var loginFailed = function(){
    alert("Login Failed: Name or A# do not match system records");
};