const fs = require('fs');
const day061 = require('./Day061');

const input = fs.readFileSync('./Day06/input.txt', 'utf8');

console.log(day061(input));
