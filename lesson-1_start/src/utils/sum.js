const sum = (array) => {
  if (!Array.isArray(array)) {
    return 'Invalid input';
  }

  return array.reduce((acc, currentItem) => {
    if (Array.isArray(currentItem)) {
      return acc + sum(currentItem);
    }

    if (typeof currentItem === 'number') {
      return acc + currentItem;
    }

    return acc;
  }, 0);
};

module.exports = sum;
