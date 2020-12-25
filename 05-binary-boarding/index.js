const fs = require('fs');

const data = fs.readFileSync(__dirname + '/data.txt').toString();

const lines = data.split('\n').filter(Boolean);

const testData = [
  'BFFFBBFRRR',
  'FFFBBBFRRR',
  'BBFFBBFRLL'
];

const binarySearch = (instructions, min, max, lower, higher) => {
  const instruction = instructions.shift();
  const avg = (min + max) / 2;

  if (instruction === lower) {
    return binarySearch(instructions, min, Math.floor(avg), lower, higher);
  }

  if (instruction === higher) {
    return binarySearch(instructions, Math.ceil(avg), max, lower, higher);
  }

  return avg;
};

const getSeatId = (row, column) => row * 8 + column;

const getRow = (pass) => binarySearch(pass.split('').slice(0, 7), 0, 127, 'F', 'B');

const getColumn = (pass) => binarySearch(pass.split('').slice(7), 0, 7, 'L', 'R');

const checkBoardingPasses = (passes) => Math.max(...passes.map((pass) => getSeatId(getRow(pass), getColumn(pass))));

const findMissingSeat = (passes) => {
  const seats = passes.map((pass) => getSeatId(getRow(pass), getColumn(pass)));
  const foundSeat = seats.find((seat) => !seats.includes(seat + 1) && seats.includes(seat + 2));
  return foundSeat ? foundSeat + 1 : null;
};


console.log('05-a-test', checkBoardingPasses(testData));

console.log('05-a-live', checkBoardingPasses(lines));

console.log('05-b-test', findMissingSeat(testData));

console.log('05-b-live', findMissingSeat(lines));
