'use strict';

// 145 is a curious number, as 1! + 4! + 5! = 1 + 24 + 120 = 145.

// Find the sum of all numbers which are equal to the sum of the factorial of their digits.

//   Note: as 1! = 1 and 2! = 2 are not sums they are not included.

const factorial = number => {
  if (number === 0) return 1;
  if (number === 1) return 1;
  if (number === 2) return 2;
  let previousFactorial = 1;
  let newFactorial = null;
  for (let value = 2; value <= number; value++) {
    newFactorial = value * previousFactorial;
    previousFactorial = newFactorial;
  }
  return newFactorial;
};

const sumFactorialDigits = () => {
  const digitArray = [];
  // upper bound of numbers, i.e. 9! * 7 == 2540160
  for (let number = 3; number < 2540160; number++){
    const digits = number.toString().split('');
    const factorialSum = digits.reduce((acc, val) => acc + factorial(Number(val)), 0);
    if (factorialSum === number) digitArray.push(number);
  }
  return digitArray.reduce((acc, val) => acc + val, 0);
};

console.log(sumFactorialDigits());