var socket = io.connect('http://localhost');
var mediator = require('./mediator');
var userId = {};


var message = function(data){
  var Message = require('./views/message');
  var model = new Backbone.Model(data);
  mediator.trigger('viewUpdate', new Message({ model : model }));
};


var loginFailure = function(){
  var LoginView = require('./views/login');
  mediator.trigger('viewUpdate', new LoginView());
};


var loginSuccess = function(data){
  var Message = require('./views/message');
  var model = new Backbone.Model({
    type: 'success',
    text: 'Successfully logged in, fetching photo set'
  });
  userId = data.user.id;

  mediator.trigger('viewUpdate', new Message({ model : model }));
  socket.emit('flickr.photosets.getList', { user_id : userId });
};


var photoSetList = function(data){
  console.log(data);
};


// Socket Routes
socket.on('login:failure', loginFailure);
socket.on('login:success', loginSuccess);
socket.on('message', message);
socket.on('flickr.photosets.getList', photoSetList);


module.exports = socket;