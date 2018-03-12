'use strict';

// It is possible to write five as a sum in exactly six different ways:

// 4 + 1
// 3 + 2
// 3 + 1 + 1
// 2 + 2 + 1
// 2 + 1 + 1 + 1
// 1 + 1 + 1 + 1 + 1

// How many different ways can one hundred be written as a sum of at least two positive integers ?

// start with 100 1s, combine 2, 3, 4 ... 99. At each step, start with that number and the remainder of 1s and start over.

const sumCombinations = sum => {
  const arrayOfOnes = [];
  for (let num = 0; num < sum; num++){
    arrayOfOnes.push(1);
  }
  const uniqueCombinations = new Set();
  const _helper = array => {
    array.sort((a, b) => a - b);
    if (uniqueCombinations.has(array.toString())){
      return;
    } else {
      uniqueCombinations.add(array.toString());
    }
    if (array.length > 2){
      const arrayCopy = [...array];
      const valueToAdd = arrayCopy.shift();
      for (let i = 0; i < arrayCopy.length; i++){
        const innerArrayCopy = [...arrayCopy];
        innerArrayCopy[i] += valueToAdd;
        _helper(innerArrayCopy);
      }
    }
  };
  _helper(arrayOfOnes);
  return uniqueCombinations;
};

console.log(sumCombinations(100).size);