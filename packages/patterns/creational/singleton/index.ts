class Counter {
  private static instance: Counter
  private _count = 0;

  private constructor() {}

  public static getInstance(): Counter {
    !this.instance && (this.instance = new Counter())
    return this.instance
  }

  public get count(): number {
    return this._count;
  }

  public increase(): void {
    this._count ++
  }
}

export default () => {
  const counter = Counter.getInstance();
  const counter2 = Counter.getInstance();

  counter.increase();
  counter.increase();

  console.log(counter.count, counter2.count)
  console.log(counter === counter2)
}