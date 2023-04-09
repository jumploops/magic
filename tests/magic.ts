interface Person {
  firstName: string;
  lastName: string;
}

export async function nonMagicAsyncFunction(name: string): Promise<Person> {
  let person = { firstName: "Jane", lastName: "User" };

  let [firstName, lastName] = name.split(' ');

  //Replace user name
  person = {
    firstName,
    lastName,
  }
  return person;
}

// @ts-ignore 
// @magic
export async function magicAsyncFunction(name: string): Promise<Person> {
  //Return the first name of the 5th president and the last name of the 40th president
  let person = { firstName: "Jane", lastName: "User" };

  let [firstName, lastName] = name.split(' ');

  //Replace user name
  person = {
    firstName,
    lastName,
  }
  return person;
}
