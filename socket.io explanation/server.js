/*

This is for ESModules, Express.js, and Node.js.

First, I'll import the socket.io and express modules for the SERVER.
Of course, because this is a server, I'll need to go into the terminal
on the toolbar below and enter in 

npm install socket.io
npm install express@4

Notice the version number for express.

Next, import everything we need.
*/

import { Server } from "socket.io";
import { express } from "express";
import { createServer } from 'node:http';


/*Next, make some variables to handle express and our server.*/

const app = express();
const server = createServer(app);

/*IO! This is basically the server of socket.io, as is obviously stated.
*/
const io = new Server(server);



/*Next, I'll have express make sure to use the public folder for HTML.*/
app.use(express.static("public"));


/*Express (named app) retrieves index.html and displays it*/
app.get('/', function(req, res) {
  res.sendFile(new URL("./public/index.html", import.meta.url).pathname);
});


/*Set an event: When the server gets a connection, call a function. io automatically enters in who it connected with as the 
first argument, socket, so that it knows who the socket is.*/
io.on("connection", function(socket) {
  
  /*Log connection*/
  console.log("A user connected!");
  
  /*Have the SOCKET add an event: When it disconnects, log it on the SERVER.*/
  socket.on("disconnect", function() {
    console.log("A user disconnected!")
  });
  
  /*chat message is not a built-in event. Go to socket.io explanatioin/public/index.html now.*/
  socket.on("chat message", function(msg){
    
    
    
    
    
    
    console.log("message: " + msg);
    io.emit("chat message", msg)
  });
});

server.listen(3000, function() {
  console.log('server running at http://localhost:3000');
});