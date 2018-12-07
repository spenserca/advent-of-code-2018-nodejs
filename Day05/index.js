const fs = require('fs');
const day051 = require('./Day051');
// const day042 = require('./Day042');


const input = fs.readFileSync('./Day05/input.txt', 'utf8');

const solution = `Day051: ${day051(input)}.`;

console.log(solution);

module.exports = solution;
