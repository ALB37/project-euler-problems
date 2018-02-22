'use strict';

// The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4 - digit numbers are permutations of one another.

// There are no arithmetic sequences made up of three 1 -, 2 -, or 3 - digit primes, exhibiting this property, but there is one other 4 - digit increasing sequence.

//   What 12 - digit number do you form by concatenating the three terms in this sequence ?

const generatePermuations = numberArray => {
  const digitArray = [...numberArray];
  const permutations = [];
  const _helper = (string, array) => {
    if (!array.length) {
      permutations.push(string);
      return;
    }
    for (let i = 0; i < array.length; i++) {
      const newArray = [...array];
      const newString = string + newArray.splice(i, 1)[0];
      _helper(newString, newArray);
    }
  };
  _helper('', digitArray);
  return permutations;
};

const isPrime = (number, primeArray) => {
  for (let primeNumber of primeArray) {
    if (number % primeNumber === 0) {
      return false;
    }
  }
  return true;
};

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

const primePermutations = () => {
  const primes = generatePrimesArray(10000);
  let specialPrimes = [];
  for (let number = 1000; number < 10000; number++){
    if (!primes.includes(number)) continue;
    const numberArray = number.toString().split('');
    const permutations = generatePermuations(numberArray);
    const primePermutations = permutations.filter((val, i, a) => {
      const num = Number(val);
      return primes.includes(num) && a.indexOf(val) === i && num >= 1000;
    });
    for (let prime of primePermutations){
      const numberPrime = Number(prime);
      if (primePermutations.includes((numberPrime + 3330).toString()) 
        && primePermutations.includes((numberPrime + 6660)).toString() 
        && primes.includes(numberPrime + 3330) 
        && primes.includes(numberPrime + 6660)){
        specialPrimes.push(`${numberPrime}${numberPrime + 3330}${numberPrime + 6660}`);
      }
    }
  }
  specialPrimes = specialPrimes.filter((e, i, a) => {
    return a.indexOf(e) === i && e !== '148748178147';
  });
  return specialPrimes[0];
};

console.log(primePermutations());