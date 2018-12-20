const getHundredsDigit = (powerLevel) => {
  if (powerLevel < 100) {
    return 0;
  }

  const powerLevelString = powerLevel.toString();
  const hundredsDigit = powerLevelString[powerLevelString.length - 3];

  return parseInt(hundredsDigit);
};

const getPowerLevel = (x, y, serialNumber) => {
  const nonIndexedX = x + 1;
  const nonIndexedY = y + 1;
  const powerLevel = ((nonIndexedX + 10) * nonIndexedY + serialNumber) * rackId;
  const hundredsDigit = getHundredsDigit(powerLevel);

  return hundredsDigit - 5;
};

const initializeGrid = (serialNumber) => {
  let grid = [];
  for (let x = 0; x <= 299; x++) {
    grid[x] = [];

    for (let y = 0; y <= 299; y++) {
      grid[x][y] = getPowerLevel(x, y, serialNumber);
    }
  }

  return grid;
};

module.exports = (serialNumber) => {
  const grid = initializeGrid(serialNumber);

  return JSON.stringify(grid);
}
