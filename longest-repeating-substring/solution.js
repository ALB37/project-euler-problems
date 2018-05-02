'use strict';

// find the longest repeating substring of a given string
// e.g. banana -> na, tomato -> to

module.exports = (() => {

  const mapSubstr = (map, sub, ind) => {
    map.get(sub) ?
      map.set(sub, new Set([...map.get(sub), ind])) :
      map.set(sub, new Set([ind]));
  };

  //for a given string, using data from map, 
  //build up substrings of a given length
  const addLongerSubstrs = (string, map, len) => {
    map.forEach(val => {
      val.forEach(i => {
        const current = string.substr(i, len);
        mapSubstr(map, current, i);
      });
    });
  };

  const filterNonRepeating = map => {
    map.forEach((val, key) => val.size === 1 && map.delete(key));
  };

  const filterShortSubs = (map, size) => {
    map.forEach((val, key) => {
      key.length < size && map.delete(key);
      const setCpy = [...val];
      for (let i = 0; i < setCpy.length - 1; i++) {
        if (setCpy[i] + key.length > setCpy[i + 1]) {
          setCpy.splice(i + 1, 1);
          map.set(key, new Set(setCpy));
          break;
        }
      }
    });
  };

  const longestRepeating = str => {
    str = typeof str === 'string' ? str : '';
    if (!str.length) return str;

    //map all the characters in the string, filter out non-repeating chars
    const charMap = new Map();
    str.split('').forEach((char, i) => mapSubstr(charMap, char, i));
    filterNonRepeating(charMap);
    if (!charMap.size) return '';

    let longestSub = [...charMap][0][0];
    let windowSize = 2;
    const limit = Math.floor(str.length / 2);

    //search for matching substrings of increasing length
    //break if limit is hit or no matching substrings of given length
    while (windowSize <= limit){
      addLongerSubstrs(str, charMap, windowSize);
      filterShortSubs(charMap, windowSize);
      filterNonRepeating(charMap);

      if (!charMap.size) break;
      else longestSub = [...charMap][0][0];

      windowSize++;
    }

    return longestSub;
  };

  return longestRepeating;
})();
