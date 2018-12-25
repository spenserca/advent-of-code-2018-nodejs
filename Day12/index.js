const fs = require('fs');
const day121 = require('./Day121');

const initialState = '#...#..##.......####.#..###..#.##..########.#.#...#.#...###.#..###.###.#.#..#...#.#..##..#######.##';
const input = fs.readFileSync('./Day12/input.txt', 'utf8');


const solution = `Day121: ${day121(initialState, input)}.`;

module.exports = solution;
