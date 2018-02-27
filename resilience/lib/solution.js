'use strict';

// A positive fraction whose numerator is less than its denominator is called a proper fraction.
// For any denominator, d, there will be d−1 proper fractions; for example, with d = 12:
//   1 / 12, 2 / 12, 3 / 12, 4 / 12, 5 / 12, 6 / 12, 7 / 12, 8 / 12, 9 / 12, 10 / 12, 11 / 12.

// We shall call a fraction that cannot be cancelled down a resilient fraction.
// Furthermore we shall define the resilience of a denominator, R(d), to be the ratio of its proper fractions that are resilient; for example, R(12) = 4 / 11.
// In fact, d = 12 is the smallest denominator having a resilience R(d) < 4 / 10.

// Find the smallest denominator d, having a resilience R(d) < 15499 / 94744.

const isPrime = (number, primeArray) => {
  if (primeArray.includes(number)){
    return true;
  }
  for (let primeNumber of primeArray){
    if (number % primeNumber === 0){
      return false;
    }
  }
  return true;
};

const generatePrimesArray = largestPrime => {
  const primeArray = [2];
  let currentNumber = 3;
  while (currentNumber < largestPrime){
    if (isPrime(currentNumber, primeArray)){
      primeArray.push(currentNumber);
    }
    currentNumber += 2;
  }
  return primeArray;
};

const primeFactors = (number, primeArray) => {
  const factorSet = new Set();
  if (primeArray.includes(number)){
    factorSet.add(number);
    return factorSet;
  }
  for (let prime of primeArray){
    if (prime > number) break;
    if (number % prime === 0) {
      factorSet.add(prime);
    }
  }
  return factorSet;
};

const checkResilience = limit => {
  const targetResilience = 15499 / 94744;
  let leastResilience = 1;
  const primeArray = generatePrimesArray(30);
  const primeFactorMap = new Map();
  let largestSet = 1;
  let largestNumber = 6;
  for (let number = 6; number < limit; number += largestNumber){
    primeFactorMap.set(number, primeFactors(number, primeArray));
    if (primeFactorMap.get(number).size > largestSet){
      largestSet = primeFactorMap.get(number).size;
      largestNumber = number;
    }

    let resilientFractions = 1;
    for (let numerator = 2; numerator < number; numerator++){
      if (resilientFractions / (number - 1) > leastResilience) break;
      if (number % numerator === 0) continue;
      const denominatorFactors = primeFactorMap.get(number);
      let commonFactor = false;
      for (let factor of denominatorFactors){
        if (numerator % factor === 0){
          commonFactor = true;
          break;
        }
      }
      if (commonFactor) continue;
      resilientFractions++;
    }
    if (resilientFractions / (number - 1) < leastResilience){ 
      if (resilientFractions / (number - 1) < targetResilience) return number;
      leastResilience = resilientFractions / (number - 1);
    }
  }
};

console.log(checkResilience(1000000000));