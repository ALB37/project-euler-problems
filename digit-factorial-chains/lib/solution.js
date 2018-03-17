'use strict';

// The number 145 is well known for the property that the sum of the factorial of its digits is equal to 145:

// 1! + 4! + 5! = 1 + 24 + 120 = 145

// Perhaps less well known is 169, in that it produces the longest chain of numbers that link back to 169; it turns out that there are only three such loops that exist:

// 169 → 363601 → 1454 → 169
// 871 → 45361 → 871
// 872 → 45362 → 872

// It is not difficult to prove that EVERY starting number will eventually get stuck in a loop.For example,

//   69 → 363600 → 1454 → 169 → 363601(→ 1454)
// 78 → 45360 → 871 → 45361(→ 871)
// 540 → 145(→ 145)

// Starting with 69 produces a chain of five non - repeating terms, but the longest non - repeating chain with a starting number below one million is sixty terms.

// How many chains, with a starting number below one million, contain exactly sixty non - repeating terms ?

const FACTORIAL_ZERO = 1;

const factorialArr = limit => {
  const factorials = [FACTORIAL_ZERO];
  for (let i = 1; i <= limit; i++){
    factorials.push(factorials[i - 1] * i);
  }
  return factorials;
};

const factorialDigitSum = (number, factorialArr) => {
  return number
    .toString()
    .split('')
    .map(e => Number(e))
    .reduce((ac, v) => {
      return factorialArr[v] + ac;
    }, 0);
};

const DIGITS = 9;

const factorialChainLength = number => {
  const factorials = factorialArr(DIGITS);
  const chainNumbers = new Map();
  let current = number;
  while (!chainNumbers.has(current)){
    chainNumbers.set(current, true);
    current = factorialDigitSum(current, factorials);
  }
  return chainNumbers.size;
};

const findSixtyChains = limit => {
  let sixtyChains = 0;
  for (let num = 0; num < limit; num++){
    if (factorialChainLength(num) === 60){
      sixtyChains++;
    }
  }
  return sixtyChains;
};

console.log(findSixtyChains(1000000));