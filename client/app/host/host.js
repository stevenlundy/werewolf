angular.module('werewolf.host', [])
  .controller('HostController', function (socket, $routeParams){
    this.roomcode = $routeParams.roomcode;
    this.players = [];

    socket.on('newPlayer', function(player) {
      console.log(player);
      this.players.push(player);
    }.bind(this));
  });