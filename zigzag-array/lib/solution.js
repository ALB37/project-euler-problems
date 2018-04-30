'use strict';

// Take an array of unique integers, and return a zig-zagged array; 
// i.e. the previous value is always either larger or smaller
// than each of its neighbors

module.exports = (() => {
  const swap = (array, firstIndex, secondIndex) => {
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
  };

  const zigzag = arrayOfInts => {
    if (!Array.isArray(arrayOfInts))
      throw new TypeError('input must be an array of Integers');
    let low = arrayOfInts[0] > arrayOfInts[1];
    let current = 1;
    let next = current + 1;
    while (next < arrayOfInts.length) {
      ((low && arrayOfInts[current] > arrayOfInts[next]) 
        || (!low && arrayOfInts[current] < arrayOfInts[next]))
      && swap(arrayOfInts, current, next);
      low = !low;
      current++;
      next++;
    }
    return arrayOfInts;
  };
  
  return zigzag;
})();