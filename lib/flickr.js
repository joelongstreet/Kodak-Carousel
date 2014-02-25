var Flapi = require('flapi');
var accessToken = null;
var flapiClient = null;


var makeNewClient = function(opts, next){
  flapiClient = new Flapi({
    oauth_consumer_key    : process.env.FLICKR_KEY,
    oauth_consumer_secret : process.env.FLICKR_SECRET
  });
};


exports.client = function(){
  return flapiClient;
};


exports.resetToken = function(next){
  makeNewClient(null, next);
};


exports.api = function(opts){
  opts.accessToken = accessToken;
  flapiClient.api(opts);
};


makeNewClient();
