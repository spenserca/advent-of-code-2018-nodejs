const parseCoordinates = (coordinateString, index) => {
  const coordinateValues = coordinateString.match(/([0-9]{1,})/g);

  return {
    id: `${coordinateValues[0]},${coordinateValues[1]}`,
    x: parseInt(coordinateValues[0]),
    y: parseInt(coordinateValues[1])
  };
};

const calculateDistances = (x, y, coordinates) =>
  coordinates.map((coordinate, index) => {
    return {
      distance: Math.abs(x - coordinate.x) + Math.abs(y - coordinate.y),
      id: coordinate.id
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

  let areas = {};

  for (let x = minX; x < maxX; x++) {
    for (let y = minY; y < maxY; y++) {
      const distances = calculateDistances(x, y, coordinates);
      const closestDistance = Math.min(...distances.map((distance) => distance.distance));
      const closestIds = distances.filter((distance) => distance.distance === closestDistance)
        .map((closest) => closest.id);

      if (closestIds.length === 1) {
        if (areas[closestIds[0]]) {
          areas[closestIds[0]]++;
        }
        else {
          areas[closestIds[0]] = 1;
        }
      }
    }
  }

  return Math.max(...Object.values(areas));
};
