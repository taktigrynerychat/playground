/**
 * Итератор - это поведенческий паттерн проектирования, который даёт возможность последовательно
 * обходить элементы составных объектов, не раскрывая их внутреннего представления.
 *
 * [+] Упрощает классы хранения данных.
 * [+] Позволяет реализовать различные способы обхода структуры данных.
 * [+] Позволяет одновременно перемещаться по структуре данных в разные стороны.
 *
 * [-] Не оправдан, если можно обойтись циклом
 */

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
  let { from: current, to: breakpoint} = this;

  return {
    next() {
      if (current <= breakpoint) {
        return {
          done: false,
          value: current++
        };
      } else {
        breakpoint = null;
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
  let { to: current, from: breakpoint} = this;

  return {
    next() {
      if (current >= breakpoint) {
        return {
          done: false,
          value: current--
        };
      } else {
        breakpoint = null;
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
  let { to: current, from: breakpoint} = range;

  return {
    valid() {
      const isValid= current >= breakpoint;
      if (!isValid) {
        current = null;
        breakpoint = null;
      }
      return isValid;
    },
    next() {
      if (current >= breakpoint) {
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