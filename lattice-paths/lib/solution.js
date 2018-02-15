'use strict';

// Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
// How many such routes are there through a 20×20 grid ?


// recursive solution that evaluates every possible path:

// const possiblePaths = gridSize => {

//   let combinations = 0;

//   const _helper = (distanceFromStart, rightPaths, downPaths) => {
//     if (distanceFromStart < 2 * gridSize) {
//       if (rightPaths > 0) {
//         _helper(distanceFromStart + 1, rightPaths - 1, downPaths);
//       }
//       if (downPaths > 0) {
//         _helper(distanceFromStart + 1, rightPaths, downPaths - 1);
//       }
//     } else {
//       combinations++;
//     }

//   };
//   _helper(0, gridSize, gridSize);
//   return combinations;
// };

// solution which uses combinatorics, results in a much faster O(n) time.

const possiblePaths = gridSize => {
  let result = 1;
  for (let value = 1; value <= gridSize; value++){
    result = (result * (gridSize + value)) / value;
  } 
  return result;
};

console.log(possiblePaths(20));