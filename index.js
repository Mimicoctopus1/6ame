import express from 'express';
import * as fs from 'fs'; /*File Reader*/
import {createServer} from 'node:http';
import {Server} from 'socket.io'; /*socket.io SERVER end*/

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(new URL('./public/client.html', import.meta.url).pathname);
});

io.on('connection', function (socket) {
  socket.on("admin", function(arg) {
    let adminCommand = arg[0];
    let parameters = arg[1];
    /*Get a few*/
  });

	socket.on('message', function (msg) {/*When an entry is received from the user...*/
    io.emit("chat", msg);/*Send it to all the other clients.*/
		let messageWords = msg.split(' '); /*Split the string by whitespaces.*/
		let cmnd = messageWords[0]; /*cmnd is the first word of the message*/
		/*The next few code blocks check if the cmnd is a certain word, then decides what to do after that.*/
		if (['chat', 'c', 'say', 'talk'].includes(cmnd)) {
			io.emit('chat', messageWords.slice(1));/*Give all the users a chat message with all the words of the message except the 
      command word.*/
		}
		if (['whisperto', 'sayto', 'talkto', 'tell', 't'].includes(cmnd)) {
		}
		if (['yell', 'y', 'scream', 'shout'].includes(cmnd)) {
		}
		if (['settings'].includes(cmnd)) {
			if (['notifications'].includes(messageWords[1])) {
				if (['on'].includes(messageWords[2])) {
					io.emit('Would you like to activate notifications? Type \n`settings notifications activate` to ');
				} else {
				}
			}
		}

		/*Blank template*/
		if ([].includes(cmnd)) {
		}
		/*Blank template*/
	});
});

server.listen(3000, function () {
	console.log('server running at http://localhost:3000');
});

/*Make files to read and write JSON*/
var readJSON = function (jsonFileName) {
	try {
		let returnData = JSON.parse(fs.readFileSync(jsonFileName));
		return returnData;
	} catch (error) {
		throw error; /*Send an error to the terminal*/
		console.error(error); /*Send an error to the user console and the Glitch logs.*/
	}
};

var writeJSON = function (jsonFileName, dataToSave) {
	try {
		fs.writeFileSync(jsonFileName, JSON.stringify(dataToSave));
		return true; /*Return that the data save was successful.*/
	} catch (error) {
		throw error; /*Send an error to the terminal*/
		console.error(error); /*Send an error to the user console and the Glitch logs.*/
		return false; /*Return that the data save was unsuccessful.*/
	}
};
