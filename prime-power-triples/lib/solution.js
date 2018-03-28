'use strict';

// The smallest number expressible as the sum of a prime square, prime cube, and prime fourth power is 28. In fact, there are exactly four numbers below fifty that can be expressed in such a way:

// 28 = 2**2 + 2**3 + 2**4
// 33 = 3**2 + 2**3 + 2**4
// 49 = 5**2 + 2**3 + 2**4
// 47 = 2**2 + 3**3 + 2**4

// How many numbers below fifty million can be expressed as the sum of a prime square, prime cube, and prime fourth power ?

const bigInt = require('big-integer');

const primeGen = limit => {
  const primeArr = [];
  for (let n = 2; n < limit; n++){
    if (bigInt(n).isPrime()) {
      primeArr.push(n);
    }
  }
  return primeArr;
};

const numPrimeTriples = limit => {
  const primeArr = primeGen(Math.sqrt(limit));
  const solSet = new Set();
  for (let primary of primeArr) {
    const square = Math.pow(primary, 2);
    if (square >= limit) break;
    for (let secondary of primeArr) {
      const cube = Math.pow(secondary, 3);
      if (cube + square >= limit) break;
      for (let tertiary of primeArr) {
        const tesseract = Math.pow(tertiary, 4);
        if (tesseract + cube + square >= limit) break;
        solSet.add(tesseract + cube + square);
      }
    }
  }
  return solSet.size;
};

console.log(numPrimeTriples(50000000));