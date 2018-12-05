const day031 = require('../Day031');

describe('Day031', () => {
  it('should return 4 for the given input', () => {
    const input = '#1 @ 1,3: 4x4\r\n#2 @ 3,1: 4x4\r\n#3 @ 5,5: 2x2\r\n';

    expect(day031(input)).toEqual(4);
  });
});
