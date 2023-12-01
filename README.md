# OJVJPJ.game

### Inside Code

* index.js renders public/index.html, which imports public/index.css and runs public/client.js.
* Uses socket.io for websocket API (for lack of better resources). Brief socket.io explanation to make a chat app (yes, another 
chat app) can be found in the 
[socket.io-explanation folder](https://glitch.com/edit/#!/ojvjpj?path=socket.io-explanation%2Fserver.js%3A1%3A0) (new tab only. 
CTRL + Click).
* .env is the environment variables (secrets) file. I don't use this for anything because you when you edit the stuff in it from 
JS, it refreshes once you reload the page. Instead I use .data/userdata.json, but nobody sees this because the .data folder is 
and you can only access it from the terminal, only nobody can get to the terminal unless they're an editor, have the link, or 
have remixed the project, but when you remix the project, the .data folder disappears. If you're remixing this, you may want to 
create the .data/userdata.json file.
* .gitignore tells which files for git to ignore (IDK what this means if you can clarify in the comments that would be nice)
* .prettierrc is my [PRETTIER](https://prettier.io) format. If you would like to use the default PRETTIER format, simply delete
the .prettierrc file and it will use the same format as Glitch.
* LICENSE is the MIT LICENSE document.
* README.md is this file, which explains everything about this repository.
* game.json is the big file of everything in the game. It saves data that isn't stored in .env, such as not-so-secret character
info (everything but usernames and passwords.) it has every building and characeter. If you are remixing this for world building,
this is where you want to go. Note: this updates as players play the game, so don't wonder why it looks different sometimes. If
it *doesn't* change as people play, that's because you need to run `refresh` in the terminal to sync everything up 
[(more info here)](https://tinyurl.com/makefswork). I use node:fs to make the JSON files update 
([great tutorial here](https://www.atatus.com/blog/read-write-a-json-file-with-node-js/)).
* package.json is the file in every Node.js repo that explains what you need to run it, how it imports, what it imports, its
version number, name, and description.
* species.json. Don't touch it unless you really are adding more species to this game in a remix. The species.json file is just 
my notes on the species in this game, and where each one is in the tree of life.