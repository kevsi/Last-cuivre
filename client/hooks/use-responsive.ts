import { useState, useEffect } from "react";

export type BreakpointSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

const breakpoints: BreakpointConfig = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  });

  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<BreakpointSize>("lg");

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const width = windowSize.width;

    if (width >= breakpoints["2xl"]) {
      setCurrentBreakpoint("2xl");
    } else if (width >= breakpoints.xl) {
      setCurrentBreakpoint("xl");
    } else if (width >= breakpoints.lg) {
      setCurrentBreakpoint("lg");
    } else if (width >= breakpoints.md) {
      setCurrentBreakpoint("md");
    } else if (width >= breakpoints.sm) {
      setCurrentBreakpoint("sm");
    } else {
      setCurrentBreakpoint("xs");
    }
  }, [windowSize.width]);

  // Helper functions
  const isMobile = currentBreakpoint === "xs" || currentBreakpoint === "sm";
  const isTablet = currentBreakpoint === "md";
  const isDesktop =
    currentBreakpoint === "lg" ||
    currentBreakpoint === "xl" ||
    currentBreakpoint === "2xl";
  const isSmallScreen = currentBreakpoint === "xs";
  const isLargeScreen =
    currentBreakpoint === "xl" || currentBreakpoint === "2xl";

  // Responsive grid columns helper
  const getGridCols = (config: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  }) => {
    return (
      config[currentBreakpoint] || config.md || config.sm || config.xs || 1
    );
  };

  // Responsive spacing helper
  const getSpacing = (config: {
    mobile: string;
    tablet?: string;
    desktop: string;
  }) => {
    if (isMobile) return config.mobile;
    if (isTablet && config.tablet) return config.tablet;
    return config.desktop;
  };

  // Responsive text size helper
  const getTextSize = (config: {
    mobile: string;
    tablet?: string;
    desktop: string;
  }) => {
    if (isMobile) return config.mobile;
    if (isTablet && config.tablet) return config.tablet;
    return config.desktop;
  };

  return {
    windowSize,
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    isLargeScreen,
    getGridCols,
    getSpacing,
    getTextSize,
  };
}

// Hook for responsive values
export function useResponsiveValue<T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
}): T | undefined {
  const { currentBreakpoint } = useResponsive();

  // Return the value for current breakpoint or the closest smaller one
  const breakpointOrder: BreakpointSize[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
  ];
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint);

  for (let i = currentIndex; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }

  // Fallback to the first available value
  return (
    values.xs ||
    values.sm ||
    values.md ||
    values.lg ||
    values.xl ||
    values["2xl"]
  );
}

// Hook for touch device detection
export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          // @ts-ignore
          navigator.msMaxTouchPoints > 0,
      );
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);

    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  return isTouchDevice;
}
