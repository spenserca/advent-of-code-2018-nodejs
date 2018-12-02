const fs = require('fs');
const day021 = require('./Day021');
const day022 = require('./Day022');

const input = fs.readFileSync('./Day02/input.txt', 'utf8');

const solution = `Day021: ${day021(input)}. Day022: ${day022(input)}.`;

console.log(solution);

module.exports = solution;
