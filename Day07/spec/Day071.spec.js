const day071 = require('../Day071');

describe('Day071', () => {
  it('should return CABDFE for the given input', () => {
    const input = 'Step C must be finished before step A can begin.\nStep C must be finished before step F can begin.\nStep A must be finished before step B can begin.\nStep A must be finished before step D can begin.\nStep B must be finished before step E can begin.\nStep D must be finished before step E can begin.\nStep F must be finished before step E can begin.';

    expect(day071(input)).toEqual('CABDFE');
  });
});
