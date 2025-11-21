import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HistoryIcon from '@mui/icons-material/History';
import '../../css/admin/AdminDashboard.css';


const kpiCards = [
  {
    title: 'Órdenes Pendientes',
    value: '12',
    icon: <ShoppingCartIcon />,
    link: '/admin/ordenes',
    className: 'kpi-pendientes',
  },
  {
    title: 'Stock Bajo',
    value: '5',
    icon: <WarningAmberIcon />,
    link: '/admin/productos',
    className: 'kpi-stock',
  },
  {
    title: 'Ingresos (Hoy)',
    value: '$1,250',
    icon: <AttachMoneyIcon />,
    link: '/admin/pagos',
    className: 'kpi-ingresos',
  },
  {
    title: 'Reseñas Negativas',
    value: '2',
    icon: <SentimentDissatisfiedIcon />,
    link: '/admin/resenas',
    className: 'kpi-resenas',
  },
];

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

return (
  <div className="admin-dashboard">
    <div className="dashboard-grid">
      {/* Columna izquierda */}
      <div className="dashboard-main">
        <div className="welcome-header">
          <h1>Recomendaciones a tener en cuenta</h1>
          <p className="subtitle">Recomendaciones basadas en las estadísticas.</p>
        </div>

        <div className="kpi-grid">
          {kpiCards.map((card, index) => (
            <div
              key={index}
              className={`kpi-card ${card.className}`}
              onClick={() => navigate(card.link)}
            >
              <div className="kpi-card-content">
                <div className="kpi-icon">{card.icon}</div>
                <div>
                  <div className="kpi-value">{card.value}</div>
                  <div className="kpi-title">{card.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-widget">
          <div className="widget-header">
            <ShowChartIcon />
            <h2>Tendencia de Ingresos (Últimos 7 días)</h2>
          </div>
          <p>Aquí se mostrará un gráfico de tendencias de ventas.</p>
        </div>

        <div className="dashboard-widget">
          <div className="widget-header">
            <HistoryIcon />
            <h2>Última Actividad</h2>
          </div>
          <div className="last-activity">
            <div className="activity-item">Nueva orden <strong>#1005</strong></div>
            <div className="activity-item">Usuario <strong>Leo</strong> registrado</div>
            <div className="activity-item">Producto <strong>Mesa de Roble</strong> editado</div>
          </div>
        </div>
      </div>
    </div>


  </div>
);

};

export default DashboardPage;
