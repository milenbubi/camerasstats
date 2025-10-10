import { DependencyList, EffectCallback, useEffect, useRef, useState } from "react";



/**
 * React hook that behaves like `componentDidUpdate` in class components.
 *
 * Runs an effect **after the component has mounted**, skipping the first render.
 * 
 * Unlike a normal useEffect with an empty dependency array, it does not run on mount
 * 
 * @param effect — Imperative function that can return a cleanup function
 * @param deps — If present, effect will only activate if the values in the list
 */
function useDidUpdateEffect(effect: EffectCallback, deps: DependencyList) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return effect();
    }
    else {
      didMountRef.current = true;
    }
  }, deps);
}



/**
 * React hook. Merge state with existing state. Acts as setState in class component.
 *
 * Preferable to use when you have complex state logic that involves multiple sub-values
 *
 *@param initialState — Initial state value
 *
 *@returns a stateful value, and a function to update it.
 */
function useMergedState<T extends { [key: string]: any }>(initialState: T | (() => T),): [T, SetMergedStateCallback<T>] {
  const [state, setState] = useState(initialState);
  const callbackAfterStateUpdate = useRef<((state: T) => void | Promise<void>) | null>(null);

  useEffect(() => {
    if (callbackAfterStateUpdate.current) {
      callbackAfterStateUpdate.current(state);
      callbackAfterStateUpdate.current = null;
    }
  });

  const setMergedState: SetMergedStateCallback<T> = (newState, callback) => {
    if (newState === undefined) {
      callback?.(state);
      return;
    }

    if (callback) {
      callbackAfterStateUpdate.current = callback;
    }

    setState((prevState) => {
      const stateUpdate = typeof newState === "function" ? newState({ ...prevState }) : newState;
      return { ...prevState, ...stateUpdate };
    });
  };

  return [state, setMergedState];
}


type SetMergedStateCallback<T> = (
  newState?: Partial<T> | ((prevState: T) => Partial<T>),
  callback?: (state: T) => void | Promise<void>
) => void;



export { useDidUpdateEffect, useMergedState };