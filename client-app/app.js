var socket = io.connect('http://localhost');
var app = new Marionette.Application();
var mediator = require('./controllers/mediator');
var Message = require('./views/message');
app.addRegions({ mainRegion: '#main' });


app.addInitializer(function(){
  new Marionette.AppRouter({
    controller: require('./controllers/routes'),
    appRoutes: {
      'login': 'login'
    }
  });
});


socket.on('message', function(data) {
  var model = new Backbone.Model({ message : data });
  mediator.trigger('viewUpdate', new Message({ model : model }));
});


mediator.on('viewUpdate', function(newView){
  app.mainRegion.show(newView);
});



$(function(){
  app.start();
  Backbone.history.start({ pushState : true });
});