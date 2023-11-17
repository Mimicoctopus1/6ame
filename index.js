import express from 'express';
import { createServer } from 'node:http';
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);
console.log(server);

app.use(express.static("public"));

app.get('/', function(req, res) {
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

io.on("connection", function(socket) {
  console.log("A user connected!")
});

server.listen(3000, function() {
  console.log('server running at http://localhost:3000');
});