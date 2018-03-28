'use strict';

// It is possible to write five as a sum in exactly six different ways:

// 4 + 1
// 3 + 2
// 3 + 1 + 1
// 2 + 2 + 1
// 2 + 1 + 1 + 1
// 1 + 1 + 1 + 1 + 1

// How many different ways can one hundred be written as a sum of at least two positive integers ?

const sumCombinations = sum => {
  // create a set of all the possible numbers we can use to sum to the number in question
  // i.e. the set of all positive numbers up to but not including the number
  const arrayOfPossibleNumbers = [];
  for (let num = 1; num < sum; num++){
    arrayOfPossibleNumbers.push(num);
  }
  // knowing there is 1 way to sum to 1, and we initialize all other numbers' combinations at 0
  const combinations = [1];
  for (let num = 0; num < sum; num++) {
    combinations.push(0);
  }
  // here we calculate the number of combinations that sum to a given number
  // based on the previous calculations made
  for (let i = 0; i < arrayOfPossibleNumbers.length; i++){
    for (let j = arrayOfPossibleNumbers[i]; j <= sum; j++){
      combinations[j] += combinations[j - arrayOfPossibleNumbers[i]];
    }
  }

  return combinations[combinations.length - 1];
};

console.log(sumCombinations(100));