'use strict';

// Consider the fraction, n / d, where n and d are positive integers.If n < d and HCF(n, d) = 1, it is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

// 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 2 / 7, 1 / 3, 3 / 8, 2 / 5, 3 / 7, 1 / 2, 4 / 7, 3 / 5, 5 / 8, 2 / 3, 5 / 7, 3 / 4, 4 / 5, 5 / 6, 6 / 7, 7 / 8

// It can be seen that there are 21 elements in this set.

// How many elements would be contained in the set of reduced proper fractions for d ≤ 1, 000, 000 ?

const bigInt = require('big-integer');

const primeGen = limit => {
  const primeMap = new Map();
  for (let num = 1; num <= limit; num++) {
    if (bigInt(num).isPrime()) {
      primeMap.set(num, true);
    } else {
      primeMap.set(num, false);
    }
  }
  return primeMap;
};

const primeFactors = (number, primeMap) => {
  const factorSet = new Set();
  if (primeMap.get(number)) {
    factorSet.add(number);
    return factorSet;
  }
  for (let [prime, bool] of primeMap) {
    if (!bool) continue;
    if (number % prime === 0) {
      factorSet.add(prime);
    }
  }
  return factorSet;
};

const numProperFractions = limit => {
  const primeMap = primeGen(limit);
  const factorMap = new Map();
  for (let number = 2; number <= limit; number++) {
    factorMap.set(number, primeFactors(number, primeMap));
  }
  let properFractions = limit - 1;
  for (let denom = 3; denom <= limit; denom++) {
    if (primeMap.get(denom)) {
      properFractions += (denom - 2);
      continue;
    }
    const denomPrimeFactors = factorMap.get(denom);
    for (let num = 2; num < denom; num++) {
      if (denom % num === 0) continue;
      const numPrimeFactors = factorMap.get(num);
      let reducable = false;
      for (let numPrime of numPrimeFactors){
        if (denomPrimeFactors.has(numPrime)){
          reducable = true;
          break;
        }
      }
      if (reducable) continue;
      properFractions++;
    }
  }

  return properFractions;
};

console.log(numProperFractions(10000));
