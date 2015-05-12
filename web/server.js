var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/public/views/home.html');
});
app.get('/home', function(req, res) {
  res.sendFile(__dirname + '/app/public/views/home.html');
});
app.get('/stylesheets/bootstrap.min.css', function(req, res) {
  res.sendFile(__dirname + '/app/public/stylesheets/bootstrap.min.css');
});
app.get('/scripts/bootstrap.min.js', function(req, res) {
  res.sendFile(__dirname + '/app/public/scripts/bootstrap.min.js');
});
app.get('/scripts/knockout-3.3.0.js', function(req, res) {
  res.sendFile(__dirname + '/app/public/scripts/knockout-3.3.0.js');
});
app.get('/scripts/mapBuilder.js', function(req, res) {
  res.sendFile(__dirname + '/app/public/scripts/mapBuilder.js');
});
app.get('/scripts/models.js', function(req, res) {
  res.sendFile(__dirname + '/app/public/scripts/models.js');
});
app.get('/scripts/services.js', function(req, res) {
  res.sendFile(__dirname + '/app/public/scripts/services.js');
});
app.get('/scripts/viewmodels.js', function(req, res) {
  res.sendFile(__dirname + '/app/public/scripts/viewmodels.js');
});
app.get('/favicon', function(req, res) {
  res.sendFile(__dirname + '/app/public/images/favicons/favicon-32x32.png');
});
app.get('/images/marker-gray.png', function(req, res) {
  res.sendFile(__dirname + '/app/public/images/marker-gray.png');
});
app.get('/images/marker-gasstation.png', function(req, res) {
  res.sendFile(__dirname + '/app/public/images/marker-gasstation.png');
});
app.get('/images/marker-blue.png', function(req, res) {
  res.sendFile(__dirname + '/app/public/images/marker-blue.png');
});
app.get('/images/marker-atm.png', function(req, res) {
  res.sendFile(__dirname + '/app/public/images/marker-atm.png');
});
app.get('/images/ajax-loader.gif', function(req, res) {
  res.sendFile(__dirname + '/app/public/images/ajax-loader.gif');
});

var server = app.listen(2021, function() {
  console.log('server started successfully');
});
