var gameMode = 'flat';
const socket = io();

const messages = document.querySelector('#messages');
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const rcmenu = document.querySelectorAll('.rcmenu')[0];
const ToS = document.querySelectorAll(".ToS")[0];
const ToSCheckbox = document.querySelectorAll(".ToSCheckbox")[0];
const continueFromToS = document.querySelectorAll(".continueFromToS")[0];

if(!localStorage.acceptedToS == "true") { /*If the client has never accepted the Terms of Service...*/
  input.style.display = "none";           /*Hide the text-mode input.*/
  ToS.display = "block";                  /*Prompt the client to accept the Terms of Service.*/
  continueFromToS.addEventListener("click", function() {/*When the continue button is clicked...*/
  if(ToSCheckbox.checked) {               /*Then if the checkbox is checked...*/
    localStorage.acceptedToS = true;      /*Save the data in localStorage.*/
    ToS.style.display = "none";           /*Hide the Terms of Service.*/
  }
});
}


input.addEventListener('keyup', function (e) {
	if (e.key === 'Enter' || e.keyCode === 13) {
		/*When enter is pressed...*/
		socket.emit(
			'message',
			input.firstChild.textContent,
		); /*Send a message to the server, index.js. The program seems to always put the message in a div, so I'm selecting the 
    textContent of the firstChild (the div).*/
		input.innerHTML = ''; /*Clear the entry area. */
	}
});

var print = function (msgToPrint) {
	let printItem = document.createElement('li');
	printItem.innerHTML = msgToPrint;
	messages.appendChild(printItem);
};

socket.on('chat', function (msg) {
	let printItem = document.createElement('li');
	printItem.innerHTML = msg;
	messages.appendChild(printItem);
});

socket.on('run', function(callback) {
  callback();
});

socket.on("log", function(messageToLog) {
  console.log(messageToLog);
});

var admin = function (command, p) {
	/*This function is for me only. When you call it...*/
	socket.emit('admin', [command, p]); /*Bundle all the info and send to index.js.*/
};

/*Edit the right click menu*/
var handlecontextmenu = function (e) {
  /*Stop the right click menu from working the way it usually does.*/
	e.preventDefault();

	rcmenu.style.display = 'block';
	rcmenu.style.position = 'absolute';
	rcmenu.style.left = e.pageX - 50 + 'px';
	rcmenu.style.top = e.pageY - 20 + 'px';
};

document.addEventListener('contextmenu', handlecontextmenu);
