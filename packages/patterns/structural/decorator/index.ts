class Component {
  public method(): string {
    return 'I am a component';
  }
}

class Decorator implements Component {
  constructor(protected component: Component) {}
  public method(): string {
    return `Decorated: ${this.component.method()}`;
  }
}

export default () => {
  const component = new Component();
  const decorator = new Decorator(component);
  const decorator2 = new Decorator(decorator);

  console.log(component.method());
  console.log(decorator.method());
  console.log(decorator2.method());
}