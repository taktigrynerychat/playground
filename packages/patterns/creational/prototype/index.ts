class Prototype {
  public primitive = 'primitive'
  public component: object;
  constructor(component: object) {
    this.component = component;
  }

  public clone(): Prototype {
    const clone = Object.create(this);
    clone.primitive = this.primitive
    clone.component = Object.create(this.component);

    return clone;
  }
}
export default () => {
  const prototype = new Prototype({info: 'proto'})
  const clone = prototype.clone();

  console.log({ prototype, clone })
  console.log(prototype.component.isPrototypeOf(clone.component))
  console.log(prototype.component === clone.component)
}