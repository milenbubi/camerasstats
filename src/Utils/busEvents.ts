import { Handler } from "mitt";
import { useCallback } from "react";
import { useBus, useListener } from "react-bus";

type BusEventPayloads = {
  navPathRefresh: { key: number; };
};

type EventEmitterKeys = keyof BusEventPayloads;


/**
 * Provides a type-safe function to emit events via react-bus.
 *
 * @example
 * const { emitEvent } = useChan180EventEmitter();
 * emitEvent("navPathRefresh", { key: Date.now() });
 *
 * Notes:
 * - The payload `data` must match the type defined in BusEventPayloads for the given key.
 * - Always provide a valid payload; undefined may not be allowed depending on the event.
 */
function useChan180EventEmitter() {
  const bus = useBus();

  const emitEvent = useCallback(<K extends EventEmitterKeys>(key: K, data?: BusEventPayloads[K]) => {
    bus.emit(key, data);
  }, []);

  return { emitEvent };
}


/**
 * Registers a type-safe listener for a specific react-bus event.
 *
 * @param key - The event key to listen to (from BusEventPayloads)
 * @param fn  - Callback that receives the payload corresponding to the event key
 *
 * @example
 * useChan180EventListener("navPathRefresh", (data) => {
 *   console.log(data?.key);
 * });
 *
 * Notes:
 * - The callback is type-checked against the payload for the given key.
 * - Wrap the callback in useCallback if used inside a component to prevent unnecessary re-registrations.
 */
function useChan180EventListener<K extends EventEmitterKeys>(key: K, fn: Handler<BusEventPayloads[K]>) {
  useListener(key, fn);
}



export { BusEventPayloads, useChan180EventEmitter, useChan180EventListener };