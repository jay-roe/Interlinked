import myFunction from "../sampleHelper";

describe('Unit test on helper function', () => {
    it('tests the only function', () => {
        const value = myFunction(3, 6)
        expect(value).toBe(9);
    });
});