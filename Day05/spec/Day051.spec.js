const day051 = require('../Day051');

describe('Day051', () => {
  it('should return 0 for aA', () => {
    const input = 'aA';

    expect(day051(input)).toEqual(0);
  });

  it('should return 0 for abBA', () => {
    const input = 'abBA';

    expect(day051(input)).toEqual(0);
  });

  it('should return 4 for abAB', () => {
    const input = 'abAB';

    expect(day051(input)).toEqual(4);
  });

  it('should return 6 for aabAAB', () => {
    const input = 'aabAAB';

    expect(day051(input)).toEqual(6);
  });

  it('should return 9 for dabAcCaCBAcCcaDA', () => {
    const input = 'dabAcCaCBAcCcaDA';

    expect(day051(input)).toEqual(10);
  });
});
