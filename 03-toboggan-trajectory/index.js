const fs = require('fs');

const data = fs.readFileSync('data.txt').toString().split('\n').filter(Boolean);;

const testData = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#'
];

const countTrees = (map, translate, coords = [0, 0], trees = 0) => {
  const [x, y] = coords;
  const [dx, dy] = translate;

  if (y > map.length - 1) {
    return trees;
  }

  const tree = map[y][x % map[y].length] === '#' ? 1 : 0;

  return countTrees(map, translate, [x + dx, y + dy], trees + tree);
};

const checkRoutes = (map, routes) => routes.reduce((total, route) => total * countTrees(map, route), 1);

console.log('03-a-test', countTrees(testData, [3, 1]));

console.log('03-a-live', countTrees(data, [3, 1]));

const routes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
];

console.log('03-b-test', checkRoutes(testData, routes));

console.log('03-b-live', checkRoutes(data, routes));
