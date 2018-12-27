const day251 = require('../Day251');

describe('Day251', () => {
  it('should return 2 for the given input', () => {
    const input = '0,0,0,0\n3,0,0,0\n0,3,0,0\n0,0,3,0\n0,0,0,3\n0,0,0,6\n9,0,0,0\n12,0,0,0';

    expect(day251(input)).toEqual(2);
  });

  it('should return 4 for the given input', () => {
    const input = '-1,2,2,0\n0,0,2,-2\n0,0,0,-2\n-1,2,0,0\n-2,-2,-2,2\n3,0,2,-1\n-1,3,2,2\n-1,0,-1,0\n0,2,1,-2\n3,0,0,0';

    expect(day251(input)).toEqual(4);
  });

  it('should return 3 for the given input', () => {
    const input = '1,-1,0,1\n2,0,-1,0\n3,2,-1,0\n0,0,3,1\n0,0,-1,-1\n2,3,-2,0\n-2,2,0,0\n2,-2,0,-1\n1,-1,0,-1\n3,2,0,2';

    expect(day251(input)).toEqual(3);
  });

  it('should return 8 for the given input', () => {
    const input = '1,-1,-1,-2\n-2,-2,0,1\n0,2,1,3\n-2,3,-2,1\n0,2,3,-2\n-1,-1,1,-2\n0,-2,-1,0\n-2,2,3,-1\n1,2,2,0\n-1,-2,0,-2';

    expect(day251(input)).toEqual(8);
  });
})
