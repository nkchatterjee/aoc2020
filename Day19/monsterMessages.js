const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n\n');

const rules = {};
lines[0].split('\n').forEach(rule => {
  const {groups} = /^(?<key>\d+): (?<value>.*)$/.exec(rule)  
  rules[groups.key] = groups.value;
});

const messages = lines[1].split('\n');

let ruleToRegX = {};

function computeRules(ruleValue, rules) {
  if (ruleValue in ruleToRegX) {
    return ruleToRegX[ruleValue];
  }

  let result = '';

  if (/^".*"$/.test(ruleValue)) {
    result = ruleValue.replace(/"/g, '');
  } else if ((/\|/).test(ruleValue)) {
    const options = ruleValue.split(' | ');
    result = `(${computeRules(options[0], rules)}|${computeRules(options[1], rules)})`;
  } else {
    const keys = ruleValue.split(' ');
    result = keys.map(key => computeRules(rules[key], rules)).join('');
  }

  // cache
  ruleToRegX[ruleValue] = result;
  return result;
}

computeRules(rules[0], rules);

const mainRule = new RegExp('^' + ruleToRegX[rules[0]] + '$');

let sum = 0;
for (const message of messages) {
  if (mainRule.test(message)) {
    sum++;
  }
}
console.log(sum);

rules['0'] = '8 11';
rules['8'] = '42 | 42 8'; // 42 at least one time
rules['11'] = '42 31 | 42 11 31'; // 42{n}31{n}

computeRules(rules[42], rules);
computeRules(rules[31], rules);

const newRule = new RegExp('^(?<rule42>(' + ruleToRegX[rules[42]] + ')+)(?<rule31>(' + ruleToRegX[rules[31]] + ')+)$');

sum = 0;
for (const message of messages) {
  const matches = newRule.exec(message);
  if (matches) {
    const {groups} = matches;
    const matches42 = groups.rule42.match(new RegExp(ruleToRegX[rules[42]], 'g')).length;
    const matches31 = groups.rule31.match(new RegExp(ruleToRegX[rules[31]], 'g')).length;
    if (matches42 > matches31) {
      sum++;
    }
  }
}
console.log(sum);