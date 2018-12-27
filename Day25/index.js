const fs = require('fs');
const day251 = require('./Day251');

const input = fs.readFileSync('./Day25/input.txt', 'utf8');

const solution = `Day251: ${day251(input)}.`;

// console.log(solution);

module.exports = solution;
