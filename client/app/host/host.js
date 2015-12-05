angular.module('werewolf.host', [])
  .controller('HostController', function (socket, $routeParams){
    this.roomcode = $routeParams.roomcode;
    this.players = [];

    this.startGame = function() {
      socket.emit('startGame');
    };

    socket.on('newPlayer', function(player) {
      this.players.push(player);
    }.bind(this));

  });
