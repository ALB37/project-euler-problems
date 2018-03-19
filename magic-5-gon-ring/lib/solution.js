'use strict';

// Consider the following "magic" 3 - gon ring, filled with the numbers 1 to 6, and each line adding to nine.


// Working clockwise, and starting from the group of three with the numerically lowest external node(4, 3, 2 in this example), each solution can be described uniquely.For example, the above solution can be described by the set: 4, 3, 2; 6, 2, 1; 5, 1, 3.

// It is possible to complete the ring with four different totals: 9, 10, 11, and 12. There are eight solutions in total.

// Total	Solution Set
// 9	4, 2, 3; 5, 3, 1; 6, 1, 2
// 9	4, 3, 2; 6, 2, 1; 5, 1, 3
// 10	2, 3, 5; 4, 5, 1; 6, 1, 3
// 10	2, 5, 3; 6, 3, 1; 4, 1, 5
// 11	1, 4, 6; 3, 6, 2; 5, 2, 4
// 11	1, 6, 4; 5, 4, 2; 3, 2, 6
// 12	1, 5, 6; 2, 6, 4; 3, 4, 5
// 12	1, 6, 5; 3, 5, 4; 2, 4, 6
// By concatenating each group it is possible to form 9 - digit strings; the maximum string for a 3 - gon ring is 432621513.

// Using the numbers 1 to 10, and depending on arrangements, it is possible to form 16 - and 17 - digit strings.What is the maximum 16 - digit string for a "magic" 5 - gon ring ?

// The largest value will have all the largest values on the outer ring, and because it
// must start with the smallest, should start at 6, and then increment from the 
// largest down:

// outer: [6, 10, 9, 8, 7]
// inner: various combinations of [1, 2, 3, 4, 5]


const innerPermutations = arrayOfNumbers => {
  const permutations = [];
  const _helper = (array, permutArr) => {
    if (!array.length) {
      permutations.push(permutArr);
    }
    for (let i in array) {
      const arrayCopy = [...array];
      const permutCopy = [...permutArr];
      permutCopy.push(arrayCopy.splice(i, 1)[0]);
      _helper(arrayCopy, permutCopy);
    }
  };
  _helper(arrayOfNumbers, []);
  return permutations;
};

const validMagicPentRings = () => {
  const validRings = [];
  const outerRing = [6, 10, 9, 8, 7];
  const innerRing = [1, 2, 3, 4, 5];
  const innerPerms = innerPermutations(innerRing);
  for (let perm of innerPerms) {
    const num = outerRing[0] + perm[0] + perm[1];
    let valid = true;
    for (let i in perm) {
      if (Number(i) !== perm.length - 1) {
        if (num !== outerRing[i] + perm[i] + perm[Number(i) + 1]) {
          valid = false;
          break;
        }
      } else {
        if (num !== outerRing[i] + perm[i] + perm[0]) {
          valid = false;
        }
      }
    }
    if (valid) {
      validRings.push(perm);
    }
  }
  return validRings;
};

const findLargestArrangement = () => {
  const outerRing = [6, 10, 9, 8, 7];
  const validInnerPerms = validMagicPentRings();
  let largestNum = 0;
  for (let innerRing of validInnerPerms) {
    let string = '';
    for (let i in innerRing) {
      if (Number(i) !== innerRing.length - 1) {
        string += outerRing[i].toString() + innerRing[i] + innerRing[Number(i ) + 1];
      } else {
        string += outerRing[i].toString()  + innerRing[i] + innerRing[0];
      }
    }
    if (Number(string) > largestNum) {
      largestNum = Number(string);
    }
  }
  return largestNum;
};

console.log(findLargestArrangement());