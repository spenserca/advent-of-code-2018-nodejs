const fs = require('fs');
const day011 = require('./Day011');
const day012 = require('./Day012');

const input = fs.readFileSync('./Day01/input.txt', 'utf8');

const solution = `Day011: ${day011(input)}. Day012: ${day012(input)}.`;

console.log(solution);

module.exports = solution;
