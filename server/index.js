//express and socket.io server
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const clients = [];

io.on('connection', function(client) {
    
    this.emit('hello', 'Hello react client...');
    client.on('createUser', function(data) {
        console.log('data: ', data);
        let currentClient = data;
        currentClient.cid = client.id;
        clients.push(data);
        console.log('clients: ', clients)
    });
    client.on('messages', function(data) {
        console.log(data)
        client.broadcast.emit('thread', data);
    });
    client.on('hello', function(data) {
        console.log(data);
    });
    
    client.on('disconnect', function(data) {
        let userLeaving = clients.find((c) => {
            return c.cid === client.id;
        });
        client.broadcast.emit('userLeftRoom', userLeaving)
    });
});

// io.sockets.on('connection', function(socket) {
//     socket.on('disconnect', function() {
//         console.log('user has left');
//     });
// });

server.listen(9999, () => console.log('Server listening on 9999...'));