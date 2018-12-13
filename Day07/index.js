const fs = require('fs');
const day071 = require('./Day071');

// const input = fs.readFileSync('./Day07/input.txt', 'utf8');
const input = 'Step C must be finished before step A can begin.\nStep C must be finished before step F can begin.\nStep A must be finished before step B can begin.\nStep A must be finished before step D can begin.\nStep B must be finished before step E can begin.\nStep D must be finished before step E can begin.\nStep F must be finished before step E can begin.';

const solution = `Day071: ${JSON.stringify(day071(input))}.`;

console.log(solution);

module.exports = solution;
