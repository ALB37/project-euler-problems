'use strict';

// 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
// What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20 ?

// The approach below understands that a least common multiple (LCM) can be found by examining each number's prime factors.
// The prime factors of a number may occur any number of times in each number. We must look at the greatest occurence
// of a prime number in the set for which we are looking for the LCM.

// For example, the prime factors of 16 are 2 * 2 * 2 * 2. The prime factors of 12 are 2 * 2 * 3. Since 2 occurs 4 times in
// the number 16, and only twice in 12, we will start with the four 2's. 3 does not occur at all in 16, however it occurs once
// in the number 12, so we will take that one 3. (Quick note, but all of the other primes occur exactly 0 times in these numbers
// so we stop there.) From these numbers we get 2 * 2 * 2 * 2 * 3, which is the least common multiple of 12 and 16, which 
// evaluates to 48. This example is illustrated with two numbers, however, the same process can be applied to any set of numbers.

// The following function only evaluates whether values less than or equal to the greatest value in the primeArray provided 
// as an argument are prime. If a non-prime number greater than that array is passed in, this function may fail.
// Example: if the primeArray passed in is [2, 3, 5], and I am evaluating 49, it will return true, even though 49 is not prime.
// This implementation to check for primeness is used because no number greater than the largest number in the prime number
// will ever be evaluated here.
const isPrime = (number, primeArray) => {
  if (primeArray.includes(number)){
    return true;
  }
  for (let primeNumber of primeArray) {
    if (number % primeNumber === 0) {
      return false;
    }
  }
  return true;
};

// This function generates an array of primes number up to the input value in size.
const generatePrimesArray = largestPrime => {
  const primeArray = [];
  let currentNumber = 2;
  while (currentNumber < largestPrime) {
    if (isPrime(currentNumber, primeArray)) {
      primeArray.push(currentNumber);
    }
    currentNumber++;
  }
  return primeArray;
};

// Here we are generating a map which contains each prime factor and the exponent it is raised to,
// which when multiplied out will give the input.
const primeFactors = (number, primeArray) => {
  const factorMap = new Map();
  if (isPrime(number, primeArray)){
    factorMap.set(number, 1);
    return factorMap;
  }
  let dividedNumber = number;
  for (let prime of primeArray){
    let iterations = 0;
    while (dividedNumber % prime === 0){
      dividedNumber = dividedNumber / prime;
      iterations++;
    }
    if (iterations > 0){
      factorMap.set(prime, iterations);
    }
    if (dividedNumber === 1){
      break;
    }
  }
  return factorMap;
};

const leastCommonMultiple = arrayOfNumbers => {
  const mapArray = [];
  const largestPossiblePrime = Math.max(...arrayOfNumbers);
  const arrayOfPrimes = generatePrimesArray(largestPossiblePrime);
  // here we are creating an array of the prime factor Maps, 
  // which contain the prime factors for each input
  for (let number of arrayOfNumbers){
    mapArray.push(primeFactors(number, arrayOfPrimes));
  }
  // Here we are looping through each map, determining which 
  // prime factor of each input has the largest exponent, 
  // and saving that to a new Map.
  const mostPrimesMap = new Map();
  for (let map of mapArray){
    map.forEach((value, key) => {
      if (mostPrimesMap.has(key)){
        if (mostPrimesMap.get(key) < value){
          mostPrimesMap.set(key, value);
        }
      } else {
        mostPrimesMap.set(key, value);
      }
    });
  }
  // last we will loop through our map which contains the
  // primes with the largest exponents and multiply them.
  let accumulator = 1;
  mostPrimesMap.forEach((value, key) => {
    accumulator *= Math.pow(key, value);
  });
  return accumulator;
};

const generateIncrementingNumberArray = largestNumber => {
  const outputArray = [];
  for (let value = 1; value <= largestNumber; value++){
    outputArray.push(value);
  }
  return outputArray;
};

const oneThroughTwenty = generateIncrementingNumberArray(20);

console.log(leastCommonMultiple(oneThroughTwenty));