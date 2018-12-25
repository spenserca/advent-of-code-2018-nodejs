const processNextGeneration = (currentState, notes) => {
  // note:
  // .# . .. => #
  // an empty pot with one plant on its left will have a plant in the next generation

  return notes.reduce((state, note) => {
    const noteSplit = note.split('');
    const leftPots = [noteSplit[0], noteSplit[1]]; // LL
    const currentPot = noteSplit[2]; // C
    const rightPots = [noteSplit[3], noteSplit[4]]; // RR
    const result = noteSplit[noteSplit.length - 1]; // N

    // for each pot with 2 pots to its left and right
    for (let i = 2; i < state.length - 2; i++) {
      if (state[i - 2] === leftPots[0] && state[i - 1] === leftPots[1] && state[i + 1] === rightPots[0] && state[i + 2] === rightPots[1]) {
        state[i] = result;
      }
    }

    return state;
  }, currentState);
};

module.exports = (initialState, notes) => {
  // test initial state: #..#.#..##......###...###
  // [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  // [ .,  .,  ., #, ., ., #, ., #, ., ., #, #,  .,  .,  .,  .,  .,  .,  #,  #,  #,  .,  .,  .,  #,  #,  #]
  let currentState = ['.', '.', '.'].concat(initialState);

  notes = notes.split('\n')
    .filter((n) => n);

  const generations = [currentState];

  for (let i = 0; i < 20; i++) {
    currentState = processNextGeneration(currentState, notes);

    generations.push(currentState);
  }

  // reduce generations to sum of unique # values

  return generations;
}
