const fs = require('fs');

const data = fs.readFileSync(__dirname + '/data.txt').toString();

const parseLine = (line) => line.match(/(\d+)-(\d+) (\w): (\w+)/);

const validatePassword = (password) => {
  const [_, a, b, c, d] = parseLine(password);
  const count = d.split(c).length - 1;
  return count >= Number(a) && count <= Number(b);
};

const validatePassword2 = (password) => {
  const [_, a, b, c, d] = parseLine(password);
  const matches = [d[Number(a) - 1] === c, d[Number(b) - 1] === c];
  return matches.filter(Boolean).length === 1;
};

const countValidPasswords = (passwords, validator) => {
  return passwords.filter(validator).length;
};

const lines = data.split('\n').filter(Boolean);

const testData = [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc'
];

console.log('02-a-test', countValidPasswords(testData, validatePassword));

console.log('02-a-live', countValidPasswords(lines, validatePassword));

console.log('02-b-test', countValidPasswords(testData, validatePassword2));

console.log('02-b-live', countValidPasswords(lines, validatePassword2));
