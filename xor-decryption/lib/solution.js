'use strict';

// Each character on a computer is assigned a unique code and the preferred standard is ASCII(American Standard Code for Information Interchange).For example, uppercase A = 65, asterisk(*) = 42, and lowercase k = 107.

// A modern encryption method is to take a text file, convert the bytes to ASCII, then XOR each byte with a given value, taken from a secret key.The advantage with the XOR function is that using the same encryption key on the cipher text, restores the plain text; for example, 65 XOR 42 = 107, then 107 XOR 42 = 65.

// For unbreakable encryption, the key is the same length as the plain text message, and the key is made up of random bytes.The user would keep the encrypted message and the encryption key in different locations, and without both "halves", it is impossible to decrypt the message.

//   Unfortunately, this method is impractical for most users, so the modified method is to use a password as a key.If the password is shorter than the message, which is likely, the key is repeated cyclically throughout the message.The balance for this method is using a sufficiently long password key for security, but short enough to be memorable.

// Your task has been made easy, as the encryption key consists of three lower case characters.Using cipher.txt(right click and 'Save Link/Target As...'), a file containing the encrypted ASCII codes, and the knowledge that the plain text must contain common English words, decrypt the message and find the sum of the ASCII values in the original text.

const fsx = require('fs-extra');

const BEGINNING_OF_CHARACTERS = 32;
const LOWERCASE_A = 97;
const LOWERCASE_Z = 122;
const HASHTAG = 35;
const BACKTICK = 96;

fsx.readFile(`${__dirname}/../assets/p059_cipher.txt`)
  .then(data => {
    const codeNumbers = data.toString().split(',')
      .filter(e => e !== '')
      .map(e => Number(e));
      // brute force at finding three char password
    for (let a = LOWERCASE_A; a <= LOWERCASE_Z; a++){
      for (let b = LOWERCASE_A; b <= LOWERCASE_Z; b++){
        for (let c = LOWERCASE_A; c <= LOWERCASE_Z; c++){
          const decryptedArr = codeNumbers.map((val, i) => {
            switch (i % 3) {
              case 0:
                return val ^ a;
              case 1:
                return val ^ b;
              case 2:
                return val ^ c;
            }
          });
          // My approach is to filter out any characters that we can assume 
          // will not exist in the message. This assumtion may not hold for
          // other types of input
          let containsNonCharacters = false;
          for (let i = 0; i < decryptedArr.length; i++){
            if (decryptedArr[i] < BEGINNING_OF_CHARACTERS
                || decryptedArr[i] > LOWERCASE_Z
                || decryptedArr[i] === HASHTAG
                || decryptedArr[i] === BACKTICK){
              containsNonCharacters = true;
              break;
            }
          }
          if (containsNonCharacters) continue;
          // to read decrypted message, console.log this variable:
          // const decryptedCharArr = decryptedArr.map(e => String.fromCharCode(e));
          const codeSum = decryptedArr.reduce((acc, e) => e + acc, 0);
          console.log(codeSum);
        }
      }
    }
  });