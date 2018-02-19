'use strict';

// Take the number 192 and multiply it by each of 1, 2, and 3:

// 192 × 1 = 192
// 192 × 2 = 384
// 192 × 3 = 576
// By concatenating each product we get the 1 to 9 pandigital, 192384576. We will call 192384576 the concatenated product of 192 and(1, 2, 3)

// The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, which is the concatenated product of 9 and(1, 2, 3, 4, 5).

// What is the largest 1 to 9 pandigital 9 - digit number that can be formed as the concatenated product of an integer with (1, 2, ... , n) where n > 1 ?

const generatePandigitalNumbers = () => {
  const digitArray = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const pandigitalNumbers = [];
  const _helper = (string, array) => {
    if (!array.length){
      pandigitalNumbers.push(string);
      return;
    }
    for (let i = 0; i < array.length; i++){
      const newArray = [...array];
      const newString = string + newArray.splice(i, 1)[0];
      _helper(newString, newArray);
    }
  };
  _helper('9', digitArray);
  return pandigitalNumbers;
};

// largest number when n = 5;
const LARGEST_OF_N_SERIES = 918273645;

const largestConcatenatedPandigitalProduct = () => {
  const pandigitalNumbers = generatePandigitalNumbers();
  for (let pandigital of pandigitalNumbers){
    if (Number(pandigital) < LARGEST_OF_N_SERIES){
      return LARGEST_OF_N_SERIES;
    }
    //check for n = 2, it will give the largest result;
    const firstHalf = pandigital.slice(0, 4);
    const secondHalf = pandigital.slice(4);
    if (Number(firstHalf) * 2 === Number(secondHalf)){
      return pandigital;
    }
  }
};

console.log(largestConcatenatedPandigitalProduct());