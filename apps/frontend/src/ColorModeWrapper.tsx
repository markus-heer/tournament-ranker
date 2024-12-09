import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React from 'react';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      paper: '#fefefe',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#181818',
    },
  },
});

export const ColorModeContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
  colorMode: 'dark',
});

const ColorModeWrapper: React.FC = ({ children }) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      colorMode: mode,
    }),
    [mode],
  );

  const theme = React.useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeWrapper;
