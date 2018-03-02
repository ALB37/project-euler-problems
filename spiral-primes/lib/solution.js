'use strict';

// Starting with 1 and spiralling anticlockwise in the following way, a square spiral with side length 7 is formed.

// 37 36 35 34 33 32 31
// 38 17 16 15 14 13 30
// 39 18  5  4  3 12 29
// 40 19  6  1  2 11 28
// 41 20  7  8  9 10 27
// 42 21 22 23 24 25 26
// 43 44 45 46 47 48 49

// It is interesting to note that the odd squares lie along the bottom right diagonal, but what is more interesting is that 8 out of the 13 numbers lying along both diagonals are prime; that is, a ratio of 8 / 13 ≈ 62 %.

// If one complete new layer is wrapped around the spiral above, a square spiral with side length 9 will be formed.If this process is continued, what is the side length of the square spiral for which the ratio of primes along both diagonals first falls below 10 %?

// The Sieve of Atkin requires too much memory for this application
// and the AKS test is too slow.

// const primeSieve = require('./sieve-of-atkin');
// const aksTest = require('./aks-primality-test');
const bigInt = require('big-integer');

const findSquareSize = limit => {
  let index = 0;
  let squareSize = 1;
  let number = 1;
  let incrementer = 0;
  let numberOfDiagonals = 1;
  let primesEncountered = 0;
  
  while (squareSize < limit) {
    // From what I understand, bigInt uses an implementation of the
    // Miller-Rabin primality test. Miller-Rabin is probabalistic,
    // however, the primes we are checking should be in the range
    // where the numbers it generates are certain to be prime.
    // Miller-Rabin is much faster than the AKS test, but it suffers
    // from not being completely deterministic.
    if (index % 4 !== 0 && bigInt(number).isPrime()){
      primesEncountered++;
    }
    
    if (index % 4 === 0) {
      incrementer += 2;
      if (squareSize > 1 && primesEncountered / numberOfDiagonals < 0.1){
        return squareSize;
      } 
      squareSize += 2;
    }
    
    number += incrementer;
    
    index++;
    numberOfDiagonals++;
  }
};

console.log(findSquareSize(30000));
