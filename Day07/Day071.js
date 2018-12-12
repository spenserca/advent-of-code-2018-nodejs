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
      if (accumulator[current.id]) {
        accumulator[current.id].dependents.push(current.dependent);
      } else {
        console.log(`else: ${current.id} ${JSON.stringify(current)}`);
        accumulator[current.id] = {
          dependents: [current.dependent]
        };
      }

      return accumulator;
    }, {});
};
