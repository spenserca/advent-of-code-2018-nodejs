const parseCoorinates = (coordinateString, index) => {
  const coordinateValues = coordinateString.match(/([0-9]{1,})/g);

  return {
    id: index,
    x: parseInt(coordinateValues[0]),
    y: parseInt(coordinateValues[1])
  };
};

const initializeGrid = (maxX, maxY) => {
  let grid = {};

  for (let x = 0; x <= maxX; x++) {
    grid[x] = [];

    for (let y = 0; y <= maxY; y++) {
      grid[x][y] = '.';
    }
  }

  return grid;
};

const populateCoordinates = (coordinates, grid) => {
  coordinates.forEach((coordinate) => {
    grid[coordinate.x][coordinate.y] = coordinate.id;
  });
};

const getManhattanDistance = (currentCoordinate, finiteCoordinate) =>
  Math.abs(currentCoordinate.x - finiteCoordinate.x) + Math.abs(currentCoordinate.y - finiteCoordinate.y);

module.exports = (input) => {
  const coordinates = input.split('\r\n')
    .filter((i) => i)
    .map(parseCoorinates);

  const maxX = Math.max(...coordinates.map((coordinate) => coordinate.x));
  const minX = Math.min(...coordinates.map((coordinate) => coordinate.x));
  const maxY = Math.max(...coordinates.map((coordinate) => coordinate.y));
  const minY = Math.min(...coordinates.map((coordinate) => coordinate.y));

  const grid = initializeGrid(maxX, maxY);

  populateCoordinates(coordinates, grid);

  const finiteCoordinates = coordinates.filter((coordinate) => coordinate.x !== maxX || coordinate.x !== minX || coordinate.y !== maxY || coordinate.y !== minY);

  Object.keys(grid).forEach((key) => {
    let row = grid[key];

    const updatedRow = row.map((value, index) => {
      const currentCoordinate = {
        x: parseInt(key),
        y: index
      };
      let closestDistance = Number.MAX_SAFE_INTEGER;
      let closestCoordinates = [];

      finiteCoordinates.forEach((finiteCoordinate) => {
        const manhattanDistance = getManhattanDistance(currentCoordinate, finiteCoordinate);

        if (manhattanDistance < closestDistance) {
          closestDistance = manhattanDistance;
          closestCoordinates = [finiteCoordinate];
        } else if (manhattanDistance === closestDistance) {
          closestCoordinates.push(finiteCoordinate);
        }
      });

      if (closestCoordinates.length === 0) {
        return value;
      }

      if (closestCoordinates.length === 1) {
        return closestCoordinates[0].id;
      }

      return '#';
    });

    grid[key] = updatedRow;
  });

  const values = Object.keys(grid)
    .reduce((accumulator, key) => {
      const row = grid[key];

      const rowValues = row.reduce((accumulator, value) => {
        if (value === '#') {
          return accumulator;
        }

        if (accumulator[value]) {
          accumulator[value]++;
        } else {
          accumulator[value] = 1;
        }

        return accumulator;
      }, {});

      Object.keys(rowValues)
        .forEach((key) => {
          if (accumulator[key]) {
            accumulator[key] += rowValues[key];
          } else {
            accumulator[key] = rowValues[key];
          }
        });

      return accumulator;
    }, {})

  return Math.max(...Object.values(values));
};

// That's not the right answer; your answer is too high. If you're stuck, there are some general tips on the about page, or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 12568.) 
