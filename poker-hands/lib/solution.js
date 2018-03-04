'use strict';

// In the card game poker, a hand consists of five cards and are ranked, from lowest to highest, in the following way:

// High Card: Highest value card.
// One Pair: Two cards of the same value.
// Two Pairs: Two different pairs.
// Three of a Kind: Three cards of the same value.
//   Straight: All cards are consecutive values.
//     Flush: All cards of the same suit.
// Full House: Three of a kind and a pair.
// Four of a Kind: Four cards of the same value.
// Straight Flush: All cards are consecutive values of same suit.
// Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
// The cards are valued in the order:
// 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

// If two players have the same ranked hands then the rank made up of the highest value wins; for example, a pair of eights beats a pair of fives(see example 1 below).But if two ranks tie, for example, both players have a pair of queens, then highest cards in each hand are compared(see example 4 below); if the highest cards tie then the next highest cards are compared, and so on.

// Consider the following five hands dealt to two players:

// Hand	 	Player 1	 	Player 2	 	Winner
// 1	 	5H 5C 6S 7S KD
// Pair of Fives
// 2C 3S 8S 8D TD
// Pair of Eights
// Player 2
// 2	 	5D 8C 9S JS AC
// Highest card Ace
// 2C 5C 7D 8S QH
// Highest card Queen
// Player 1
// 3	 	2D 9C AS AH AC
// Three Aces
// 3D 6D 7D TD QD
// Flush with Diamonds
//  	Player 2
// 4	 	4D 6S 9H QH QC
// Pair of Queens
// Highest card Nine
// 3D 6D 7H QD QS
// Pair of Queens
// Highest card Seven
// Player 1
// 5	 	2H 2D 4C 4D 4S
// Full House
// With Three Fours
// 3C 3D 3S 9S 9D
// Full House
// with Three Threes
// Player 1
// The file, poker.txt, contains one - thousand random hands dealt to two players.Each line of the file contains ten cards(separated by a single space): the first five are Player 1's cards and the last five are Player 2's cards.You can assume that all hands are valid(no invalid characters or repeated cards), each player's hand is in no specific order, and in each hand there is a clear winner.

// How many hands does Player 1 win ?

const fsx = require('fs-extra');

class playerHand {
  constructor(array){
    this.cards = array;
    this.score = 0;
    this.high = null;
    this.cardNumbers = null;
    this.pair = {
      number: 0,
      value: [],
    };
    this.three = {
      has: false,
      value: null,
    };
    this.four = {
      has: false,
      value: null,
    };
    this.straight = false;
    this.flush = {
      has: false,
      royal: false,
    };
  }

  evaluateHand(){
    const evaluatedCards = this.cards.map(card => {
      let cardInfo = card.split('');
      let number = null;
      switch (cardInfo[0]){
        case 'A':
          number = 14;
          break;
        case 'K':
          number = 13;
          break;
        case 'Q':
          number = 12;
          break;
        case 'J':
          number = 11;
          break;
        case 'T':
          number = 10;
          break;
        default:
          number = Number(cardInfo[0]);
      }
      let suit = cardInfo[1];
      return {number, suit};
    });
    this.cardNumbers = evaluatedCards.map(card => card.number).sort((a, b) => a - b);
    console.log(this.cardNumbers);
    const cardSuits = evaluatedCards.map(card => card.suit)
      .filter((suit, i, a) => i === a.indexOf(suit));
    
    if (cardSuits.length === 1) this.flush.has = true;
    this.high = Math.max(...this.cardNumbers);
    if (this.cardNumbers[4] === this.cardNumbers[3] + 1
      && this.cardNumbers[3] === this.cardNumbers[2] + 1
      && this.cardNumbers[2] === this.cardNumbers[1] + 1
      && this.cardNumbers[1] === this.cardNumbers[0] + 1)
      this.straight = true;

    if (this.flush.has && this.straight && this.high === 14) this.flush.royal = true;
    if (this.cardNumbers[4] === this.cardNumbers[3] === this.cardNumbers[2] === this.cardNumbers[1]
      || this.cardNumbers[3] === this.cardNumbers[2] === this.cardNumbers[1] === this.cardNumbers[0]){
      this.four.has = true;
      console.log('four of a kind');
      this.four.value = this.cardNumbers[2];
      return;
    }
    if (this.cardNumbers[4] === this.cardNumbers[3] === this.cardNumbers[2]
      || this.cardNumbers[3] === this.cardNumbers[2] === this.cardNumbers[1]
      || this.cardNumbers[2] === this.cardNumbers[1] === this.cardNumbers[0]) {
      this.three.has = true;
      console.log('three of a kind');
      this.three.value = this.cardNumbers[2];
    }
    if (this.three.has){
      this.cardNumbers = this.cardNumbers.filter(card => card !== this.three.value);
      if (this.cardNumbers[0] === this.cardNumbers[1]){
        this.pair.number = 1;
        this.pair.value.push(this.cardNumbers[0]);
      }
      return;
    }
    if (this.cardNumbers[4] === this.cardNumbers[3]
      || this.cardNumbers[3] === this.cardNumbers[2]){
      this.pair.number = 1;
      this.pair.value.push(this.cardNumbers[3]);
    } else if (this.cardNumbers[2] === this.cardNumbers[1]
      || this.cardNumbers[1] === this.cardNumbers[0]){
      this.pair.number = 1;
      this.pair.value.push(this.cardNumbers[1]);
    }
    if (this.pair.number === 1){
      this.cardNumbers = this.cardNumbers.filter(card => card !== this.pair.value[0]);
      if (this.cardNumbers[2] === this.cardNumbers[1]
      || this.cardNumbers[1] === this.cardNumbers[0]){
        this.pair.number = 2;
        this.pair.value.push(this.cardNumbers[1]);
        this.pair.value.sort((a, b) => b - a);
      }
    }
  }

  scoreHand(){
    this.evaluateHand();
    if (this.flush.royal){
      this.score = 9;
      return;
    }
    if (this.flush.has && this.straight){
      this.score = 8;
      return;
    }
    if (this.four.has){
      this.score = 7;
      return;
    }
    if (this.three.has && this.pair.number){
      this.score = 6;
      return;
    }
    if (this.flush.has){
      this.score = 5;
      return;
    }
    if (this.straight){
      this.score = 4;
      return;
    }
    if (this.three.has){
      this.score = 3;
      return;
    }
    if (this.pair.number === 2){
      this.score = 2;
      return;
    }
    if (this.pair.number){
      this.score = 1;
      return;
    }
  }
}

fsx.readFile(`${__dirname}/../assets/p054_poker.txt`)
  .then(data => {
    const gameArray = data.toString()
      .split('\n')
      .filter(e => e !== '')
      .map(e => e.split(' '));
    let playerOneWins = 0;
    let playerTwoWins = 0;
    for (let game of gameArray){
      const playerOneHand = new playerHand(game.slice(0, 5));
      const playerTwoHand = new playerHand(game.slice(5, 10));
      playerOneHand.scoreHand();
      playerTwoHand.scoreHand();
      if (playerOneHand.score > playerTwoHand.score){
        playerOneWins++;
        console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
        continue;
      }
      if (playerTwoHand.score > playerOneHand.score){
        playerTwoWins++;
        console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
        continue;
      }
      console.log('players scores are equal\n');
      switch (playerOneHand.score){
        case 8:
          if (playerOneHand.high > playerTwoHand.high){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
        case 7:
          if (playerOneHand.four.value > playerTwoHand.four.value){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
        case 6:
          if (playerOneHand.three.value > playerTwoHand.three.value){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else if (playerOneHand.three.value === playerTwoHand.three.value){
            if (playerOneHand.pair.value[0] > playerTwoHand.pair.value[0]) {
              playerOneWins++;
              console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            } else {
              playerTwoWins++;
              console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            }
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
        case 5:
          if (playerOneHand.high > playerTwoHand.high){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } else if (playerTwoHand.high > playerOneHand.high){
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          }
          while (playerOneHand.cardNumbers.length
            && playerOneHand.cardNumbers[playerOneHand.cardNumbers.length]
            === playerTwoHand.cardNumbers[playerTwoHand.cardNumbers.length]){
            playerOneHand.cardNumbers.pop();
            playerTwoHand.cardNumbers.pop();
          }
          if (playerOneHand.cardNumbers[playerOneHand.cardNumbers.length]
            > playerTwoHand.cardNumbers[playerTwoHand.cardNumbers.length]){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
        case 4:
          if (playerOneHand.high > playerTwoHand.high){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
        case 3:
          if (playerOneHand.three.value > playerTwoHand.three.value){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
        case 2:
          if (playerOneHand.pair.value[1] > playerTwoHand.pair.value[1]){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } else if (playerOneHand.pair.value[1] < playerTwoHand.pair.value[1]){
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } 
          if (playerOneHand.pair.value[0] > playerTwoHand.pair.value[0]) {
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } else if (playerOneHand.pair.value[0] < playerTwoHand.pair.value[0]) {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } 
          if (playerOneHand.high > playerTwoHand.high){
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
        case 1:
          if (playerOneHand.pair.value[0] > playerTwoHand.pair.value[0]) {
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } else if (playerOneHand.pair.value[0] < playerTwoHand.pair.value[0]) {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } 
          while (playerOneHand.cardNumbers.length
            && playerOneHand.cardNumbers[playerOneHand.cardNumbers.length]
            === playerTwoHand.cardNumbers[playerTwoHand.cardNumbers.length]) {
            playerOneHand.cardNumbers.pop();
            playerTwoHand.cardNumbers.pop();
          }
          if (playerOneHand.cardNumbers[playerOneHand.cardNumbers.length]
            > playerTwoHand.cardNumbers[playerTwoHand.cardNumbers.length]) {
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
        case 0:
          if (playerOneHand.high > playerTwoHand.high) {
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } else if (playerOneHand.high < playerTwoHand.high) {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
            break;
          } 
          while (playerOneHand.cardNumbers.length 
            && playerOneHand.cardNumbers[playerOneHand.cardNumbers.length]
            === playerTwoHand.cardNumbers[playerTwoHand.cardNumbers.length]) {
            playerOneHand.cardNumbers.pop();
            playerTwoHand.cardNumbers.pop();
          }
          if (playerOneHand.cardNumbers[playerOneHand.cardNumbers.length]
            > playerTwoHand.cardNumbers[playerTwoHand.cardNumbers.length]) {
            playerOneWins++;
            console.log('player one won', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          } else {
            playerTwoWins++;
            console.log('player one lost', playerOneHand.score, playerOneHand.cards, playerTwoHand.score, playerTwoHand.cards);
          }
          break;
      }

    }
    console.log(playerOneWins, playerTwoWins);
  });