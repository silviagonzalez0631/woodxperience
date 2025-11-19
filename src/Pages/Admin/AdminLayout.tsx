
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Badge, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PaymentIcon from '@mui/icons-material/Payment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import logo from '/imagenes/logocudo.png';
import '../../css/admin/AdminLayout.css';

const AdminLayout: React.FC = () => {
  const adminUser = {
    name: 'Katie Pena',
    avatar: 'KP'
  };


  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = [
    { text: 'Usuarios', icon: <PeopleIcon />, link: '/admin/usuarios' },
    { text: 'Productos', icon: <InventoryIcon />, link: '/admin/productos' },
    { text: 'Órdenes', icon: <ReceiptLongIcon />, link: '/admin/ordenes' },
    { text: 'Pagos', icon: <PaymentIcon />, link: '/admin/pagos' },
    { text: 'Reseñas', icon: <RateReviewIcon />, link: '/admin/resenas' },
  ];

  return (
    <Box className="admin-layout">
      <AppBar position="fixed" className="admin-navbar">
        <Toolbar>
          {/* Botón hamburguesa solo en móvil */}
          <Box sx={{ display: { xs: 'block', md: 'none' }, mr: 1 }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          <Link to="/admin" className="admin-logo-link" style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <img src={logo} alt="WoodXperience Logo" className="admin-logo-img" style={{ height: 36, width: 'auto', minWidth: 36 }} />
            <Typography variant="h6" component="div" sx={{ color: '#5d4037', fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.3rem' }, whiteSpace: 'nowrap', minWidth: 0 }}>
              Admin Panel
            </Typography>
          </Link>

          {/* Menú de navegación en escritorio */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {menuItems.map((item) => (
              <Button key={item.text} component={Link} to={item.link} className="admin-nav-link" startIcon={item.icon}>{item.text}</Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" className="admin-icon-btn">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" className="admin-icon-btn">
              <SettingsIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar className="admin-avatar">{adminUser.avatar}</Avatar>
              <Typography sx={{ color: '#5d4037', display: { xs: 'none', sm: 'block' } }}>
                {adminUser.name}
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para menú en móvil */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, pt: 2 }} role="presentation">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 2 }}>
            <Link to="/admin" className="admin-logo-link" onClick={() => setDrawerOpen(false)}>
              <img src={logo} alt="WoodXperience Logo" className="admin-logo-img" />
              <Typography variant="h6" component="div" sx={{ color: '#5d4037', fontWeight: 'bold' }}>
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
      

      <Box component="main" className="admin-main-content">
        <Toolbar /> {/* Spacer for the fixed AppBar */}
        <Outlet /> {/* This is where nested routes will render their components */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
