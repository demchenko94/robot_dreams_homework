const averageGrade = require('./home-work-1.js');

describe('averageGrade', () => {
  it('should return the average grade of a person', () => {
    const personStub = {
      name: 'Chill Student',
      grades: [
        { name: 'Math', score: 1 },
        { name: 'Science', score: 5 },
        { name: 'Invalid Name', score: null },
        { name: 'Invalid Subject', score: undefined },
        { name: 'Biology', score: 10 },
      ],
    };

    const result = averageGrade(personStub);

    expect(result).toBe('3.20');
  });

  it('should return 0.00 if all scores are invalid', () => {
    const personStub = {
      name: 'Chill Student',
      grades: [
        { name: 'Math', score: null },
        { name: 'Science', score: undefined },
        { name: 'Invalid Name', score: {} },
        { name: 'Invalid Subject', score: [] },
      ],
    };

    const result = averageGrade(personStub);

    expect(result).toBe('0.00');
  });

  it('should return 0.00 if the grades are empty', () => {
    const personStub = {
      name: 'Chill Student',
      grades: [],
    };
    const result = averageGrade(personStub);

    expect(result).toBe('0.00');
  });

  it('should return the average grade with 2 decimal places', () => {
    const personStub = {
      name: 'Chill Student',
      grades: [
        { name: 'Math', score: 1 },
        { name: 'Science', score: 5 },
        { name: 'Invalid Name', score: null },
        { name: 'Invalid Subject', score: undefined },
        { name: 'Biology', score: 10 },
      ],
    };

    const result = averageGrade(personStub);

    expect(result).toBe('3.20');
  });

  it('should handle string numbers correctly', () => {
    const personStub = {
      name: 'Chill Student',
      grades: [
        { name: 'Math', score: '1' },
        { name: 'Science', score: 5 },
        { name: 'Invalid Name', score: null },
        { name: 'Invalid Subject', score: undefined },
        { name: 'Biology', score: 10 },
      ],
    };

    const result = averageGrade(personStub);

    expect(result).toBe('3.20');
  });

  it('should handle a single valid score correctly', () => {
    const personStub = {
      name: 'Chill Student',
      grades: [{ name: 'Math', score: 1 }],
    };

    const result = averageGrade(personStub);

    expect(result).toBe('1.00');
  });
});
