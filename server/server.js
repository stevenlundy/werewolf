var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8011;

app.use('/', express.static(__dirname + '/../client'));

var rooms = {};

var generateRoomCode = function () {
  return [0,0,0,0].map(getRandomLetter).join('');
}

var getRandomLetter = function () {
  return String.fromCharCode('A'.charCodeAt(0) + getRandomBetween(0, 26));
}

var getRandomBetween = function (min, max) {
  // (integer min, integer max) -> integer
  return Math.floor(Math.random()*(max - min)) + min;
}

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('joinRoom', function(roomcode, username) {
    roomcode = roomcode.toUpperCase();
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
      var roomcode = generateRoomCode();
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