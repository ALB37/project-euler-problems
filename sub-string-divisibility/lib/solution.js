'use strict';

// The number, 1406357289, is a 0 to 9 pandigital number because it is made up of each of the digits 0 to 9 in some order, but it also has a rather interesting sub - string divisibility property.

// Let d1 be the 1st digit, d2 be the 2nd digit, and so on.In this way, we note the following:

// d2d3d4 = 406 is divisible by 2
// d3d4d5 = 063 is divisible by 3
// d4d5d6 = 635 is divisible by 5
// d5d6d7 = 357 is divisible by 7
// d6d7d8 = 572 is divisible by 11
// d7d8d9 = 728 is divisible by 13
// d8d9d10 = 289 is divisible by 17
// Find the sum of all 0 to 9 pandigital numbers with this property.

const generatePandigitalNumbers = () => {
  const digitArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
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
  return pandigitalNumbers.filter(e => Number(e) > 1000000000);
};

const pandigitalIsInteresting = string => {
  const primeArray = [null, 2, 3, 5, 7, 11, 13, 17];
  for (let i = 1; i < primeArray.length; i++){
    if (Number(string.substring(i, i + 3)) % primeArray[i] !== 0){
      return false;
    }
  }
  return true;
};

const sumInterestingPandigitals = () => {
  return generatePandigitalNumbers().reduce((acc, pandigital) => {
    if (pandigitalIsInteresting(pandigital)){
      return acc + Number(pandigital);
    }
    return acc;
  }, 0);
};

console.log(sumInterestingPandigitals());