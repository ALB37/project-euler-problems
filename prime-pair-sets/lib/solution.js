'use strict';

// The primes 3, 7, 109, and 673, are quite remarkable.By taking any two primes and concatenating them in any order the result will always be prime.For example, taking 7 and 109, both 7109 and 1097 are prime.The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.

// Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.

const sieveOfAtkin = require('../../lib/sieve-of-atkin');

const findSmallestConcatPrimes = limit => {
  const primeArray = sieveOfAtkin(limit);
  const foundPrimes = [];
  for (let primeA in primeArray){
    if (foundPrimes.length) break;
    if (!primeArray[primeA]) continue;
    for (let primeB in primeArray){
      if (foundPrimes.length) break;
      if (!primeArray[primeB]) continue;
      if (primeB > primeA) break;

      // combinations of primeA and primeB
      const primeAB = Number(`${primeA}${primeB}`);
      const primeBA = Number(`${primeB}${primeA}`);
      if (primeAB > limit || primeBA > limit) break;
      if (!primeArray[primeAB] || !primeArray[primeBA]) continue;

      for (let primeC in primeArray){
        if (foundPrimes.length) break;
        if (!primeArray[primeC]) continue;
        if (primeC > primeA) break;

        // combinations of primeC with primeA and primeB
        const primeAC = Number(`${primeA}${primeC}`);
        const primeCA = Number(`${primeC}${primeA}`);
        const primeBC = Number(`${primeB}${primeC}`);
        const primeCB = Number(`${primeC}${primeB}`);
        if (primeAC > limit 
            || primeCA > limit
            || primeBC > limit
            || primeCB > limit)
          break;

        if (!primeArray[primeAC] 
              || !primeArray[primeCA]
              || !primeArray[primeBC]
              || !primeArray[primeCB]) 
          continue;

        for (let primeD in primeArray){
          if (foundPrimes.length) break;
          if (!primeArray[primeD]) continue;
          if (primeD > primeA) break;

          // combinations of primeD with primeA, primeB and primeC
          const primeAD = Number(`${primeA}${primeD}`);
          const primeDA = Number(`${primeD}${primeA}`);
          const primeBD = Number(`${primeB}${primeD}`);
          const primeDB = Number(`${primeD}${primeB}`);
          const primeCD = Number(`${primeC}${primeD}`);
          const primeDC = Number(`${primeD}${primeC}`);

          if (primeAD > limit
              || primeDA > limit
              || primeBD > limit
              || primeDB > limit
              || primeCD > limit
              || primeDC > limit)
            break;

          if (!primeArray[primeAD]
                || !primeArray[primeDA]
                || !primeArray[primeBD]
                || !primeArray[primeDB]
                || !primeArray[primeCD]
                || !primeArray[primeDC])
            continue;

          for (let primeE in primeArray){
            if (!primeArray[primeE]) continue;
            if (primeE > primeA) break;

            //combinations of primeE with primeA, primeB, primeC and primeD
            const primeAE = Number(`${primeA}${primeE}`);
            const primeEA = Number(`${primeE}${primeA}`);
            const primeBE = Number(`${primeB}${primeE}`);
            const primeEB = Number(`${primeE}${primeB}`);
            const primeCE = Number(`${primeC}${primeE}`);
            const primeEC = Number(`${primeE}${primeC}`);
            const primeDE = Number(`${primeD}${primeE}`);
            const primeED = Number(`${primeE}${primeD}`);

            if (primeAE > limit
                || primeEA > limit
                || primeBE > limit
                || primeEB > limit
                || primeCE > limit
                || primeEC > limit
                || primeDE > limit
                || primeED > limit)
              break;

            if (!primeArray[primeAE]
                  || !primeArray[primeEA]
                  || !primeArray[primeBE]
                  || !primeArray[primeEB]
                  || !primeArray[primeCE]
                  || !primeArray[primeEC]
                  || !primeArray[primeDE]
                  || !primeArray[primeED])
              continue;
              
            foundPrimes.push(
              Number(primeA), 
              Number(primeB), 
              Number(primeC), 
              Number(primeD), 
              Number(primeE));
            break;
          }
        }
      }
    }
  }
  if (!foundPrimes.length) return 'none in range';
  console.log(foundPrimes);
  return foundPrimes.reduce((ac, v) => v + ac, 0);
};

console.log(findSmallestConcatPrimes(1000000));