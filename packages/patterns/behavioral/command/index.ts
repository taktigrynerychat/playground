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
  cancel?(): void;
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
    this._receiver.processMetadata(this._metadata);
  }

  public cancel(): void {
    console.log(`[${this.constructor.name}]: Cancelling command using ${Receiver.name} (${this._metadata.type})`);

    const currentState = this._receiver.state;
    const index = currentState.findIndex(m => m === this._metadata);
    this._receiver.state =  index >= 0 ? [
      ...currentState.slice(0, index),
      ...currentState.slice(index + 1)
    ] : currentState;
  }
}

class ShowHistoryCommand implements Command {
  constructor(private readonly _receiver: Receiver) {}
  public invoke(): void {
    console.log(`[${this.constructor.name}]: Passing command to ${Receiver.name}`);
    console.log(this._receiver.state.map(({type}) => type));
  }
}

class Receiver {
  private _state: Metadata[] = [];
  public processMetadata(metadata: Metadata): void {
    const { type, timeStamp } = metadata;
    console.log(`[${this.constructor.name}]: Processing type: ${type}`);
    console.log(`[${this.constructor.name}]: Processing time: ${timeStamp.getDay() + 1}/${timeStamp.getMonth() + 1}/${timeStamp.getFullYear()}`);
    this._state.push(metadata);
  }

  public set state(state: Metadata[]) {
    console.log(`[${this.constructor.name}]: Setting state`);
    this._state = state;
  }

  public get state(): Metadata[] {
    console.log(`[${this.constructor.name}]: Getting state`);
    return this._state;
  }
}

class Invoker {
  public invokeCommands(...commands: Command[]): void {
    commands.forEach(command => {
      console.log(`[Invoker]: Invoking ${command.constructor.name}`);
      command.invoke();
    });
  }

  public cancelCommands(...commands: Command[]): void {
    commands.forEach(command => {
      if (command.cancel) {
        console.log(`[Invoker]: Cancelling ${command.constructor.name}`);
        command.cancel();
      } else {
        console.warn(`[Invoker]: Unable to cancel ${command.constructor.name}`);
      }
    });
  }
}

export default () => {
  const invoker = new Invoker();
  const receiver = new Receiver();

  const simpleCommand = new SimpleCommand('simple');
  const complexCommand1 = new ComplexCommand(receiver, { type: 'first', timeStamp: new Date() });
  const complexCommand2 = new ComplexCommand(receiver, { type: 'second', timeStamp: new Date() });
  const complexCommand3 = new ComplexCommand(receiver, { type: 'third', timeStamp: new Date() });
  const showHistoryCommand = new ShowHistoryCommand(receiver);

  invoker.invokeCommands(simpleCommand, complexCommand1, complexCommand2, complexCommand3);
  console.log('==============STATE================');
  invoker.invokeCommands(showHistoryCommand);
  console.log('==============CANCEL===============');
  invoker.cancelCommands(complexCommand2);
  console.log('==============STATE================');
  invoker.invokeCommands(showHistoryCommand);
}