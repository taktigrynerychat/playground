/**
 * Мост — это структурный паттерн проектирования, который разделяет один или несколько классов на две отдельные
 * иерархии — абстракцию и реализацию, позволяя изменять их независимо друг от друга.
 *
 * [+] Позволяет строить платформо-независимые программы.
 * [+] Скрывает лишние или опасные детали реализации от клиентского кода.
 * [+] Реализует принцип открытости/закрытости.
 *
 * [-] Усложняет код программы из-за введения дополнительных классов.
 */

// Реализация
abstract class Device {
  private _enabled = false;
  private _volume = 0;
  public get enabled(): boolean {
    return this._enabled;
  }
  public set enabled(value: boolean) {
   this._enabled = value;
  }
  public get volume(): number {
    return this._volume;
  }
  public set volume(value: number) {
    this._volume = value;
  }
}

/**
 * Абстракция, будет делегировать работу одному из объектов реализаций.
 * Причём, реализации можно будет взаимозаменять, но только при условии, что все они будут следовать общему интерфейсу.
 */
abstract class Remote<T extends Device> {
  public constructor(
    protected readonly device: T,
    private readonly volumeStep: number = 10,
  ) {}
  public toggle(): void {
    this.device.enabled = !this.device.enabled
    console.log(`${this.device.constructor.name} is now ${this.device.enabled ? "enabled" : "disabled"}`);
  }

  public volumeUp(): void {
    this.device.volume += this.volumeStep;
  }

  public volumeDown(): void {
    this.device.volume -= this.volumeStep;
  }
}

class TV extends Device {}

class Radio extends Device {}

class DefaultRemote<T extends Device> extends Remote<T> {}

class AdvancedRemote<T extends Device> extends Remote<T> {
  private _unmutedVolume: number;
  private _muted: boolean = false;
  public mute(): void {
    this._muted = !this._muted;
    this._muted && (this._unmutedVolume = this.device.volume);
    this.device.volume = this._muted ? 0 : this._unmutedVolume;

    console.log(`${this.device.constructor.name} volume set to ${this.device.volume}`);
  }
}

abstract class SmartHomeSystem {
  public static toggleDevices(...remotes: Remote<Device>[]): void {
    remotes.forEach((remote) => remote.toggle());
  }
}

export default () => {
  const tv = new TV();
  const defaultRemote = new DefaultRemote(tv, 10);

  const radio = new Radio();
  const advancedRemote = new AdvancedRemote(radio, 15);

  advancedRemote.volumeUp();
  advancedRemote.volumeUp();
  advancedRemote.volumeUp();
  advancedRemote.mute();
  advancedRemote.mute();
  advancedRemote.volumeDown();
  advancedRemote.mute();
  advancedRemote.mute();

  SmartHomeSystem.toggleDevices(defaultRemote, advancedRemote);
  SmartHomeSystem.toggleDevices(advancedRemote);
}