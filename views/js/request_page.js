/**
 * Created by Steven on 11/3/2016.
 */
var login = true;
var aNumberReg = /^\d{8}$/;
var studentNameReg = /^[A-Za-z]+\s[A-Za-z]+$/;
var classList = {};
$(document).ready(function(){
    $('#class-selector').on('change', setTeachers);

    $.get('/classes', function(data){
        classList = data;
        console.log(data);
        setUpForm(data);
    }).fail(function(){
        classList.failed = true;
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

var setUpForm = function(){
    var selector = $('#class-selector');
    selector.empty();
    selector.append("<option></option>");
    var classNames = Object.keys(classList);
    classNames.forEach((name) => selector.append(`<option value='${name}'>${name}</option>`));
};

var setTeachers = function(){
    var selector = $('#teacher-selector');
    selector.empty();
    selector.append("<option></option>");
    var teacherNames = classList[$('#class-selector').val()];
    teacherNames.forEach((name) => selector.append(`<option value='${name}'>${name}</option>`));
}