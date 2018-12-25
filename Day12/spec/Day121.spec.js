const day121 = require('../Day121');

const initialState = '#..#.#..##......###...###';

describe('Day121', () => {
  it('should return 325 for the given input', () => {
    const input = `...## => #\n..#.. => #\n.#... => #\n.#.#. => #\n.#.## => #\n.##.. => #\n.#### => #\n#.#.# => #\n#.### => #\n##.#. => #\n##.## => #\n###.. => #\n###.# => #\n####. => #`;

    expect(day121(initialState, input)).toEqual(325);
  });
});
