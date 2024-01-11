# OJVJPJ.game

### Inside Code

* index.js renders the client files by displaying `public/client.html`.
  * I use [this tutorial](https://www.w3schools.com/nodejs/nodejs_email.asp) to send emails.
* public folder
  * `public/client.html` imports `public/client.css` and runs `public/client.js`.
  * Uses everything found in [this](https://www.freecodecamp.org/news/upload-files-with-html/) tutorial to get files from users.
  * Screen recording with this [DEV.to](https://shorturl.at/erzMN) article. It might take a while to understand but it's worth it.
  * Pointer Lock API to lock the pointer, which doesn't freeze the pointer in place but hides it, allows it to go past the edges of the screen, makes all events go to a single element, and gives special data during the lock session.
* Uses socket.io for websocket API (for lack of better resources). Brief socket.io explanation to make a chat app (yes, another 
chat app) can be found in the [examples/socket.io folder](https://glitch.com/edit/#!/ojvjpj?path=examples%2Fsocket.io%2Fserver.js%3A1%3A0) (new tab only. 
CTRL + Click).
* .env is the environment variables (secrets) file. I don't use this for user data because when you edit it from JS, you can't
make it show in the actual file.
* You can't see the `.data` files because the .data folder is hidden and you can only access it from the terminal, only nobody 
can get to the terminal unless they're an editor, have the link, or have remixed the project, but when you remix the project, 
the .data folder disappears. If you're remixing this, you may want to create the .data/userdata.json file. The structure of the file looks something like this:
{
  "username": {
    "password": "password",
    "media": ['https://example.com/1.png']
  },
  "JohnDoe": {
    "password": "ooga-booga",
    "media": ['https://cdn.leech.com/adfu9eufiue9fuiidoasuf9euo/dancing%20video.mvk']
  },
  "Mimicoctopus1": {
    "password": "abc123",
    "media": ['https://example.com/NO, that is NOT my real password.']
  }
}




* .gitignore tells which files for git to ignore
* .prettierrc is my [PRETTIER](https://prettier.io) format. If you would like to use the default PRETTIER format, simply delete
the .prettierrc file and it will use the same format as Glitch.
* LICENSE is the MIT LICENSE document.
* README.md is this file, which explains everything about this repository.
* game.json is the big file of everything in the game. It saves data that isn't stored in .env, such as not-so-secret character
info (everything but usernames and passwords.) it has every building and characeter. If you are remixing this for world 
building, this is where you want to go. Note: this updates as players play the game, so don't wonder why it looks different
sometimes. If it *doesn't* change as people play, that's because you need to run `refresh` in the terminal to sync everything 
up 
[(more info here)](https://tinyurl.com/makefswork). I use node:fs to make the JSON files update 
([great tutorial here](https://www.atatus.com/blog/read-write-a-json-file-with-node-js/)).
* manifest.json is like package.json but it only is used when you download the file as a 
[Progressive Web App](https://glitch.com/edit/#!/glitch-hello-installable) (
[TUTORIAL](https://dev.to/developertharun/convert-any-website-into-a-pwa-in-just-3-simple-steps-35pp)).
* media.mkv is actually a video file. When you stream a video in the game, this is where it goes. If you click it, you won't be very impressed, because it's just binary data. Now you may be wondering, what's stopping me from just downloading this video and watching it? Nothing but honor code and the fact that it is overwriten with a *special* video whenever the 
* package.json is the file in every Node.js repo that explains what you need to run it, how it imports, what it imports, its
version number, name, and description.
* species.json. Don't touch it unless you really are adding more species to this game in a remix. The species.json file is just 
my notes on the species in this game, and where each one is in the tree of life.
* Console VS. Terminal VS. Logs
  * Terminal: The terminal is like all the apps things that come with a desktop, only in text format: File explorer, task 
  manager, Package Manager (downloader), and program runner.
  * Console: The console (`Ctrl + Shift + J`) is like a terminal but for websites. (Also it can do math really quick.)
  * Logs: The build-in Glitch logs are basically the console, only you can't enter anything in: you can only *read* logs and 
  errors. Also, it takes logs and errors from index.js, not `public/client.js`.
### To-Do
If you would like to have a feature added to the game, please request to edit and send me a message the request and I will add it here, but it doesn't pop up, I'm sorry but that means I can't figure it out. Also, if you remix my project and add something cool, I would like to add that to
mine as well, so please let me know by requesting to edit and, again, putting a message in the request.
* Make whitelist for chat.
  * Allow people who know each other in real life to chat without the whitelist and with a blacklist instead to allow more freedom.
  * To prove you know somebody in real life, they must sign in on your end with their password, and you must sign in on their end with your password. You can be friends without doing this, but you will still have to use the whitelist.
* Create the stories.
* Finish fullscreen capablilty.


### Changelog
01/24/2024: FINISHED BUZZERS!
12/21/2023: Working on signin and signup features.
12/11/2023: Added tell, chat, and yell to the text command list.