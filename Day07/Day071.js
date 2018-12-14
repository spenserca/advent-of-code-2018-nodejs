const parseInstructions = (accumulator, instruction) => {
  const instructionSplit = instruction.split(' ');
  const parentInstruction = instructionSplit[1];
  const dependentInstruction = instructionSplit[7];

  if (accumulator.length === 0) {
    accumulator.push([], [], []);
  }

  const currentParentInstructions = accumulator[0];
  const currentDependentInstructions = accumulator[1];
  const parentDependentRelationships = accumulator[2];

  currentParentInstructions.push(parentInstruction);
  currentDependentInstructions.push(dependentInstruction);
  parentDependentRelationships.push(`${parentInstruction}${dependentInstruction}`);

  return [currentParentInstructions, currentDependentInstructions, parentDependentRelationships];
};

const removeDuplicates = (arrayToDistinct) => {
  const distinct = new Set(arrayToDistinct);

  return new Array(...distinct);
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
  const instructions = input.split('\n')
    .filter((i) => i)
    .reduce(parseInstructions, [])
    .reduce((accumulator, current, index) => {
      if (index === 2) {
        // combine values of current that have the same end value
        const newRelationships = current.reduce((accumulator, current, index, source) => {
          const currentEnding = current.split('')[1];
          const matchingEndings = source.filter((value) => value.endsWith(currentEnding));

          if (matchingEndings.length > 0) {
            accumulator.push(matchingEndings.join('-'));
          } else {
            accumulator.push(current);
          }

          return accumulator;
        }, []);

        accumulator.push(newRelationships);
      } else {
        accumulator.push(current);
      }

      return accumulator;
    }, [])
    .map(removeDuplicates);
  console.log(JSON.stringify(instructions));

  const parents = instructions[0];
  const dependents = instructions[1];
  const relationships = instructions[2];

  // TODO: build relationships where dependency relies on multiple parents

  const distinctInstructions = new Set([...parents, ...dependents]);
  console.log(distinctInstructions.size);

  const startingPoints = parents
    .filter((key) => !dependents.includes(key))
    .sort();

  let orderOfInstructions = startingPoints.shift();

  let availableSteps = relationships
    .filter((instruction) => instruction.startsWith(...orderOfInstructions)); // ["CA", "CF"]

  while (orderOfInstructions.length < distinctInstructions.size) {
    const nextInstruction = availableSteps
      .map((instruction) => instruction.split(''))
      .reduce((accumulator, stepRelationship) => {
        accumulator.push(stepRelationship[1]);

        return accumulator;
      }, [])
      .sort()
      .shift();

    // update order of instructions
    orderOfInstructions = orderOfInstructions.concat(nextInstruction);

    // remove nextInstruction from availableSteps
    availableSteps = availableSteps.filter((step) => !step.endsWith(nextInstruction));

    // unlock next available steps
    const nextSteps = relationships
      .filter((instruction) => instruction.startsWith(nextInstruction));

    availableSteps = availableSteps.concat(nextSteps);
  }

  return JSON.stringify(orderOfInstructions);

  // const instructions = input.split('\n')
  //   .filter((i) => i)
  //   .map(parseInstructions)
  //   .reduce(populateDependents, {});

  // // get a list of all dependent values so we can calculate which steps are not dependent on others
  // const dependentInstructions = Object.values(instructions)
  //   .reduce((dependents, instruction) => {
  //     const distinctDependents = new Set(dependents.concat(instruction.dependents));

  //     return new Array(...distinctDependents);
  //   }, []); // A, F, B, D, E

  // dependentInstructions.forEach((dependent) => {
  //   // find all keys that have the dependent in its dependents
  //   const dependencies = Object.keys(instructions)
  //     .reduce((dependencies, key) => {
  //       const instruction = instructions[key];

  //       if (instruction.dependents.includes(dependent)) {
  //         dependencies.push(instruction.id)
  //       }

  //       return dependencies;
  //     }, []);

  //   if (instructions[dependent]) {
  //     instructions[dependent].dependencies = dependencies;
  //   } else {
  //     instructions[dependent] = {
  //       id: dependent,
  //       dependencies: dependencies
  //     };
  //   }
  // });

  // const independentInstructions = Object.keys(instructions)
  //   .reduce((independents, key) => {
  //     if (!dependentInstructions.includes(key)) {
  //       independents.push(key);
  //     }

  //     return independents;
  //   }, []) // C
  //   .sort();

  return '';


  // // get total size of final string
  // const keys = Object.keys(instructions);
  // const values = Object.values(instructions)
  //   .reduce((accumulator, current) => {
  //     return accumulator.concat(current.dependents);
  //   }, []);
  // const total = keys.concat(values);
  // const distinct = new Set(keys.concat(...values));

  // // const distinctIds = new Set(Object.keys(tree).concat(...Object.values(tree)));

  // // console.log(JSON.stringify(distinctIds.);

  // // TODO: use a set here
  // const distinctDependents = Object.values(instructions)
  //   .reduce((accumulator, current) => {
  //     return accumulator.concat(current.dependents);
  //   }, [])
  //   .reduce((accumulator, current) => {
  //     if (!accumulator.includes(current)) {
  //       accumulator.push(current);
  //     }

  //     return accumulator;
  //   }, []);

  // // get the first starting points alphabetically
  // const independentSteps = getIndependentSteps(instructions, distinctDependents);

  // const dependentOnlySteps = getDependentOnlySteps(instructions, distinctDependents);

  // let availableSteps = independentSteps;

  // // add the first step to the instructionOrder
  // let instructionOrder = [];
  // let count = 0;
  // while (instructionOrder.length < distinct.size) {
  //   count++;
  //   const availableStepsCopy = availableSteps;

  //   instructionOrder.push(availableStepsCopy.sort()[0]);
  //   // 1. Adds C to instructionOrder
  //   // 2. Adds A to instructionOrder
  //   // 3. Adds B to instructionOrder
  //   // 4. Adds D to instructionOrder

  //   const nextAvailableSteps = availableSteps
  //     .reduce((accumulator, currentStep) => {
  //       const dependentSteps = getDependentSteps(instructions, currentStep);
  //       // 1. C gets A, F
  //       // 2. A, F get B, D & E
  //       // 3. B, D, E, F get E, E, nothing, E
  //       // 4. D, E, E, E, E, F get E, nothing, nothing, nothing, nothing, nothing, E

  //       if (dependentSteps) {
  //         // remove steps that are already present in availableSteps
  //         // const alreadyTrackedSteps = unfulfilledDependentSteps.filter((step) => !availableSteps.includes(step));
  //         const distinctDependentSteps = new Set(dependentSteps);

  //         accumulator = accumulator.concat(...distinctDependentSteps);
  //         console.log(`${count}.accumulator after dependentSteps: ${JSON.stringify(accumulator)}`);
  //       }

  //       return accumulator;
  //     }, []);

  //   availableSteps.shift();
  //   console.log(`${count}.availableSteps after shift(): ${JSON.stringify(availableSteps)}`);
  //   // 1. C gets removed. A, F remain
  //   // 2. A gets removed. F, B, D, E remain
  //   // 3. B gets removed. D, E, E, E, E, F remain
  //   // 4. D gets removed. E, E, E, E, E, E, F remain

  //   availableSteps = availableSteps.concat(nextAvailableSteps);
  //   console.log(`${count}.availableSteps after.concat(nextAvailableSteps): ${JSON.stringify(availableSteps)}`);
  // }

  // return instructionOrder.join('');
};
