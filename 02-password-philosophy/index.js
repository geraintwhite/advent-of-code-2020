const fs = require('fs');

const data = fs.readFileSync('data.txt').toString();

const validatePassword = (password) => {
  const [_, a, b, c, d] = password.match(/(\d+)-(\d+) (\w): (\w+)/);
  const count = d.split(c).length - 1;
  return count >= Number(a) && count <= Number(b);
};

const countValidPasswords = (passwords) => {
  return passwords.filter(validatePassword).length;
};

console.log(countValidPasswords([
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc'
]));

console.log(countValidPasswords(data.split('\n').filter(Boolean)));
