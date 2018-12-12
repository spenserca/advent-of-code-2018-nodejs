const parseInstructions = (instruction) => {
  const instructionSplit = instruction.split(' ');

  return {
    id: instructionSplit[1],
    dependent: instructionSplit[7]
  };
};

module.exports = (input) => {
  return input.split('\n')
    .filter((i) => i)
    .map(parseInstructions)
    .reduce((accumulator, current) => {
      if (accumulator.has(current.id)) {
        console.log(`accumulator.has(${current.id})`);
        const dependents = accumulator.get(current.id);
        

        dependents.push(current.dependent);

        accumulator.set(current.id, dependents);
      } else {
        console.log(`!accumulator.has(${current.id})`);
        accumulator.set(current.id, [current.dependent]);
      }

      return accumulator;
    }, new Map([]));
};
