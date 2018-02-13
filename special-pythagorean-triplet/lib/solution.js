'use strict';

// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

//   a^2 + b^2 = c^2
// For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

const productOfPerfectPythagoreanTriplets = number => {
  let variableC = number - 2;
  while (variableC > 2){
    let variableA = 1;
    let variableB = number - variableC - variableA;
    while (variableA <= variableB){
      if (Math.pow(variableA, 2) + Math.pow(variableB, 2) === Math.pow(variableC, 2)){
        return variableA * variableB * variableC;
      }
      variableA++;
      variableB--;
    }
    variableC--;
  }
};

console.log(productOfPerfectPythagoreanTriplets(1000));