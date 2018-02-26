'use strict';

// A common security method used for online banking is to ask the user for three random characters from a passcode.For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th characters; the expected reply would be: 317.

// The text file, keylog.txt, contains fifty successful login attempts.

// Given that the three characters are always asked for in order, analyse the file so as to determine the shortest possible secret passcode of unknown length.

const fsx = require('fs-extra');

// My approach is the following:
// Because each number will always come in the same order, we will create a map,
// where each value is a key, and the value associated with that key is a set of
// the numbers which appear after that number.
// Then, we know that the length of each set will be equivalent to its position
// in the shortest answer, where the numbers with the most following numbers will
// be towards the beginning of the passcode, and the numbers with the least following
// numbers will be towards the end.
// In fact, the number with 0 following numbers will be the last, and the number with
// all the following numbers will be first. Because of this one to one correlation, 
// the distance from the end of the number will be equal to the number of elements in
// a number's set.

fsx.readFile(`${__dirname}/../assets/p079_keylog.txt`)
  .then(data => {
    const dataArray = data.toString().split('\n').filter(e => e !== '');
    const dataMap = new Map();
    dataArray.forEach(val => {
      const valArr = val.split('');
      if (!dataMap.has(valArr[0])){
        dataMap.set(valArr[0], new Set());
      } 
      dataMap.get(valArr[0]).add(valArr[1]);
      dataMap.get(valArr[0]).add(valArr[2]);
      if (!dataMap.has(valArr[1])){
        dataMap.set(valArr[1], new Set());
      }
      dataMap.get(valArr[1]).add(valArr[2]);
      if (!dataMap.has(valArr[2])){
        dataMap.set(valArr[2], new Set());
      }
    });
    const solutionArray = new Array(dataMap.size);
    for (let key of dataMap.keys()){
      solutionArray[dataMap.size - dataMap.get(key).size - 1] = key;
    }
    console.log(solutionArray.join(''));
  });