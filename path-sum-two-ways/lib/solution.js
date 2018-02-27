'use strict';

// Find the minimal path sum, in matrix.txt(right click and "Save Link/Target As..."), a 31K text file containing a 80 by 80 matrix, from the top left to the bottom right by only moving right and down.

const fsx = require('fs-extra');

fsx.readFile(`${__dirname}/../assets/p081_matrix.txt`)
  .then(data => {
    const rows = data.toString().split('\n').filter(e => e !== '');
    const matrix = rows.map(row => row.split(','));
    const memo = new Map();
    for (let row = 0; row < matrix.length; row++){
      for (let column = 0; column < matrix[row].length; column++){
        matrix[row][column] = Number(matrix[row][column]);
        memo.set(`r${row}c${column}`, null);
      }
    }
    const _helper = (row, column) => {
      let rightPath, downPath;
      if (row !== matrix.length - 1){
        if (memo.get(`r${row + 1}c${column}`)){
          rightPath = memo.get(`r${row + 1}c${column}`);
          console.log(rightPath);
        } else {
          rightPath = _helper(row + 1, column);
        }
      }
      if (column !== matrix.length - 1){
        if (memo.get(`r${row}c${column + 1}`)) {
          downPath = memo.get(`r${row}c${column + 1}`);
          console.log(downPath);
        } else {
          downPath = _helper(row, column + 1);
        }
      }

      if (!rightPath && !downPath) {
        memo.set(`r${row}c${column}`, matrix[row][column]);
        return matrix[row][column];
      }
      if (!rightPath) {
        memo.set(`r${row}c${column}`, matrix[row][column] + downPath);
        return matrix[row][column] + downPath;
      }
      if (!downPath) {
        memo.set(`r${row}c${column}`, matrix[row][column] + rightPath);
        return matrix[row][column] + rightPath;
      }
      if (rightPath < downPath) {
        memo.set(`r${row}c${column}`, matrix[row][column] + rightPath);
        return matrix[row][column] + rightPath;
      }
      memo.set(`r${row}c${column}`, matrix[row][column] + downPath);
      return matrix[row][column] + downPath;
    };

    console.log(_helper(0, 0));
  });