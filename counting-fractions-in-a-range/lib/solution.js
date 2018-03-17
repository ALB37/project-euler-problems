'use strict';

// Consider the fraction, n / d, where n and d are positive integers.If n < d and HCF(n, d) = 1, it is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

// 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 2 / 7, 1 / 3, 3 / 8, 2 / 5, 3 / 7, 1 / 2, 4 / 7, 3 / 5, 5 / 8, 2 / 3, 5 / 7, 3 / 4, 4 / 5, 5 / 6, 6 / 7, 7 / 8

// It can be seen that there are 3 fractions between 1 / 3 and 1 / 2.

// How many fractions lie between 1 / 3 and 1 / 2 in the sorted set of reduced proper fractions for d ≤ 12, 000 ?

const fractionsInRange = (lowerBound, upperBound, limit) => {
  const foundFractions = new Set();
  for (let denom = 4; denom <= limit; denom++){
    const lowerNum = Math.floor(lowerBound * denom);
    const upperNum = Math.ceil(upperBound * denom);
    for (let num = lowerNum; num <= upperNum; num++){
      if (num / denom <= lowerBound) continue;
      if (num / denom >= upperBound) break;
      if (foundFractions.has(num / denom)) continue;
      foundFractions.add(num / denom);
    }
  }
  return foundFractions.size;
};

console.log(fractionsInRange((1 / 3), (1 / 2), 12000));