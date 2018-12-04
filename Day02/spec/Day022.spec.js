const day022 = require('../Day022');

describe('Day022', () => {
  it('should return fgij for the given input', () => {
    const input = 'abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz\n';

    expect(day022(input)).toEqual('fgij');
  });
});
