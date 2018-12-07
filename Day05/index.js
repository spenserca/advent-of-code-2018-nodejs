const fs = require('fs');
const day051 = require('./Day051');
const day052 = require('./Day052');


const input = fs.readFileSync('./Day05/input.txt', 'utf8');

const solution = `Day051: ${day051(input)}. Day052: ${day052(input)}.`;

console.log(solution);

module.exports = solution;
