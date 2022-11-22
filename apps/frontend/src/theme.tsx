import { GlobalStyles, PaletteMode, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect } from 'react';

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {
    return;
  }
});

function Theme(props: { children: React.ReactNode }) {
  // Update the theme only if the mode changes
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState<PaletteMode>(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(mode === 'light' ? 'dark' : 'light');
      },
    }),
    [mode],
  );

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  },[prefersDarkMode])

  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default }}} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Typography color="text.primary" component="div">
          {props.children}
        </Typography>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main:         '#f06901',
            light:        '#ff9a3f',
            dark:         '#b63900',
            contrastText: '#000000'
          },
          secondary: {
            main:         '#2cd3d3',
            light:        '#72ffff',
            dark:         '#00a1a2',
            contrastText: '#000000'
          },
          background: {
            paper: '#212121',
            sidebar: '#f3f3f3'
          },
          text: {
            primary: '#787878',
            secondary: '#878787',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main:         '#007acc',
            light:        '#6ec5ff',
            dark:         '#0053aa',
            contrastText: '#cccccc'
          },
          secondary: {
            main:         '#15825d',
            light:        '#21d095',
            dark:         '#0b4330',
            contrastText: '#cccccc'
          },
          background: {
            default: '#212121',
            paper: '#212121',
            sidebar: '#252525'
          },
          text: {
            primary: '#cccccc',
            secondary: '#878787',
          },
        }),
  },
  typography: {
    fontFamily: 'Michroma'
  }
});

export default Theme;

declare module '@mui/material/styles' {
  interface TypeBackground {
    sidebar: string;
  }
}