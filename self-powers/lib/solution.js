'use strict';

// The series, 1^1 + 2^2 + 3^3 + ... + 10^10 = 10405071317.

// Find the last ten digits of the series, 1^1 + 2^2 + 3^3 + ... + 1000^1000.

const bigInt = require('big-integer');

let bigNumber = bigInt(0);

for (let number = 1; number <= 1000; number++){
  bigNumber = bigNumber.add(bigInt(number).pow(number));
}

console.log(bigNumber.toString().slice(-10));