var gameMode = "2D";
/*
text: Text adventure game.
2D: Flat, top-down view.
3D: 3D mode;
blind: Text adventure, only text-to-speech reads out output and voice recognition reads input.
*/

/*Initializing with functions from imports.*/

var socket = io();/*This error may be looked past; io is imported in client.html.*/

/*Establish HTML elements.*/

const messages = document.querySelector('#messages');
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const rcmenu = document.querySelectorAll('.rcmenu')[0];
const ToS = document.querySelectorAll(".ToS")[0];
const ToSCheckbox = document.querySelectorAll(".ToSCheckbox")[0];
const continueFromToS = document.querySelectorAll(".continueFromToS")[0];
const buzzerButton = document.querySelectorAll(".buzzerButton")[0];
const buzzesTableBody = document.querySelectorAll(".buzzesTableBody")[0];
const clearBuzzesButton = document.querySelectorAll(".clearBuzzesButton")[0];
const mediaPreview = document.querySelectorAll(".mediaPreview")[0];
const mediaPreviewDownload = document.querySelectorAll(".mediaPreviewDownload")[0];
const mediaPreviewStart = document.querySelectorAll(".mediaPreviewStart")[0];
const mediaPreviewStop = document.querySelectorAll(".mediaPreviewStop")[0];

/*HTML Setup*/

if(localStorage.signedIntoGame != "true") { /*If you aren't already signed into the game...*/
  //messages.innerHTML += "<li>Welcome to the OJVJPJ game. To sign in, type <code>signin</code>. For help, type <code>help</code>. You can type right after the <code>&gt</code> symbol</li>";
  messages.innerHTML += "<li>Please type the word 'buzz' right after the arrow, then press enter. <a class = 'buzzActivation' href = '#');\">Not working? Click here!</a></li>"
} else {
  socket.emit('message', 'signin ' + localStorage.username + " " + localStorage.password);/*Automatically sign in*/
  messages.innerHTML += "<li>Welcome! You are currently signed in as:<br>" + localStorage.username +"</li>"
}

if(localStorage.acceptedToS != "true") {  /*If the client has never accepted the Terms of Service...*/
  input.style.display = "none";           /*Hide the text-mode input.*/
  ToS.style.display = "block";            /*Prompt the client to accept the Terms of Service.*/
  continueFromToS.addEventListener("click", function() {/*When the continue button is clicked...*/
  if(ToSCheckbox.checked) {               /*Then if the checkbox is checked...*/
    localStorage.acceptedToS = true;      /*Save the data in localStorage.*/
    input.style.display = "inline";        /*Re-show the input.*/
    ToS.style.display = "none";           /*Hide the Terms of Service.*/
  } else {                                /*If the checkbox isn't checked...*/
    alert("You haven't clicked the checkbox yet.")
  }
});
}

input.focus();

/*Define functions*/

var print = function (msgToPrint) {
	let printItem = document.createElement('li');
	printItem.innerHTML = msgToPrint;
	messages.appendChild(printItem);
};



/*Socket event preperation*/

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

socket.on("runSignUpProcedure", function(usernameAndPassword) {
  if(usernameAndPassword == undefined) {
    print('To sign up, please enter <code>signup <span class = "argument">username</span> <span class = "argument">password</span></code>.');
  }
});

socket.on("signUpProcedureUsernameTaken", function() {
  print('Uh oh! That username is taken. Please repeat with a different username.')
});

socket.on('usernameAndPasswordAddedToUserdata', function(usernameAndPassword){
  print('Great! Your username and password have been added to the system.<br>Username: ' + usernameAndPassword[0] + "<br>Password: " + usernameAndPassword[1]);
  print('To sign into your new account, please type in signin ' + usernameAndPassword[0] + " " + usernameAndPassword[1]);
});

socket.on('signInGranted', function(words) {
  localStorage.username = words[0];
  localStorage.password = words[1];
  localStorage.signedIntoGame = "true";
});

socket.on('incorrectPasswordOrUsername', function() {
  print('That password-username combination is incorrect! Please try again.')
});

socket.on('buzzermode', function(adminOrNot) {
  buzzerButton.style.display = "block";
  if(adminOrNot) {
    clearBuzzesButton.style.display = "block";
    clearBuzzesButton.addEventListener("click", function() {
      socket.emit("clearBuzzes");
    });
  }
  localStorage.buzzerName = prompt("What would you like your buzzer name to be?");
  buzzerButton.addEventListener("click", function() {
    socket.emit("buzzDetected", new Date().getTime(), localStorage.buzzerName);
  });
});

socket.on('buzzesUpdate', function(array) {
  console.log(array)
  buzzesTableBody.innerHTML = "";
  let addArrayToBuzzesTableBodyRep = 0;
  while(addArrayToBuzzesTableBodyRep <= array.length) {
    buzzesTableBody.innerHTML += "<tr><td>" + array[addArrayToBuzzesTableBodyRep][0] + "</td><td>" + array[addArrayToBuzzesTableBodyRep][1]+ "</td></tr>";
    addArrayToBuzzesTableBodyRep += 1;
  }
  console.log(buzzesTableBody.innerHTML + " is the HTML");
});

/*Event Listeners*/

/*Edit the right click menu*/
var handlecontextmenu = function (e) {
  /*Stop the right click menu from working the way it usually does.*/
	e.preventDefault();

	rcmenu.style.display = 'block';
	rcmenu.style.position = 'absolute';
	rcmenu.style.left = e.pageX - 50 + 'px';
	rcmenu.style.top = e.pageY - 20 + 'px';
};

var handleInputKeyup = function (e) {
	if (e.key === 'Enter' || e.keyCode === 13) {
		/*When enter is pressed...*/
		socket.emit(
			'message',
			input.firstChild.textContent
		); /*Send a message to the server, index.js. The program seems to always put the message in a div, so I'm selecting the 
    textContent of the firstChild (the div).*/
		input.innerHTML = ''; /*Clear the entry area.*/
	  let printItem = document.createElement('li');
	  printItem.innerHTML = "------------------------------------------------NEW------------------------------------------------";
	  messages.appendChild(printItem);
	}
};

var enterBuzzMode = function() {
  socket.emit('message', 'buzz');
};

var enterFullscreen = function() {
  socket.emit('fullscreenCheck');/*Tell the server to check if it's a good idea to fullscreen or not.*/
};

document.addEventListener('contextmenu', handlecontextmenu);
input.addEventListener('keyup', handleInputKeyup);
document.querySelectorAll(".buzzActivation")[0].addEventListener("click", enterBuzzMode);
document.addEventListener('click', enterFullscreen);