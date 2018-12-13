const parseInstructions = (instruction) => {
  const instructionSplit = instruction.split(' ');

  return {
    id: instructionSplit[1],
    dependent: instructionSplit[7]
  };
};

const populateDependents = (instructions, instruction) => {
  if (instructions[instruction.id]) {
    instructions[instruction.id].dependents.push(instruction.dependent);
  } else {
    instructions[instruction.id] = {
      dependents: [instruction.dependent]
    };
  }

  return instructions;
};


const getStartingSteps = (tree, distinctDependents) => {
  let treeTops = [];

  Object.keys(tree)
    .forEach((key) => {
      if (!distinctDependents.includes(key)) {
        treeTops.push(key);
      }
    });

  return treeTops;
};

const getOnlyDependents = (tree, distinctDependents) => {
  // get the values that exist in distinctDependents
  // but don't exists in Object.keys(tree)
  return distinctDependents
    .reduce((accumulator, current) => {
      if (!Object.keys(tree).includes(current)) {
        return accumulator.concat(current);
      }

      return accumulator;
    }, []);
};

const getDependentSteps = (tree, parent) => {
  const parentStep = tree[parent];

  if (parentStep) {
    return parentStep.dependents;
  }
};

module.exports = (input) => {
  const tree = input.split('\n')
    .filter((i) => i)
    .map(parseInstructions)
    .reduce(populateDependents, {});

  console.log(`tree: ${JSON.stringify(tree)}`);

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
  const startingSteps = getStartingSteps(tree, distinctDependents);
  console.log(`startingSteps: ${JSON.stringify(startingSteps)}`);

  const onlyDependents = getOnlyDependents(tree, distinctDependents);
  console.log(`onlyDependents: ${JSON.stringify(onlyDependents)}`);

  let availableSteps = startingSteps;

  // add the first step to the instructionOrder
  let instructionOrder = [];

  let count = 0;
  // this needs to change to while < total count of unique parents + dependents
  while (availableSteps.length < Object.keys(tree).length) {
    // sort current availableSteps and take the first one
    instructionOrder.push(availableSteps.sort()[0]);
    // console.log(`availableSteps.sort()[0]: ${JSON.stringify(availableSteps.sort()[0])}`);

    const nextAvailableSteps = availableSteps
      .reduce((accumulator, current) => {
        const dependents = getDependentSteps(tree, current);
        // console.log(`dependents: ${JSON.stringify(dependents)}`);

        if (dependents) {
          accumulator = accumulator.concat(dependents);
        }

        // console.log(`accumulator: ${JSON.stringify(accumulator)}`);
        return accumulator;
      }, []);
    // console.log(`nextAvailableSteps: ${JSON.stringify(nextAvailableSteps)}`);

    // remove the first object in availableSteps because we've stored it already
    availableSteps.shift();

    // add the nextAvailableSteps to current availableSteps to get all current availableSteps
    availableSteps = availableSteps.concat(nextAvailableSteps);
    // console.log(`availableSteps before re-looping: ${JSON.stringify(availableSteps)}`);
  }

  return instructionOrder.join('');
};

// distinct:
// Day071: ["A", "C", "D", "E", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].

// tree:
// Day071: ["A", "B", "C", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"].
