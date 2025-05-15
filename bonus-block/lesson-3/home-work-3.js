const createPromise = (time) => {
  createPromise.callCount = (createPromise.callCount || 0) + 1;

  const seconds = time / 1000;
  const message = `Promise ${createPromise.callCount} resolved after ${seconds} seconds`;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, time);
  });
};

module.exports = createPromise;
