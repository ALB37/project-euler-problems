'use strict';

// If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.

// If all the numbers from 1 to 1000(one thousand) inclusive were written out in words, how many letters would be used ?


//   NOTE : Do not count spaces or hyphens.For example, 342(three hundred and forty - two) contains 23 letters and 115(one hundred and fifteen) contains 20 letters.The use of "and" when writing out numbers is in compliance with British usage.

const ONE = 'one';
const TWO = 'two';
const THREE = 'three';
const FOUR = 'four';
const FIVE = 'five';
const SIX = 'six';
const SEVEN = 'seven';
const EIGHT = 'eight';
const NINE = 'nine';
const TEN = 'ten';
const TEEN = 'teen';
const ELEVEN = 'eleven';
const TWELVE = 'twelve';
const THIRTEEN = 'thirteen';
const FIFTEEN = 'fifteen';
const EIGHTEEN = 'eighteen';
const TWENTY = 'twenty';
const TY = 'ty';
const THIRTY = 'thirty';
const FORTY = 'forty';
const FIFTY = 'fifty';
const EIGHTY = 'eighty';
const HUNDRED = 'hundred';
const AND = 'and';
const THOUSAND = 'thousand';

const simpleNumbers = numStr => {
  if (numStr === '1'){
    return ONE;
  }
  if (numStr === '2'){
    return TWO;
  }
  if (numStr === '3'){
    return THREE;
  }
  if (numStr === '4'){
    return FOUR;
  }
  if (numStr === '5'){
    return FIVE;
  }
  if (numStr === '6'){
    return SIX;
  }
  if (numStr === '7'){
    return SEVEN;
  }
  if (numStr === '8'){
    return EIGHT;
  }
  if (numStr === '9'){
    return NINE;
  }
};


const numbersToWords = number => {
  let word = '';
  const numberAsAString = number.toString();
  const numberArray = numberAsAString.split('');
  while (numberArray.length){
    const currentDigit = numberArray.shift();
    if (numberArray.length === 0){
      if (currentDigit === '0'){
        break;
      }
      word += simpleNumbers(currentDigit);
    }
    if (numberArray.length === 1){
      if (currentDigit === '0'){
        continue;
      }
      if (currentDigit === '1'){
        const nextDigit = numberArray.shift();
        if (nextDigit === '0'){
          word += TEN;
        } else if (nextDigit === '1') {
          word += ELEVEN;
        } else if (nextDigit === '2') {
          word += TWELVE;
        } else if (nextDigit === '3') {
          word += THIRTEEN;
        } else if (nextDigit === '5') {
          word += FIFTEEN;
        } else if (nextDigit === '8') {
          word += EIGHTEEN;
        } else {
          word += simpleNumbers(nextDigit) + TEEN;
        }
      } else if (currentDigit === '2'){
        word += TWENTY;
      } else if (currentDigit === '3'){
        word += THIRTY;
      } else if (currentDigit === '4') {
        word += FORTY;
      } else if (currentDigit === '5') {
        word += FIFTY;
      } else if (currentDigit === '8') {
        word += EIGHTY;
      } else {
        word += simpleNumbers(currentDigit) + TY;
      }
    }
    if (numberArray.length === 2){
      if (currentDigit === '0'){
        continue;
      } else {
        if (numberArray[0] === '0' && numberArray[1] === '0'){
          word += simpleNumbers(currentDigit) + HUNDRED;
          break;
        } else {
          word += simpleNumbers(currentDigit) + HUNDRED + AND;
        }
      }
    }
    if (numberArray.length === 3){
      word += simpleNumbers(currentDigit) + THOUSAND;
    }
  }
  return word;
};

const addNumberStrings = largestNumber => {
  const nameArray = [];
  for (let number = 1; number <= largestNumber; number++){
    nameArray.push(numbersToWords(number));
  }
  const longString = nameArray.join('');
  const charArray = longString.split('');
  return charArray.length;
};

console.log(addNumberStrings(1000));