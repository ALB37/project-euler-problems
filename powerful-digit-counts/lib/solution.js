'use strict';

// The 5 - digit number, 16807 = 7^5, is also a fifth power.Similarly, the 9 - digit number, 134217728 = 8^9, is a ninth power.

// How many n - digit positive integers exist which are also an nth power ?

let nthPowerNDigits = 0;
let startState = 1;
let power = 1;

while (startState < 10){
  let number = startState;
  while (Math.pow(number, power) < Math.pow(10, power)){
    if (Math.pow(number, power) >= Math.pow(10, power - 1)){
      nthPowerNDigits++;
    } else {
      startState++;
    }
    number++;
  }
  power++;
}

console.log(nthPowerNDigits);