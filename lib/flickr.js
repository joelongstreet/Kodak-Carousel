var dirty = require('dirty');
var Flapi = require('flapi');
var settings = dirty('./db/settings.db');
var flapiClient = null;


settings.on('load', function(){
  var opts = {
    oauth_consumer_key    : process.env.FLICKR_KEY,
    oauth_consumer_secret : process.env.FLICKR_SECRET,
    perms                 : 'delete'
  };

  var oauthOpts = settings.get('oauth');
  if(oauthOpts){
    opts.oauth_token        = oauthOpts.oauth_token;
    opts.oauth_token_secret = oauthOpts.oauth_token_secret;
  }

  makeNewClient(opts);
});


var makeNewClient = function(opts){
  var appAuthURL = 'http://localhost:3000/flickr/auth_callback';
  flapiClient = new Flapi(opts);

  if(!opts.oauth_token){
    flapiClient.authApp(appAuthURL, function(oauthResults){
      console.log('Flickr Initialized');
      settings.set('oauth', oauthResults);
    });
  } else{
    console.log('Flickr Initialized');
  }
};


exports.client = function(){
  return flapiClient;
};