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

class Context<Data, Str extends Strategy = undefined> {
  private _strategy: Str;
  constructor(private readonly _data: Data) {}

  public setStrategy<S extends (Strategy<unknown> | null), R = S extends null ? Context<Data, Strategy<Data, Data>> : Context<Data, S>>(strategy: S): R {
    this._strategy = strategy as unknown as Str;

    return this as unknown as R;
  }

  public doOperation(): Str extends undefined ? Data : ReturnType<Str['operation']> {
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
    new Context<string[]>(['a', 'b', 'c', 'd']),
    new Context<number[]>([1, 2, 3, 4, 5, 6, 7]),
    new Context<boolean[]>([true, true, false])
  ] as const;

  const reverseStrategy = new ReverseStrategy();
  const toStringUpperStringStrategy = new ToStringUpperStringStrategy();

  console.log(new Context([1, 1, 2, 2, 3, 3]).doOperation()); // without strategy

  contexts.forEach(ctx => console.log(ctx.setStrategy(reverseStrategy).doOperation()));
  contexts.forEach(ctx => console.log(ctx.setStrategy(toStringUpperStringStrategy).doOperation()));
}