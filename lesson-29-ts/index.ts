let str = 'some string';

let stingValue: string;

let someObject: any;

someObject = 1;


str = 's'
stingValue = 'sdg'

console.log(str); // Output: 'some string


// -----------
// Parameter type annotation
function greet(name: string): string  {
  console.log("Hello, " + name.toUpperCase() + "!!");
  return 's';
}

async function getFavoriteNumber(): Promise<number> {
  return 26;
}

// -----------
interface Obj {
    name: string;
    age: number;
    isMale?: boolean;
    // [key: string]: string | number | boolean; // Index signature to allow additional properties
}

const obj: Obj = {
    name: 'John',
    age: 30,
    isMale: true,
    // isMale: true,
    // qwe: 'qwe',
    // sdsdg: []
}


const func1 = (someOjb: {name: string, age?: number}): string => {
    return `Name: ${someOjb.name}, Age: ${someOjb.age}`
}

func1({name: 'John'});

// -----------
// const func2 = (someOjb: object): string => {
//     return `Name: ${someOjb.name}, Age: ${someOjb.age}`
// }

// func2({name: 'John'});

// -----------

type primitives = string | number | boolean;

const func3 = (primitiveInput: primitives ): string => {
    return `Primitive: ${primitiveInput}`
}

console.log(func3('qwe'));

// -----------

type specificValue = 'Jane' | 'John' | 'Doe';

const func4 = (name: specificValue): string => {
    return `Name: ${name}`;
}

console.log(func4('Doe'));


// -----------


function printId(id: number | string) {
//   console.log((id as string).toUpperCase()); // Type assertion to treat id as a string
    console.log((typeof id === 'string' ? id : String(id)).toUpperCase()); // Type assertion to treat id as a string
     console.log( String(id).toUpperCase());
}

printId(123)

/// --------------
function welcomePeople(x: specificValue[]) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

welcomePeople(['Jane', 'John', 'Doe', 'Doe'])


// -----------

interface IExtendedObject extends Obj {
    isActive: boolean;
}

type TPoint = {
  x: number;
  y?: number;
};

type TPointExtended = TPoint & {
  z: number;
  extendedObject?: IExtendedObject[];
};
 
// Exactly the same as the earlier example
function printCoord(pt: TPoint): TPointExtended {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
  const ptUpdated = {...pt, z: 100 }; // Adding a z property
  return ptUpdated;
}

printCoord({ x: 100 });


interface WindowLocal {
  title: string;
}

// const b: WindowLocal = {
//   title: 'My Window',
// };

interface WindowLocal {
  ts: string;
}

const a: WindowLocal = {
  title: 'My Window',
  ts: 'TypeScript'
};

// ---------


declare function handleRequest(url: string, method: "GET" | "POST"): void;

// const req: {url: string, method: "GET" | "POST"} = { url: "https://example.com", method: "GET" };
const req = { url: "https://example.com", method: "GET" };

// handleRequest(req.url, req.method as "GET" | "POST"); // Type assertion to ensure method is one of the allowed types


////-----------
enum UserResponse {
  No = 0,
  Yes = 1,
}
 
function respond(recipient: string, message: UserResponse): void {
  // ...
}
 
respond("Princess Caroline", UserResponse.No);

//-------
enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length,
}

console.log(FileAccess.Write); // Output: 6


// ---
const fn5 = (x: Number): void => {
  console.log(x instanceof Number)
}

fn5(new Number(5))

//p--------

type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

console.log(isFish({ swim: () => {} }))

class ABC {
  methodA() {}
}

class QWE {
  methodB() {}
}

let abcInstance: ABC;

// abcInstance = new QWE();

///------ CLases



// export class ApiClient {
//   private apiRequest; // : ApiContextRequest
//   public url: string
//   constructor(apiRequest, url: string) {
//     this.apiRequest = apiRequest;
//     this.url = url;
//   };

//   protected async get(url: string, options = {}) {
//     return this.apiRequest.get(url, options);
//   }

//   async post(url, options = {}) {
//     return this.apiRequest.post(url, options);
//   }

//   async put(url, options = {}) {
//     return this.apiRequest.put(url, options);
//   }

//   async delete(url, options = {}) {
//     return this.apiRequest.delete(url, options);
//   }

//   async patch(url, options = {}) {
//     return this.apiRequest.patch(url, options);
//   }
// }

// -----


interface Pingable {
  ping(): void;
}
 
class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
  private otherFn: () => void = () => {
    console.log("otherFn called");
  }
}

//------

class Base {
  greet(name: number) {
    console.log("Hello, world!");
  }
}
 
// class Derived extends Base {
//   greet(name?: string | number) {
//     if (typeof name === "number") {
//       super.greet(name);
//     } else {
//       console.log(`Hello, ${name.toUpperCase()}`);
//     }
//   }
// }
 
// const d = new Derived();
// d.greet();
// d.greet("reader");


///----

function identity<Type>(arg: Type): Type {
  // const result = arg + 1; // Type assertion to treat arg as TypeB
  return arg;
}

console.log(identity('qwe'))
console.log(identity(1))
console.log(identity({}))
  

// -----

const objQwe: Record<string, number[]> = {
  'key1': [1, 2, 3],
  'key2': [4, 5, 6]
}