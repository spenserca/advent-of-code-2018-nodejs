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

const getMaxPowerAndSize = (x, y, grid) => {
  const abc = grid.reduce((accumulator, row) => {

  }, []);


  return {
    size: 0,
    maxPower: 0
  };
};

module.exports = (serialNumber) => {
  const grid = initializeGrid(serialNumber);
  let squares = {};

  for (let x = 0; x <= 299; x++) {
    for (let y = 0; y <= 299; y++) {
      const powerGrid = [];

      for (i = x; i <= 299; i++) {
        for (j = y; j <= 299; j++) {
          powerGrid.push(grid[i][j]);
        }
      }

      squares[`${x + 1},${y + 1},${powerGrid.length}`] = powerGrid.reduce((sum, current) => sum += current, 0);
    }
  }

  const maxPowerTopLeftCoordinate = Object.keys(squares)
    .reduce((maxPowerCoordinate, currentCoordinate) => {
      if (squares[currentCoordinate] > (maxPowerCoordinate[1] || Number.MIN_SAFE_INTEGER)) {
        maxPowerCoordinate = [currentCoordinate, squares[currentCoordinate]];
      }

      return maxPowerCoordinate;
    }, []);

  return maxPowerTopLeftCoordinate[0];
}
