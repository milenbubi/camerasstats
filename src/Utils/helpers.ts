/**
 ** Create pause before next code execution.
 ** You need to use the 'await' keyword when call this function.
 * @param delay  time in milliseconds.
 */
export function sleep(delay: number) {
  return new Promise(resolve => {
    return setTimeout(resolve, delay);
  });
}