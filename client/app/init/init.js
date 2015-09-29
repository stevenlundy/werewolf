angular.module('werewolf.start', [])
  .controller('StartController', function (socket){

    this.joinRoom = function() {
      socket.emit('joinRoom', {
        roomcode: this.roomcode,
        username: this.username
      });
    };
    this.createGame = function() {
      socket.emit('createRoom');
    };

    socket.on('message', function (err) {
      console.log(err);
    });
    socket.on('joinRoom', function (msg) {
      console.log(msg);
      console.dir(socket);
    });
    socket.on('newUser', function (msg) {
      console.log(msg);
    });
    socket.on('hostGame', function (roomcode) {
      console.log('Waiting for players to join ' + roomcode);
      console.dir(socket);
    });
  });