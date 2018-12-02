module.exports = (input) =>
  input.split('\n')
    .filter((i) => i)
    .map((i) => parseInt(i))
    .reduce((accumulator, current) =>
      accumulator + current, 0);
