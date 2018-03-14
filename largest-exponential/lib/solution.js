'use strict';

// Comparing two numbers written in index form like 2^11 and 3^7 is not difficult, as any calculator would confirm that 2^11 = 2048 < 3^7 = 2187.

// However, confirming that 632382^518061 > 519432^525806 would be much more difficult, as both numbers contain over three million digits.

// Using base_exp.txt(right click and 'Save Link/Target As...'), a 22K text file containing one thousand lines with a base / exponent pair on each line, determine which line number has the greatest numerical value.

//   NOTE: The first two lines in the file represent the numbers in the example given above.

const fsx = require('fs-extra');

fsx.readFile(`${__dirname}/../assets/p099_base_exp.txt`)
  .then(data => {
    const powerArray = data
      .toString()
      .split('\n')
      .filter(e => e !== '')
      .map(e => e.split(','));

    let largestNumber = 0;
    let largestLine = null;

    // If we take a logarithm of the exponential expression, we can accomplish two things:
    // 1. We will bring the giant number into a reasonable range
    // 2. We can perform multiplication, which is a much easier operation than
    //    exponentiation. i.e. log(a^b) == b*log(a)
    // Because we are simply comparing relative sizes, we do not need the precise value of
    // the expression, and we can successfully compare these values. 

    for (let i = 0; i < powerArray.length; i++){
      const log = Math.log(Number(powerArray[i][0]));
      const exp = Number(powerArray[i][1]);
      const number = log * exp;
      if (number > largestNumber){
        // + 1 because the array starts at 0 while the line numbering starts at 1
        largestLine = i + 1;
        largestNumber = number;
      }
    }
    console.log(largestLine);
  });