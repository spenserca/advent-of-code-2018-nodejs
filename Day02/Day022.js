module.exports = (input) => {
  const boxIds = input.split('\n')
    .filter((i) => i)
    .reduce((accumulator, currentValue, currentIndex, sourceArray) => {
      let matchingChars = accumulator;

      for (let i = currentIndex + 1; i < sourceArray.length; i++) {
        const sourceValue = sourceArray[i];
        let differingIndices = [];

        for (let y = 0; y < currentValue.length; y++) {
          if (currentValue[y] !== sourceValue[y]) {
            differingIndices.push(y);
          }
        }

        if (differingIndices.length === 1) {
          const start = currentValue.substring(0, differingIndices[0]);
          const end = currentValue.substring(differingIndices[0] + 1);

          matchingChars = start + end;
        }
      }

      return matchingChars;
    }, '');

  return boxIds;
};
