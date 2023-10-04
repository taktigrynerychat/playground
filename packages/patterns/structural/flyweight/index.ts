abstract class Flyweight<Shared = unknown, Unique = unknown> {
  private readonly _sharedState: Shared;
  public get sharedState(): Shared {
    return this._sharedState;
  }
  constructor(sharedState) {
    this._sharedState = sharedState
  }

  public abstract operation(uniqueState: Unique): void;
}

abstract class FlyweightFabric<F extends Flyweight, Fn extends new(s: F['sharedState']) => F = new(s: F['sharedState']) => F> {
  private readonly _flightWeights: {[key: string]: F} = {};
  private readonly _flightWeightConstructorFn: Fn;
  protected constructor(flightWeightConstructorFn: Fn, initialFlightWeights?: F['sharedState'][]) {
    this._flightWeightConstructorFn = flightWeightConstructorFn
    initialFlightWeights?.forEach(f => {
      this._flightWeights[this._getKey(f)] = new this._flightWeightConstructorFn(f)
    })
  }
  private _getKey(state: F['sharedState']): string {
    return Object.values(state).join('_');
  }

  public getFlyweight(sharedState: F['sharedState']): F {
    const key = this._getKey(sharedState);
    if(!(key in this._flightWeights)) {
      this._flightWeights[key] = new this._flightWeightConstructorFn(sharedState)
    }

    return this._flightWeights[key]
  };
}

type CarShared = {[key in 'brand' | 'model' | 'color']: string}
type CarUnique = {[key in 'plates' | 'owner']: string}

class FCar extends Flyweight<CarShared, CarUnique> {
  operation(uniqueState: CarUnique): void {
    console.table({
      shared: Object.values(this.sharedState),
      unique: Object.values(uniqueState)
    })
  }
}

class FCarFabric extends FlyweightFabric<FCar> {
  constructor(i?: CarShared[]) {
    super(FCar, i);
  }
}

export default () => {
  const ff = new FCarFabric([
    {brand: 'BMW', color: 'white', model: 'IONIC'},
    {brand: 'BMW', color: 'red', model: 'X5'},
    {brand: 'Nissan', color: 'grey', model: 'Note'},
    {brand: 'Opel', color: 'black', model: 'Corsa'},
  ])

  const f1 = ff.getFlyweight({brand: 'Opel', color: 'black', model: 'Corsa'})
  const f2 = ff.getFlyweight({brand: 'Opel', color: 'black', model: 'Corsa'})
  const f3 = ff.getFlyweight({brand: 'Opel', color: 'black', model: 'Corsa'})

  f1.operation({owner: 'Vlad', plates: 'NMZ624'})

  console.log(f1 === f2 && f2 === f3)
}