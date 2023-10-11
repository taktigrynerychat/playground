/**
 * Стратегия — это поведенческий паттерн проектирования, который определяет семейство
 * схожих алгоритмов и помещает каждый из них в собственный класс, после чего алгоритмы
 * можно взаимозаменять прямо во время исполнения программы.
 *
 * [+] Горячая замена алгоритмов на лету.
 * [+] Изолирует код и данные алгоритмов от остальных классов.
 * [+] Уход от наследования к делегированию.
 * [+] Реализует принцип открытости/закрытости.
 *
 * [-] Усложняет программу за счёт дополнительных классов.
 * [-] Клиент должен знать, в чём состоит разница между стратегиями, чтобы выбрать подходящую.
 */

class Context<Data, Str extends Strategy = Strategy> {
  constructor(private readonly _data: Data, private _strategy?: Str) {}

  public setStrategy(strategy: Str): this {
    this._strategy = strategy;

    return this;
  }

  public doOperation(): ReturnType<Str['operation']> {
    return this._strategy ? this._strategy.operation(this._data) : this._data;
  }
}

interface Strategy<Data = any, ProcessedData = any> {
  operation(data: Data): ProcessedData;
}

class ReverseStrategy<T = unknown> implements Strategy<T[], T[]> {
  public operation(data: T[]): T[] {
    return [...data].reverse();
  }
}

class ToStringUpperStringStrategy<T = unknown> implements Strategy<T[], string[]> {
  public operation(data: T[]): string[] {
    return data.map(value => value.toString().toUpperCase());
  }
}

export default () => {
  const contexts = [
    new Context(['a', 'b', 'c', 'd']),
    new Context([1, 2, 3, 4, 5, 6, 7]),
    new Context([true, true, false])
  ] as const;

  const reverseStrategy = new ReverseStrategy();
  const toStringUpperStringStrategy = new ToStringUpperStringStrategy();

  contexts.forEach(ctx => console.log(ctx.setStrategy(reverseStrategy).doOperation()));
  contexts.forEach(ctx => console.log(ctx.setStrategy(toStringUpperStringStrategy).doOperation()));
}