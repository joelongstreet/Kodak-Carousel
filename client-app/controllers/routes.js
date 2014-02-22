var mediator = require('./mediator');
var LoginView = require('../views/login');
var appController = new Marionette.Controller();


appController.login = function(){
  mediator.trigger('viewUpdate', new LoginView());
};


module.exports = appController;