import express from "express";
import * as fs from "fs";                   /*File Reader*/
import {createServer} from "node:http";
import {Server} from "socket.io";      /*socket.io SERVER end*/

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(new URL('./public/client.html', import.meta.url).pathname);
});

io.on('connection', function (socket) {
    console.log('A user connected!');
    socket.on('disconnect', function () {
      console.log('A user disconnected!');
    });
  
  
    socket.on('message', function (msg) {/*When the user types something*/
      console.log('used: ' + msg);
      
      let messageWords = msg.split(" "); /*Split the string by whitespaces.*/
      let cmnd = messageWords[0]; /*cmnd is the first word of the message*/
      
      /*The next few code blocks check if the cmnd is a certain word, then decides what to do after that.*/
      if(["chat", "say", "talk"].includes(cmnd)) {
        
      }
      if(["whisperto", "sayto", "talkto", "tell"].includes(cmnd)) {
        
      }
      if(["settings"].includes(cmnd)) {
        if(["notifications"].includes(messageWords[1])) {
          if(["on"].includes(messageWords[2])) {
            io.emit("Would you like to activate notifications? Type \n`settings notifications activate` to ");
          } else {
            
          }
        }
      }
      
      /*Blank template*/
      if([].includes(cmnd)) {
        
      }
      /*Blank template*/
      
      io.emit('message', msg);
    });
});

server.listen(3000, function() {
    console.log('server running at http://localhost:3000');
});

/*Make files to read and write JSON*/
var readJSON = function(jsonFileName) {
  try {
    let returnData = JSON.parse(fs.readFileSync(jsonFileName));
    return(returnData);
  } catch(error) {
    throw error; /*Send an error to the terminal*/
    console.error(error); /*Send an error to the user console and the Glitch logs.*/
  }
};

var writeJSON = function(jsonFileName, dataToSave) {
  try {
    fs.writeFileSync(jsonFileName, JSON.stringify(dataToSave));
    return(true); /*Return that the data save was successful.*/
  } catch(error) {
    throw error; /*Send an error to the terminal*/
    console.error(error); /*Send an error to the user console and the Glitch logs.*/
    return(false); /*Return that the data save was unsuccessful.*/
  }
};