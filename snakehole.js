// dependencies
var express = require("express");
var request = require("request");
var fs = require("fs");
var mustache = require("mustache");
var app = express();

// global variables
var CLIENT_ID = "80b058dc3c5a4a55b6a4b2711fb70b05";
var REDIRECT_URI = "http://localhost/oath";

// welcome screen and user input form 
app.get('/', function(req, res) {
	var htmlForm = fs.readFileSync('./html-form.htm', 'utf8');
	res.send(htmlForm);

});

// process user query and display result
app.get('/result', function(req, res) {

	var tag = req.query.tag;
	var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?client_id=" + CLIENT_ID
	
// request the data from Intagram API 
	request(url, function(error, response, body) {
        var parsed = JSON.parse(body);
        var data = parsed.data;

// assign the variables to a mustache template 
	var template = fs.readFileSync('./template.txt', 'utf-8');     // load HTML template

	var htmlVariables = mustache.render(template, {data: data, "tag": tag});

    res.send(htmlVariables);

	}); // end request call 
	
}); //  end express apt get

// bookmark images  
app.get('/bookmark', function(req, res) {
	var template2 = fs.readFileSync('./template2.txt', 'utf-8');     // load HTML template
	var id = req.query.id;
	var tag = req.query.tag;
	var URL = "/result?tag="+ tag 
	var htmlVariables2 = mustache.render(template2, {"id": id, "tag": tag, "URL": URL});

	fs.appendFile('./bookmarks.txt', id + ",",'utf8');
	
	res.send(htmlVariables2);
	
	//setTimeout(function(){res.redirect(URL);}, 2000);

});




// start the HTTP server
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('SnakeHole app listening at http://%s:%s', host, port);
});