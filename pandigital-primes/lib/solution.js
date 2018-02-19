'use strict';

// We shall say that an n - digit number is pandigital if it makes use of all the digits 1 to n exactly once.For example, 2143 is a 4 - digit pandigital and is also prime.

// What is the largest n - digit pandigital prime that exists ?

const generatePandigitalNumbers = digitArray => {
  const pandigitalNumbers = [];
  const _helper = (string, array) => {
    if (!array.length) {
      pandigitalNumbers.push(string);
      return;
    }
    for (let i = 0; i < array.length; i++) {
      const newArray = [...array];
      const newString = string + newArray.splice(i, 1)[0];
      _helper(newString, newArray);
    }
  };
  _helper('', digitArray);
  return pandigitalNumbers;
};

const isPrime = number => {
  for (let factor = 2; factor < number; factor++) {
    if (number % factor === 0) {
      return false;
    }
  }
  return true;
};

const largestPandigitalPrime = () => {
  const baseTenDigits = ['9', '8', '7', '6', '5', '4', '3', '2', '1'];
  while (baseTenDigits.length){
    const pandigitalNumbers = generatePandigitalNumbers(baseTenDigits);
    for (let pandigital of pandigitalNumbers){
      if (isPrime(Number(pandigital))){
        return pandigital;
      }
    }
    baseTenDigits.shift();
  }
};

console.log(largestPandigitalPrime());