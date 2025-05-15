const createMultiplier = require('./home-work-2.js');


describe('createMultiplier', () => {
    it('should return a function that multiplies a number by the given multiplier', () => {
        const multiplyByTwo = createMultiplier(2);
        expect(multiplyByTwo(5)).toBe(10);
        expect(multiplyByTwo(10)).toBe(20);
    });

    it('should return a function that multiplies the input with the given number', () => {
        const multiplyBy5 = createMultiplier(5);
        expect(multiplyBy5(2)).toBe(10);
        expect(multiplyBy5(0)).toBe(0);
        expect(multiplyBy5(-3)).toBe(-15);
    });

    it('should work with floating point numbers', () => {
        const multiplyBy1_5 = createMultiplier(1.5);
        expect(multiplyBy1_5(2)).toBe(3);
    });

    it('should throw an error if input is not a number', () => {
        expect(() => createMultiplier('abc')).toThrow('The provided value is not a number');
        expect(() => createMultiplier(NaN)).toThrow('The provided value is not a number');
        expect(() => createMultiplier(undefined)).toThrow('The provided value is not a number');
        expect(() => createMultiplier(null)).toThrow('The provided value is not a number');
    });

    it('should treat numeric strings as invalid', () => {
        expect(() => createMultiplier('5')).toThrow('The provided value is not a number');
    });
});
