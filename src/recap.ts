const myName = 'Luis';
const myAge = 12;
const suma = (a: number, b: number) => {
  return a + b;
};

suma(3, 5);

class Persona {
  private age;
  name;

  constructor(age: number, name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const luis = new Persona(41, 'Luis');
console.log(luis.getSummary());
