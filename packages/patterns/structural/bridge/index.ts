abstract class Device {
  private _enabled = false;
  public get enabled(): boolean {
    return this._enabled;
  }
  public set enabled(value: boolean) {
   this._enabled = value;
  }
}
abstract class Remote<T extends Device> {
  public constructor(protected readonly device: T) {}
  public abstract toggle(): void
}

class TV extends Device {
  public readonly brand = 'LG' as const;

  public set enabled(value: boolean) {
    console.info(`${this.brand} TV is now ${value ? 'enabled' : 'disabled'}!`);
    super.enabled = value;
  }

  public get enabled(): boolean {
    return super.enabled;
  }
}
class TVRemote extends Remote<TV> {
  public toggle(): void {
    this.device.enabled = !this.device.enabled
  }
}

export default () => {
  const tv = new TV();
  console.log(tv);
  const tvRemote = new TVRemote(tv);
  console.log(tvRemote);
  tvRemote.toggle();
  tvRemote.toggle();
  tvRemote.toggle();
}