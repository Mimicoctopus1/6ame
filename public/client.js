var gameMode = "flat";
const socket = io();/*Ignore this error. io is defined in index.html.*/

const messages = document.querySelector('#messages');
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const rcmenu = document.querySelectorAll('.rcmenu')[0];

input.addEventListener('keyup', function(e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
	  if(input.innerHTML != '<div><br></div><div><br></div>') { /*Check if there's anytihng in the text box.*/
		  socket.emit('message', input.innerHTML);
		  input.innerHTML = '';
    } else {
		  socket.emit('message', '👍 Like!'); /*Default message.*/
	  }
  }
});

socket.on('message', function (msg) {
	var item = document.createElement('li');
	item.innerHTML = msg;
	messages.appendChild(item);
});

var admin = function() {/*Make a function that gives all the admin functions that are to be used from the console only.*/
  console.log("");
}

var watch = function(cmnd, p1) {/*Create a function that can be accessed from the dev console to be constantly notified about
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