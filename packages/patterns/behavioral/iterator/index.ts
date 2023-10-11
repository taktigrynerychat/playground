interface RangeIterator {
  (this: Range): Iterator<number>;
}
class Range {
  constructor(
    public readonly from: number,
    public readonly to: number,
    private _iteratorFunction: RangeIterator = iteratorFn,
  ) {}

  public [Symbol.iterator](): Iterator<number> {
    return this._iteratorFunction();
  }

  public setIterator(iteratorFunction: RangeIterator): this {
    this._iteratorFunction = iteratorFunction;

    return this;
  }
}

function iteratorFn(this: Range): Iterator<number> {
  let self = this;
  let current = self.from;
  return {
    next() {
      if (current <= self.to) {
        return {
          done: false,
          value: current++
        };
      } else {
        self = null;
        current = null;
        return {
          done: true,
          value: undefined
        };
      }
    }
  }
}

function reverseIteratorFn(this: Range): Iterator<number> {
  let self = this;
  let current = self.to;
  return {
    next() {
      if (current >= self.from) {
        return {
          done: false,
          value: current--
        };
      } else {
        self = null;
        current = null;
        return {
          done: true,
          value: undefined
        };
      }
    }
  }
}

function customIterator(range: Range) {
  let current = range.to;
  return {
    valid() {
      const isValid= current >= range.from;
      if (!isValid) current = null;
      return isValid;
    },
    next() {
      if (current >= range.from) {
        return current--
      } else {
        return undefined
      }
    }
  }
}

export default () => {
  const range = new Range(1, 10);
  console.log(range);
  console.log(...range)
  range.setIterator(reverseIteratorFn)
  console.log(...range)

  const iterator = customIterator(range)
  while (iterator.valid()) {
    console.log(iterator.next())
  }
}