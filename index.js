import express from 'express';
import * as fs from 'fs'; /*File Reader*/
import * as http from 'node:http';
import {Server} from 'socket.io'; /*socket.io SERVER end*/
import * as nodemailer from 'nodemailer';
import { exec } from 'child_process';

const app = express();
const server = http.createServer(app);
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
		throw error; /*Send an error to the Glitch logs.*/
		console.error(error); /*Send an error to the user console and the Glitch logs.*/
		return false; /*Return that the data save was unsuccessful.*/
	}
};

var trade = function(inv, socket, arrayMode) {
  if(arrayMode) {
    for(let i in inv) {
      let newI = {};
      for(let item in i) {
        newI[item] += 1;
      }
      i = newI;
    }
  }
  socket.emit()
}

var emailer = nodemailer.createTransport({/*Setup the account recovery emailer in case you forget your password or something.*/
  service: 'gmail',
  auth: {
    user: "lemondelightstand@gmail.com",
    pass: process.env.emailPassword
  }
});

app.use(express.static('public'));/*Tell node and express to use the public folder as the files to send to the client.*/

app.get('/', function (req, res) {
	res.sendFile(new URL('./public/client.html', import.meta.url).pathname);
});

var buzzes = [];

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
      if(readJSON(".data/userdata.json")[messageWords[1]['password']] == messageWords[2]) {/*Open up the hidden userdata file and search through it for the username, AKA the 2nd word in the command given from the client input. Get its password. If it matches the password given by the user...*/
        socket.emit('signInGranted', readJSON(".data/userdata.json")[messageWords[1]['password'], messageWords[2]]);/*Send the username and PW.*/
      } else {
        socket.emit('incorrectPasswordOrUsername');
      }
    }
    if(['signup'].includes(cmnd)) {
      if(messageWords[2] == undefined) {
        socket.emit('runSignUpProcedure'); 
      } else {
        if(readJSON('.data/userdata.json')[messageWords[1]['password']] == undefined) {
          let userdata = readJSON('.data/userdata.json');
          userdata[messageWords[1]['password']] = messageWords[2];/*Add the password to the corresponding username.*/
          writeJSON('.data/userdata.json', userdata);             /*Update userdata.json.*/
          socket.emit('usernameAndPasswordAddedToUserdata', [messageWords[1], readJSON('.data/userdata.json')[messageWords[1]]['password']]);
        } else {
          socket.emit('signUpProcedureUsernameTaken');
        }
      }
    }
		if(['trade'].includes(cmnd)) {
      trade([], socket);
		}
    
    if(['buzz'].includes(cmnd)) {
      socket.emit('buzzermode');
    }
    if(['buzzadmin'].includes(cmnd)) {
      socket.emit('buzzermode', true);
    }
    
		/*Blank template*/
		if([].includes(cmnd)) {
		}
		/*Blank template*/
	});

  socket.on("buzzDetected", function(timeStamp, name) {
    /*A buzz just came in.*/
    buzzes.push([timeStamp, name]);
    buzzes.sort(function(a, b) {/*Sort the numbers least to greatest.*/
      return a[0] - b[0]; /*If a is bigger, return a positive number, if b is bigger, return a negative number. Positive, zero, or negative determines which item goes first in the sorted array.*/
    });
    io.emit("buzzesUpdate", buzzes);
  });
  
  socket.on('clearBuzzes', function(){
    buzzes = []; /*Clear the buzzes.*/
    console.log(buzzes);
    io.emit('buzzesUpdate', buzzes);
  });
  
  socket.on('mediaUpload', function(file){
    console.log("mediaUpload")
    console.log(file);
    fs.writeFile('media.mkv', file, function(err) {/*Store the file, overwriting previous files, but upon an error...*/
      if (err) { 
        throw err; /*Throw it.*/
      }
    });
  
    /*Run the string in the terminal*//*The string saves the file in my fairly badly hidden database by its API.*/
    exec(`
      curl -X 'POST' \
      '` + process.env.fileStorageURL + "filename" +  `' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/octet-stream' \
      --data-binary '@media.mkv'`, function(error, stdout, stderr) {/*Do something with the terminal output.*/}
    );
  });
});

var file = fs.createWriteStream("media.mkv"); /*Create a file stream to get write out incoming data. Also, this mp4 doesn't look odd 🡇, right?
                                PS: Rick Astley is a popular gardener who never gives you his plants for fear they'll die.           🡇*/
var request = http.get("http://ia801509.us.archive.org/10/items/Rick_Astley_Never_Gonna_Give_You_Up/Rick_Astley_Never_Gonna_Give_You_Up.mp4", function(response) {   /*Get the .mp4 file.*/
   response.pipe(file);/*Take the response, which is going to be the data in the URL, and pipe (send) it over into the stream, which writes it.*/

   file.on("finish", function() {/*When the file is completed...*/
       file.close();             /*Terminate the file stream to save space on the server.*/
   });
});

server.listen(3000, function () {
	console.log('server running at http://localhost:3000');
});