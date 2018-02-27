'use strict';

// Find the minimal path sum, in matrix.txt(right click and "Save Link/Target As..."), a 31K text file containing a 80 by 80 matrix, from the top left to the bottom right by only moving right and down.

const fsx = require('fs-extra');

fsx.readFile(`${__dirname}/../assets/p081_matrix.txt`)
  .then(data => {
    const rows = data.toString().split('\n').filter(e => e !== '');
    const matrix = rows.map(row => row.split(','));
    for (let row in matrix){
      for (let column in matrix[row]){
        matrix[row][column] = Number(matrix[row][column]);
      }
    }
    let accumulator = Number(matrix[0][0]);
    let row = 0;
    let column = 0;
    let rightPath = null;
    let downPath = null;
    while (row !== matrix.length - 1 && column !== matrix.length - 1){
      if (row === matrix.length - 2 && column === matrix.length - 2){
        rightPath = matrix[row][column + 1];
        downPath = matrix[row + 1][column];
        if (rightPath < downPath) {
          accumulator += matrix[row][column + 1];
          column++;
        } else {
          accumulator += matrix[row + 1][column];
          row++;
        }
        continue;
      }
      if (row === matrix.length - 2){
        rightPath = Math.min(matrix[row][column + 1] + matrix[row][column + 2], matrix[row][column + 1] + matrix[row + 1][column + 1]);
        downPath = matrix[row + 1][column] + matrix[row + 1][column + 1];
        if (rightPath < downPath) {
          accumulator += matrix[row][column + 1];
          column++;
        } else {
          accumulator += matrix[row + 1][column];
          row++;
        }
        continue;
      }
      if (column === matrix.length - 2){
        rightPath = matrix[row][column + 1] + matrix[row][column + 2];
        downPath = Math.min(matrix[row + 1][column] + matrix[row + 1][column + 1], matrix[row + 1][column] + matrix[row + 2][column]);
        if (rightPath < downPath) {
          accumulator += matrix[row][column + 1];
          column++;
        } else {
          accumulator += matrix[row + 1][column];
          row++;
        }
        continue;
      }
      if (row === matrix.length - 1){
        accumulator += matrix[row][column + 1];
        column++;
        continue;
      }
      if (column === matrix.length - 1){
        accumulator += matrix[row + 1][column];
        row++;
        continue;
      }
      rightPath = Math.min(matrix[row][column + 1] + matrix[row][column + 2], matrix[row][column + 1] + matrix[row + 1][column + 1]);
      downPath = Math.min(matrix[row + 1][column] + matrix[row + 1][column + 1], matrix[row + 1][column] + matrix[row + 2][column]);
      if (rightPath < downPath){
        accumulator += matrix[row][column + 1];
        column++;
      } else {
        accumulator += matrix[row + 1][column];
        row++;
      }
    }
    console.log(accumulator);
  });