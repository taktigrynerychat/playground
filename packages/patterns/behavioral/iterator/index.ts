interface Range {
  from: number;
  to: number;
  [Symbol.iterator](): Iterator<number>;
}

function getRange(from: number, to: number): Range {
  return {
    from,
    to,
    [Symbol.iterator]() {
      let current = this.from;
      let last = this.to;

      return {
        next() {
          if (current <= last) {
            return {
              done: false,
              value: current++
            };
          } else {
            return {
              done: true,
              value: undefined
            };
          }
        }

      }
    }

  }
}
export default () => {
  const range = getRange(1, 10);
  console.log(range)
  console.log(...range)
}