'use strict';

// The nth term of the sequence of triangle numbers is given by, tn = ½n(n + 1); so the first ten triangle numbers are:

// 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

// By converting each letter in a word to a number corresponding to its alphabetical position and adding these values we form a word value.For example, the word value for SKY is 19 + 11 + 25 = 55 = t10.If the word value is a triangle number then we shall call the word a triangle word.

// Using words.txt(right click and 'Save Link/Target As...'), a 16K text file containing nearly two - thousand common English words, how many are triangle words ? 

const fsx = require('fs-extra');

// finding the largest possible triangle number for this set of words, 
// 15 characters long where each character is a 'Z' (26)

const largestTriangleNumber = 15 * 26;

const generateTriangleNumbers = limit => {
  const triangleNumbers = [];
  let iterator = 1;
  let currentTriangleNumber = 1;
  while (currentTriangleNumber < limit){
    currentTriangleNumber = (iterator * (iterator + 1)) / 2;
    triangleNumbers.push(currentTriangleNumber);
    iterator++;
  }
  return triangleNumbers;
};

const LETTER_OFFSET = 64;

const sumNameValues = filePath => {
  let arrayOfWords = [];
  const triangleNumbers = generateTriangleNumbers(largestTriangleNumber);
  let numberOfTriangleWords = 0;
  return fsx.readFile(filePath)
    .then(buffer => {
      const text = buffer.toString('utf-8');
      arrayOfWords = text.split('"');
      arrayOfWords = arrayOfWords.filter(word => word !== ',' && word !== '');
      arrayOfWords.forEach(word => {
        const arrayOfLetters = word.split('');
        const wordValue = arrayOfLetters.reduce((acc, val) => {
          return acc + (val.charCodeAt() - LETTER_OFFSET);
        }, 0);
        if (triangleNumbers.includes(wordValue)){
          numberOfTriangleWords++;
        }
      });
    })
    .then(() => console.log(numberOfTriangleWords));
};

sumNameValues(`${__dirname}/../assets/p042_words.txt`);