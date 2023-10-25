/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers
var memo = {};

function fibonacci(n) {
  "use strict";
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    return memo[n];
  } else {
    // Create an empty array to store the calculated Fibonacci numbers
    var value = [];

    // Calculate the Fibonacci numbers up to the requested number
    for (var i = 0; i <= n; i++) {
      value.push(i <= 1 ? i : value[i - 1] + value[i - 2]);
    }

    // Store the calculated Fibonacci number in the memory array
    memo[n] = value;

    // Return the last element of the array, which is the Fibonacci number for the requested number
    return value[n];
  }
}

/*$("#btn").click(function () {
  $("#fibonacciLbl").text(fibonacci($("#num").val()));
});*/

$("#btn").click(function () {
  var inputNum = $("#num").val(); 
  var result = fibonacci(inputNum);
  $("#fibonacciLbl").text(result); 
});

console.log(fibonacci(15));
