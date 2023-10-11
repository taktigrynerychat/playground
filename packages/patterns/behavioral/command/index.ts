/**
 * Команда — это поведенческий паттерн проектирования, который превращает запросы в объекты,
 * позволяя передавать их как аргументы при вызове методов, ставить запросы в очередь,
 * логировать их, а также поддерживать отмену операций.
 *
 * [+] Убирает прямую зависимость между объектами, вызывающими операции, и объектами, которые их непосредственно выполняют.
 * [+] Позволяет реализовать простую отмену и повтор операций.
 * [+] Позволяет реализовать отложенный запуск операций.
 * [+] Позволяет собирать сложные команды из простых.
 * [+] Реализует принцип открытости/закрытости.
 *
 * [-] Усложняет код программы из-за введения множества дополнительных классов.
 */

interface Command {
  invoke(): void;
}

class SimpleCommand implements Command {
  constructor(private readonly _payload: string) {}
  public invoke(): void {
    console.log(`[${this.constructor.name}]: Executing ${this._payload}`);
  }
}

interface Metadata {
  type: string;
  timeStamp: Date;
}

class ComplexCommand implements Command {
  constructor(private readonly _receiver: Receiver, private readonly _metadata: Metadata) {}
  public invoke(): void {
    console.log(`[${this.constructor.name}]: Passing command to ${Receiver.name}`);
    const { type, timeStamp} = this._metadata;
    this._receiver.processTime(timeStamp);
    this._receiver.processType(type);
  }
}

class Receiver {
  public processType(type: Metadata['type']): void {
    console.log(`[Receiver]: Processing type: ${type}`);
  }

  public processTime(time: Metadata['timeStamp']): void {
    console.log(`[Receiver]: Processing time: ${time.getDay() + 1}/${time.getMonth() + 1}/${time.getFullYear()}`);
  }
}

class Invoker {
  public invokeActions(...actions: Command[]): void {
    actions.forEach(action => {
      console.log(`[Invoker]: Invoking ${action.constructor.name}`);
      action.invoke();
    });
  }
}

export default () => {
  const invoker = new Invoker();
  const receiver = new Receiver();

  const action1 = new SimpleCommand('simple');
  const action2 = new ComplexCommand(receiver, { type: 'first', timeStamp: new Date() });

  invoker.invokeActions(action1, action2);
}