export const throttle = (() => {
  let throttled = false;

  return <T = never>(
    fn: (...args: T[]) => void,
    timeout: number,
    ...args: T[]
  ) => {
    if (!throttled) {
      throttled = true;
      fn(...args);
      setTimeout(() => {
        throttled = false;
      }, timeout);
    }
  };
})();
