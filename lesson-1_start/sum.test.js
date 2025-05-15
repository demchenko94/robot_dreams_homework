const sum = require('./sum');

describe('sum', () => {
  it('should return 0 for an empty array', () => {
    const result = sum([]);
    expect(result).toBe(0);
  });

  it('should return 21 for array [1, 2, [3, 4, [5]], 6]', () => {
    const result = sum([1, 2, [3, 4, [5]], 6]);
    expect(result).toBe(21);
  });

  it('should return error for invalid input', () => {
    const result = sum('test');
    expect(result).toBe('Invalid input');
  });
});
