'use strict';

// It is possible to show that the square root of two can be expressed as an infinite continued fraction.

// √ 2 = 1 + 1 / (2 + 1 / (2 + 1 / (2 + ... ))) = 1.414213...

// By expanding this for the first four iterations, we get:

// 1 + 1 / 2 = 3 / 2 = 1.5
// 1 + 1 / (2 + 1 / 2) = 7 / 5 = 1.4
// 1 + 1 / (2 + 1 / (2 + 1 / 2)) = 17 / 12 = 1.41666...
// 1 + 1 / (2 + 1 / (2 + 1 / (2 + 1 / 2))) = 41 / 29 = 1.41379...

// The next three expansions are 99 / 70, 239 / 169, and 577 / 408, but the eighth expansion, 1393 / 985, is the first example where the number of digits in the numerator exceeds the number of digits in the denominator.

// In the first one - thousand expansions, how many fractions contain a numerator with more digits than denominator ?

const bigInt = require('big-integer');

const generateSequence = limit => {
  let stack = [1];
  for (let num = 0; num < limit; num++) {
    stack.push(2);
  }
  return stack;
};

const numeratorOfNthContinuation = n => {
  const stack = generateSequence(n);
  let numerator = bigInt(1);
  let denominator = bigInt(stack.pop());
  while (stack.length) {
    let whole = bigInt(stack.pop());
    numerator = numerator.add(whole.multiply(denominator));
    let temp = numerator;
    numerator = denominator;
    denominator = temp;
  }
  let temp = numerator;
  numerator = denominator;
  denominator = temp;
  return {numerator, denominator};
};

const hasMoreDigitsInNumerator = limit => {
  let positives = 0;
  for (let num = 1; num <= limit; num++){
    let {numerator, denominator} = numeratorOfNthContinuation(num);
    if (numerator.toString().length > denominator.toString().length){
      positives++;
    }
  }
  return positives;
};

console.log(hasMoreDigitsInNumerator(1000));