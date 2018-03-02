'use strict';

const bigInt = require('big-integer');

module.exports = number => {
  const coefficientArray = [];
  const coefficients = input => {

    coefficientArray[0] = bigInt(1);
    for (let i = 0; i < input; coefficientArray[0] = bigInt(0).subtract(coefficientArray[0]), i++) {
      coefficientArray[1 + i] = bigInt(1);

      for (let j = i; j > 0; j--){
        coefficientArray[j] = coefficientArray[j - 1].subtract(coefficientArray[j]);
      }
    }
  };

  coefficients(number);

  coefficientArray[0] = coefficientArray[0].add(1);
  coefficientArray[number] = coefficientArray[number].subtract(1);

  let i = number;
  while (i >= 0 && coefficientArray[i].mod(bigInt(number)).value === bigInt(0).value){
    i--;
  }

  return i < 0;

};