'use strict';

// The decimal number, 585 = 1001001001(binary), is palindromic in both bases.

// Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.

//   (Please note that the palindromic number, in either base, may not include leading zeros.)

const decimalToBinary = number => {
  return parseInt(String(number), 10).toString(2);
};

const palindromicDecimals = limit => {
  const palindromicNumbers = [];
  for (let number = 0; number < limit; number++){
    const strNum = number.toString();
    if (isPalindromicNumber(strNum)) palindromicNumbers.push(number);
  }
  return palindromicNumbers;
};

const isPalindromicNumber = numberAsAString => {
  const strArr = numberAsAString.split('');
  let isPalindromic = true;
  for (let i = 0; i <= Math.floor(strArr.length / 2); i++) {
    if (strArr[i] !== strArr[strArr.length - 1 - i]) {
      isPalindromic = false;
      break;
    }
  }
  return isPalindromic;
};

const doubleBasePalindromes = limit => {
  const decimalsWhichArePalindromes = palindromicDecimals(limit);
  const arrayOfDoubleBasePalindromes = [];
  for (let number of decimalsWhichArePalindromes){
    if (isPalindromicNumber(decimalToBinary(number))) arrayOfDoubleBasePalindromes.push(number);
  }
  return arrayOfDoubleBasePalindromes.reduce((acc, val) => acc + val, 0);
};

console.log(doubleBasePalindromes(1000000));