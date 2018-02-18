'use strict';

// The fraction 49 / 98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49 / 98 = 4 / 8, which is correct, is obtained by cancelling the 9s.

// We shall consider fractions like, 30 / 50 = 3 / 5, to be trivial examples.

// There are exactly four non - trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.

// If the product of these four fractions is given in its lowest common terms, find the value of the denominator.

const specialNumerators = [];
const specialDenominators = [];
for (let numerator = 10; numerator < 99; numerator++){
  for (let denominator = numerator + 1; denominator < 100; denominator++){
    // console.log(numerator, '/', denominator);
    const numArr = numerator.toString().split('');
    const denArr = denominator.toString().split('');
    if (numArr[0] === denArr[1]){
      if (Number(numArr[1]) / Number(denArr[0]) === numerator / denominator){
        // console.log(numerator, denominator);
        specialNumerators.push(numArr[1]);
        specialDenominators.push(denArr[0]);
      }
    }
    if (numArr[1] === denArr[0]){
      if (Number(numArr[0]) / Number(denArr[1]) === numerator / denominator) {
        // console.log(numerator, denominator);
        specialNumerators.push(numArr[0]);
        specialDenominators.push(denArr[1]);
      }
    }
  }
}
const multipliedNumerator = specialNumerators.reduce((acc, val) => acc * Number(val), 1);
const multipliedDenominator = specialDenominators.reduce((acc, val) => acc * Number(val), 1);
const solution = 1 / (multipliedNumerator / multipliedDenominator);
console.log(solution);
