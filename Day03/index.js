const fs = require('fs');
const day031 = require('./Day031');

const input = fs.readFileSync('./Day03/input.txt', 'utf8');

const solution = `Day031: ${day031(input)}.`;

console.log(solution);

module.exports = solution;
