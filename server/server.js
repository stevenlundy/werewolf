var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var helpers = require('./helpers');

var port = process.env.PORT || 8000;

app.use('/', express.static(__dirname + '/../client'));

var rooms = {};

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('joinRoom', function(data) {
    username = data.username;
    roomcode = data.roomcode.toUpperCase();
    if(roomcode in rooms) {
      rooms[roomcode].users.push(username);
      socket.username = username;
      socket.room = roomcode;
      socket.join(roomcode);
      socket.emit('joinRoom', 'You joined ' + roomcode);
      socket.broadcast.to(roomcode).emit('newUser', username + ' just joined ' + roomcode);
    } else {
      socket.emit('message', roomcode + ' does not exist');
    }
  });
  socket.on('createRoom', function() {
    do {
      var roomcode = helpers.generateRoomCode();
    } while (roomcode in rooms);
    rooms[roomcode] = {
      users: []
    };
    socket.room = roomcode;
    socket.join(roomcode);
    console.log(roomcode + ' created');
    socket.emit('hostGame', roomcode);
  });
});

server.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});