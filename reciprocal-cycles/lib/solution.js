'use strict';

// A unit fraction contains 1 in the numerator.The decimal representation of the unit fractions with denominators 2 to 10 are given:

// 1 / 2	= 	0.5
// 1 / 3	= 	0.(3)
// 1 / 4	= 	0.25
// 1 / 5	= 	0.2
// 1 / 6	= 	0.1(6)
// 1 / 7	= 	0.(142857)
// 1 / 8	= 	0.125
// 1 / 9	= 	0.(1)
// 1 / 10	= 	0.1
// Where 0.1(6) means 0.166666..., and has a 1 - digit recurring cycle.It can be seen that 1 / 7 has a 6 - digit recurring cycle.

// Find the value of d < 1000 for which 1 / d contains the longest recurring cycle in its decimal fraction part.

// My approach here is a bit haphazard, taking a few stabs in the dark, but my approach was generally informed by cyclic numbers.
// Divisors which are prime will tend to have the most repeating numbers.
// Furthermore, the repetition generally happens after the numbers themselves add up to a multiple of 3 or 33 (or 333 if you go into the thousands).
// There does not seem to be an obvious pattern in predicting cyclic numbers, so some guess and check work is required.
// Furthermore, the longest a cycle can be is one less than the divisor itself.
// Keeping this in mind, my approach was to find all the numbers whose repeating numbers took the longest time to add up to 3 or 33 (depending on range)
// and take the largest of these numbers. This is a fascinating area of math, and an area that certainly has relevance in cryptography.
// I would be interested in learning more about these types of numbers.


const isPrime = number => {
  for (let factor = 2; factor < number; factor++) {
    if (number % factor === 0) {
      return false;
    }
  }
  return true;
};

const Big = require('big.js');

Big.DP = 2000;

let longCycles = [];

let denominator = 2;

let largestCycleSoFar = 0;

const bigOne = new Big(1);

while (denominator < 1000){
  if (!isPrime(denominator)){
    denominator++;
    continue;
  }
  let divide = null;
  if (denominator > 1){
    divide = 3;
  }
  if (denominator > 33){
    divide = 33;
  }
  if (denominator % 2 === 0 || denominator % 5 === 0){
    denominator++;
    continue;
  }
  const bigDenominator = new Big(denominator);
  const fraction = bigOne.div(bigDenominator);
  let leadingZeros = '';
  for (let i = 1; i < Math.abs(fraction.e); i++){
    leadingZeros += 0;
  }
  let pattern = leadingZeros + fraction.c.join('');
  let repeatingArr = pattern.split('');
  let accumulator = 0;
  let counter = 0;
  for (let i = 0; i < denominator; i++){
    if (repeatingArr[i] !== repeatingArr[denominator + i - 1]){
      break;
    }
    if (i !== denominator - 1){
      continue;
    }
    for (let j = 0; j < denominator; j++){
      if (accumulator >= divide && accumulator % divide === 0){
        break;
      }
      accumulator += Number(repeatingArr[j]);
      if (j > largestCycleSoFar){
        largestCycleSoFar = j;
      }
      counter++;

    }
  }
  if (repeatingArr[0] == 0 && repeatingArr[1] == 0){
    counter -= 2;
  } else if (repeatingArr[0] == 0){
    counter--;
  }
  if (counter > 100){
    longCycles.push(denominator);
  }
  denominator++;
}

console.log(Math.max(...longCycles));