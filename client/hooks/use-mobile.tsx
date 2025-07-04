import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsTablet(window.innerWidth < TABLET_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isTablet;
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<
    "mobile" | "tablet" | "desktop"
  >("desktop");

  React.useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setBreakpoint("mobile");
      } else if (window.innerWidth < TABLET_BREAKPOINT) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    const mql1 = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const mql2 = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);

    mql1.addEventListener("change", updateBreakpoint);
    mql2.addEventListener("change", updateBreakpoint);
    updateBreakpoint();

    return () => {
      mql1.removeEventListener("change", updateBreakpoint);
      mql2.removeEventListener("change", updateBreakpoint);
    };
  }, []);

  return breakpoint;
}
