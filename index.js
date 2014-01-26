var express   = require('express');
var http      = require('http');
var routes    = require('./lib/routes');
var app       = express();


app.get('/', routes.getAuthURL);
app.get('/user/authorize', routes.getAuthURL);
app.get('/auth_callback', routes.authCallback);
app.get('/api/:method', routes.makeFlickrRequest);


http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port 3000');
});