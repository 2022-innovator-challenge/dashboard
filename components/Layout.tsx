import { ReactNode, useState } from 'react';
import styles from '../styles/Layout.module.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

export default function Layout({ children }: { children: ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!anchorEl;
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            href="/"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Overcooked
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={openMenu}
            sx={{
              mr: 2,
              '&:hover': {
                transform: 'rotate(360deg)',
                transition: 'all 1.25s ease-in-out'
              }
            }}
          >
            <SettingsIcon></SettingsIcon>
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={closeMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={closeMenu}>Profile</MenuItem>
            <MenuItem component="a" href="/settings">
              Settings
            </MenuItem>
            <MenuItem onClick={closeMenu}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <div className={styles.bottomContainer}>
        <div id={styles.children}>{children}</div>
      </div>
    </Box>
  );
}
