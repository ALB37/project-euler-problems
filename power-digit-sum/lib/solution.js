'use strict';

let bigInt = require('big-integer');

// 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

// What is the sum of the digits of the number 2^1000 ?

const sumOfPowerDigits = (base, exponent) => {
  const resultOfExponent = bigInt(base).pow(exponent);
  const numberAsString = resultOfExponent.toString();
  const arrayOfDigits = numberAsString.split('');
  return arrayOfDigits.reduce((acc, val) => {
    const valueAsNumber = Number(val);
    return acc + valueAsNumber;
  }, 0);
};

console.log(sumOfPowerDigits(2, 1000));