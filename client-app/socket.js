var socket = io.connect('http://localhost');
var mediator = require('./mediator');


var message = function(data){
  var Message = require('./views/message');
  var model = new Backbone.Model(data);
  mediator.trigger('viewUpdate', new Message({ model : model }));
};


var loginFailure = function(){
  var LoginView = require('./views/login');
  mediator.trigger('viewUpdate', new LoginView());
};


var loginSuccess = function(){
  var Message = require('./views/message');
  var model = new Backbone.Model({
    type: 'success',
    text: 'Successfully logged in, fetching photo set'
  });

  mediator.trigger('viewUpdate', new Message({ model : model }));
};


// Socket Routes
socket.on('login:failure', loginFailure);
socket.on('login:success', loginSuccess);
socket.on('message', message);


module.exports = socket;