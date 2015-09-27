var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 8007;

app.use('/', express.static(__dirname + '/../client'));

var rooms = {};

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('joinRoom', function(roomname, username) {
    if(roomname in rooms) {
      rooms[roomname].users.push(username);
      socket.username = username;
      socket.room = roomname;
      socket.emit('joinRoom', 'You joined ' + roomname);
      socket.broadcast.to(roomname).emit('newUser', username + ' just joined ' + roomname);
    } else {
      socket.emit('message', roomname + ' does not exist');
    }
  });
  socket.on('addRoom', function(roomname, username) {
    if(roomname in rooms) {
      socket.emit('message', roomname + ' already exists');
    } else {
      rooms[roomname] = {
        users: [username]
      };
      socket.username = username;
      socket.room = roomname;
      console.log(roomname + ' created');
      socket.emit('joinRoom', 'You joined ' + roomname);
      socket.broadcast.to(roomname).emit('newUser', username + ' just joined ' + roomname);
    }
  });
});

server.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening at http://%s:%s', host, port);
});