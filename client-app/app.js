var app = new Backbone.Marionette.Application();
var mediator = require('./controllers/mediator');
app.addRegions({ mainRegion: '#main' });


app.addInitializer(function(){
  new Marionette.AppRouter({
    controller: require('./controllers/routes'),
    appRoutes: {
      'login': 'login'
    }
  });
});


mediator.on('viewUpdate', function(newView){
  app.mainRegion.show(newView);
});


$(function(){
  app.start();
  Backbone.history.start({ pushState : true });
});