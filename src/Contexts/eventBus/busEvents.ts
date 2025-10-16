import { useCallback } from "react";
import { useListener } from "react-bus";
import { __useInternalBus } from "./EventBusProvider";

type BusEventPayloads = {
  softRefresh: { key: number; };
};

type EventEmitterKeys = keyof BusEventPayloads;


/**
 * Provides a type-safe function to emit events via react-bus.
 *

 * **WARNING**: Must be used inside the **EventBusProvider** tree; otherwise the bus
 * instance will be undefined and  calls will fail.
 * 
 * @example
 * const { emitEvent } = useChan180EventEmitter();
 * emitEvent("softRefresh", { key: Date.now() });
 * 
 * Notes:
 * - The payload `data` must match the type defined in BusEventPayloads for the given key.
 * - Always provide a valid payload; undefined may not be allowed depending on the event.
 */
function useChan180EventEmitter() {
  const bus = __useInternalBus();

  const emitEvent = useCallback(<K extends EventEmitterKeys>(key: K, data: BusEventPayloads[K]) => {
    bus.emit(key, data);
  }, [bus]);

  return { emitEvent };
}


/**
 * Registers a type-safe listener for a specific react-bus event.
 *
 * **WARNING**: Must be used inside the **EventBusProvider** tree; otherwise the bus
 * instance will be undefined and listener will not work.
 * 
 * @param key - The event key to listen to (from BusEventPayloads)
 * @param fn  - Callback that receives the payload corresponding to the event key
 *
 *
 * @example
 * useChan180EventListener("softRefresh", (data) => {
 *   console.log(data?.key);
 * });
 *
 *  Notes:
 * - The callback is type-checked against the payload for the given key.
 * - Wrap the callback in useCallback if used inside a component to prevent unnecessary re-registrations.
 */
function useChan180EventListener<K extends EventEmitterKeys>(key: K, fn: (event: BusEventPayloads[K]) => void) {
  useListener(key, e => fn(e));
}



export { BusEventPayloads, useChan180EventEmitter, useChan180EventListener };