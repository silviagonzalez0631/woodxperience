import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Paper, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HistoryIcon from '@mui/icons-material/History';
import '../../css/admin/AdminDashboard.css';

const kpiCards = [
  { title: 'Órdenes Pendientes', value: '12', icon: <ShoppingCartIcon fontSize="large" />, color: '#a88a6d', link: '/admin/ordenes' },
  { title: 'Stock Bajo', value: '5', icon: <WarningAmberIcon fontSize="large" />, color: '#a88a6d', link: '/admin/productos' },
  { title: 'Ingresos (Hoy)', value: '$1,250', icon: <AttachMoneyIcon fontSize="large" />, color: '#a88a6d', link: '/admin/pagos' },
  { title: 'Reseñas Negativas', value: '2', icon: <SentimentDissatisfiedIcon fontSize="large" />, color: '#a88a6d', link: '/admin/resenas' },
];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box className="admin-dashboard">
      <Grid container spacing={4}>
        {/* Columna Izquierda: KPIs y Gráfico */}
        <Grid item xs={12} md={9}>
          <Box className="welcome-header">
            <Typography variant="h4" component="h1" gutterBottom>
              Recomendaciones a tener en cuenta
            </Typography>
            <Typography variant="subtitle1">
              Recomendaciones basadas en las estadísticas.
            </Typography>
          </Box>

          {isMobile ? (
            <Box className="kpi-compact" role="list">
              {kpiCards.map((card, index) => (
                <Paper key={index} className="compact-item" onClick={() => navigate(card.link)} role="listitem">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box className="rec-icon">{card.icon}</Box>
                    <Box>
                      <div className="compact-value">{card.value}</div>
                      <div className="compact-label">{card.title}</div>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Grid container spacing={3} className="kpi-grid">
              {kpiCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card className="kpi-card" sx={{ backgroundColor: card.color }} onClick={() => navigate(card.link)}>
                    <CardContent className="kpi-card-content">
                      <Box className="kpi-icon">{card.icon}</Box>
                      <Box>
                        <Typography variant="h4" component="div" className="kpi-value">
                          {card.value}
                        </Typography>
                        <Typography variant="body1" className="kpi-title">
                          {card.title}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Placeholder para Gráfico de Tendencias */}
          <Paper className="dashboard-widget">
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
              <ShowChartIcon />
              <Typography variant="h6">Tendencia de Ingresos (Últimos 7 días)</Typography>
            </Box>
            <Typography>Aquí se mostrará un gráfico de tendencias de ventas.</Typography>
          </Paper>

          {/* Placeholder para Última Actividad */}
          <Paper className="dashboard-widget">
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mb: 2}}>
              <HistoryIcon />
              <Typography variant="h6">Última Actividad</Typography>
            </Box>
            <Box className="last-activity">
              <div className="activity-item">Nueva orden <strong>#1005</strong></div>
              <div className="activity-item">Usuario <strong>Leo</strong> registrado</div>
              <div className="activity-item">Producto <strong>Mesa de Roble</strong> editado</div>
            </Box>
          </Paper>
        </Grid>

        {/* Columna Derecha: Perfil del Admin */}
        <Grid item xs={12} md={3}>
          <Card className="admin-profile-card">
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ width: 80, height: 80, margin: '0 auto 1rem', bgcolor: '#a88a6d' }}
              >
                KP
              </Avatar>
              <Typography variant="h6" component="div">
                Katie Pena
              </Typography>
              <Typography sx={{ mb: 2 }} color="text.secondary">
                Administrador
              </Typography>
              <Typography variant="body2">
                Bienvenido al menú de administrador.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
