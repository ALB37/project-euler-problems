'use strict';

// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

const sumOfMultiplesOfThreeAndFive = largestNumber => {
  let answer = 0;
  for (let number = 1; number < largestNumber; number++){
    if (number % 3 === 0 || number % 5 === 0){
      answer += number;
    }
  }
  return answer;
}

console.log(sumOfMultiplesOfThreeAndFive(1000));