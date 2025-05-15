const createPromise = require('./home-work-3.js');

describe('createPromise', () => {
  it('should be resolved after the specified time', (done) => {
    const time = 1000;
    createPromise(time).then((message) => {
      expect(message).toBe(`Promise 1 resolved after 1 seconds`);
      done();
    });
  });

  it('should show seconds', (done) => {
    const time = 2000;
    createPromise(time).then((message) => {
      expect(message).toContain(`2 seconds`);
      done();
    });
  });

  it('should show count of promise', (done) => {
    const time = 2000;
    createPromise.callCount = 0;

    createPromise(time);
    createPromise(time).then((message) => {
      expect(createPromise.callCount).toBe(2);
      expect(message).toContain(`Promise 2`);
      done();
    });
  });
});
