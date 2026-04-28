"use client";

import { useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";

type EventMap = Record<string, (...args: unknown[]) => void>;

export function useSocket<T extends EventMap>(
  events: T,
  active = true
): void {
  const socketRef = useRef<Socket | null>(null);
  // Keep a stable ref to the event handlers so the effect doesn't re-run on re-renders
  const eventsRef = useRef(events);
  eventsRef.current = events;

  useEffect(() => {
    if (!active) return;

    const socket = getSocket();
    socketRef.current = socket;

    if (!socket.connected) {
      socket.connect();
    }

    const handlers = eventsRef.current;
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.keys(handlers).forEach((event) => {
        socket.off(event, handlers[event]);
      });
    };
  }, [active]);
}
