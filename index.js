var http = require('http');
var path = require('path');
var express = require('express');
var Messenger = require('./lib/messenger');
var app = express();


app.use(express.static(process.cwd() + '/public'));

app.get('/*', function(req, res){
  var htmlPath = path.join(process.cwd(), 'public/app.html');
  res.sendfile(htmlPath);
});

var server = http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});


var io = require('socket.io').listen(server);
io.set('log level', 1);
io.sockets.on('connection', function(socket){
  var messenger = new Messenger(socket);
});