import { useEffect } from "react";

export function useOnClickOutside(ref: React.RefObject<Element> , handler: Function) {

  useEffect(
    () => {
      const listener = (event: Event) => {
        const { target } = event;

        // Do nothing if clicking ref's element or descendent element
        if (!ref.current || ref.current.contains(target as Element)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}


// credit: https://usehooks.com/useOnClickOutside/