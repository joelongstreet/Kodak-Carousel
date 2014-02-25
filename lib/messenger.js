var flickr = require('./flickr');

module.exports = function(socket){

  var login = function(data){
    flickr.api({
      method: 'flickr.people.findByUsername',
      params: { username : data.username },
      next: function(data){
        if(data.user && data.user.id)
          socket.emit('login:success', data);
        else{
          socket.emit('message',
            { stat : 'fail', text : 'Failed to login, is your username correct?' }
          );
          socket.emit('login:failure');
        }
      }
    });
  };


  var flickrApi = function(opts){
    flickr.api({
      method: opts.method,
      params: opts.params,
      next: function(data){
        socket.emit(opts.method, data);
      }
    });
  };


  socket.on('login', login);

  var $emit = socket.$emit;
  socket.$emit = function() {
    var args = Array.prototype.slice.call(arguments);

    if(args[0].indexOf('flickr') != -1){
      flickrApi({
        method: args[0],
        params: args[1]
      });
    } else
      $emit.apply(socket, arguments);
  };
};