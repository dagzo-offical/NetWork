"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A countdown timer. Counts down from `seconds` and invokes `onExpire` once.
 */
export function useTimer(seconds: number, onExpire?: () => void, autoStart = true) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(autoStart);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpireRef.current?.();
      }
      return;
    }
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running, remaining]);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(
    (to = seconds) => {
      expiredRef.current = false;
      setRemaining(to);
    },
    [seconds]
  );

  return { remaining, running, start, pause, reset, expired: remaining <= 0 };
}
