'use strict';

// The prime factors of 13195 are 5, 7, 13 and 29.

// What is the largest prime factor of the number 600851475143 ?

const isPrime = number => {
  for (let factor = 2; factor < number; factor++){
    if (number % factor === 0){
      return false;
    }
  }
  return true;
};

const largestPrimeFactor = number => {
  let solution = number;
  while (solution > 0){
    if (number % solution === 0){
      if (isPrime(solution)){
        return solution;
      }
    }
    solution--;
  }            
  return solution;  
};

console.log(largestPrimeFactor(600851475143));


// Another method of solving this:

// This however will not work with such a large number
// unless the amount of memory allocated to the node.js process
// is increased... Even then, this process will need a lot of memory.
// This is because it has a much larger space complexity
// due to the creation of several copied arrays. Some of this could be
// overcome by modifying the array in place. 

const arrayMethod = number => {
  let array = [];
  for (let value = 2; value <= number; value++){
    array.push(value);
  }
  const primeArray = [];
  let current = null;
  while (array.length){
    current = array[0];
    primeArray.push(current);
    // using filter instead, the following codeblock could be replaced with:
    // array = array.filter(value => value % current !== 0);
    const newArray = [];
    for (let i = 0; i < array.length; i++){
      if (array[i] % current !== 0){
        newArray.push(array[i]);
      }
    }
    array = newArray;
  }
  // using filter instead, the following codeblock could be replaced with:
  // const primeFactorsArray = primeArray.filter(value => number % value === 0);
  const primeFactorsArray = [];
  for (let i = 0; i < primeArray.length; i++){
    if (number % primeArray[i] === 0){
      primeFactorsArray.push(primeArray[i]);
    }
  }
  return primeFactorsArray[primeFactorsArray.length - 1];
};

arrayMethod(25); // 5