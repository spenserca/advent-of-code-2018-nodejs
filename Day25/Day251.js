const getManhattanDistance = (pointOne, pointTwo) =>
  Math.abs(pointOne[0] - pointTwo[0]) + Math.abs(pointOne[1] - pointTwo[1]) + Math.abs(pointOne[2] - pointTwo[2]) + Math.abs(pointOne[3] - pointTwo[3]);

const getManhattanDistanceToOtherPoints = (currentPoint, source) => {
  return source
    .reduce((manhattanDistances, otherPoint) => {
      const manhattanDistance = getManhattanDistance(currentPoint, otherPoint);

      if (manhattanDistance > 0 && manhattanDistance <= 3) {
        manhattanDistances.push(otherPoint.join(','));
      }

      return manhattanDistances;
    }, []);
};

module.exports = (input) => {
  return input.split('\n')
    .filter((i) => i)
    .map((i) => i.split(',').map((v) => parseInt(v)))
    .map((currentPoint, index, source) => {
      // calc manhattan distance to all other points that are less than or equal to 3
      const manhattanDistances = getManhattanDistanceToOtherPoints(currentPoint, source);

      return {
        initialPoint: currentPoint.join(','),
        manhattanDistances: manhattanDistances
      };
    });
}
