import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar as MuiAppBar, IconButton, styled, Toolbar, Typography } from '@mui/material';
import { useContext } from 'react';
import { VFC } from 'react';
import { useLocation } from 'react-router-dom';

import { ColorModeContext } from './ColorModeWrapper';

interface TopBarProps {
  toggleMenu: () => void;
  menuOpen: boolean;
  menuWidth: number;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'menuWidth',
})<{ open: boolean; menuWidth: number }>(({ theme, open, menuWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: menuWidth,
    width: `calc(100% - ${menuWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const TopBar: VFC<TopBarProps> = ({ toggleMenu, menuOpen, menuWidth }) => {
  const location = useLocation();

  const { toggleColorMode, colorMode } = useContext(ColorModeContext);

  const headlines: Record<string, string> = {
    dashboard: 'Dashboard',
    players: 'Spielerverwaltung',
    games: 'Spielverwaltung',
  };

  return (
    <StyledAppBar position="absolute" open={menuOpen} menuWidth={menuWidth}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when menu closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open menu"
          onClick={toggleMenu}
          sx={{
            marginRight: '36px',
            ...(menuOpen && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {headlines[location.pathname.replace('/', '') || 'dashboard']}
        </Typography>

        <IconButton color="inherit" onClick={toggleColorMode}>
          {colorMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};
