const fs = require('fs');
const day071 = require('./Day071');

const input = fs.readFileSync('./Day07/input.txt', 'utf8');

const solution = `Day071: ${JSON.stringify(day071(input))}.`;

console.log(solution);

module.exports = solution;
