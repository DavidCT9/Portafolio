/*
    Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
    to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.
var numInput = $("#num"); 

var sieve = function (num) {
  "use strict";

  num = parseInt(num);
  let primes = 0;
  const criba = Array(num + 1).fill("0");

  const limite = Math.ceil(Math.sqrt(num));

  for (let p = 2; p <= limite; p++) {
    if (criba[p] === "0") {
      for (let i = p * p; i <= num; i += p) {
        criba[i] = "1";
      }
    }
  }

  for (let i = 2; i <= num; i++) {
    if (criba[i] === "0") {
      primes += 1;
    }
  }

  return primes;
};

$("#btn").click(function () {
  var inputNum = numInput.val(); 
  var result = sieve(inputNum);
  $("#primes").text(result); 
});

console.log(sieve(1000000));