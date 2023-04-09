import { nonMagicAsyncFunction, magicAsyncFunction } from './magic';

describe('Person Functions', () => {
  describe('nonMagicAsyncFunction', () => {
    it('should return a Person with firstName and lastName from the given name string', async () => {
      const name = "John Doe";
      const expectedPerson = { firstName: "John", lastName: "Doe" };

      const result = await nonMagicAsyncFunction(name);

      expect(result).toEqual(expectedPerson);
    });
  });

  describe('magicAsyncFunction', () => {
    it('should return a Person with the first name of the 5th president and the last name of the 40th president regardless of input name', async () => {
      const name = "Name Input";
      const expectedPerson = { firstName: "James", lastName: "Reagan" };

      const result = await magicAsyncFunction(name);

      expect(result).toEqual(expectedPerson);
    });
  });
});
