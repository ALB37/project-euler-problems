'use strict';

// Consider the fraction, n / d, where n and d are positive integers.If n < d and HCF(n, d) = 1, it is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

// 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 2 / 7, 1 / 3, 3 / 8, 2 / 5, 3 / 7, 1 / 2, 4 / 7, 3 / 5, 5 / 8, 2 / 3, 5 / 7, 3 / 4, 4 / 5, 5 / 6, 6 / 7, 7 / 8

// It can be seen that there are 21 elements in this set.

// How many elements would be contained in the set of reduced proper fractions for d ≤ 1, 000, 000 ?

const bigInt = require('big-integer');

const primeGen = limit => {
  const primeArr = [];
  for (let num = 2; num <= limit; num++){
    if (bigInt(num).isPrime()) {
      primeArr.push(num);
    }
  }
  return primeArr;
};

const numProperFractions = limit => {
  const primeArr = primeGen(limit);
  let properFractions = limit - 1;
  for (let denom = 3; denom <= limit; denom++){
    const numSet = new Set();
    for (let prime of primeArr) {
      if (prime >= denom) break;
      if (denom % prime === 0) continue;
      let primeMult = prime;
      let multiplier = 1;
      while (primeMult < denom) {
        // console.log(multiplier);
        if ((multiplier !== 1 && denom % multiplier === 0)
            || numSet.has(primeMult)){
          multiplier++;
          primeMult = prime * multiplier;
          continue;
        }
        if (primeMult > denom) break;
        console.log(primeMult, denom);
        numSet.add(primeMult);
        properFractions++;
        multiplier++;
        primeMult = prime * multiplier;
      }
    }
  }
  //   for (let num = 1; num < denom; num++){
  //     let reducable = false;
  //     for (let div = 2; div < num; div++){
  //       if (num % div === 0 && denom % div === 0) {
  //         reducable = true;
  //         break;
  //       }
  //     }
  //     if (reducable) continue;
  //     if (num === 1) properFractions++;
  //     if (denom % num === 0) continue;
  //     properFractions++;
  //     // console.log(num, denom);
  //   }
  // }
  return properFractions;
};

console.log(numProperFractions(100));