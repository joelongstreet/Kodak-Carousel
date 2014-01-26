var dirty = require('dirty');
var Flapi = require('flapi');


exports.createClient = function(next){

  var settings = dirty('./db/settings.db');
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

    makeNewCient(opts);
  });


  var makeNewCient = function(opts){
    var client = new Flapi(opts);
    if(!opts.oauth_token){
      client.authApp('http://localhost:3000/auth_callback', function(oauthResults){
        console.log('Flickr Initialized');
        settings.set('oauth', oauthResults);
        next(client);
      });
    } else{
      console.log('Flickr Initialized');
      next(client);
    }
  };
};