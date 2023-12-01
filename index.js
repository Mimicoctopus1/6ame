import express from "express";
import * as fs from "fs";                   /*File Reader*/
import {createServer} from "node:http";
import {Server} from "socket.io";      /*socket.io SERVER end*/

const app = express();
const server = createServer(app);
const io = new Server(server);





console.log(process.env.variable);









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

/*Make files to read and write JSON*/
var readJSON = function(jsonFileName) {
  try {
    let returnData = fs.readFileSync(jsonFileName);
    return(JSON.parse(returnData));
  } catch(error) {
    throw error; /*Send an error to the terminal*/
    console.error(error); /*Send an error to the user console and the Glitch logs.*/
  }
};
var writeJSON = function(jsonFileName, dataToSave) {
  try {
    fs.writeFileSync(jsonFileName, JSON.stringify(dataToSave));
  } catch(error) {
    throw error; /*Send an error to the terminal*/
    console.error(error); /*Send an error to the user console and the Glitch logs.*/
  }
};