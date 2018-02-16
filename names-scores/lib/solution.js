'use strict';

// Using names.txt(right click and 'Save Link/Target As...'), a 46K text file containing over five - thousand first names, begin by sorting it into alphabetical order.Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.

// For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list.So, COLIN would obtain a score of 938 × 53 = 49714.

// What is the total of all the name scores in the file ?

const fsx = require('fs-extra');

const LETTER_OFFSET = 64;

const sumNameValues = filePath => {
  let arrayOfWords = [];
  let sum = null;
  return fsx.readFile(filePath)
    .then(buffer => {
      let text = buffer.toString('utf-8');
      arrayOfWords = text.split('"');
      arrayOfWords = arrayOfWords.filter(word => word !== ',' && word !== '');
      arrayOfWords = arrayOfWords.sort();
      sum = arrayOfWords.reduce((acc, val, i) => {
        let nameArr = val.split('');
        let nameWorth = nameArr.reduce((ac, v) => ac + (v.charCodeAt() - LETTER_OFFSET), 0);
        return acc + (nameWorth * (i + 1));
      }, 0);
    })
    .then(() => console.log(sum));
};

sumNameValues(`${__dirname}/../assets/p022_names.txt`);