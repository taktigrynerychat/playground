abstract class Car {
  protected _assemblingDate: Date;

  constructor() {
    this._assemblingDate = new Date()
  }

  public abstract cost: number;
  public abstract honk(): void;
  public abstract brand: string;
  public abstract get assemblingDate(): string;
}

class ToyotaCar extends Car {
  public brand = 'Toyota'
  public cost = 3000

  public get assemblingDate(): string {
    return `${this._assemblingDate.getDay() + 1}/${this._assemblingDate.getMonth() + 1}/${this._assemblingDate.getFullYear()}`;
  }

  public honk(): void {
    console.log(`${this.brand} honk honk 😊`)
  }
}

class NissanCar extends Car {
  public brand = 'Nissan'
  public cost = 3400

  public get assemblingDate(): string {
    return `${this._assemblingDate.getDay() + 1}.${this._assemblingDate.getMonth() + 1}.${this._assemblingDate.getFullYear()}`;
  }

  public honk(): void {
    console.log(`${this.brand} honk honk (❁´◡\`❁`)
  }
}

class LadaCar {
  public brand = 'Lada'
  public cost = 50

  public get assemblingDate(): string {
    return `tomorrow`;
  }

  public honk(): void {
    console.log('Very good car beep beep')
  }
}

function carFactory<T extends Car>(brand: new() => T): T {
  const factoryFeePerCar = 100;

  const car = new brand()
  if (!(car instanceof Car)) {
    throw `${brand.name} could not be constructed on this fabric!`
  }
  car.cost += factoryFeePerCar

  return car;
}



export default (): void => {
  const nisanCar = carFactory(NissanCar)
  const toyotaCar = carFactory(ToyotaCar)

  console.log(nisanCar, toyotaCar)
}