'use strict';

// The square root of 2 can be written as an infinite continued fraction.

// The infinite continued fraction can be written, √2 = [1; (2)], (2) indicates that 2 repeats ad infinitum.In a similar way, √23 = [4; (1, 3, 1, 8)].

// It turns out that the sequence of partial values of continued fractions for square roots provide the best rational approximations.Let us consider the convergents for √2.

// Hence the sequence of the first ten convergents for √2 are:

// 1, 3 / 2, 7 / 5, 17 / 12, 41 / 29, 99 / 70, 239 / 169, 577 / 408, 1393 / 985, 3363 / 2378, ...
// What is most surprising is that the important mathematical constant,
//   e = [2; 1, 2, 1, 1, 4, 1, 1, 6, 1, ... , 1, 2k, 1, ...].

// The first ten terms in the sequence of convergents for e are:

//   2, 3, 8 / 3, 11 / 4, 19 / 7, 87 / 32, 106 / 39, 193 / 71, 1264 / 465, 1457 / 536, ...
// The sum of digits in the numerator of the 10th convergent is 1 + 4 + 5 + 7=17.

// Find the sum of digits in the numerator of the 100th convergent of the continued fraction for e.

const bigInt = require('big-integer');

const generateSequence = limit => {
  let current = 2;
  let stack = [2];
  for (let num = 2; num < limit + 1; num++){
    if (num % 3 === 0){
      stack.push(current);
      current += 2;
    } else {
      stack.push(1);
    }
  }
  return stack;
};

const numeratorOfNthContinuation = n => {
  const stack = generateSequence(n);
  let numerator = bigInt(1);
  let denominator = bigInt(stack.pop());
  while (stack.length){
    let whole = bigInt(stack.pop());
    numerator = numerator.add(whole.multiply(denominator));
    let temp = numerator;
    numerator = denominator;
    denominator = temp;
  }
  return denominator;
};

const sumDigits = bigInteger => {
  let stringArr = bigInteger.toString().split('');
  return stringArr.reduce((acc, val) => acc + Number(val), 0);
};

console.log(sumDigits(numeratorOfNthContinuation(100)));
