const fs = require('fs');
const day041 = require('./Day041');
const day042 = require('./Day042');


const input = fs.readFileSync('./Day04/input.txt', 'utf8');

const solution = `Day041: ${day041(input)}. Day042: ${day042(input)}.`;

console.log(solution);

module.exports = solution;
