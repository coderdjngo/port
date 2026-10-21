import { useSyncExternalStore } from "react";
import { prefersReducedMotion, subscribeReducedMotion } from "../utils/motion";

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
}
