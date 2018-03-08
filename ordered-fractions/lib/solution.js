'use strict';

// Consider the fraction, n / d, where n and d are positive integers.If n < d and HCF(n, d) = 1, it is called a reduced proper fraction.

// If we list the set of reduced proper fractions for d ≤ 8 in ascending order of size, we get:

// 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 2 / 7, 1 / 3, 3 / 8, 2 / 5, 3 / 7, 1 / 2, 4 / 7, 3 / 5, 5 / 8, 2 / 3, 5 / 7, 3 / 4, 4 / 5, 5 / 6, 6 / 7, 7 / 8

// It can be seen that 2 / 5 is the fraction immediately to the left of 3 / 7.

// By listing the set of reduced proper fractions for d ≤ 1, 000, 000 in ascending order of size, find the numerator of the fraction immediately to the left of 3 / 7.



const generateFractions = limit => {
  let numerator = 1;
  const fractionMap = new Map();
  while (numerator < limit - 1){
    for (let denominator = numerator + 1; denominator < limit; denominator++){
      if (!fractionMap.has(numerator / denominator)){
        fractionMap.set(
          (numerator / denominator), 
          {numerator, 
            denominator, 
            decimal: numerator / denominator,
          }
        );
      }
    }
    numerator++;
  }
  let fractionArray = [];
  for (let key of fractionMap){
    fractionArray.push(key[1]);
  }
  fractionArray.sort((a, b) => a.decimal - b.decmial);
  for (let i = 0; i < fractionArray.length; i++){
    if (fractionArray[i].denominator === 7 && fractionArray[i].numerator === 7){
      return fractionArray[i - 1].numerator;
    }
  }
};

console.log(generateFractions(1000000));