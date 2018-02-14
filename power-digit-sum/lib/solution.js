'use strict';

// 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.

// What is the sum of the digits of the number 2^1000 ?

const sumOfPowerDigits = (base, exponent) => {
  const resultOfExponent = Math.pow(base, exponent);
  console.log(resultOfExponent);
  const numberAsString = resultOfExponent.toString();
  console.log(numberAsString);
  const arrayOfDigits = numberAsString.split('');
  console.log(arrayOfDigits);
  return arrayOfDigits.reduce((acc, val) => {
    const valueAsNumber = Number(val);
    return acc + valueAsNumber;
  }, 0);
};

console.log(sumOfPowerDigits(2, 10));