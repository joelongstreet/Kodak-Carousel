var express = require('express');
var http = require('http');
var routes = require('./lib/routes');
var Messenger = require('./lib/messenger');
var app = express();


app.use(express.static(process.cwd() + '/public'));


app.get('/*', routes.ui);
app.get('/api/user/authorize', routes.getAuthURL);
app.get('/api/flickr/auth_callback', routes.authCallback);
app.get('/api/:method', routes.makeFlickrRequest);


var server = http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});


var io = require('socket.io').listen(server);
io.set('log level', 1);
io.sockets.on('connection', function(socket){
  var messenger = new Messenger(socket);
  socket.on('login', messenger.login);
  socket.on('getPhotoSets', messenger.getPhotoSets);
  socket.on('getPhotoSet', messenger.getPhotoSet);
});