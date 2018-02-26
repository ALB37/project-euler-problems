'use strict';

// By replacing the 1st digit of the 2 - digit number * 3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

// By replacing the 3rd and 4th digits of 56 ** 3 with the same digit, this 5 - digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.

// Find the smallest prime which, by replacing part of the number(not necessarily adjacent digits) with the same digit, is part of an eight prime value family.


// Doing a bit of research, there are some faster algorithms for generating prime numbers.
// Looking forward I may try to implement one such as the Sieve of Atkin to improve runtime.

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

// Using this method there are some combinations which are checked multiple times.
// As a way to increase performance, base patterns are stored in a set the first time
// they are checked. Then for each number after, if the pattern to be checked occurs in
// that set already, then it can be skipped. This optimization will not change the big O
// of the method below however, but it is a good tradeoff in memory for performance.

const digitReplacedPrimes = limit => {
  const primeArray = generatePrimesArray(limit);
  const patternSet = new Set();
  for (let num = 11; num < limit; num += 2){
    let numArray = num.toString().split('');
    if (numArray[numArray.length - 1] === '5') continue;
    for (let digitToReplace = 0; digitToReplace < 10; digitToReplace++){
      if (!numArray.includes(digitToReplace.toString())) continue;
      let pattern = numArray.map((val, i, a) => {
        if (val === digitToReplace.toString()
          && i !== a.length - 1) {
          return '*';
        }
        return val;
      }).join('');
      if (patternSet.has(pattern)) continue;
      patternSet.add(pattern);
      let numberOfPrimeReplacements = 0;
      let smallestPrime = null;
      for (let digit = 0; digit < 10; digit++){
        const newNumArr = numArray.map((val, i, a) => {
          if (val === digitToReplace.toString()
              && i !== a.length - 1){
            return digit.toString();
          }
          return val;
        });
        const newNum = Number(newNumArr.join(''));
        if (newNum < num) continue;
        if (primeArray.includes(newNum)){
          numberOfPrimeReplacements++;
          if (!smallestPrime) smallestPrime = newNum;
        } 
      }
      if (numberOfPrimeReplacements === 8) return smallestPrime;
    }
  }
};

console.log(digitReplacedPrimes(1000000));