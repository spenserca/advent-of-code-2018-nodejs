const day011 = require('../Day011');

describe('Day011', () => {
  it('should return 3 for +1, -2, +3, +1', () => {
    const input = '+1\n-2\n+3\n+1';

    expect(day011(input)).toEqual(3);
  });

  it('should return 3 for +1, +1, +1', () => {
    const input = '+1\n+1\n+1\n';

    expect(day011(input)).toEqual(3);
  });

  it('should return 0 for +1, +1, -2', () => {
    const input = '+1\n+1\n-2\n';

    expect(day011(input)).toEqual(0);
  });

  it('should return -6 for -1, -2, -3', () => {
    const input = '-1\n-2\n-3\n';

    expect(day011(input)).toEqual(-6);
  });
});
