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

  const distinctInstructions = new Set([...parents, ...dependents]);

  const startingPoints = parents
    .filter((key) => !dependents.includes(key))
    .sort();

  let orderOfInstructions = startingPoints.shift();

  let availableSteps = relationships
    .filter((relationship) => relationship.startsWith(...orderOfInstructions));

  while (orderOfInstructions.length < distinctInstructions.size) {
    const nextInstruction = availableSteps
      .map((instruction) => instruction.split(''))
      .reduce((accumulator, instructionDependent) => {
        if (instructionDependent.includes('-')) {
          // parse all parent values
          const parents = instructionDependent.join('')
            .split('-')
            .map((relationship) => {
              return relationship.split('')[0];
            });

          // check if all parents are included in orderOfInstructions
          const parentDependenciesSatisfied = parents
            .map((parent) => {
              return orderOfInstructions.includes(parent);
            })
            .reduce((accumulator, current) => {
              if (accumulator === undefined) {
                return current;
              } else if (accumulator === false || current === false) {
                return false;
              }

              return true;
            }, undefined);

          if (parentDependenciesSatisfied === true) {
            accumulator.push(instructionDependent[1]);
          }
        } else {
          accumulator.push(instructionDependent[1]);
        }

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

  return orderOfInstructions;
};
