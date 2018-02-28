'use strict';

// A googol(10^100) is a massive number: one followed by one - hundred zeros; 100^100 is almost unimaginably large: one followed by two - hundred zeros.Despite their size, the sum of the digits in each number is only 1.

// Considering natural numbers of the form, ab, where a, b < 100, what is the maximum digital sum ?

const bigInt = require('big-integer');

const largestDigitalSum = limit => {
  let largestSum = 0;
  for (let x = 0; x < limit; x++){
    for (let y = 0; y < limit; y++){
      const powerSum = bigInt(x).pow(bigInt(y)).toString().split('').reduce((a, e) => Number(e) + a, 0);
      if (powerSum > largestSum) {
        largestSum = powerSum;
      }
    }
  }
  return largestSum;
};

console.log(largestDigitalSum(100));