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

const diagonalNumbers = squareSize => {
  const maxNum = squareSize * squareSize;
  let num = 1;
  let index = 0;
  let increment = 2;
  let topRightNum = 0;
  let topRightDenom = 0;
  let topLeftNum = 0;
  let topLeftDenom = 0;
  let bottomLeftNum = 0;
  let bottomLeftDenom = 0;
  while (num <= maxNum) {
    // num is the diagonal, number 
    // index % 4 == 1 is top right diagonal
    // index % 4 == 2 is top left diagonal
    // index % 4 == 3 is bottom left diagonal
    // index % 4 == 0 is bottom right diagonal
    index++;
    num += increment;
    switch (index % 4) {
      case 0: {
        increment += 2;
        break;
      }
      case 1: {
        topRightDenom++;
        break;
      }
      case 2: {
        topLeftDenom++;
        break;
      }
      case 3: {
        bottomLeftDenom++;
        break;
      }
    }
  }
};

console.log();