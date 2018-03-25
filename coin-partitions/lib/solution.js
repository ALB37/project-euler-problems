'use strict';

// Let p(n) represent the number of different ways in which n coins can be separated into piles.For example, five coins can be separated into piles in exactly seven different ways, so p(5) = 7.

// OOOOO
// OOOO   O
// OOO   OO
// OOO   O   O
// OO   OO   O
// OO   O   O   O
// O   O   O   O   O
// Find the least value of n for which p(n) is divisible by one million.

const smallestMillion = () => {
  const genPentNums = [];
  //populate generalized pentagonal numbers within a reasonable range
  for (let i = 1; i < 200; i++){
    const temp = [];
    temp.push(i * (3 * i - 1) / 2);
    temp.push(i * (3 * i - 1) / 2 + i);
    genPentNums.push(...temp);
  }

  const combinations = [1];
  // sign array which follows pattern for whether num in sequence is +/-
  const sign = [1, 1, -1, -1];
  let n = 0;
  // if the combination at n is 0, the combinations of n will have been
  // divisible by 1000000.
  while (combinations[n] !== 0) {
    n++;
    let i = 0;
    let penta = 0;
    while (genPentNums[i] <= n) {
      penta += sign[i % 4] * combinations[n - genPentNums[i]];
      i++;
    }
    // only push modulo 1000000 numbers so as to avoid using bigInt
    combinations.push(penta % 1000000);
  }
  return n;
};

console.log(smallestMillion());