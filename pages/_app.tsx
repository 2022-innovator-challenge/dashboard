import '../styles/globals.css';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
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
              ml: 2,
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
      <Container sx={{ p: 4 }}>
        <Component {...pageProps} />
      </Container>
    </Box>
  );
}

export default MyApp;
