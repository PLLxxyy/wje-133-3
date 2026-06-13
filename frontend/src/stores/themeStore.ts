import { create } from 'zustand';
import { readLocalStorage, writeLocalStorage } from '../hooks/useLocalStorage';
import type { ThemeMode } from '../types/enums';

interface ThemeState {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: readLocalStorage<ThemeMode>('wje-133-theme', 'dark'),
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      writeLocalStorage('wje-133-theme', theme);
      return { theme };
    }),
  setTheme: (theme) => {
    writeLocalStorage('wje-133-theme', theme);
    set({ theme });
  }
}));
