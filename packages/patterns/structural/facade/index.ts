class Service1 {
  public someOperation(): string {
    return 'Service1';
  }
}

class Service2 {
  public someOtherOperation(): string[] {
    return ['Hello', 'from', 'Service2'];
  }
}

class Facade {
  private readonly service1 = new Service1();
  private readonly service2 = new Service2();

  public getResult() {
    return `${this.service1.someOperation()}! ${this.service2.someOtherOperation().join(' ')!}`
  }
}

export default () => {
  const f = new Facade()
  console.log(f.getResult());
}