'use strict';

module.exports = limit => {
  const primeArray = [];

  // initialize primeArray
  for (let number = 0; number < limit; number++){
    primeArray[number] = 0;
  }

  for (let a = 1; a * a < limit; a++){
    for (let b = 1; b * b < limit; b++){
      let number = (4 * a * a) + (b * b);
      if (number <= limit && (number % 12 === 1 || number % 12 === 5)){
        primeArray[number] = primeArray[number] ^ 1;
      }
      number = (3 * a * a) + (b * b);
      if (number <= limit && number % 12 === 7) {
        primeArray[number] = primeArray[number] ^ 1;
      }
      number = (3 * a * a) - (b * b);
      if (a > b && number <= limit && number % 12 === 11) {
        primeArray[number] = primeArray[number] ^ 1;
      }
    }
  }

  // filter out multiples of squares
  for (let r = 5; r * r < limit; r++){
    if (primeArray[r]) {
      for (let i = r * r; i < limit; i += (r * r)){
        primeArray[i] = 0;
      }
    }
  }

  primeArray[2] = 1;
  primeArray[3] = 1;
  primeArray[5] = 1;

  return primeArray;
};