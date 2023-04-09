import { getTop5BasketBallPlayers } from './tests/basketball';

type Car = {
  make: string,
  model: string
}

export type CarArray = Car[];

// @ts-ignore
// @magic
export async function getCars(): Promise<CarArray> {
  // Get the top 5 cars from the 1970s 
}

interface Person {
  firstName: string;
  lastName: string;
}

// @ts-ignore 
// @magic
export async function asyncFunction(): Promise<Person> {
  //Return the first name of the 5th president and the last name of the 40th president
}

interface Building {
  name: string;
  height: string;
}

// @magic
export async function asyncFunction2(): Promise<Building> {
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
export async function asyncFunction3(): Promise<Structure> {
  //How tall is a school bus?
}

interface Height {
  meters: number;
  feet: number;
}

interface Mountain {
  name: string;
  height: Height;
}

// @ts-ignore 
// @magic
export async function asyncFunction4(): Promise<Mountain> {
  //Return the 3rd highest mountain
}

interface Peak {
  name: string;
  height: string;
}

// @ts-ignore 
// @magic
export async function asyncFunction5(): Promise<Peak> {
  //Return the 3rd highest peak 
}

//getTop5BasketBallPlayers().then((res) => console.log(res)).catch((err) => console.error(err));
//getCars().then((result) => console.log(result));

//asyncFunction().then((value) => console.log(value)).catch((err) => console.error(err));
//asyncFunction2().then((value) => console.log(value)).catch((err) => console.error(err));
//asyncFunction3().then((value) => console.log(value)).catch((err) => console.error(err));
//asyncFunction4().then((value) => console.log(value)).catch((err) => console.error(err));
asyncFunction5().then((value) => console.log(value)).catch((err) => console.error(err));
