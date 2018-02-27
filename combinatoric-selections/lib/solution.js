'use strict';

// There are exactly ten ways of selecting three from five, 12345:

// 123, 124, 125, 134, 135, 145, 234, 235, 245, and 345

// In combinatorics, we use the notation, 5C3 = 10.

// In general,

//   nCr =
//   n!
// r!(n−r)!
//   , where r ≤ n, n! = n×(n−1) ×...×3×2×1, and 0! = 1.
// It is not until n = 23, that a value exceeds one - million: 23C10 = 1144066.

// How many, not necessarily distinct, values of  nCr, for 1 ≤ n ≤ 100, are greater than one - million ?

const bigInt = require('big-integer');

const factorial = number => {
  if (number === 0 || number === 1) return bigInt(1);
  if (number === 2) return bigInt(2);
  let previousFactorial = bigInt(1);
  let newFactorial = null;
  for (let value = 2; value <= number; value++) {
    newFactorial = bigInt(value).multiply(previousFactorial);
    previousFactorial = newFactorial;
  }
  return newFactorial;
};

const combinations = (n, r) => {
  return factorial(n).divide((factorial(r).multiply(factorial(n - r))));
};

const combinationsGreater = (range, limit) => {
  let largeNumberOfCombinations = 0;
  for (let n = 1; n <= range; n++){
    for (let r = n; r > 0; r--){
      if (combinations(n, r).greater(bigInt(limit))){
        largeNumberOfCombinations++;
      }
    }
  }
  return largeNumberOfCombinations;
};

console.log(combinationsGreater(100, 1000000));