'use strict';

// A perfect number is a number for which the sum of its proper divisors is exactly equal to the number.For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.

// A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.

//   As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers.However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.

// Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.

const listProperFactors = number => {
  const step = number % 2 === 0 ? 1 : 2;
  const factorSet = new Set();
  for (let value = 1; value < Math.floor(Math.sqrt(number)) + 1; value += step) {
    if (number % value === 0) {
      factorSet.add(value);
      factorSet.add(number / value);
    }
  }
  factorSet.delete(number);
  return factorSet;
};

const sumAllNumbersThatAreNotTheSumOfTwoAbundantNumbers = () => {
  const LARGEST_NUMBER = 28123;
  
  const arrayOfAbundantNumbers = [];
  
  for (let num = 1; num < LARGEST_NUMBER; num++){
    let factorSet = listProperFactors(num);
    let accumulator = 0;
    factorSet.forEach(val => accumulator += val);
    if (accumulator > num){
      arrayOfAbundantNumbers.push(num);
    }
  }
  
  const numbersWhichAreTheSumOfTwoAbundantNumbers = new Set();
  
  for (let i = 0; i < arrayOfAbundantNumbers.length; i++){
    for (let j = 0; j < arrayOfAbundantNumbers.length; j++){
      numbersWhichAreTheSumOfTwoAbundantNumbers.add(arrayOfAbundantNumbers[i] + arrayOfAbundantNumbers[j]);
    }
  }
  
  let accumulator = 0;
  
  for (let num = 1; num < LARGEST_NUMBER; num++){
    if (numbersWhichAreTheSumOfTwoAbundantNumbers.has(num)){
      continue;
    }
    accumulator += num;
  }
  
  console.log(accumulator);
};

sumAllNumbersThatAreNotTheSumOfTwoAbundantNumbers();
