import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Container,
  Stack,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Code,
  Chat,
  People,
  Notifications,
  AccountCircle,
  Home,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NEXORA_LOGO = `data:image/svg+xml;base64,${btoa(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="128" cy="128" r="32" fill="#00FFA3">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="384" cy="128" r="32" fill="#00FFA3">
    <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
  </circle>
  <path d="M128 192L128 384L192 384L192 256L320 384L384 384L384 192L320 192L320 320L192 192L128 192Z" fill="url(#neon-gradient)">
    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
  </path>
  <defs>
    <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00FFA3"/>
      <stop offset="100%" style="stop-color:#00D4FF"/>
    </linearGradient>
  </defs>
</svg>`)}`;

const navItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Problems', icon: <Code />, path: '/problems' },
  { text: 'AI Chat', icon: <Chat />, path: '/chat' },
  { text: 'Social', icon: <People />, path: '/social' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileClick = () => {
    handleCloseUserMenu();
    navigate('/profile');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: 'linear-gradient(145deg, rgba(18, 18, 18, 0.95), rgba(46, 46, 46, 0.95))',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 255, 153, 0.1)',
        boxShadow: '0 0 20px rgba(0, 255, 153, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { md: 'none' },
              '&:hover': {
                background: 'rgba(0, 255, 153, 0.1)',
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo and Brand */}
          <Stack 
            direction="row" 
            alignItems="center" 
            spacing={1} 
            sx={{ 
              flexGrow: 1,
              cursor: 'pointer',
              '&:hover': {
                '& .logo-n': {
                  filter: 'drop-shadow(0 0 8px rgba(0, 255, 153, 0.6))',
                },
                '& .brand-text': {
                  textShadow: '0 0 10px rgba(0, 255, 153, 0.6)',
                },
              },
            }}
            component={RouterLink}
            to="/"
          >
            {/* N Logo */}
            <Box
              component="img"
              src={NEXORA_LOGO}
              alt="Nexora Logo"
              sx={{
                height: '40px',
                width: 'auto',
                transition: 'filter 0.3s ease',
                filter: 'drop-shadow(0 0 4px rgba(0, 255, 153, 0.3))',
              }}
              className="logo-n"
            />
            
            {/* Brand Text */}
            <Stack spacing={0}>
              <Typography
                variant="h6"
                className="brand-text"
                sx={{
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  color: '#ffffff',
                  transition: 'text-shadow 0.3s ease',
                  lineHeight: 1.2,
                }}
              >
                NEXORA
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(0, 255, 153, 0.8)',
                  letterSpacing: '1px',
                  fontSize: '0.7rem',
                  lineHeight: 1,
                }}
              >
                Ignite Connections
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: 'white',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(0, 255, 153, 0.1), rgba(26, 143, 255, 0.1))',
                    borderRadius: '8px',
                    zIndex: -1,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                  '&:hover': {
                    color: '#00FF99',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <IconButton 
              color="inherit"
              sx={{
                '&:hover': {
                  background: 'rgba(0, 255, 153, 0.1)',
                }
              }}
            >
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ 
                p: 0,
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                }
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'transparent',
                  width: 40,
                  height: 40,
                  border: '2px solid #00FF99',
                  boxShadow: '0 0 10px rgba(0, 255, 153, 0.3)',
                }}
              >
                <AccountCircle sx={{ color: '#00FF99' }} />
              </Avatar>
            </IconButton>
          </Box>

          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            PaperProps={{
              sx: {
                background: 'linear-gradient(145deg, rgba(18, 18, 18, 0.95), rgba(46, 46, 46, 0.95))',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 255, 153, 0.1)',
                boxShadow: '0 0 20px rgba(0, 255, 153, 0.1)',
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    background: 'rgba(0, 255, 153, 0.1)',
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            background: 'linear-gradient(145deg, rgba(18, 18, 18, 0.95), rgba(46, 46, 46, 0.95))',
            backdropFilter: 'blur(10px)',
            borderRight: '1px solid rgba(0, 255, 153, 0.1)',
            boxShadow: '0 0 20px rgba(0, 255, 153, 0.1)',
            width: 240,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              component={RouterLink}
              to={item.path}
              key={item.text}
              onClick={handleDrawerToggle}
              sx={{
                '&:hover': {
                  background: 'rgba(0, 255, 153, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#00FF99' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{ color: 'white' }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
