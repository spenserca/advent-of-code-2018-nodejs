const buildGrid = () => {
  let grid = []

  for (let x = 0; x < 1000; x++) {
    grid[x] = [];

    for (let y = 0; y < 1000; y++) {
      grid[x][y] = 0;
    }
  }

  return grid;
};

module.exports = (input) => {
  const grid = buildGrid();

  return input.split('\r\n')
    .filter((claim) => claim)
    .map((claim) => {
      const splitClaim = claim.split(' ');
      const coordinates = splitClaim[2].replace(':', '').split(',');
      const dimensions = splitClaim[3].split('x');

      return {
        id: parseInt(splitClaim[0].replace('#', '')),
        x: parseInt(coordinates[0]),
        y: parseInt(coordinates[1]),
        w: parseInt(dimensions[0]),
        h: parseInt(dimensions[1])
      };
    })
    .map((rectangle) => {
      for (let i = 0; i < rectangle.w; i++) {
        for (let k = 0; k < rectangle.h; k++) {
          grid[rectangle.x + i][rectangle.y + k]++;
        }
      }

      return rectangle;
    })
    .reduce((accumulator, rectangle) => {
      let rectangleOverlaps = false;

      for (let i = 0; i < rectangle.w; i++) {
        for (let k = 0; k < rectangle.h; k++) {
          if (grid[rectangle.x + i][rectangle.y + k] > 1) {
            rectangleOverlaps = true;
          }
        }
      }

      if (!rectangleOverlaps) {
        accumulator = rectangle.id;
      }

      return accumulator;
    }, 0);
};
