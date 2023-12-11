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
  /*Admin is basically a way for the game's moderators to have admin features like watching your every move and banning you! Of
  course, you have to log in, but the password is in the .env file.*/
	socket.on('admin', function(arg) {/*When a client attempts to become admin...*/
		let command = arg[0];           /*The command the client is attempting to use...*/
		let parameters = arg[1];        /*The parameters the client entered in.*/
    /*If the command is the password in .env...*/
		if(command === process.env.adminPassword){
      socket.emit("log", "Logged in! Unless you are in Incognito or Private Browsing, you will stay logged in until you" + 
      "clear localStorage, clear browsing data, or run admin(\"logout\")");/*Have the client log a message.*/
      localStorage.adminPassword = command; /*Save the password on the user's computer to prove they have logged in.*/
    } else if(localStorage.adminPassword === process.env.adminPassword) {/*Otherwise, if you are logged in or have
    logged in before...*/
      /*All the admin commands you can use:*/
      if(command === "watch"){
        
      } else {
        socket.emit("log")
      }
    } else {/*If you don't know the password or have never logged in before...*/
      socket.emit("log", "You are logged out and what you just entered in is not the correct password.\nUse " +
      "admin(~PASSWORD GOES HERE~) to sign in.");/*Tell the user the password is incorrect.*/
      
    }
	});

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

/*Make files to read and write JSON*/{
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
};}
