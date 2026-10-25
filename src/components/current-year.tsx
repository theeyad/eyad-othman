"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function CurrentYear() {
  const year = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(), // Client: always live (2026, 2027, etc.)
    () => 2026, // Server prerender: safe static fallback
  );

  return <span>{year}</span>;
}
