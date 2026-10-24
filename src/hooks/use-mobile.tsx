import * as React from "react";

const MOBILE_BREAKPOINT = 1024;

const subscribeMobile = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribeMobile,
    () => (typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false),
    () => false,
  );
}
