'use strict';

// Find the unique positive integer whose square has the form 1_2_3_4_5_6_7_8_9_0,
//                                                      index:0123456789012345678
//   where each “_” is a single digit.

const bigInt = require('big-integer');

// the number must be between Math.sqrt(1020304050607080900) and Math.sqrt(1929394959697989900)

const STRLEN = 19;
const min = Math.floor(Math.sqrt(1020304050607080900));
const max = Math.ceil(Math.sqrt(1929394959697989990));

for (let num = min; num <= max; num += 10){
  const powerStr = bigInt(num).pow(2).toString();
  let special = true;
  for (let i = 0; i < STRLEN; i += 2){
    const int = (i + 2) / 2 < 10 ? (i + 2) / 2 : ((i + 2) / 2) % 10;
    if (powerStr.substr(i, 1) !== `${int}`){
      special = false;
      break;
    }
  }
  if (!special) continue;
  console.log(num);
  break;
}