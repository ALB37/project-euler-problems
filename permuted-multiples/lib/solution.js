'use strict';

// It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.

// Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.

const permutedMultiples = () => {
  let found = false;
  let number = 1;
  while (!found){
    const numberMap = new Map();
    const digitArray = number.toString().split('');
    for (let digit of digitArray){
      if (numberMap.get(digit)){
        numberMap.set(digit, numberMap.get(digit) + 1);
      } else {
        numberMap.set(digit, 1);
      }
    }
    let multiplesArePermuted = true;
    for (let multiple = 2; multiple < 7; multiple++){
      const multNum = multiple * number;
      const multMap = new Map();
      const multDigits = multNum.toString().split('');
      for (let digit of multDigits) {
        if (multMap.get(digit)) {
          multMap.set(digit, multMap.get(digit) + 1);
        } else {
          multMap.set(digit, 1);
        }
      }
      for (let key of multMap.keys()){
        if (numberMap.get(key) !== multMap.get(key)){
          multiplesArePermuted = false;
          break;
        }
      }
      if (!multiplesArePermuted){
        break;
      }
    }
    if (multiplesArePermuted){
      found = true;
      continue;
    }
    number++;
  }
  return number;
};

console.log(permutedMultiples());