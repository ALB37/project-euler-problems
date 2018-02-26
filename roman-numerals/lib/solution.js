'use strict';

// For a number written in Roman numerals to be considered valid there are basic rules which must be followed.Even though the rules allow some numbers to be expressed in more than one way there is always a "best" way of writing a particular number.

// For example, it would appear that there are at least six ways of writing the number sixteen:

// IIIIIIIIIIIIIIII
// VIIIIIIIIIII
// VVIIIIII
// XIIIIII
// VVVI
// XVI

// However, according to the rules only XIIIIII and XVI are valid, and the last example is considered to be the most efficient, as it uses the least number of numerals.

//   The 11K text file, roman.txt(right click and 'Save Link/Target As...'), contains one thousand numbers written in valid, but not necessarily minimal, Roman numerals; see About...Roman Numerals for the definitive rules for this problem.

// Find the number of characters saved by writing each of these in their minimal form.

//   Note: You can assume that all the Roman numerals in the file contain no more than four consecutive identical units.

const fsx = require('fs-extra');

// M = 1000
// CM = 900
// D = 500
// CD = 400
// C = 100
// XC = 90
// L = 50
// XL = 40
// X = 10
// IX = 9
// V = 5
// IV = 4
// I = 1

fsx.readFile(`${__dirname}/../assets/p089_roman.txt`)
  .then(data => {
    const dataArray = data.toString().split('\n').filter(e => e !== '');
    let charactersSaved = 0;
    dataArray.forEach(number => {
      const originalLength = number.length;
      let numberValue = 0;
      const numberArray = number.split('');
      while (numberArray.length){
        let currentDigit = numberArray.shift();
        if (currentDigit === 'M'){
          numberValue += 1000;
          continue;
        }
        if (currentDigit === 'D'){
          numberValue += 500;
          continue;
        }
        if (currentDigit === 'C'){
          if (numberArray[0] === 'M'){
            numberArray.shift();
            numberValue += 900;
            continue;
          }
          if (numberArray[0] === 'D') {
            numberArray.shift();
            numberValue += 400;
            continue;
          }
          numberValue += 100;
          continue;

        }
        if (currentDigit === 'L'){
          numberValue += 50;
          continue;
        }
        if (currentDigit === 'X'){
          if (numberArray[0] === 'C') {
            numberArray.shift();
            numberValue += 90;
            continue;
          }
          if (numberArray[0] === 'L') {
            numberArray.shift();
            numberValue += 40;
            continue;
          }
          numberValue += 10;
          continue;
        }
        if (currentDigit === 'V'){
          numberValue += 5;
          continue;
        }
        if (currentDigit === 'I'){
          if (numberArray[0] === 'X') {
            numberArray.shift();
            numberValue += 9;
            continue;
          }
          if (numberArray[0] === 'V') {
            numberArray.shift();
            numberValue += 4;
            continue;
          }
          numberValue += 1;
          continue;
        }
      }
      let newString = '';
      while (numberValue > 0){
        if (numberValue >= 1000){
          newString += 'M';
          numberValue -= 1000;
          continue;
        }
        if (numberValue >= 900){
          newString += 'CM';
          numberValue -= 900;
          continue;
        }
        if (numberValue >= 500){
          newString += 'D';
          numberValue -= 500;
          continue;
        }
        if (numberValue >= 400){
          newString += 'CD';
          numberValue -= 400;
          continue;
        }
        if (numberValue >= 100){
          newString += 'C';
          numberValue -= 100;
          continue;
        }
        if (numberValue >= 90){
          newString += 'XC';
          numberValue -= 90;
          continue;
        }
        if (numberValue >= 50){
          newString += 'L';
          numberValue -= 50;
          continue;
        }
        if (numberValue >= 40){
          newString += 'XL';
          numberValue -= 40;
          continue;
        }
        if (numberValue >= 10){
          newString += 'X';
          numberValue -= 10;
          continue;
        }
        if (numberValue >= 9){
          newString += 'IX';
          numberValue -= 9;
          continue;
        }
        if (numberValue >= 5){
          newString += 'V';
          numberValue -= 5;
          continue;
        }
        if (numberValue >= 4){
          newString += 'IV';
          numberValue -= 4;
          continue;
        }
        if (numberValue >= 1){
          newString += 'I';
          numberValue -= 1;
          continue;
        }
      }
      const newLength = newString.length;
      charactersSaved += originalLength - newLength;
    });
    console.log(charactersSaved);
  });