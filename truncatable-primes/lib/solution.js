'use strict';

// The number 3797 has an interesting property.Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.

// Find the sum of the only eleven primes that are both truncatable from left to right and right to left.

//   NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.

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

const findTruncatablePrimes = largestPrime => {
  const truncatablePrimes = [];
  const primeArray = generatePrimesArray(largestPrime).map(e => e.toString());
  const invalidOuterDigits = ['1', '4', '6', '8', '9'];
  for (let prime of primeArray){
    const primeDigitsArr = prime.toString().split('');
    if (prime < 12) continue;
    if (invalidOuterDigits.includes(primeDigitsArr[0]) || invalidOuterDigits.includes(primeDigitsArr[primeDigitsArr.length - 1])) continue;
    const truncateLeft = [...primeDigitsArr];
    const truncateRight = [...primeDigitsArr];
    let leftTruncatable = true;
    let rightTruncatable = true;
    while (truncateLeft.length > 1){
      truncateLeft.shift();
      const innerPrime = truncateLeft.join('');
      if (!primeArray.includes(innerPrime)){
        leftTruncatable = false;
        break;
      }
    }
    if (!leftTruncatable) continue;
    while (truncateRight.length > 1){
      truncateRight.pop();
      const innerPrime = truncateRight.join('');
      if (!primeArray.includes(innerPrime)) {
        rightTruncatable = false;
        break;
      }
    }
    if (!rightTruncatable) continue;
    truncatablePrimes.push(prime);
  }
  return truncatablePrimes.map(e => Number(e)).reduce((acc, val) => acc + val, 0);
};

console.log(findTruncatablePrimes(739398));