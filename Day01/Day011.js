module.exports = (input) => input.split('\r\n')
  .filter((i) => i)
  .reduce((accumulator, current) => {
    let total = accumulator;
    const increase = current.match(/[+]/g);
    const frequencyChange = current.match(/[0-9]{1,}/g);

    if (increase) {
      total += parseInt(frequencyChange[0]);
    } else {
      total -= parseInt(frequencyChange[0]);
    }

    return total;
  }, 0);
