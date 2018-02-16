'use strict';

// The Fibonacci sequence is defined by the recurrence relation:

// Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
// Hence the first 12 terms will be:

// F1 = 1
// F2 = 1
// F3 = 2
// F4 = 3
// F5 = 5
// F6 = 8
// F7 = 13
// F8 = 21
// F9 = 34
// F10 = 55
// F11 = 89
// F12 = 144
// The 12th term, F12, is the first term to contain three digits.

// What is the index of the first term in the Fibonacci sequence to contain 1000 digits ?

const bigInt = require('big-integer');

const oneThousandDigitFibonacciCalculation = largestNumber => {
  const fibonacciBuffer = [bigInt(0), bigInt(1)];
  let index = 2;
  while (fibonacciBuffer[1].lesser(largestNumber)){
    const nextNumber = fibonacciBuffer[0].add(fibonacciBuffer[1]);
    // 1000 digits is equivalent to 10 ^ 999, because the leading digit must also be counted.
    if (nextNumber.subtract(bigInt(10).pow(999)).greater(0)){
      return index;
    }
    fibonacciBuffer[0] = fibonacciBuffer[1];
    fibonacciBuffer[1] = nextNumber;
    index++;
  }
};

console.log(oneThousandDigitFibonacciCalculation(bigInt(10).pow(1000)));

