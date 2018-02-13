'use strict';

// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// Find the sum of all the primes below two million.

const isPrime = (number, primeArray) => {
  for (let primeNumber of primeArray){
    if (number % primeNumber === 0){
      return false;
    }
  }
  return true;
};

const generatePrimesArray = largestPrime => {
  const primeArray = [];
  let currentNumber = 2;
  while (currentNumber < largestPrime){
    if (isPrime(currentNumber, primeArray)){
      primeArray.push(currentNumber);
    }
    currentNumber++;
  }
  return primeArray;
};

console.log(generatePrimesArray(2000000).reduce((acc, val) => acc + val, 0));