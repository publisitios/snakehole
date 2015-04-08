// dependencies
var express = require("express");
var app = express();

// global variables
var client_ID = "xaviercr"
var redirect_URI = "http://xavierf.software/" 

var URL = "https://api.instagram.com/oauth/authorize/?client_id="+CLIENT_ID+"&redirect_uri="+REDIRECT_URI+"&response_type=code";



app.get('/', function (req, res) {
  res.send('WELCOME TO SNAKE HOLE!');
});






// start the HTTP server
var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('SnakeHole app listening at http://%s:%s', host, port);
});