"use client";

import { useEffect, useSyncExternalStore } from "react";
import createFluidCursor from "@/hooks/use-fluid-cursor";

function subscribeToMediaQuery(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeToMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function FluidCursor() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reducedMotion) return;
    const cleanup = createFluidCursor();
    return cleanup;
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 top-0 left-0 z-0">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
}
