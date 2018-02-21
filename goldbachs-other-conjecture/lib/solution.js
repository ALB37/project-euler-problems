'use strict';

// It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.

// 9 = 7 + 2×1^2
// 15 = 7 + 2×2^2
// 21 = 3 + 2×3^2
// 25 = 7 + 2×3^2
// 27 = 19 + 2×2^2
// 33 = 31 + 2×1^2

// It turns out that the conjecture was false.

// What is the smallest odd composite that cannot be written as the sum of a prime and twice a square ?

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

const generateOddComposites = primeArray => {
  const oddComposites = [];
  let n = 9;
  while (n < primeArray[primeArray.length - 1]){
    if (!primeArray.includes(n)){
      oddComposites.push(n);
    }
    n += 2;
  }
  return oddComposites;
};

const sumOfPrimeAndDoubleSquare = (oddComposite, primeArray) => {
  for (let prime of primeArray){
    if (prime > oddComposite + 2) break;
    let n = 1;
    while ((2 * Math.pow(n, 2) + prime) <= oddComposite){
      if ((2 * Math.pow(n, 2) + prime) === oddComposite){
        return true;
      }
      n++;
    }
  }
  return false;
};

const findSmallestRefutationOfTheorem = limit => {
  let primes = generatePrimesArray(limit);
  let oddComposites = generateOddComposites(primes);
  for (let oddComposite of oddComposites){
    if (!sumOfPrimeAndDoubleSquare(oddComposite, primes)){
      return oddComposite;
    }
  }
};

console.log(findSmallestRefutationOfTheorem(10000));