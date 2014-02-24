var socket = io.connect('http://localhost');
var mediator = require('./mediator');
var LoginView = require('./views/login');
var Message = require('./views/message');


// Start Application
var app = new Marionette.Application();
app.addRegions({ mainRegion: '#main' });
app.addInitializer(function(){
  mediator.trigger('viewUpdate', new LoginView());
});
$(function(){
  app.start();
  Backbone.history.start({ pushState : true });
});


// Socket Events
socket.on('loginFailure', function(){
  mediator.trigger('viewUpdate', new LoginView());
});

socket.on('message', function(data) {
  var model = new Backbone.Model(data);
  mediator.trigger('viewUpdate', new Message({ model : model }));
});


// Mediator Events
mediator.on('viewUpdate', function(newView){
  app.mainRegion.show(newView);
});

mediator.on('login', function(username){
  socket.emit('login', { username : username });
});