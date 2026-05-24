const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let currentBid = 100;
app.use(express.static(__dirname));
io.on('connection', (socket) => {
    socket.emit('updateBid', currentBid);
    socket.on('placeBid', (amount) => {
        if (amount > currentBid) {
            currentBid = amount;
            io.emit('updateBid', currentBid);
        }
    });
});
server.listen(3000, () => console.log('Server running'));
