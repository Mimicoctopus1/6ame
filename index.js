import express from 'express';
import * as fs from 'fs'; /*File Reader*/
import {createServer} from 'node:http';
import {Server} from 'socket.io'; /*socket.io SERVER end*/

const app = express();
const server = createServer(app);
const io = new Server(server);

/*Make functions to read and write JSON*/
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

app.use(express.static('public'));/*Tell node and express to use the public folder as the files to send to the client.*/

app.get('/', function (req, res) {
	res.sendFile(new URL('./public/client.html', import.meta.url).pathname);
});

io.on('connection', function (socket) {
	socket.on('message', function (msg) {
		/*When an entry is received from the user...*/ let messageWords = msg.split(' '); /*Split the string by whitespaces.*/
		let cmnd = messageWords[0]; /*cmnd is the first word of the message*/
		if (['help'].includes(cmnd)) {
      
    }
			if (['chat', 'c', 'say', 'talk'].includes(cmnd)) {
				/*The next few code blocks check if the cmnd is a certain word, then decides what to do after that.*/
				/*Take all the words except the first, join them together by spaces (the opposite of .split), and send to the clients.*/
				io.emit('chat', messageWords.slice(1).join(' '));
			}
		if (['whisperto', 'sayto', 'talkto', 'tell', 't'].includes(cmnd)) {
		}
		if (['yell', 'y', 'scream', 'shout'].includes(cmnd)) {
		}
		if (['settings'].includes(cmnd)) {
			if (['notifications'].includes(messageWords[1])) {
			}
		}
    if(['signin'].includes(cmnd)) {
      if(readJSON(".data/userdata.json")[messageWords[1]] == messageWords[2]) {/*Open up the hidden userdata file and search through it for the username, AKA the 2nd word in the command given from the client input. Get the corresponding password. If it matches the password given by the */
        
      }
    }
    if(['signup'].includes(cmnd)) {
      socket.emit('run', function() {
        let printItem = document.createElement('li');
	      printItem.innerHTML = 'Great, please use<br>h';
	      document.querySelector('#messages').appendChild(printItem);
        alert();
      });
    }

		/*Blank template*/
		if ([].includes(cmnd)) {
		}
		/*Blank template*/
	});
  
  socket.on("admin", function(packagedInfo){
    let cmnd = packagedInfo[0];
    let p = packagedInfo[1];
    if(cmnd = "login") {
      
    } else {
      socket.emit("log", "Uh oh! \"" + cmnd + "\" isn't a valid command. Please try again or use admin(\"help\") for help.");
    }
  });
});

server.listen(3000, function () {
	console.log('server running at http://localhost:3000');
});
