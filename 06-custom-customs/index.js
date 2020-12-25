const fs = require('fs');

const data = fs.readFileSync(__dirname + '/data.txt').toString();

const lines = data.split('\n\n').map(x => x.split('\n').filter(Boolean));

const testData = [
  ['abc'],
  ['a', 'b', 'c'],
  ['ab', 'ac'],
  ['a', 'a', 'a', 'a'],
  ['b']
];

const countForms = (groups) => {
  const counts = groups.map((group) => new Set(group.join('').split('')).size);
  return counts.reduce((total, count) => total + count, 0);
};

const countAllForms = (groups) => {
  const letters = Array(26).fill(97).map((x, i) => String.fromCharCode(x + i));
  const counts = groups.map((group) => letters.filter((l) => group.every((g) => g.includes(l))).length);
  return counts.reduce((total, count) => total + count, 0);
};


console.log('06-a-test', countForms(testData));

console.log('06-a-live', countForms(lines));

console.log('06-b-test', countAllForms(testData));

console.log('06-b-live', countAllForms(lines));
