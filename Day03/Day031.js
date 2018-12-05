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

  const rectangles = input.split('\r\n')
    .filter((i) => i)
    .map((claim) => {
      const splitClaim = claim.split(' ');
      const coordinates = splitClaim[2].replace(':', '').split(',');
      const dimensions = splitClaim[3].split('x');

      return {
        x: coordinates[1],
        y: coordinates[0],
        width: dimensions[0],
        length: dimensions[1]
      };
    })
    .map((rectangle) => {
      console.log(`Processing rectangle: ${JSON.stringify(rectangle)}`);

      for (let i = rectangle.x + 1; i < rectangle.length; i++) {
        console.log(`x: ${rectangle.x}. length: ${rectangle.length}`);

        let row = grid[i];
        console.log(JSON.stringify(row));
      }
    });



  // .map((rectangle) => {
  //   for (let x = rectangle.x + 1; x <= rectangle.x + rectangle.length + 1; x++) {
  //     let row = grid[x];
  //     // console.log(JSON.stringify(row));

  //     for (let y = rectangle.y + 1; y <= rectangle.y + rectangle.length + 1; y++) {
  //       // console.log(row[y]);
  //       row[y]++;
  //     }
  //   }
  // });

  // rectangles.forEach((rectangle) => {
  //   for (let x = rectangle.x + 1; x <= rectangle.x + rectangle.length + 1; x++) {
  //     let row = grid[x];
  //     console.log(JSON.stringify(row));

  //     for (let y = rectangle.y + 1; y <= rectangle.y + rectangle.length + 1; y++) {
  //       console.log(row[y]);
  //       row[y]++;
  //     }
  //   }
  // });

  return grid.reduce((accumulator, row) => {
    accumulator += row.reduce((accumulator, y) => {
      return y >= 2
        ? accumulator += y
        : accumulator;
    }, 0);

    return accumulator;
  }, 0);
};
