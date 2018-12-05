const fs = require('fs');
const day031 = require('./Day031');
const day032 = require('./Day032');

const input = fs.readFileSync('./Day03/input.txt', 'utf8');

const solution = `Day031: ${day031(input)}. Day032: ${day032(input)}.`;

console.log(solution);

module.exports = solution;
