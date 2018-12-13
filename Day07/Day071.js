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


const getIndependentSteps = (tree, distinctDependents) => {
  let treeTops = [];

  Object.keys(tree)
    .forEach((key) => {
      if (!distinctDependents.includes(key)) {
        treeTops.push(key);
      }
    });

  return treeTops;
};

const getDependentOnlySteps = (tree, distinctDependents) => {
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

  // get total size of final string
  const keys = Object.keys(tree);
  const values = Object.values(tree)
    .reduce((accumulator, current) => {
      return accumulator.concat(current.dependents);
    }, []);
  const total = keys.concat(values);
  const distinct = new Set(keys.concat(...values));

  // const distinctIds = new Set(Object.keys(tree).concat(...Object.values(tree)));

  // console.log(JSON.stringify(distinctIds.);

  // TODO: use a set here
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
  const independentSteps = getIndependentSteps(tree, distinctDependents);

  const dependentOnlySteps = getDependentOnlySteps(tree, distinctDependents);

  let availableSteps = independentSteps;

  // add the first step to the instructionOrder
  let instructionOrder = [];
  let count = 0;
  while (instructionOrder.length < distinct.size) {
    count++;
    const availableStepsCopy = availableSteps;

    instructionOrder.push(availableStepsCopy.sort()[0]);
    // 1. Adds C to instructionOrder
    // 2. Adds A to instructionOrder
    // 3. Adds B to instructionOrder
    // 4. Adds D to instructionOrder

    const nextAvailableSteps = availableSteps
      .reduce((accumulator, currentStep) => {
        const dependentSteps = getDependentSteps(tree, currentStep);
        // 1. C gets A, F
        // 2. A, F get B, D & E
        // 3. B, D, E, F get E, E, nothing, E
        // 4. D, E, E, E, E, F get E, nothing, nothing, nothing, nothing, nothing, E

        if (dependentSteps) {
          // remove steps that are already present in availableSteps
          // const alreadyTrackedSteps = unfulfilledDependentSteps.filter((step) => !availableSteps.includes(step));
          const distinctDependentSteps = new Set(dependentSteps);

          accumulator = accumulator.concat(...distinctDependentSteps);
          console.log(`${count}. accumulator after dependentSteps: ${JSON.stringify(accumulator)}`);
        }

        return accumulator;
      }, []);

    availableSteps.shift();
    console.log(`${count}. availableSteps after shift(): ${JSON.stringify(availableSteps)}`);
    // 1. C gets removed. A, F remain
    // 2. A gets removed. F, B, D, E remain
    // 3. B gets removed. D, E, E, E, E, F remain
    // 4. D gets removed. E, E, E, E, E, E, F remain

    availableSteps = availableSteps.concat(nextAvailableSteps);
    console.log(`${count}. availableSteps after .concat(nextAvailableSteps): ${JSON.stringify(availableSteps)}`);
  }

  return instructionOrder.join('');
};
