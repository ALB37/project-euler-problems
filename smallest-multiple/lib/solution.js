'use strict';

// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20 ?

const smallestEvenDivision = number => {
  let smallestNumber = 1;
  const numberArray = [];
  for (let value = 1; value <= number; value++){
    smallestNumber *= value;
    numberArray.push(value);
  }
  const primeArray = numberArray.filter(value => isPrime(value));
  const smallestPossibleNumber = primeArray.reduce((acc, val) => {
    return acc * val;
  }, 1);
  let countDown = smallestNumber;
  while (countDown > smallestPossibleNumber){
    for (let value = 2; value <= number; value++){
      if (countDown % value !== 0) break;
      if (countDown % value === 0 && value === number){
        smallestNumber = countDown;
      }
    }
    countDown -= number;
  }
  return smallestNumber;
};

const isPrime = number => {
  for (let factor = 2; factor < number; factor++) {
    if (number % factor === 0) {
      return false;
    }
  }
  return true;
};

console.log(smallestEvenDivision(20));