'use strict';

// The minimal path sum in the 5 by 5 matrix below, by starting in any cell in the left column and finishing in any cell in the right column, and only moving up, down, and right, is indicated in red and bold; the sum is equal to 994.

// Find the minimal path sum, in matrix.txt(right click and "Save Link/Target As..."), a 31K text file containing a 80 by 80 matrix, from the left column to the right column.

const fsx = require('fs-extra');

// The following approach works by looking at two columns at a time, and working backwards
// to find the smallest cost of each path at each column to the next

fsx.readFile(`${__dirname}/../assets/p082_matrix.txt`)
// fsx.readFile(`${__dirname}/../assets/test.txt`)
  .then(data => {
    const rows = data.toString().split('\n').filter(e => e !== '');
    const matrix = rows.map(row => row.split(','));
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < matrix[row].length; column++) {
        matrix[row][column] = Number(matrix[row][column]);
      }
    }
    const solutionArray = [];
    for (let i = 0; i < matrix.length; i++){
      //initialize the solution array with the values of the last column
      solutionArray[i] = matrix[i][matrix.length - 1];
    }
    for (let i = matrix.length - 2; i >= 0; i--){
      // solutionArray[0] will be cost of going straight across the top of the matrix
      solutionArray[0] += matrix[0][i];
      for (let j = 1; j < matrix.length; j++){
        // check whether it's cheaper to go up and to the right or straight right from each column to the next
        solutionArray[j] = Math.min(solutionArray[j - 1] + matrix[j][i], solutionArray[j] + matrix[j][i]);
      }

      for (let j = matrix.length - 2; j >= 0; j--) {
        // check whether it's cheaper to do the previous movement, or down and to the right
        solutionArray[j] = Math.min(solutionArray[j], solutionArray[j + 1] + matrix[j][i]);
      }
    }
    // last we find the smallest number from what will be the smallest path of each starting number
    console.log(Math.min(...solutionArray));
  });