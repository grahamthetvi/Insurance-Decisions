"use client"

import { useSyncExternalStore } from "react"

const listeners = new Map<string, Set<() => void>>()

function emit(key: string) {
  listeners.get(key)?.forEach((fn) => fn())
}

function subscribeKey(key: string, onChange: () => void) {
  let set = listeners.get(key)
  if (!set) {
    set = new Set()
    listeners.set(key, set)
  }
  set.add(onChange)
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) onChange()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    set.delete(onChange)
    window.removeEventListener("storage", onStorage)
  }
}

export function writeStorage(key: string, value: string) {
  window.localStorage.setItem(key, value)
  emit(key)
}

export function useStorageString(key: string, serverFallback = "") {
  return useSyncExternalStore(
    (onChange) => subscribeKey(key, onChange),
    () => {
      try {
        return window.localStorage.getItem(key) ?? ""
      } catch {
        return "__blocked__"
      }
    },
    () => serverFallback,
  )
}
