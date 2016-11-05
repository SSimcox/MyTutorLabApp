/**
 * Created by Steven on 11/3/2016.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use('/',express.static('views'));

var parseUrlEncoder = bodyParser.urlencoded({extended: false});

var students = {"steven simcox": {"aNumber":"01186010"},"t":{"aNumber":"0"}};
var classes = [1400,1410,2410,2420,2610,3100,3800];
var classData = {1400:["Dan Watson","Buggs Bunny"],1410:["B Holdaway", "K Sundberg"]};

app.get('/', function(req,res){
   res.send("Hello World");
});

app.get('/classes',function(req,res){
   res.send(classData);
});

app.post('/', parseUrlEncoder, function(req, res){
    var data = req.body;
    if(students[data.userName]) res.status(401).send(students[data.userName]);
    else {
        students[data.userName] = {aNumber: data.number};
        console.log("Received sign-up request for " + data.userName);
        if (!students[data.userName]) res.status(404).send();
        else{res.send(data)};
    }
});

app.post('/login', parseUrlEncoder, function(req, res){
    var data = req.body;
    var returnData = students[data.userName];
    console.log("Received log-in request");
    if(!returnData)
        res.status(404).send();
    else if(returnData["aNumber"] !== data.number)
        res.status(404).send();
    else
        res.send(returnData);
});

app.listen(3000,function(){
    console.log("Listening on port 3000...");
});