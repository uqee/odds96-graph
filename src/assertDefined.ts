export function assertDefined<T>(t: T | undefined): asserts t is T {
  if (t === undefined) throw new Error('t === undefined');
}
