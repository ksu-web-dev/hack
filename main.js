var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log("request to /");
});

var players = {};

io.on('connection', function(socket) {

    console.log('a user connected:', socket.id);

    socket.on('newPlayer', () => {
        players[socket.id] = { 
            c: '@',
            x: 2,
            y: 2
        };
        socket.emit('currentPlayers', players);
        console.log(players);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        delete players[socket.id];
        socket.broadcast.emit('currentPlayers', players);
    });
});
