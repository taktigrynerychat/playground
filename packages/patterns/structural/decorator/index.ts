/**
 * Декоратор — это структурный паттерн проектирования, который позволяет динамически
 * добавлять объектам новую функциональность, оборачивая их в полезные «обёртки».
 *
 * [+] Большая гибкость, чем у наследования.
 * [+] Позволяет добавлять обязанности на лету.
 * [+] Можно добавлять несколько новых обязанностей сразу.
 * [+] Позволяет иметь несколько мелких объектов вместо одного объекта на все случаи жизни.
 *
 * [-] Трудно конфигурировать многократно обёрнутые объекты.
 * [-] Обилие крошечных классов.
 */

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