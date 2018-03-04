'use strict';

// The primes 3, 7, 109, and 673, are quite remarkable.By taking any two primes and concatenating them in any order the result will always be prime.For example, taking 7 and 109, both 7109 and 1097 are prime.The sum of these four primes, 792, represents the lowest sum for a set of four primes with this property.

// Find the lowest sum for a set of five primes for which any two primes concatenate to produce another prime.

const bigInt = require('big-integer');

const findSmallestConcatPrimes = limit => {
  const foundPrimes = [];
  for (let primeA = 3; primeA < limit; primeA++){
    if (foundPrimes.length) break;
    if (!bigInt(primeA).isPrime()) continue;
    for (let primeB = 3; primeB < primeA; primeB++){
      if (foundPrimes.length) break;
      if (!bigInt(primeB).isPrime()) continue;

      // combinations of primeA and primeB
      const primeAB = Number(`${primeA}${primeB}`);
      const primeBA = Number(`${primeB}${primeA}`);
      
      if (!bigInt(primeAB).isPrime() || !bigInt(primeBA).isPrime()) continue;

      for (let primeC = 3; primeC < primeB; primeC++){
        if (foundPrimes.length) break;
        if (!bigInt(primeC).isPrime()) continue;

        // combinations of primeC with primeA and primeB
        const primeAC = Number(`${primeA}${primeC}`);
        const primeCA = Number(`${primeC}${primeA}`);
        const primeBC = Number(`${primeB}${primeC}`);
        const primeCB = Number(`${primeC}${primeB}`);

        if (!bigInt(primeAC).isPrime() 
              || !bigInt(primeCA).isPrime()
              || !bigInt(primeBC).isPrime()
              || !bigInt(primeCB).isPrime()) 
          continue;

        for (let primeD = 3; primeD < primeC; primeD++){
          if (foundPrimes.length) break;
          if (!bigInt(primeD).isPrime()) continue;

          // combinations of primeD with primeA, primeB and primeC
          const primeAD = Number(`${primeA}${primeD}`);
          const primeDA = Number(`${primeD}${primeA}`);
          const primeBD = Number(`${primeB}${primeD}`);
          const primeDB = Number(`${primeD}${primeB}`);
          const primeCD = Number(`${primeC}${primeD}`);
          const primeDC = Number(`${primeD}${primeC}`);

          if (!bigInt(primeAD).isPrime()
                || !bigInt(primeDA).isPrime()
                || !bigInt(primeBD).isPrime()
                || !bigInt(primeDB).isPrime()
                || !bigInt(primeCD).isPrime()
                || !bigInt(primeDC).isPrime())
            continue;

          for (let primeE = 3; primeE < primeD; primeE++){
            if (!bigInt(primeE).isPrime()) continue;

            //combinations of primeE with primeA, primeB, primeC and primeD
            const primeAE = Number(`${primeA}${primeE}`);
            const primeEA = Number(`${primeE}${primeA}`);
            const primeBE = Number(`${primeB}${primeE}`);
            const primeEB = Number(`${primeE}${primeB}`);
            const primeCE = Number(`${primeC}${primeE}`);
            const primeEC = Number(`${primeE}${primeC}`);
            const primeDE = Number(`${primeD}${primeE}`);
            const primeED = Number(`${primeE}${primeD}`);

            if (!bigInt(primeAE).isPrime()
                  || !bigInt(primeEA).isPrime()
                  || !bigInt(primeBE).isPrime()
                  || !bigInt(primeEB).isPrime()
                  || !bigInt(primeCE).isPrime()
                  || !bigInt(primeEC).isPrime()
                  || !bigInt(primeDE).isPrime()
                  || !bigInt(primeED).isPrime())
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

console.log(findSmallestConcatPrimes(Math.pow(10, 15)));