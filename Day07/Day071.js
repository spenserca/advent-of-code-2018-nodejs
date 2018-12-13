const parseInstructions = (instruction) => {
  const instructionSplit = instruction.split(' ');

  return {
    id: instructionSplit[1],
    dependent: instructionSplit[7]
  };
};

const getTreeTop = (tree, distinctDependents) => {
  let treeTops = [];

  Object.keys(tree)
    .forEach((key) => {
      if (!distinctDependents.includes(key)) {
        treeTops.push(key);
      }
    });

  return treeTops;
}

module.exports = (input) => {
  const tree = input.split('\n')
    .filter((i) => i)
    .map(parseInstructions)
    .reduce((accumulator, current) => {
      if (accumulator[current.id]) {
        accumulator[current.id].dependents.push(current.dependent);
      } else {
        accumulator[current.id] = {
          dependents: [current.dependent]
        };
      }

      return accumulator;
    }, {});

  const distinctDependents = Object.values(tree)
    .reduce((accumulator, current) => {
      return accumulator.concat(current.dependents);
    }, [])
    .reduce((accumulator, current) => {
      if (!accumulator.includes(current)) {
        accumulator.push(current);
      }

      return accumulator;
    }, []);

  // get the first starting points alphabetically
  const startingSteps = getTreeTop(tree, distinctDependents);

  let availableSteps = startingSteps;

  // add the first step to the instructionOrder
  let instructionOrder = '';

  while (availableSteps.length > 0) {
    let count = 0;
    instructionOrder += availableSteps.sort()[0];
    // determine which steps are now valid and push them to availableSteps
    // then concatenate the order string with the first value in sorted availableSteps
    const nextAvailableSteps = availableSteps
      .reduce((accumulator, current) => {
        const dependents = tree[current].dependents;

        return accumulator.concat(dependents);
      }, []);

    availableSteps = availableSteps.concat(nextAvailableSteps).shift();
  }

  return instructionOrder; // should be B
};

// distinct:
// Day071: ["A", "C", "D", "E", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].

// tree:
// Day071: ["A", "B", "C", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].
