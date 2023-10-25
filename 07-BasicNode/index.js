console.log("Hello World");
const sw = require("star-wars-quotes");
const superheroes = require('superheroes');
const supervillains = require('supervillains');

/*console.log(sw());*/

/*
superheroes adn super villians */

/*
const fs = require("fs");
fs.readFile("input.txt", "utf-8", (err, fd) => {
    console.log("error:" + err)
    console.log("Content of the file: \n" + fd)
});*/

console.log("Yeah finally " + superheroes.random() + "will svae us from the destruction of all our city, and all thanks to " + supervillains.random());