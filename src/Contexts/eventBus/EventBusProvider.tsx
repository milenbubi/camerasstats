/**
 * @file EventBusProvider.tsx
 *
 * Centralized Event Bus Context for Chan180.
 * -----------------------------------------------------
 * Wraps the application in a single global event bus using `react-bus`
 * and exposes a typed emitter through React Context.
 *
 * This allows isolated modules and components to communicate via
 * lightweight pub/sub events without prop drilling or Redux overhead.
 *
 * The provider also includes `__NavPathRefreshProvider`, which listens
 * for navigation refresh triggers (same-path soft refreshes) and
 * propagates them to subscribed listeners such as `<OutletWithRefresh />`.
 *
 * Components can safely use hooks like `useChan180EventEmitter()` and
 * `useChan180EventListener()` to emit or listen for events defined in
 * `BusEventPayloads`, with full TypeScript safety.
 */
import { Emitter } from "mitt";
import { Provider as BusProvider, useBus } from "react-bus";
import { createContext, PropsWithChildren, useContext } from "react";
import __NavPathRefreshProvider from "./__NavPathRefreshProvider";

/**
 * Internal React Context that exposes the shared event bus instance.
 * The `Emitter` comes from `mitt`, which is the underlying bus engine
 * used by `react-bus`.
 */
const EventBusContext = createContext<Emitter>({} as Emitter);


/**
 * Top-level provider that wraps the app with both:
 * - The `react-bus` <BusProvider>
 * - Our custom BusWrapper, which exposes the emitter via Context
 *   and integrates the NavPath refresh subsystem.
 */
function EventBusProvider({ children }: PropsWithChildren) {
  return (
    <BusProvider>
      <BusWrapper>
        {children}
      </BusWrapper>
    </BusProvider>
  );
}


/**
 * Secondary wrapper that initializes the actual bus instance
 * via the `useBus()` hook (available only inside <BusProvider>).
 *
 * It then provides the bus to the entire React tree through
 * our `EventBusContext`, and nests the `__NavPathRefreshProvider`
 * which handles same-path navigation refresh events.
 */
function BusWrapper({ children }: PropsWithChildren) {
  const bus = useBus();

  return (
    <EventBusContext.Provider value={bus}>
      <__NavPathRefreshProvider>
        {children}
      </__NavPathRefreshProvider>
    </EventBusContext.Provider>
  );
}


/**
 * Internal hook that gives access to the shared event bus emitter.
 * Intended to be used only inside the EventBus subsystem.
 */
function __useInternalBus() {
  return useContext(EventBusContext);
}


export { EventBusProvider, __useInternalBus };