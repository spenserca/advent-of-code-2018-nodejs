const day101 = require('../Day101');

describe('Day101', () => {
  it('should return 33,45 for serial number 18', () => {
    expect(day101(18)).toEqual('33,45');
  });

  it('should return 21,61 for serial number 42', () => {
    expect(day101(42)).toEqual('21,61');
  });
});
