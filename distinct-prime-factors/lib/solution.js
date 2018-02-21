'use strict';

// The first two consecutive numbers to have two distinct prime factors are:

// 14 = 2 × 7
// 15 = 3 × 5

// The first three consecutive numbers to have three distinct prime factors are:

// 644 = 2² × 7 × 23
// 645 = 3 × 5 × 43
// 646 = 2 × 17 × 19.

// Find the first four consecutive integers to have four distinct prime factors each.What is the first of these numbers ?

const isPrime = (number, primeArray) => {
  for (let primeNumber of primeArray) {
    if (number % primeNumber === 0) {
      return false;
    }
  }
  return true;
};

const generatePrimesArray = largestPrime => {
  const primeArray = [];
  let currentNumber = 2;
  while (currentNumber < largestPrime) {
    if (isPrime(currentNumber, primeArray)) {
      primeArray.push(currentNumber);
    }
    currentNumber++;
  }
  return primeArray;
};

const distinctPrimeIntegers = limit => {
  let primes = generatePrimesArray(limit);
  let consecutiveNumbers = [];
  for (let number = 647; number < limit; number++){
    const primeFactors = [];
    for (let prime of primes){
      if (prime > number) break;
      if (number % prime === 0){
        primeFactors.push(prime);
      }
    }
    if (primeFactors.length > 3){
      consecutiveNumbers.push(number);
      if (consecutiveNumbers.length === 4){
        return consecutiveNumbers[0];
      }
    } else {
      consecutiveNumbers = [];
    }
  }
};

console.log(distinctPrimeIntegers(150000));