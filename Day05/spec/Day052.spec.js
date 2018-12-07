const day052 = require('../Day052');

describe('Day052', () => {
  it('should return 0 for aA', () => {
    const input = 'aA';

    expect(day052(input)).toEqual(0);
  });

  it('should return 0 for abBA', () => {
    const input = 'abBA';

    expect(day052(input)).toEqual(0);
  });

  it('should return 4 for abAB', () => {
    const input = 'abAB';

    expect(day052(input)).toEqual(4);
  });

  it('should return 6 for aabAAB', () => {
    const input = 'aabAAB';

    expect(day052(input)).toEqual(6);
  });

  it('should return 4 for dabAcCaCBAcCcaDA', () => {
    const input = 'dabAcCaCBAcCcaDA';

    expect(day052(input)).toEqual(4);
  });
});
