'use strict';

// The Fibonacci sequence is defined by the recurrence relation:
// Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.

// It turns out that F541, which contains 113 digits, is the first Fibonacci number for which the last nine digits are 1-9 pandigital (contain all the digits 1 to 9, but not necessarily in order). And F2749, which contains 575 digits, is the first Fibonacci number for which the first nine digits are 1-9 pandigital.

// Given that Fk is the first Fibonacci number for which the first nine digits AND the last nine digits are 1-9 pandigital, find k.

const bigInt = require('big-integer');

const isPandigital = str => {
  // following necessary if input str is not guaranteed to be length 9:
  // if (str.length !== 9) return false;
  const strArr = str.split('');
  for (let i = 1; i < 10; i++){
    if (!strArr.length) return false;
    if (!strArr.includes(`${i}`)) return false;
    strArr.filter(e => e !== `${i}`);
  }
  return true;
};

const pandigitalFibEnds = () => {
  const fibMem  = [bigInt(1), bigInt(1)];
  let val = 2;
  //loop until answer found:
  for (;;) {
    const temp = fibMem[1];
    fibMem[1] = fibMem[0].add(fibMem[1]);
    fibMem[0] = temp;
    val++;
    const currentString = fibMem[1].toString();
    // micro-optimization based on empirical observation
    if (val > 325000) {
      console.log(val);
      const front = currentString.slice(0,9);
      const back = currentString.slice(-9);

      if (isPandigital(front) && isPandigital(back)) {
        return val;
      }
    }
  }
};

console.log(pandigitalFibEnds());

