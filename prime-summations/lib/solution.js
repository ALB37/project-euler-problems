'use strict';

// It is possible to write ten as the sum of primes in exactly five different ways:

// 7 + 3
// 5 + 5
// 5 + 3 + 2
// 3 + 3 + 2 + 2
// 2 + 2 + 2 + 2 + 2

// What is the first value which can be written as the sum of primes in over five thousand different ways ?

const bigInt = require('big-integer');

const generatePrimeArray = limit => {
  const primeArray = [];
  for (let num = 2; num < limit; num++){
    if (bigInt(num).isPrime()){
      primeArray.push(num);
    }
  }
  return primeArray;
};

const sumPrimeCombinations = (sum, primeArray) => {

  const arrayOfPossibleNumbers = [];
  for (let prime of primeArray) {
    arrayOfPossibleNumbers.push(prime);
  }

  const combinations = [1];
  for (let num = 0; num < sum; num++) {
    combinations.push(0);
  }
  
  for (let i = 0; i < arrayOfPossibleNumbers.length; i++) {
    for (let j = arrayOfPossibleNumbers[i]; j <= sum; j++) {
      combinations[j] += combinations[j - arrayOfPossibleNumbers[i]];
    }
  }

  return combinations[combinations.length - 1];
};

const findLargePrimeSum = limit => {
  let primeArray = generatePrimeArray(limit);
  for (let num = 10; num < limit; num++){
    if (sumPrimeCombinations(num, primeArray) < 5001){
      continue;
    } else {
      return num;
    }
  }
};

console.log(findLargePrimeSum(100));