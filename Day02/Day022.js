module.exports = (input) => {
  const boxIds = input.split('\n')
    .filter((i) => i)
    .reduce((accumulator, currentValue, currentIndex, sourceArray) => {

      for (let i = currentIndex + 1; i < sourceArray.length; i++) {
        const sourceValue = sourceArray[i];
        let differingIndexes = [];

        for (let y = 0; y < currentValue.length; y++) {
          if (currentValue[y] !== sourceValue[y]) {
            differingIndexes.push(y);
          }
        }

        if (differingIndexes.length === 1) {
          const start = currentValue.substring(0, differingIndexes[0]);
          const end = currentValue.substring(differingIndexes[0] + 1);
          accumulator = start + end;
          // accumulator.push(currentValue.split('').splice(differingIndexes[0], 1).join(''));
        }
      }

      return accumulator;
    }, '');

  return boxIds;
};
