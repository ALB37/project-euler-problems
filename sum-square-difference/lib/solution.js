'use strict';

// The sum of the squares of the first ten natural numbers is,
//   1^2 + 2^2 + ... + 10^2 = 385
// The square of the sum of the first ten natural numbers is,
//   (1 + 2 + ... + 10)^2 = 55^2 = 3025
// Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.
// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

const sumSquares = number => {
  let numberArr = [];
  for (let value = 1; value <= number; value++){
    numberArr.push(Math.pow(value, 2));
  }
  return numberArr.reduce((acc, val) => acc + val, 0);
};

const squareSums = number => {
  let numberArr = [];
  for (let value = 1; value <= number; value++) {
    numberArr.push(value);
  }
  return Math.pow(numberArr.reduce((acc, val) => acc + val, 0), 2);
};

const differenceBetweenSums = number => {
  return squareSums(number) - sumSquares(number);
};

console.log(differenceBetweenSums(100));
