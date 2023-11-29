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
	if(input.value != '') {
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

	rcmenu.style.display = 'block';
  rcmenu.style.position = "absolute";
	rcmenu.style.left = e.pageX - 50 + 'px';
	rcmenu.style.top = e.pageY - 20 + 'px';
};

document.addEventListener('contextmenu', handlecontextmenu);
