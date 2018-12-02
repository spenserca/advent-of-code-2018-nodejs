module.exports = (input) => {
  const boxIds = input.split('\n')
    .filter((i) => i)
    .map((boxId) => {
      const letters = boxId.split('');

      const letterCounts = letters.reduce((accumulator, current) => {
        if (accumulator[current]) {
          accumulator[current].value++;
        } else {
          accumulator[current] = {
            value: 1
          };
        }

        return accumulator;
      }, {});

      return letterCounts;
    });

  const duplicates = boxIds.reduce((accumulator, current) => {
    let hasDuplicates = false;

    Object.keys(current)
      .forEach((k) => {
        if (current[k].value === 2) {
          hasDuplicates = true;
        }
      });

    if (hasDuplicates) {
      accumulator++;
    }

    return accumulator;
  }, 0);

  const triplicates = boxIds.reduce((accumulator, current) => {
    let hasTriplicates = false;

    Object.keys(current)
      .forEach((k) => {
        if (current[k].value === 3) {
          hasTriplicates = true;
        }
      });

    if (hasTriplicates) {
      accumulator++;
    }

    return accumulator;
  }, 0);

  return duplicates * triplicates;
};
