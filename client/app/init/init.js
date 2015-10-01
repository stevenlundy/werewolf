angular.module('werewolf.start', [])
  .controller('StartController', function (socket, $location){

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
    socket.on('joinRoom', function (roomcode) {
      console.log(roomcode);
      //console.dir(socket);
    });
    socket.on('hostGame', function (roomcode) {
      $location.path('/host/'+roomcode);
      console.log('Waiting for players to join ' + roomcode);
      //console.dir(socket);
    });
  });