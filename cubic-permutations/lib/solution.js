'use strict';

// The cube, 41063625(3453), can be permuted to produce two other cubes: 56623104(3843) and 66430125(4053).In fact, 41063625 is the smallest cube which has exactly three permutations of its digits which are also cube.

// Find the smallest cube for which exactly five permutations of its digits are cube.

const generateCubeNumbers = limit => {
  const cubeArr = [];
  for (let num = 1; num < limit; num++){
    cubeArr.push(Math.pow(num, 3));
  }
  return cubeArr;
};

const fivePermutationCube = limit =>  {
  const cubeArr = generateCubeNumbers(limit).filter(e => e > 41063625);
  for (let i in cubeArr){
    let permutationsFound = 1;
    const cubeDigits = cubeArr[i].toString().split('');
    for (let j = Number(i) + 1; j < cubeArr.length; j++){
      const upperLimit = Math.pow(10, (cubeDigits.length + 1));
      if (cubeArr[j] > upperLimit) break;
      const nextPossiblePermutation = cubeArr[j].toString().split('');
      for (let digit of cubeDigits){
        if (nextPossiblePermutation.includes(digit)){
          nextPossiblePermutation.splice(nextPossiblePermutation.indexOf(digit), 1);
        }
      }
      if (nextPossiblePermutation.length === 0){
        if (++permutationsFound === 5){
          return cubeArr[i];
        }
      }
    }
  }
};

console.log(fivePermutationCube(10000));