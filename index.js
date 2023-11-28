import express from "express";
import * as fs from "fs";                   /*File Reader*/
import {createServer} from "node:http";
import {Server} from "socket.io";      /*socket.io SERVER end*/

const app = express();
const server = createServer(app);
const io = new Server(server);

// var game = fs.readFileSync("/game.json");

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

server.listen(3000, function() {
    console.log('server running at http://localhost:3000');
});

fs.readFile("game.json", function(error, data) {
  if(error) {
    console.error(error);
    throw error;
  }

  // parsing the JSON object
  // to convert it to a JavaScript object
  const user = JSON.parse(data);

  // printing the JavaScript object
  // retrieved from the JSON file
  console.log(user);
});