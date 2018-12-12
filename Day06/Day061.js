const parseCoordinates = (coordinateString, index) => {
  const coordinateValues = coordinateString.match(/([0-9]{1,})/g);

  return {
    id: index,
    x: parseInt(coordinateValues[0]),
    y: parseInt(coordinateValues[1])
  };
};

const calculateDistances = (x, y, coordinates) =>
  coordinates.map((coordinate, index) => {
    return {
      distance: Math.abs(x - coordinate.x) + Math.abs(y - coordinate.y),
      id: index
    };
  });

module.exports = (input) => {
  const coordinates = input.split('\r\n')
    .filter((i) => i)
    .map(parseCoordinates);

  const maxX = Math.max(...coordinates.map((coordinate) => coordinate.x));
  const minX = Math.min(...coordinates.map((coordinate) => coordinate.x));
  const maxY = Math.max(...coordinates.map((coordinate) => coordinate.y));
  const minY = Math.min(...coordinates.map((coordinate) => coordinate.y));

  // const filteredCoordinates = coordinates
  //   .filter((coordinate) => !((coordinate.x === maxX && coordinate.y === maxY)
  //     || (coordinate.x === minX && coordinate.y == maxY)
  //     || (coordinate.x === maxX && coordinate.y === minY)
  //     || (coordinate.x === minX && coordinate.y === minY)));

  let counts = {};

  for (let x = minX - 2; x < maxX + 2; x++) {
    for (let y = minY - 2; y < maxY + 2; y++) {
      if (x < minX || x > maxX || y < minY || y > maxY) continue;

      const distances = calculateDistances(x, y, coordinates);
      const closestDistance = Math.min(...distances.map((distance) => distance.distance));
      const closestIds = distances.filter((distance) => distance.distance === closestDistance)
        .map((closest) => closest.id);

      if (closestIds.length === 1) {
        if (counts[closestIds[0]]) {
          counts[closestIds[0]]++;
        } else {
          counts[closestIds[0]] = 1;
        }
      }
    }
  }

  return Math.max(...Object.values(counts));
  // return JSON.stringify(counts);
};

// That's not the right answer; your answer is too high. If you're stuck, there are some general tips on the about page, or you can ask for hints on the subreddit. Please wait one minute before trying again. (You guessed 12568.) 
// too high: 5041
