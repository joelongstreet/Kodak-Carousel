var path = require('path');
var dirty = require('dirty');
var users = dirty('./db/users.db');


exports.ui = function(req, res){
  var htmlPath = path.join(process.cwd(), 'public/app.html');
  res.sendfile(htmlPath);
};


// If there's an oauth_token, we know this is a user auth.
// otherwise, it's just the app trying to auth, let it pass
exports.authCallback = function(req, res){
  if(req.query.oauth_token){
    flickr.getClient().getUserAccessToken(req.query.oauth_verifier, function(accessToken){
      users.set(accessToken.user_nsid, accessToken);
      res.send('Succesfully Authorized.');
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
  }
};