import { useEffect, useRef } from "react";



/**
 * React hook. Acts as classic `componentDidUpdate` function.
 *@param effect — Imperative function that can return a cleanup function
 *@param deps — If present, effect will only activate if the values in the list
 */
export function useDidUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList | undefined) {
  const didMountRef = useRef(false);


  useEffect(() => {
    if (didMountRef.current) {
      effect();
    }
    else {
      didMountRef.current = true;
    }
  }, deps);
}