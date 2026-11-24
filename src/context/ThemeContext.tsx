import React, { createContext, useContext, useMemo, useState } from 'react';
import { Platform, useColorScheme as useSystemColorScheme } from 'react-native';
import { AppColors, DarkColors, LightColors } from '@/constants/theme';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  isDark: boolean;
  colors: AppColors;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'medmask_theme_mode';

function getInitialMode(): ThemeMode {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved;
      }
    } catch {
      // Ignore storage errors
    }
  }
  return 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);

  const isDark = mode === 'system' ? systemScheme === 'dark' : mode === 'dark';

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, nextMode);
      } catch {
        // Ignore storage errors
      }
    }
  };

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark');
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark,
      colors: isDark ? DarkColors : LightColors,
      setMode,
      toggleTheme,
    }),
    [mode, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      mode: 'light',
      isDark: false,
      colors: LightColors,
      setMode: () => {},
      toggleTheme: () => {},
    };
  }
  return ctx;
}
