const { match } = require('assert');
const fs = require('fs');
const { parse } = require('path');
const { rawListeners } = require('process');
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n\n').filter(x => x);

const rules = lines[0].split('\n').map(str => {
  const {groups} = /(?<field>[^:]+): (?<from1>\d+)-(?<to1>\d+) or (?<from2>\d+)-(?<to2>\d+)/.exec(str);
  groups.from1 = parseInt(groups.from1);
  groups.to1 = parseInt(groups.to1);
  groups.from2 = parseInt(groups.from2);
  groups.to2 = parseInt(groups.to2);
  return groups;
});

let myTicket = lines[1].split('\n')[1].split(',').map(x => parseInt(x));

let nearbyTickets = lines[2].split('\n');
nearbyTickets.shift();
nearbyTickets = nearbyTickets.map(ticket => ticket.split(',').map(x => parseInt(x)));

// we know at least my ticket is valid
const validTickets = [myTicket];

function matchRule(rule, value) {
  return (value >= rule.from1 & value <= rule.to1) || (value >= rule.from2 && value <= rule.to2);
}

function matchSomeRule(value) {
  for (const rule of rules) {
    if (matchRule(rule, value)) return true;
  }
  return false;
}

// part 1
let sum = 0;
for (const ticket of nearbyTickets) {
  let valid = true;
  for (const value of ticket) {
    if (!matchSomeRule(value)) {
      sum += value;
      valid = false;
    }
  }
  // for part 2
  if (valid) validTickets.push(ticket);
}
console.log(sum);

// part 2
let matches = [];

// iterate over numbers in a standard ticket to fill our matches array
for (let i = 0; i < myTicket.length; i++) {
  for (const rule of rules) {
    let valid = true;
    // checking every number in each valid ticket
    for (const ticket of validTickets) {
      // if it doesn't match a rule, continue to next number
      if (!matchRule(rule, ticket[i])) {
        valid = false;
        break;
      }
    }
    if (valid) matches.push({rule: rule.field, index: i});
  }
}

console.log(matches.length)

// if we have more matches than rules, we need to check which indeces match only one rule
while (matches.length > rules.length) {
  for (let i = 0; i < myTicket.length; i++) {
    const rulesMatchingCurrentIndex = matches.filter(m => m.index == i);
    // if there's only one rule match for an index, that index corresponds to that rule
    // and we need to filter that rule out of all rule-index matches
    if (rulesMatchingCurrentIndex.length == 1) {
      const currentRule = rulesMatchingCurrentIndex[0];
      matches = matches.filter(m => {
        if (m.rule === currentRule.rule) {
          // should only return true for the one rule that matches the index
          return m.index === currentRule.index;
        }
        // else return true
        return true;
      });
    }
  }
}

let product = 1;
const departureFields = matches.filter(m => m.rule.startsWith('departure'));
for (const field of departureFields) {
  product *= myTicket[field.index];
}
console.log(product);