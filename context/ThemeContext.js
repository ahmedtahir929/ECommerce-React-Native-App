import { createContext, useContext, useMemo, useState } from 'react';

import { darkColors, lightColors, spacing } from '../constants/theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const value = useMemo(
    () => ({
      colors: isDarkMode ? darkColors : lightColors,
      spacing,
      isDarkMode,
      setDarkMode: setIsDarkMode,
      toggleDarkMode: () => setIsDarkMode((value) => !value),
    }),
    [isDarkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
