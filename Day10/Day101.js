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
  const powerLevel = ((nonIndexedX + 10) * nonIndexedY + serialNumber) * (nonIndexedX + 10);
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
  let squares = {};

  for (let x = 0; x <= 297; x++) {
    for (let y = 0; y <= 297; y++) {
      // calculate 3x3 power & store with top left most coords
      const powerGrid = [];

      for (i = x; i < x + 3; i++) {
        for (j = y; j < y + 3; j++) {
          powerGrid.push(grid[i][j]);
        }
      }

      squares[`${x},${y}`] = powerGrid.reduce((sum, current) => sum += current, 0);
    }
  }

  return JSON.stringify(grid[0][0]);
}
