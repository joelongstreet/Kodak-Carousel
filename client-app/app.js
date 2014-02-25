var socket = require('./socket');
var mediator = require('./mediator');
var LoginView = require('./views/login');

var app = new Marionette.Application();
app.addRegions({ mainRegion: '#main' });

app.addInitializer(function(){
  mediator.setApp(app);
  mediator.trigger('viewUpdate', new LoginView());
});

$(function(){
  app.start();
  Backbone.history.start({ pushState : true });
});
