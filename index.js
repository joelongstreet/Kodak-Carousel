var express = require('express');
var http = require('http');
var routes = require('./lib/routes');
var app = express();

app.use(express.static(process.cwd() + '/public'));

app.get('/*', routes.ui);
app.get('/api/user/authorize', routes.getAuthURL);
app.get('/api/auth_callback', routes.authCallback);
app.get('/api/:method', routes.makeFlickrRequest);

var server = http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
  console.log('sockets connected');
});