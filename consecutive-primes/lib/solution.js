'use strict';

// The prime 41, can be written as the sum of six consecutive primes:

// 41 = 2 + 3 + 5 + 7 + 11 + 13
// This is the longest sum of consecutive primes that adds to a prime below one - hundred.

// The longest sum of consecutive primes below one - thousand that adds to a prime, contains 21 terms, and is equal to 953.

// Which prime, below one - million, can be written as the sum of the most consecutive primes ?

const isPrime = (number, primeArray) => {
  for (let primeNumber of primeArray) {
    if (number % primeNumber === 0) {
      return false;
    }
  }
  return true;
};

const generatePrimesArray = largestPrime => {
  const primeArray = [2];
  let currentNumber = 3;
  while (currentNumber < largestPrime) {
    if (isPrime(currentNumber, primeArray)) {
      primeArray.push(currentNumber);
    }
    currentNumber += 2;
  }
  return primeArray;
};

const longestConsecutivePrimeSum = checkRange => {
  const primeArray = generatePrimesArray(1000000);
  let primeFound = null;
  let longestChain = 0;
  for (let i = checkRange; i > 0; i--){
    if (i < longestChain) break;
    for (let j = 0; j < i; j++){
      if (i - j < longestChain) break;
      const currentChain = primeArray.slice(j, i);
      const currentSum = currentChain.reduce((a, e) => a + e, 0);
      if (currentSum > 999999) continue;
      if (primeArray.includes(currentSum)){
        longestChain = i - j;
        primeFound = currentSum;
      }

    }
  }
  return primeFound;
};

console.log(longestConsecutivePrimeSum(1000));