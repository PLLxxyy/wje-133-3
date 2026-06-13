import { useEffect, useState } from 'react';

export function readLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch (error) {
    console.warn(`localStorage 读取失败：${key}`, error);
    return fallback;
  }
}

export function writeLocalStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`localStorage 写入失败：${key}`, error);
  }
}

export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readLocalStorage(key, fallback));

  useEffect(() => {
    writeLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
