import express from 'express';
import * as fs from 'fs'; /*File Reader*/
import {createServer} from 'node:http';
import {Server} from 'socket.io'; /*socket.io (SERVER end)*/

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
	/*Only execute the below once connected to the server.*/
	console.log('Server running at http://localhost:3000');

  /*Make a function that reads a specified json file.*/
	var readJSON = function (jsonFileName) {
		/*Read the file with the fs module, then use the built-in JSON.parse function to convert it from strings of digits and letters
  to readable js objects.*/
		try {
			return JSON.parse(fs.readFileSync(jsonFileName));
		} catch (error) {
			console.error(error);/*Give an error to the user console and the logs in the Glitch toolbar*/
			throw error;         /*Give an error to the server/terminal*/
		}
	};

	/*Make a function that gets the location to save data to and what to write.*/
	var writeJSON = function (jsonFileName, dataToWrite) {
		/*Writes that data by */
		try {
			fs.writeFileSync(JSON.stringify(jsonFileName), dataToWrite);
		} catch (error) {
			console.error(error);/*Give an error to the user console and the logs in the Glitch toolbar*/
			throw error;         /*Give an error to the server/terminal*/
		}
	};

	console.log(readJSON('game.json'));
}); /*Only execute the above when connected to the server.*/
