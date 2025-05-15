const createMultiplier = (number) => {
  if (typeof number !== 'number' || Number.isNaN(number)) {
    throw new Error('The provided value is not a number');
  }
  return (multiplier) => number * multiplier;
};

module.exports = createMultiplier;
