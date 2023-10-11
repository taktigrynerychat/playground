/**
 * Одиночка — это порождающий паттерн проектирования, который гарантирует, что у класса есть
 * только один экземпляр, и предоставляет к нему глобальную точку доступа.
 *
 * [+] Гарантирует наличие единственного экземпляра класса.
 * [+] Предоставляет к нему глобальную точку доступа.
 * [+] Реализует отложенную инициализацию объекта-одиночки.
 *
 * [-] Нарушает принцип единственной ответственности класса.
 * [-] Маскирует плохой дизайн.
 * [-] Проблемы мультипоточности.
 * [-] Требует постоянного создания Mock-объектов при юнит-тестировании.
 */

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
    this._count++;
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