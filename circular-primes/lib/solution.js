'use strict';

// The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.

// There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.

// How many circular primes are there below one million ?

const isPrime = (number, primeArray) => {
  for (let primeNumber of primeArray) {
    if (number % primeNumber === 0) {
      return false;
    }
  }
  return true;
};

const generatePrimesArray = largestPrime => { // eslint-disable-line
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

const howManyCircularPrimes = limit => {
  let result = 0;
  const primeArray = generatePrimesArray(limit).map(e => e.toString());
  for (let prime of primeArray){
    const splitPrime = prime.split('');
    for (let digit = 0; digit < splitPrime.length; digit++){
      splitPrime.unshift(splitPrime.pop());
      if (!primeArray.includes(splitPrime.join(''))) break;
    }
    if (splitPrime.join('') === prime) result++;
  }
  return result;
};

console.log(howManyCircularPrimes(1000000));