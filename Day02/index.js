const fs = require('fs');
const day021 = require('./Day021');

const input = fs.readFileSync('./Day02/input.txt', 'utf8');

const solution = `Day021: ${day021(input)}.`;

console.log(solution);

module.exports = solution;
