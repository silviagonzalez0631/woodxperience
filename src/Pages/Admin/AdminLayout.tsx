import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import logo from '/imagenes/logocudo.png';
import '../../css/admin/AdminLayout.css';
import Footer from '../../Components/Admin/footerAdmin';

const AdminLayout: React.FC = () => {
  const adminUser = {
    name: 'Katie Pena',
    avatar: 'KP'
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorUserMenu, setAnchorUserMenu] = useState<null | HTMLElement>(null);
  const [anchorThemeMenu, setAnchorThemeMenu] = useState<null | HTMLElement>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserMenu(event.currentTarget);
  };

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorThemeMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorUserMenu(null);
    setAnchorThemeMenu(null);
  };

  const handleOpenProfile = () => {
    setShowProfileModal(true);
    handleMenuClose();
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
  };

  const toggleTheme = () => {
    console.log('Cambiar tema');
    handleMenuClose();
  };

  const menuItems = [
    { text: 'Usuarios', icon: <PeopleIcon />, link: '/admin/usuarios' },
    { text: 'Productos', icon: <InventoryIcon />, link: '/admin/productos' },
    { text: 'Órdenes', icon: <ReceiptLongIcon />, link: '/admin/ordenes' },
    { text: 'Pagos', icon: <PaymentIcon />, link: '/admin/pagos' },
    { text: 'Reseñas', icon: <RateReviewIcon />, link: '/admin/resenas' },
  ];

  return (
    <>
      <Box className="admin-layout">
        <AppBar position="fixed" className="admin-navbar">
          <Toolbar>
            <Box className="admin-menu-icon">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>

            <div className="logo-container">
              <Link to="/admin" className="logo-link" onClick={() => setDrawerOpen(false)}>
                <img src={logo} alt="WoodXperience Logo" className="logo-img" />
                <div className="logo-divider" />
                <div className="logo-text-group">
                  <div className="logo-title">WOODXPERIENCE</div>
                  <div className="logo-subtitulo">Admin Panel</div>
                </div>
              </Link>
            </div>

            <Box className="admin-nav-desktop">
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.link}
                  className="admin-nav-link"
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
            </Box>

            <Box className="admin-actions">
              <IconButton color="inherit" className="admin-icon-btn" onClick={handleThemeMenuOpen}>
                <SettingsIcon />
              </IconButton>
              <IconButton color="inherit" className="admin-icon-btn" onClick={handleUserMenuOpen}>
                <Avatar className="admin-avatar">{adminUser.avatar}</Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
              {/* Menú usuario */}
          <Menu
            anchorEl={anchorUserMenu}
            open={Boolean(anchorUserMenu)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            classes={{ paper: 'admin-menu' }}
            sx={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <MenuItem
              onClick={handleOpenProfile}
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              Ver perfil
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleMenuClose}
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>

          {/* Menú tema */}
          <Menu
            anchorEl={anchorThemeMenu}
            open={Boolean(anchorThemeMenu)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            classes={{ paper: 'admin-menu' }}
            sx={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            <MenuItem
              onClick={toggleTheme}
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <ListItemIcon>
                {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
              </ListItemIcon>
              {isDark ? 'Tema claro' : 'Tema oscuro'}
            </MenuItem>
          </Menu>


        {/* Drawer lateral */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box className="admin-drawer" role="presentation">
            <Box className="admin-drawer-header">
              <Link to="/admin" className="admin-logo-link" onClick={() => setDrawerOpen(false)}>
                <img src={logo} alt="WoodXperience Logo" className="admin-logo-img" />
                <Typography variant="h6" component="div" className="admin-logo-text">
                  Admin Panel
                </Typography>
              </Link>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.link} onClick={() => setDrawerOpen(false)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Contenido principal */}
        <Box component="main" className="admin-main-content">
          <Toolbar />
          <Outlet />
        </Box>

        {/* Modal perfil */}
        {showProfileModal && (
          <div className="profile-modal-overlay" onClick={handleCloseProfile}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-profile" onClick={handleCloseProfile}>×</button>
              <div className="admin-profile-card">
                <div className="admin-avatar">KP</div>
                <h3>Katie Pena</h3>
                <p className="admin-role">Administrador</p>
                <p className="admin-welcome">Bienvenido al menú de administrador.</p>
              </div>
            </div>
          </div>
        )}
      </Box>

      {/* Footer separado del layout */}
      <Footer />
    </>
  );
};

export default AdminLayout;
