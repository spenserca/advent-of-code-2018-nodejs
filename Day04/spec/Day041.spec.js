const fs = require('fs');
const day041 = require('../Day041');
const input = fs.readFileSync('./Day04/spec/input.spec.txt', 'utf8');

describe('Day041', () => {
  it('should return 240 for the given input', () => {
    expect(day041(input)).toEqual(240);
  });
});
