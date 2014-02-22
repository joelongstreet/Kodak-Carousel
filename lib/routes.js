var path = require('path');
var dirty = require('dirty');
var users = dirty('./db/users.db');

var flickrClient;
require('./flickrConnect').createClient(function(client){
  flickrClient = client;
});


exports.ui = function(req, res){
  var htmlPath = path.join(process.cwd(), 'public/app.html');
  res.sendfile(htmlPath);
};


exports.getAuthURL = function(req, res){
  res.redirect(flickrClient.getUserAuthURL());
};


// If there's an oauth_token, we know this is a user auth.
// otherwise, it's just the app trying to auth, let it pass
exports.authCallback = function(req, res){
  if(req.query.oauth_token){
    flickrClient.getUserAccessToken(req.query.oauth_verifier, function(accessToken){
      users.set(accessToken.user_nsid, accessToken);
      res.send('Succesfully Authorized.');
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
  }
};


exports.makeFlickrRequest = function(req, res){
  var accessToken = users.get(req.query.user_id);
  var apiMethod = 'flickr.' + req.params.method;
  var params = {};

  for(var key in req.query){
    params[key] = req.query[key];
  }

  flickrClient.api({
    method      : apiMethod,
    params      : params,
    accessToken : accessToken,
    next        : function(data){
      res.send(data);
    }
  });
};