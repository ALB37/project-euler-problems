'use strict';

// Let d(n) be defined as the sum of proper divisors of n(numbers less than n which divide evenly into n).
// If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and each of a and b are called amicable numbers.

// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.

// Evaluate the sum of all the amicable numbers under 10000.

const listFactors = number => {
  const step = number % 2 === 0 ? 1 : 2;
  const factorSet = new Set();
  for (let value = 1; value < Math.floor(Math.sqrt(number)) + 1; value += step) {
    if (number % value === 0) {
      factorSet.add(value);
      factorSet.add(number / value);
    }
  }
  return factorSet;
};

const generateAmicableNumbers = largestNumber => {
  const amicableSet = new Set();
  for (let value = 1; value < largestNumber; value++){
    if (amicableSet.has(value)){
      continue;
    }
    const primaryFactors = listFactors(value);
    primaryFactors.delete(value);
    let primarySum = 0;
    primaryFactors.forEach(val => primarySum += val);
    
    const secondaryFactors = listFactors(primarySum);
    secondaryFactors.delete(primarySum);
    let secondarySum = 0;
    secondaryFactors.forEach(val => secondarySum += val);
    
    if (secondarySum === value && secondarySum !== primarySum){
      amicableSet.add(value);
      amicableSet.add(primarySum);
    }
  }
  return amicableSet;
};

const sumAmicableNumbers = largestNumber => {
  const amicableSet = generateAmicableNumbers(largestNumber);
  let sumOfAmicableNumbers = 0;
  amicableSet.forEach(val => sumOfAmicableNumbers += val);
  return sumOfAmicableNumbers;
};

console.log(sumAmicableNumbers(10000));
