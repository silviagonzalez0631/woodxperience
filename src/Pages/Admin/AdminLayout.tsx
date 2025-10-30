import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Badge, IconButton } from '@mui/material';
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

  return (
    <Box className="admin-layout">
      <AppBar position="fixed" className="admin-navbar">
        <Toolbar>
          <Link to="/admin" className="admin-logo-link">
            <img src={logo} alt="WoodXperience Logo" className="admin-logo-img" />
            <Typography variant="h6" component="div" sx={{ color: '#5d4037', fontWeight: 'bold' }}>
              Admin Panel
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Button component={Link} to="/admin/usuarios" className="admin-nav-link" startIcon={<PeopleIcon />}>Usuarios</Button>
            <Button component={Link} to="/admin/productos" className="admin-nav-link" startIcon={<InventoryIcon />}>Productos</Button>
            <Button component={Link} to="/admin/ordenes" className="admin-nav-link" startIcon={<ReceiptLongIcon />}>Órdenes</Button>
            <Button component={Link} to="/admin/pagos" className="admin-nav-link" startIcon={<PaymentIcon />}>Pagos</Button>
            <Button component={Link} to="/admin/resenas" className="admin-nav-link" startIcon={<RateReviewIcon />}>Reseñas</Button>
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

      <Box component="main" className="admin-main-content">
        <Toolbar /> {/* Spacer for the fixed AppBar */}
        <Outlet /> {/* This is where nested routes will render their components */}
      </Box>
    </Box>
  );
};

export default AdminLayout;
