'use strict';

// Starting with 1 and spiralling anticlockwise in the following way, a square spiral with side length 7 is formed.

// 37 36 35 34 33 32 31
// 38 17 16 15 14 13 30
// 39 18  5  4  3 12 29
// 40 19  6  1  2 11 28
// 41 20  7  8  9 10 27
// 42 21 22 23 24 25 26
// 43 44 45 46 47 48 49

// It is interesting to note that the odd squares lie along the bottom right diagonal, but what is more interesting is that 8 out of the 13 numbers lying along both diagonals are prime; that is, a ratio of 8 / 13 ≈ 62 %.

// If one complete new layer is wrapped around the spiral above, a square spiral with side length 9 will be formed.If this process is continued, what is the side length of the square spiral for which the ratio of primes along both diagonals first falls below 10 %?

const isPrime = (number, primeArray) => {
  for (let primeNumber of primeArray) {
    if (primeNumber > number / 2) break;
    if (number % primeNumber === 0) {
      return false;
    }
  }
  return true;
};

const generatePrimesArray = (largestPrime = 0, primeArray = [2, 3]) => {
  let currentNumber = primeArray[primeArray.length - 1] + 2;
  while (currentNumber < largestPrime) {
    if (isPrime(currentNumber, primeArray)) {
      primeArray.push(currentNumber);
    }
    currentNumber += 2;
  }
  return primeArray;
};

let index = 0;
let squareSize = 1;
let number = 1;
let incrementer = 0;
let numberOfDiagonals = 1;
let primesEncountered = 0;
let primeArray = generatePrimesArray();

while (squareSize < 50000) {
  primeArray = generatePrimesArray(number + incrementer, primeArray);
  if (index % 4 !== 0 && primeArray.includes(number)){
    primesEncountered++;
  }
  
  if (index % 4 === 0) {
    incrementer += 2;
    if (squareSize > 1 && primesEncountered / numberOfDiagonals < 0.1){
      console.log('found it!', squareSize, primesEncountered, numberOfDiagonals, primesEncountered / numberOfDiagonals);
      break;
    } else {
      console.log(number, squareSize, primesEncountered, numberOfDiagonals, primesEncountered / numberOfDiagonals);
    }
    squareSize += 2;
  }
  
  number += incrementer;
  
  index++;
  numberOfDiagonals++;
}
