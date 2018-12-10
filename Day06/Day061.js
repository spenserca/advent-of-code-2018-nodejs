const byCoordinateAsc = (a, b) => {
  // (a.x - b.x) + (a.y - b.y);
  const aDistanceToOrigin = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
  const bDistanceToOrigin = Math.sqrt(Math.pow(b.x, 2) + Math.pow(b.y, 2));

  return aDistanceToOrigin - bDistanceToOrigin;
};

const parseCoordinate = (coordinate, index) => {
  const coordinateValues = coordinate.match(/([0-9]{1,})/g);

  return {
    id: index,
    x: parseInt(coordinateValues[0]),
    y: parseInt(coordinateValues[1])
  };
};

const calculateManhattanDistance = (coordinate, sourceCoordinate) => {
  return Math.abs(coordinate.x - sourceCoordinate.x) + Math.abs(coordinate.y - sourceCoordinate.y);
};

const calculateArea = (coordinate, sourceCoordinate) =>
  Math.abs(coordinate.x - sourceCoordinate.x) * Math.abs(coordinate.y - sourceCoordinate.y);

module.exports = (input) => {
  let grid = [],
    maxX,
    maxY,
    minX,
    minY;

  return input.split('\r\n')
    .map(parseCoordinate)
    .map((coordinate) => {
      if (coordinate.x > maxX || !maxX) {
        maxX = coordinate.x;
      }

      if (coordinate.x < minX || !minX) {
        minX = coordinate.x;
      }

      if (coordinate.y > maxY || !maxY) {
        maxY = coordinate.y;
      }

      if (coordinate.y < minY || !minY) {
        minY = coordinate.y;
      }

      return coordinate;
    })
    .map((coordinate) => {
      coordinate.isValid = !(coordinate.x === maxX
        || coordinate.x === minX
        || coordinate.y === maxY
        || coordinate.y === minY);

      return coordinate;
    })
    .filter((coordinate) => coordinate.isValid)
    .map((coordinate) => {
      if (grid.length === 0) {
        for (let x = 0; x < maxX; x++) {
          grid[x] = [];
          for (let y = 0; y < maxY; y++) {
            grid[x][y] = '#';
          }
        }
      }

      return coordinate;
    })
    // calculate distances to all other coords and find the one with the shortest distance
    .map((coordinate, index, source) => {
      source.forEach((sourceCoordinate) => {
        const manhattanDistance = calculateManhattanDistance(coordinate, sourceCoordinate);
        // 
        if (!coordinate.closestManhattanDistance || manhattanDistance < coordinate.closestManhattanDistance) {
          coordinate.closestManhattanDistance = manhattanDistance;
          const xDelta = Math.abs(coordinate.x - sourceCoordinate.x);
          const yDelta = Math.abs(coordinate.y - sourceCoordinate.y);
          coordinate.xStart = coordinate.x - xDelta;
          coordinate.xEnd = coordinate.x + xDelta;
          coordinate.yStart = coordinate.y - yDelta;
          coordinate.yEnd = coordinate.y + yDelta;
          // coordinate.closestManhattanDistance = manhattanDistance;
          // coordinate.xStart = coordinate.x - Math.abs(coordinate.x - sourceCoordinate.x) < 0 ? 0 : coordinate.x - Math.abs(coordinate.x - sourceCoordinate.x);
          // coordinate.xEnd = coordinate.x + Math.abs(coordinate.x - sourceCoordinate.x) < 0 ? 0 : coordinate.x + Math.abs(coordinate.x - sourceCoordinate.x);
          // coordinate.yStart = coordinate.y - Math.abs(coordinate.y - sourceCoordinate.y) < 0 ? 0 : coordinate.y - Math.abs(coordinate.y - sourceCoordinate.y);
          // coordinate.yEnd = coordinate.y + Math.abs(coordinate.y - sourceCoordinate.y) < 0 ? 0 : coordinate.y + Math.abs(coordinate.y - sourceCoordinate.y);
        }
      });

      return coordinate;
    })
    .reduce((accumulator, current) => {
      for (let x = current.xStart; x <= current.xEnd; x++) {
        for (let y = current.yStart; y <= current.yEnd; y++) {
          accumulator[x][y] = accumulator[x][y] === '#' ? current.id : '.';
        }
      }

      return accumulator;
    }, grid)
    .reduce((accumulator, row) => {
      const rowCounts = row.reduce((acc, curr) => {
        if (!['#', '.'].includes(curr)) {
          if (acc[curr]) {
            acc[curr]++;
          } else {
            acc[curr] = 1;
          }
        }

        return acc;
      }, {});

      Object.keys(rowCounts)
        .forEach((key) => {
          if (accumulator[key]) {
            accumulator[key] += rowCounts[key];
          } else {
            accumulator[key] = rowCounts[key];
          }
        });

      return accumulator;
    }, {});



  // .filter((row) => row)
  // .reduce((accumulator, current) => {
  //   if (current.area > accumulator) {
  //     accumulator = current.area;
  //   }

  //   return accumulator;

  //   // const maxArea = current.reduce((value) => {
  //   //   if (value.area > accumulator) {
  //   //     accumulator = value.area;
  //   //   }

  //   //   return accumulator;
  //   // }, 0);

  //   // if (maxArea > accumulator) {
  //   //   accumulator = maxArea;
  //   // }

  //   // return accumulator;
  //   // if (current.area < accumulator) {
  //   //   accumulator = current.area;
  //   // }

  //   // accumulator = current.area;

  //   // return current.area;
  // }, 0);
  // .sort(byCoordinateAsc)
  //   .reduce((accumulator, current, index, source) => {
  //   if (!accumulator[current.x]) {
  //     accumulator[current.x] = [];
  //   }

  //   accumulator[current.x][current.y] = current.id;

  //   if (index !== 0 && index !== source.length - 1) {
  //     // build area 
  //   }

  //   return accumulator;
  // }, []);
};
