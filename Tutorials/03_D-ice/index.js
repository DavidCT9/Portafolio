console.log("Executing");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomNumber1 = getRandomInt(1, 6);
let randomNumber2 = getRandomInt(1, 6);

function defImg(num){
    return "images/dice"+num+".png";
}

let img1 = defImg(randomNumber1);
let img2 = defImg(randomNumber2);

document.querySelector('.img1').src = img1;
document.querySelector('.img2').src = img2;

let title = document.querySelector('#title');

if (randomNumber1 > randomNumber2) {
    title.textContent = "The winner is Player 1";
}
else if (randomNumber2 > randomNumber1) {
    title.textContent = "The winner is Player 2";
} else {
    title.textContent = "It's a tie!";
}

console.log("Num1: "+randomNumber1);
console.log("Num2: "+randomNumber2);
