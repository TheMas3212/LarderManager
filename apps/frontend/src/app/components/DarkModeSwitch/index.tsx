import { Switch, useTheme } from '@mui/material';
import { ColorModeContext } from '../../../theme'
import { useContext } from 'react';


export default () => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <Switch
      checked={theme.palette.mode === "dark"}
      onChange={toggleColorMode}
    />
  );
};
