'use strict';

// An irrational decimal fraction is created by concatenating the positive integers:

// 0.123456789101112131415161718192021...

// It can be seen that the 12th digit of the fractional part is 1.

// If dn represents the nth digit of the fractional part, find the value of the following expression.

//   d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000

const integerArray = [];
for (let value = 1; value < 200000; value++){
  integerArray.push(`${value}`);
}

const splitIntegers = integerArray.join('').split('');
const numbers = [];
for (let i = 0; i < 7; i++){
  numbers.push(Number(splitIntegers[Math.pow(10, i) - 1]));
}
console.log(numbers.reduce((acc, val) => acc * val, 1));