'use strict';

// A palindromic number reads the same both ways.The largest palindrome made from the product of two 2 - digit numbers is 9009 = 91 × 99.

// Find the largest palindrome made from the product of two 3 - digit numbers.

const largestPalindrome = numberOfDigits => {
  let largestFound = 0;
  for (let i = Math.pow(10, numberOfDigits - 1); i < Math.pow(10, numberOfDigits); i++){
    let innerMult = i;
    for (let j = innerMult; j < 1000; j++){
      const product = i * j;
      if (isPalindrome(product)){
        if (product > largestFound){
          largestFound = product;
        }
      }
    }
  }
  return largestFound;
};

const isPalindrome = number => {
  let string = `${number}`;
  let strArr = string.split('');
  for (let i = 0; i < Math.floor(strArr.length / 2); i ++){
    if (Number(strArr[i]) !== Number(strArr[strArr.length - (i + 1)])){
      return false;
    }
  }
  return true;
};

console.log(largestPalindrome(3));