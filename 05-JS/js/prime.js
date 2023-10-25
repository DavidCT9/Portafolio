/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

function isPrime(n) {
  var i;

  "use strict";
  for (var i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

var getPrimeFactors = function (n) {
  "use strict";
  n=parseInt(n);


  var sequence = [];
  for (var i = 2; i <= n; i++) {
    if (isPrime(i) && n % i === 0) {
      sequence.push(i);
      n /= i;
    }
  }

  console.log(sequence);
  return sequence;

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime

};

$("#btn").click(function () {
  var inputNum = $("#num").val(); 
  var result = getPrimeFactors(inputNum);
  $("#pf").text(result); 
});


// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));
