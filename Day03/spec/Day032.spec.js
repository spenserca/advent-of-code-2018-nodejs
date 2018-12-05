const day032 = require('../Day032');

describe('Day032', () => {
  it('should return 3 for the given input', () => {
    const input = '#1 @ 1,3: 4x4\r\n#2 @ 3,1: 4x4\r\n#3 @ 5,5: 2x2\r\n';

    expect(day032(input)).toEqual(3);
  });
});
