var mediator = new Marionette.Controller();
var app = {};


mediator.setApp = function(theApp){
  app = theApp;
};


var viewUpdate = function(newView){
  app.mainRegion.show(newView);
};


var login = function(username){
  var socket = require('./socket');
  socket.emit('login', { username : username });
};


// Mediator Events
mediator.on('viewUpdate', viewUpdate);
mediator.on('login', login);


module.exports = mediator;