const day012 = require('../Day012');

describe('Day012', () => {
  it('should return 2 for +1, -2, +3, +1', () => {
    const input = '+1\n-2\n+3\n+1\n';

    expect(day012(input)).toEqual(2);
  });

  it('should return 0 for +1, -1', () => {
    const input = '+1\n-1\n';

    expect(day012(input)).toEqual(0);
  });

  it('should return 10 for +3, +3, +4, -2, -4', () => {
    const input = '+3\n+3\n+4\n-2\n-4\n';

    expect(day012(input)).toEqual(10);
  });

  it('should return 5 for -6, +3, +8, +5, -6', () => {
    const input = '-6\n+3\n+8\n+5\n-6\n';

    expect(day012(input)).toEqual(5);
  });

  it('should return 14 for +7, +7, -2, -7, -4', () => {
    const input = '+7\n+7\n-2\n-7\n-4\n';

    expect(day012(input)).toEqual(14);
  });
});
