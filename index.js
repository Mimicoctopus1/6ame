import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(new URL('./public/index.html', import.meta.url).pathname);
});

io.on('connection', function (socket) {
    console.log('A user connected!');
    socket.on('disconnect', function () {
        console.log('A user disconnected!');
    });
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(3000, function () {
    console.log('server running at http://localhost:3000');
});
