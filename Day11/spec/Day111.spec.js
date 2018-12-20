const day111 = require('../Day111');

describe('Day111', () => {
  it('should return 33,45 for serial number 18', () => {
    expect(day111(18)).toEqual('33,45');
  });

  it('should return 21,61 for serial number 42', () => {
    expect(day111(42)).toEqual('21,61');
  });
});
