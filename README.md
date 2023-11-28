# OJVJPJ.game

## Inside Code

* index.js renders public/index.html, which imports public/index.css.
* Uses socket.io for websocket API (for lack of better resources). Brief socket.io explanation to make a chat app (yes, another 
chat app) can be found in the 
[socket.io-explanation folder](https://glitch.com/edit/#!/ojvjpj?path=socket.io-explanation%2Fserver.js%3A1%3A0) (new tab only. 
CTRL + Click).
* .env is the environment variables (secrets) file.
* .gitignore tells which files for git to ignore (IDK what this means if you can clarify in the comments that would be nice)
* .prettierrc is my [PRETTIER](https://prettier.io) format. If you would like to use the default PRETTIER format, simply delete
the .prettierrc file and it will use the same format as Glitch.
* LICENSE is the MIT LICENSE document.
* README.md is this file, which explains everything about this repository.
* game.json is the big file of everything in the game. It saves data that isn't stored in .env, such as not-so-secret character
info (everything but usernames and passwords.) it has everybuilding. If you are remixing this for world building, this is where
you want to go.
* package.json is the file in every Node.js repo that explains what you need to run it, how it imports, what it imports, its
version number, name, and description.
* species.json. Don't touch it unless you really are adding more species to this game in a remix. The species.json file is just 
my notes on the species in this game, and where each one is in the tree of life.