'use strict';

// If p is the perimeter of a right angle triangle with integral length sides, {a,b,c}, there are exactly three solutions for p = 120.

// {20,48,52}, {24,45,51}, {30,40,50}

// For which value of p ≤ 1000, is the number of solutions maximised?

const maxIntegralSolutions = largestValue => {
  let largestPerimeter = null;
  let numberOfSolutions = 0;
  // 12 is the smallest integral right triangle, the 3, 4, 5 triangle.
  for (let perimeter = 12; perimeter <= largestValue; perimeter++){
    let perimeterSolutions = 0;
    for (let c = perimeter - 2; c > 0; c--){
      for (let a = 1; a <= Math.ceil((perimeter - c - 1) / 2); a++){
        const b = perimeter - a - c;
        if ((a * a) + (b * b) === (c * c)){
          perimeterSolutions++;
        }
      }
    }
    if (perimeterSolutions > numberOfSolutions){
      largestPerimeter = perimeter;
      numberOfSolutions = perimeterSolutions;
    }
  }
  return largestPerimeter;
};

console.log(maxIntegralSolutions(1000));