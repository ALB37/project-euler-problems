'use strict';

// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.

// What is the 10 001st prime number ?

const isPrime = number => {
  for (let factor = 2; factor < number; factor++) {
    if (number % factor === 0) {
      return false;
    }
  }
  return true;
};

const primeArray = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
let current = 30;

while (primeArray.length < 10001){
  if (isPrime(current)){
    primeArray.push(current);
  }
  current++;
}

console.log(primeArray[primeArray.length - 1]);