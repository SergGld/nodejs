var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');

var app = express();
 var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
// создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});

// var path = process.argv[2];

// fs.readdir(path, function(err, items) {
//    console.log(items);

//    for (var i=0; i<items.length; i++) {
//        console.log(items[i]);
//    }
// });

app.use(express.static(__dirname + "/public"));
 
app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);{
    console.log(request.body);
    }
    var path=request.body.dir;
    var ext=request.body.ext;
    var files=[];
    fs.readdir(path, function(err, items) {
        for (var i=0;i<items.length;i++){
            if (items[i].split('.')[1]==ext)
            files.push(items[i]);
        }
        if (ext.length==0) files=items;
        response.send(`${files}`);
    });
});
 
app.get("/", function(request, response){
     
    response.send("<h1>Главная страница</h1>");
});
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});