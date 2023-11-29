import {io} from 'socket.io-client'; /*I don't really need this because it's already imported
in index.html, but I keep getting an error: 

line 12: io is not defined.

So, I'm putting this anyways, even though, honestly, I like <script> imports more.*/

var game = {
	mode: 'flat',
};

const socket = io();

const messages = document.querySelector('#messages');
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const rcmenu = document.querySelectorAll('.rcmenu')[0];

form.addEventListener('submit', function (e) {
	e.preventDefault();
	if (input.value != '') {
		socket.emit('chat message', input.value);
		input.value = '';
	} else {
		socket.emit('chat message', '👍 Like!');
	}
});

socket.on('chat message', function (msg) {
	var item = document.createElement('li');
	item.innerHTML = msg;
	messages.appendChild(item);
});

/*Edit the right click menu*/
var handlecontextmenu = function (e) {
	/*Stop the right click menu from working the way it usually does.*/
	e.preventDefault();

	rcmenu.style.position = 'absolute';
	rcmenu.style.display = 'block';
	rcmenu.style.left = e.pageX + 'px';
	rcmenu.style.top = e.pageY + 'px';
};

document.addEventListener('contextmenu', handlecontextmenu);
