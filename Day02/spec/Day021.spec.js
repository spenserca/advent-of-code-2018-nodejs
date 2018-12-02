const day021 = require('../Day021');

describe('Day021', () => {
  it('should return 12 for the given input', () => {
    const input = 'abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab\n';

    expect(day021(input)).toEqual(12);
  });
});
