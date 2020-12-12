const fs = require('fs');

const data = fs.readFileSync('data.txt').toString();

const numbers = data.split('\n').map(Number);

const findPairMatch = (numbers, value, total = 2020) => {
  const match = numbers.find(n => n + value === total);
  return match ? [value, match] : null;
};

const findPair = (numbers) => numbers.reduce((m, n) => m || findPairMatch(numbers, n), 0);

const findTrioMatch = (numbers, value) => {
  const match = numbers.reduce((m, n) => m || findPairMatch(numbers, n, 2020 - value), 0);
  return match ? [value, match[0], match[1]] : null;
};

const findTrio = (numbers) => numbers.reduce((m, n) => m || findTrioMatch(numbers, n), 0);

const [a, b] = findPair([1721, 979, 366, 299, 675, 1456]);
console.log(a, b, a * b);

const [c, d] = findPair(numbers);
console.log(c, d, c * d);

const [e, f, g] = findTrio([1721, 979, 366, 299, 675, 1456]);
console.log(e, f, g, e * f * g);

const [h, i, j] = findTrio(numbers);
console.log(h, i, j, h * i * j);
