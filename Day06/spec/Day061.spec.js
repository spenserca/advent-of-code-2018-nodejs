const fs = require('fs');
const day061 = require('../Day061');

describe('Day061', () => {
  it('should return 17 for the given input', () => {
    const input = '1, 1\r\n1, 6\r\n8, 3\r\n3, 4\r\n5, 5\r\n8, 9';

    expect(day061(input)).toEqual(17);
  });

  it('should return 3358 for the given input', () => {
    const input = fs.readFileSync('./Day06/input.txt', 'utf8');

    expect(day061(input)).toEqual(3358);
  });
});
