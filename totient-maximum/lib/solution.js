'use strict';

// Euler's Totient function, φ(n) [sometimes called the phi function], is used to determine the number of numbers less than n which are relatively prime to n. For example, as 1, 2, 4, 5, 7, and 8, are all less than nine and relatively prime to nine, φ(9)=6.

// n	Relatively Prime	φ(n)	n / φ(n)
// 2	1	                1	    2
// 3	1, 2	            2	    1.5
// 4	1, 3	            2	    2
// 5	1, 2, 3, 4	      4	    1.25
// 6	1, 5	            2	    3
// 7	1, 2, 3, 4, 5, 6	6	    1.1666...
// 8	1, 3, 5, 7	      4	    2
// 9	1, 2, 4, 5, 7, 8	6	    1.5
// 10	1, 3, 7, 9	      4	    2.5
// It can be seen that n = 6 produces a maximum n / φ(n) for n ≤ 10.

// Find the value of n ≤ 1,000,000 for which n / φ(n) is a maximum.

const bigInt = require('big-integer');
// const sieve = require('../../lib/sieve-of-atkin');

// const totientFunction = (number, primeArray) => {
//   if (bigInt(number).isPrime()){
//     return number - 1;
//   }

//   const primeFactors = [];

//   for (let prime of primeArray){
//     if (prime > number) break;
//     if (number % prime === 0){
//       primeFactors.push(prime);
//     }
//   }

//   const totientFactors = [number];

//   for (let prime of primeFactors){
//     totientFactors.push((1 - (1 / prime)));
//   }

//   return totientFactors.reduce((ac, v) => v * ac, 1);
// };

// const numUniquePrimeFactors = (number, primeArray) => {
//   if (bigInt(number).isPrime()) {
//     return 1;
//   }
//   const primeFactors = [];
//   for (let prime of primeArray){
//     if (prime > number) break;
//     if (number % prime === 0) {
//       primeFactors.push(prime);
//     }
//   }

//   return primeFactors.length;
// };

// const maxNdivPhiN = limit => {
//   let primeArray = sieve(limit);
//   primeArray = primeArray
//     .map((v, i) => v === 1 ? Number(i) : 0)
//     .filter(v => v !== 0);
//   let maxN = null;
//   let maxFactors = null;
//   // let max = 0;
//   let number = 2;

//   while (number <= limit) {
//     // console.log(number);
//     // const phiN = totientFunction(number, primeArray);
//     // const numOfPrimeFactors = numUniquePrimeFactors(number, primeArray);
//     // if (number / phiN > max){
//     //   max = number / phiN;
//     //   maxN = number;
//     //   console.log(maxN, phiN);
//     // }
//     if (numOfPrimeFactors > maxFactors){
//       maxN = number;
//       maxFactors = numOfPrimeFactors;
//       console.log(maxN, maxFactors);
//     }
//     number++;
//   }
//   return maxN;
// };

// console.log(maxNdivPhiN(1000000));

const findTotientMaximum = limit => {
  let accumulator = 1;
  let number = 2;
  let temp = accumulator;
  while (temp < limit){
    if (bigInt(number).isPrime()){
      temp = accumulator * number;
      if (temp < limit){
        accumulator = temp;
      }
    }
    number++;
  }
  return accumulator;
};

console.log(findTotientMaximum(1000000));