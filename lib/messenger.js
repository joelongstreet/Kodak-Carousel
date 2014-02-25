var flickr = require('./flickr');
var dirty = require('dirty');
var users = dirty('./db/users.db');


module.exports = function(socket){

  var photoSetsDb = null;
  var photoSetDb = null;
  var createDbReferences = function(username){
    photoSetsDb = dirty(
      './db/photoSets-' + username + '.db'
    );

    photoSetDb = dirty(
      './db/photoSet-' + username + '.db'
    );
  };


  var createUser = function(username){
    flickr.api({
      method: 'flickr.people.findByUsername',
      params: {username: username},
      next: function(data){
        if(data.user && data.user.id){
          users.set(data.username, { id : data.user.id });
          socket.emit('login:success');
        } else if(data.code == 98){
          socket.emit('message',
            {text : 'Auth token expired, fetching a new one... hold tight' }
          );
          flickr.resetToken(createUser);
        } else{
          socket.emit('message',
            {text : 'Failed to find any flickr data for ' + username }
          );
          setTimeout(function(){
            socket.emit('login:failure');
          }, 2500);
        }
      }
    });
  };


  this.login = function(data){
    var username = data.username.toLowerCase();
    createDbReferences(username);

    if(!users.get(username)){
      socket.emit('message',
        { text : 'Creating a reference for ' + data.username }
      );

      createUser(username);
    } else
      socket.emit('loggedIn', user.get(data.username));
  };


  this.getPhotoSets = function(data){

  };


  this.getPhotoSet = function(data){

  };
};