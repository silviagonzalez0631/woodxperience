import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Paper, Toolbar, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Chip, IconButton, Link } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// --- Mock Data ---
const mockKpis = {
  ingresosNetos: 25500000,
  reembolsos: 1200000,
  comisiones: 850000,
  fallidas: 12,
};

const mockRows = [
  { id: 'txn_1J2k3L4m5N6o7P8q', ordenId: 1024, monto: 1200000, metodo: 'Visa', fecha: '2024-07-30 10:15 AM', estado: 'Aprobado' },
  { id: 'txn_aB1c2D3e4F5g6H7i', ordenId: 1023, monto: 850000, metodo: 'PayPal', fecha: '2024-07-29 03:45 PM', estado: 'Aprobado' },
  { id: 'txn_kL9m8N7p6O5q4R3s', ordenId: 1022, monto: 250000, metodo: 'Mastercard', fecha: '2024-07-29 11:00 AM', estado: 'Reembolsado' },
  { id: 'txn_xY5z4A3b2C1d0E9f', ordenId: 1021, monto: 450000, metodo: 'Visa', fecha: '2024-07-28 09:20 AM', estado: 'Fallido' },
  { id: 'txn_pQ7r6S5t4U3v2W1x', ordenId: 1019, monto: 150000, metodo: 'PSE', fecha: '2024-07-26 08:00 PM', estado: 'Aprobado' },
];

type PaymentStatus = 'Aprobado' | 'Fallido' | 'Reembolsado';

const statusColors: Record<PaymentStatus, 'success' | 'error' | 'info'> = {
  'Aprobado': 'success',
  'Fallido': 'error',
  'Reembolsado': 'info',
};

const getStatusChip = (params: GridRenderCellParams) => {
  const status = params.value as PaymentStatus;
  const color = statusColors[status] || 'default';
  return <Chip label={status} color={color} size="small" />;
};

const formatCurrency = (value: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID Transacción', width: 220 },
  {
    field: 'ordenId',
    headerName: 'ID Orden',
    width: 120,
    renderCell: (params) => (
      <Link href="#" underline="always" onClick={(e) => { e.preventDefault(); alert(`Abrir detalle de orden #${params.value}`); }}>
        #{params.value}
      </Link>
    )
  },
  { field: 'monto', headerName: 'Monto', width: 150, type: 'number', valueFormatter: (value) => formatCurrency(value) },
  { field: 'metodo', headerName: 'Método', width: 130 },
  { field: 'fecha', headerName: 'Fecha y Hora', width: 180 },
  { field: 'estado', headerName: 'Estado', width: 150, renderCell: getStatusChip },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 100,
    sortable: false,
    renderCell: () => (
      <IconButton aria-label="acciones">
        <MoreVertIcon />
      </IconButton>
    )
  }
];

const PagosPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');

  const filteredRows = mockRows.filter(row => {
    const statusCondition = statusFilter === '' || row.estado === statusFilter;
    const methodCondition = methodFilter === '' || row.metodo === methodFilter;
    return statusCondition && methodCondition;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#5d4037' }}>
        Transacciones y Liquidez
      </Typography>

      {/* KPIs Financieros (grid simple para evitar problemas de tipado en Grid) */}
      <Box sx={{ mb: 3, display: 'grid', gap: isMobile ? 1 : 3, gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)' }}>
        <Card sx={{ backgroundColor: '#e8f5e9' }}>
          <CardContent sx={{ py: isMobile ? 1 : 2, px: isMobile ? 1.25 : 2 }}>
            <Typography color="textSecondary" variant={isMobile ? 'caption' : undefined} gutterBottom>Ingresos Netos (Mes)</Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} component="div" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>{formatCurrency(mockKpis.ingresosNetos)}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: '#fff8e1' }}>
          <CardContent sx={{ py: isMobile ? 1 : 2, px: isMobile ? 1.25 : 2 }}>
            <Typography color="textSecondary" variant={isMobile ? 'caption' : undefined} gutterBottom>Reembolsos Procesados</Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} component="div" sx={{ color: '#f57f17', fontWeight: 'bold' }}>{formatCurrency(mockKpis.reembolsos)}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ py: isMobile ? 1 : 2, px: isMobile ? 1.25 : 2 }}>
            <Typography color="textSecondary" variant={isMobile ? 'caption' : undefined} gutterBottom>Comisiones de Plataforma</Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} component="div">{formatCurrency(mockKpis.comisiones)}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ backgroundColor: '#ffebee' }}>
          <CardContent sx={{ py: isMobile ? 1 : 2, px: isMobile ? 1.25 : 2 }}>
            <Typography color="textSecondary" variant={isMobile ? 'caption' : undefined} gutterBottom>Transacciones Fallidas</Typography>
            <Typography variant={isMobile ? 'h6' : 'h5'} component="div" sx={{ color: '#c62828', fontWeight: 'bold' }}>{mockKpis.fallidas}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Barra de Herramientas y Filtros */}
      <Paper sx={{ mb: 2, p: 2 }}>
        {isMobile ? (
          <Toolbar sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              variant="standard"
              placeholder="Buscar por ID Transacción/Orden..."
              InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
              sx={{ width: '100%' }}
            />
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel>Filtrar por Estado</InputLabel>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Filtrar por Estado">
                <MenuItem value=""><em>Todos</em></MenuItem>
                <MenuItem value="Aprobado">Aprobado</MenuItem>
                <MenuItem value="Fallido">Fallido</MenuItem>
                <MenuItem value="Reembolsado">Reembolsado</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <InputLabel>Filtrar por Método</InputLabel>
              <Select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} label="Filtrar por Método">
                <MenuItem value=""><em>Todos</em></MenuItem>
                <MenuItem value="Visa">Visa</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Mastercard">Mastercard</MenuItem>
                <MenuItem value="PSE">PSE</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        ) : (
          <Toolbar>
            <TextField variant="standard" placeholder="Buscar por ID Transacción/Orden..." InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>), }} sx={{ flexGrow: 1, mr: 2 }} />
            <FormControl variant="standard" sx={{ minWidth: 180, mr: 2 }}>
              <InputLabel>Filtrar por Estado</InputLabel>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Filtrar por Estado">
                <MenuItem value=""><em>Todos</em></MenuItem>
                <MenuItem value="Aprobado">Aprobado</MenuItem>
                <MenuItem value="Fallido">Fallido</MenuItem>
                <MenuItem value="Reembolsado">Reembolsado</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: 180 }}>
              <InputLabel>Filtrar por Método</InputLabel>
              <Select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} label="Filtrar por Método">
                <MenuItem value=""><em>Todos</em></MenuItem>
                <MenuItem value="Visa">Visa</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Mastercard">Mastercard</MenuItem>
                <MenuItem value="PSE">PSE</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        )}
      </Paper>

      {/* Tabla de Transacciones */}
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredRows.map(row => (
            <Card key={row.id}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5d4037' }}>{row.id}</Typography>
                <Typography variant="body2">Orden: #{row.ordenId}</Typography>
                <Typography variant="body2">Monto: {formatCurrency(row.monto)}</Typography>
                <Typography variant="body2">Método: {row.metodo}</Typography>
                <Typography variant="body2">Fecha: {row.fecha}</Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip label={row.estado} size="small" />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Paper sx={{ height: 600, width: '100%', backgroundColor: '#ffffff' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
            pageSizeOptions={[5, 10, 20]}
            sx={{ border: 'none', '& .MuiDataGrid-cell': { color: '#5d4037' } }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default PagosPage;
