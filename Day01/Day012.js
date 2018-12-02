module.exports = (input) => {
  const frequencies = input.split('\n')
    .filter((i) => i)
    .map((i) => parseInt(i));
  const seenFrequencies = [0];
  let count = 0,
    duplicateFrequency,
    frequency = 0;

  while (duplicateFrequency === undefined) {
    const currentFrequency = frequencies[count % frequencies.length];

    frequency += currentFrequency;

    if (seenFrequencies.includes(frequency)) {
      duplicateFrequency = frequency;
    }

    seenFrequencies.push(frequency);

    count++;
  }

  return duplicateFrequency;
};
