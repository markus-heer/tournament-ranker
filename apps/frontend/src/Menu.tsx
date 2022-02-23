import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsHandball from '@mui/icons-material/SportsHandball';
import VideogameAsset from '@mui/icons-material/VideogameAsset';
import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from '@mui/material';
import { VFC } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuProps {
  toggleMenu: () => void;
  menuOpen: boolean;
  menuWidth: number;
}

interface ListItem {
  name: string;
  Icon: VFC;
  path: string;
}

const menuList: ListItem[] = [
  { name: 'Dashboard', Icon: () => <DashboardIcon />, path: '/' },
  { name: 'Spielerverwaltung', Icon: () => <SportsHandball />, path: '/players' },
  { name: 'Spielverwaltung', Icon: () => <VideogameAsset />, path: '/games' },
];

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'menuWidth',
})<{
  open: boolean;
  menuWidth: number;
}>(({ theme, open, menuWidth }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: menuWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const Menu: VFC<MenuProps> = ({ toggleMenu, menuOpen, menuWidth }) => {
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={menuOpen} menuWidth={menuWidth}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleMenu}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {menuList.map(({ name, Icon, path }) => (
          <ListItemButton
            key={name}
            onClick={() => {
              navigate(path);
            }}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
