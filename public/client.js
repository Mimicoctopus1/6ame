var gameMode = "flat";
const socket = io();

const messages = document.querySelector('#messages');
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const rcmenu = document.querySelectorAll('.rcmenu')[0];

input.addEventListener('keyup', function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {/*When enter is pressed...*/
    console.log(input.firstChild);/*The program seems to always put the message in a div, so I'm selecting the innerHTML of the 
    firstChild (the div). Apparently you don't have to use firstChild.innerHTML. I don't know why.*/
	  socket.emit('message', input.firstChild.innerHTML);/*Send a message to the server, index.js.*/
    input.innerHTML = "";/*Clear the entry area.*/
  }
});

var print = function(msgToPrint) {
	let printItem = document.createElement('li');
	printItem.innerHTML = msgToPrint;
	messages.appendChild(printItem);
}

socket.on('chat', function (msg) {
	let printItem = document.createElement('li');
	printItem.innerHTML = msg;
	messages.appendChild(printItem);
});

var admin = function(command, p) {/*This function is for me and me only. When you call it, entering the password as an argument,
it sends the password to index.js, which */
  socket.emit("admin", [command, p]);/*Bundle all the info and send to index.js.*/
}

/*Edit the right click menu*/
var handlecontextmenu = function(e) {
	/*Stop the right click menu from working the way it usually does.*/
	e.preventDefault();

	rcmenu.style.display = 'block';
  rcmenu.style.position = "absolute";
	rcmenu.style.left = e.pageX - 50 + 'px';
	rcmenu.style.top = e.pageY - 20 + 'px';
};

document.addEventListener('contextmenu', handlecontextmenu);