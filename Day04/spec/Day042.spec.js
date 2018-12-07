const fs = require('fs');
const day042 = require('../Day042');
const input = fs.readFileSync('./Day04/spec/input.spec.txt', 'utf8');

describe('Day041', () => {
  it('should return 4455 for the given input', () => {
    expect(day042(input)).toEqual(4455);
  });
});
