var gameMode = "flat";
const socket = io();/*Ignore this error. io is defined in index.html.*/

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

socket.on('print', function (msg) {
	let printItem = document.createElement('li');
	printItem.innerHTML = msg;
	messages.appendChild(printItem);
});

var admin = function(commandToExplain) {/*Make a function that gives all the admin functions that are to be used from the 
console by moderators, or explains how one is used if the commandToExplain parameter is given.*/
  if(commandToExplain == "watch") {
    console.log("watch(cmnd, settings);\nAfter using, takes cmnd and watches all prints given to anybody, logging them to your " +
                "console")
  } else {
    console.log("admin\nwatch");
  }
}

var watch = function(cmnd, settings) {/*Create a function that can be accessed from the dev console to be constantly notified 
about
certain */
  
};

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