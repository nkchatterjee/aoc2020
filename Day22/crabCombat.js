const fs = require('fs')

const [deck1, deck2] = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n\n').map(str => {
  const cards = str.replace(/\n+$/, '').split('\n');
  cards.shift();
  return cards.map(x => parseInt(x));
});

function combat(firstDeck, secondDeck) {
  while (firstDeck.length > 0 && secondDeck.length > 0) {
    const card1 = firstDeck.shift();
    const card2 = secondDeck.shift();
  
    if (card1 > card2) {
      firstDeck.push(card1);
      firstDeck.push(card2);
    } else {
      secondDeck.push(card2);
      secondDeck.push(card1);
    }
  }
  const winningDeck = firstDeck.length > 0 ? firstDeck : secondDeck;
  return winningDeck;
}

const part1Deck = combat([...deck1], [...deck2]);
const winningScorePart1 = part1Deck.reduce((previous, current, index) => previous + (current * (part1Deck.length - index)), 0);

console.log({winningScorePart1});

// part 2

function recursiveCombat(firstDeck, secondDeck) {
  const alreadyPlayed = new Set();

  while (firstDeck.length > 0 && secondDeck.length > 0) {
    const state = firstDeck.join(',') + '#' + secondDeck.join(',');
    if (alreadyPlayed.has(state)) {
      return {
        winner: 1,
        deck: firstDeck
      }
    }
    alreadyPlayed.add(state);
    
    const card1 = firstDeck.shift();
    const card2 = secondDeck.shift();

    let winner;
    if (firstDeck.length >= card1 && secondDeck.length >= card2) {
      const {winner: player, deck} = recursiveCombat(firstDeck.slice(0, card1), secondDeck.slice(0, card2));
      winner = player;
    } else {
      winner = card1 > card2 ? 1 : 2;
    }

    if (winner == 1) {
      firstDeck.push(card1);
      firstDeck.push(card2);
    } else {
      secondDeck.push(card2);
      secondDeck.push(card1);
    }
  }
  
  return {
    winner: firstDeck.length > 0 ? 1 : 2,
    deck: firstDeck.length > 0 ? firstDeck : secondDeck
  }
}

const {deck} = recursiveCombat([...deck1], [...deck2]);
const winningScorePart2 = deck.reduce((previous, current, index) => previous + (current * (deck.length - index)), 0);

console.log({winningScorePart2});