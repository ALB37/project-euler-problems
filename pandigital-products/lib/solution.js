'use strict';

// We shall say that an n - digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5 - digit number, 15234, is 1 through 5 pandigital.

// The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.

// Find the sum of all products whose multiplicand / multiplier / product identity can be written as a 1 through 9 pandigital.

//   HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.

const sumOfPandigitalProducts = () => {
  const pandigitalProducts = new Set();
  for (let multiplicand = 1; multiplicand < 50; multiplicand++){
    for (let multiplier = multiplicand + 1; multiplier < 2000; multiplier++){
      const product = multiplicand * multiplier;
      const expressionString = `${multiplicand}${multiplier}${product}`;
      if (expressionString.length !== 9) continue;
      let expressionArray = expressionString.split('');
      if (expressionArray.includes('0')) continue;
      // removing duplicate numbers:
      expressionArray = expressionArray.filter((e, i, a) => a.indexOf(e) === i);
      if (expressionArray.length !== 9) continue;
      pandigitalProducts.add(product);
    }
  }
  let accumulator = 0;
  pandigitalProducts.forEach(e => accumulator += e);
  return accumulator;
};

console.log(sumOfPandigitalProducts());