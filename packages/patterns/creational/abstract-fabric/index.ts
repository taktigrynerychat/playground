/**
 * Абстрактная фабрика — это порождающий паттерн проектирования, который позволяет создавать
 * семейства связанных объектов, не привязываясь к конкретным классам создаваемых объектов.
 *
 * [+] Гарантирует сочетаемость создаваемых продуктов.
 * [+] Избавляет клиентский код от привязки к конкретным классам продуктов.
 * [+] Выделяет код производства продуктов в одно место, упрощая поддержку кода.
 * [+] Упрощает добавление новых продуктов в программу.
 * [+] Реализует принцип открытости/закрытости.
 *
 * [-] Усложняет код программы из-за введения множества дополнительных классов.
 * [-] Требует наличия всех типов продуктов в каждой вариации.
 */

abstract class OSButton {
  abstract render(): void;
}

abstract class OSAlert {
  abstract display(): void;
}

abstract class OSFactory {
  abstract createButton(): OSButton;
  abstract createAlert(): OSAlert;
}

// region Windows
class WindowsButton extends OSButton {
  render(): void {
    console.log("Windows button");
  }
}

class WindowsAlert extends OSAlert {
  display(): void {
    console.log("Windows alert");
  }
}

class WindowsFactory extends OSFactory {
  createButton(): WindowsButton {
    return new WindowsButton();
  }

  createAlert(): WindowsAlert {
    return new WindowsAlert();
  }
}

// endregion

// region MacOS
class MacOSButton extends OSButton {
  render(): void {
    console.log("MacOS button");
  }
}

class MacOSAlert extends OSAlert {
  display(): void {
    console.log("MacOS alert");
  }
}

class MacOSFactory extends OSFactory {
  createButton(): MacOSButton {
    return new MacOSButton();
  }

  createAlert(): MacOSAlert {
    return new MacOSAlert();
  }
}
// endregion

function createFactory<T extends OSFactory>(factoryConstructor: new() => T): T {
  const factory = new factoryConstructor();
  if(!(factory instanceof OSFactory)) throw `${factoryConstructor.name} could not be created!`
  return factory
}

export default (): void => {
  const windowsFactory = createFactory(WindowsFactory)
  const macOSFactory = createFactory(MacOSFactory)

  const windowsButton = windowsFactory.createButton();
  const macOsAlert = macOSFactory.createAlert();

  windowsButton.render();
  macOsAlert.display();
  console.log(windowsFactory, macOSFactory)
}