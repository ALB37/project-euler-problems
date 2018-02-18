'use strict';

// In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

// 1p, 2p, 5p, 10p, 20p, 50p, £1(100p) and £2(200p).
// It is possible to make £2 in the following way:

// 1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
// How many different ways can £2 be made using any number of coins ?

const findCombinationsOfCoins = largestAmount => {
  let combinations = 0;
  for (let pennies = largestAmount; pennies >= 0; pennies--){
    if (pennies === largestAmount) {
      combinations++;
      continue;
    }
    let remainingAfterPennies = largestAmount - pennies;
    if (remainingAfterPennies < 2) continue;
    for (let twoCents = remainingAfterPennies; twoCents >= 0; twoCents--){
      if (pennies + (twoCents * 2) > largestAmount) continue;
      if (pennies + (twoCents * 2) === largestAmount) {
        combinations++;
        continue;
      }
      let remainingAfterTwoCents = largestAmount - pennies - (twoCents * 2);
      if (remainingAfterTwoCents < 5 || remainingAfterTwoCents % 5 !== 0) continue;
      for (let nickels = remainingAfterTwoCents; nickels >= 0; nickels--){
        if (pennies + (twoCents * 2) + (nickels * 5) > largestAmount) continue;
        if (pennies + (twoCents * 2) + (nickels * 5) === largestAmount) {
          combinations++;
          continue;
        }
        let remainingAfterNickels = largestAmount - pennies - (twoCents * 2) - (nickels * 5);
        if (remainingAfterNickels < 10 || remainingAfterNickels % 10 !== 0) continue;
        for (let dimes = remainingAfterNickels; dimes >= 0; dimes--){
          if (pennies + (twoCents * 2) + (nickels * 5) + (dimes * 10) > largestAmount) continue;

          if (pennies + (twoCents * 2) + (nickels * 5) + (dimes * 10) === largestAmount) {
            combinations++;
            continue;
          }
          let remainingAfterDimes = largestAmount - pennies - (twoCents * 2)  - (nickels * 5) - (dimes * 10);
          if (remainingAfterDimes < 20) continue;
          for (let twentyCents = remainingAfterDimes; twentyCents >= 0; twentyCents--){
            if (pennies + (twoCents * 2) + (nickels * 5) + (dimes * 10) + (twentyCents * 20) > largestAmount) continue;
            if (pennies + (twoCents * 2) + (nickels * 5) + (dimes * 10) + (twentyCents * 20) === largestAmount) {
              combinations++;
              continue;
            }
            let remainingAfterTwentyCents = largestAmount - pennies - (twoCents * 2)  - (nickels * 5) - (dimes * 10) - (twentyCents * 20);
            if (remainingAfterTwentyCents < 50 || remainingAfterTwentyCents % 50 !== 0) continue;
            for (let fiftyCents = remainingAfterTwentyCents; fiftyCents >= 0; fiftyCents--){
              if (pennies + (twoCents * 2) + (nickels * 5) + (dimes * 10) + (twentyCents * 20) + (fiftyCents * 50) > largestAmount) continue;

              if (pennies + (twoCents * 2) + (nickels * 5) + (dimes * 10) + (twentyCents * 20) + (fiftyCents * 50) === largestAmount) {
                combinations++;
                continue;
              }
              let remainingAfterFiftyCents = largestAmount - pennies - (twoCents * 2)  - (nickels * 5) - (dimes * 10) - (twentyCents * 20) - (fiftyCents * 50);
              if (remainingAfterFiftyCents < 100 || remainingAfterFiftyCents % 100 !== 0) continue;
              for (let dollars = remainingAfterFiftyCents; dollars >= 0; dollars--){
                if (pennies + (twoCents * 2) + (nickels * 5) + (dimes * 10) + (twentyCents * 20) + (fiftyCents * 50) + (dollars * 100) > largestAmount) continue;
                if (pennies + (twoCents * 2) + (nickels * 5) + (dimes * 10) + (twentyCents * 20) + (fiftyCents * 50) + (dollars * 100) === largestAmount) {
                  combinations++;
                  continue;
                }
                let remainingAfterDollars = largestAmount - pennies - (twoCents * 2)  - (nickels * 5) - (dimes * 10) - (twentyCents * 20) - (fiftyCents * 50) - (dollars * 100);
                if (remainingAfterDollars < 200) continue;
                combinations++;
              }
            }
          }
        }
      }
    }
  }
  return combinations;
};

console.log(findCombinationsOfCoins(200));