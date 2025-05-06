import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'));

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
