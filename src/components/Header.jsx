import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box,
  IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Exchange Rates', path: '/exchange_rates' },
  { label: 'About', path: '/about' },
  { label: 'Error page', path: '/page_not_found' },
];

const Header = () => {
  const location = useLocation();
  const theme = useTheme();
  const { toggleTheme } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {navItems.map(({ label, path }) => (
          <ListItem button key={path} component={Link} to={path} >
            <ListItemText primary={label} sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Loan Calculator
            </Typography>
            <IconButton onClick={toggleTheme} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              {drawer}
            </Drawer>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Typography variant="h6" component="div">
              Loan Calculator
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map(({ label, path }) => (
                <Button
                  key={path}
                  component={Link}
                  to={path}
                  color={location.pathname === path ? 'primary' : 'inherit'}
                  variant={location.pathname === path ? 'contained' : 'text'}
                  sx={{
                    bgcolor: location.pathname === path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  }}
                >
                  {label}
                </Button>
              ))}
              <IconButton onClick={toggleTheme} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
