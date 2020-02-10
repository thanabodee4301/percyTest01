var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/test.html'));
});
app.use('/opopopo', function(req, res){
	console.log('req.body', req.body);
	var test1 = req.body.text1;
	var test2 = req.body.text2;
	var test3 = req.body.text3;
	res.send({text1:test1, text2:test2, text3:test3});
})
app.listen(3000, function () {
	console.log('sawasdeekrub');
  });