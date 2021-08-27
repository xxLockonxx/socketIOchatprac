const express = require('express');
const app = express();
const http = require ('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>'); <- 이건 그냥 string으로 Html 보내는 방법. Html을 진짜 보낼려면 아래 방법으로
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message', msg)
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});