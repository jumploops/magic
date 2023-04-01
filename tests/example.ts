interface Person {
  firstName: string;
  lastName: string;
}

// Define the decorator
// TODO Investigate using a MagicFunction type rather than wrapping the function with 
// a special function like `magic()`
// TODO expand property types like: 
// function magic<T extends Function>(target: T): T {
function magic(target: Function): Function & { magic: true } {
  const newHandler: Function & { magic: true } = function(...args: any[]) {
    console.log(`Magic: Function "${target.name}" was called with arguments: `, args);
    return target.apply(this, args);
  };
  newHandler['magic'] = true;

  // TODO: Copy properties from the target function to the new handler
  /*
  for (const property in target) {
    if (target.hasOwnProperty(property)) {
      newHandler[property] = target[property];
    }
  }
  */

  Object.setPrototypeOf(newHandler, Object.getPrototypeOf(target));
  return newHandler;
}

async function nonMagicAsyncFunction(name: string): Promise<Person> {
  let user = { firstName: "Jane", lastName: "User" };

  let [firstName, lastName] = name.split(' ');

  //Replace user name
  user = {
    firstName,
    lastName,
  }
  return user;
}

// @ts-ignore 
// @magic
async function asyncFunction(): Promise<Person> {
  //Return the first name of the 5th president and the last name of the 40th president
}

interface Building {
  name: string;
  height: string;
}

// @magic
async function asyncFunction2(): Promise<Building> {
  //How tall is the Eiffel tower?
  return { name: "Eiffel Tower", height: "?" }
}

interface Structure {
  name: string;
  heightInMeters: string;
  heightInFeet: string;
}

// @ts-ignore 
// @magic
async function asyncFunction3(): Promise<Structure> {
  //How tall is a school bus?
}

function plainFunction(name: string): Person {

  let user = { firstName: "Jane", lastName: "User" };

  let [firstName, lastName] = name.split(' ');

  //Replace user name
  user = {
    firstName,
    lastName,
  }
  console.log(user);
  return user;
}

asyncFunction().then((value) => console.log(value)).catch((err) => console.error(err));
asyncFunction2().then((value) => console.log(value)).catch((err) => console.error(err));
asyncFunction3().then((value) => console.log(value)).catch((err) => console.error(err));
