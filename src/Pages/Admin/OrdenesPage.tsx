import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Select,
  MenuItem,
  ButtonGroup,
  Link,
  Card,
  CardContent
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

const mockRows = [
  { id: 1024, cliente: 'Leonardo Corredor', fecha: '2024-07-30', total: 1200000, estado: 'Enviado' },
  { id: 1023, cliente: 'Jane Smith', fecha: '2024-07-29', total: 850000, estado: 'Procesando' },
  { id: 1022, cliente: 'Carlos Rivas', fecha: '2024-07-29', total: 250000, estado: 'Completado' },
  { id: 1021, cliente: 'Ana Gómez', fecha: '2024-07-28', total: 450000, estado: 'Pendiente' },
  { id: 1020, cliente: 'Lucía Fernández', fecha: '2024-07-27', total: 300000, estado: 'Cancelado' },
  { id: 1019, cliente: 'Pedro Martinez', fecha: '2024-07-26', total: 150000, estado: 'Completado' },
];

type OrderStatus = 'Pendiente' | 'Procesando' | 'Enviado' | 'Completado' | 'Cancelado';

const statusColors: Record<OrderStatus, 'default' | 'primary' | 'warning' | 'success' | 'error'> = {
  'Pendiente': 'warning',
  'Procesando': 'primary',
  'Enviado': 'default',
  'Completado': 'success',
  'Cancelado': 'error',
};

const getStatusChip = (params: GridRenderCellParams) => {
  const status = params.value as OrderStatus;
  const color = statusColors[status] || 'default';
  return <Chip label={status} color={color} size="small" sx={{ fontFamily: 'Montserrat, sans-serif' }} />;
};

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID Orden',
    width: 120,
    renderCell: (params) => (
      <Link
        href="#"
        underline="always"
        onClick={(e) => {
          e.preventDefault();
          alert(`Abrir detalle de orden #${params.value}`);
        }}
        sx={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        #{params.value}
      </Link>
    )
  },
  { field: 'cliente', headerName: 'Cliente', width: 220 },
  {
    field: 'fecha',
    headerName: 'Fecha',
    width: 150,
    type: 'date',
    valueGetter: (value: string) => new Date(value)
  },
  {
    field: 'total',
    headerName: 'Total',
    width: 150,
    type: 'number',
    valueFormatter: (value) =>
      new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value),
  },
  {
    field: 'estado',
    headerName: 'Estado',
    width: 150,
    renderCell: getStatusChip,
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Select
        size="small"
        value={params.row.estado}
        onChange={(e) => alert(`Cambiar estado de orden #${params.row.id} a ${e.target.value}`)}
        sx={{
          fontFamily: 'Montserrat, sans-serif',
          '.MuiOutlinedInput-notchedOutline': { border: 0 }
        }}
        displayEmpty
      >
        <MenuItem disabled value={params.row.estado} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
          <em>Cambiar Estado</em>
        </MenuItem>
        {Object.keys(statusColors).map(status => (
          <MenuItem key={status} value={status} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
            {status}
          </MenuItem>
        ))}
      </Select>
    )
  }
];

const OrdenesPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  const filteredRows = mockRows.filter(row => {
    return statusFilter === 'Todos' || row.estado === statusFilter;
  });

  return (
    <Box sx={{ padding: 3, fontFamily: 'Montserrat, sans-serif' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#815041d5', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
        Seguimiento de Órdenes
      </Typography>
      <Paper sx={{ mb: 2, p: 2, fontFamily: 'Montserrat, sans-serif' }}>
        {isMobile ? (
          <>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <TextField
                  variant="standard"
                  placeholder="Buscar por ID, cliente, email..."
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                    sx: {
                      '& input': { fontFamily: 'Montserrat, sans-serif' },
                      '& input::placeholder': { fontFamily: 'Montserrat, sans-serif' }
                    }
                  }}
                  sx={{ flex: 1 }}
                />
                <Button variant="outlined" sx={{ color: '#5d4037', borderColor: '#5d4037', whiteSpace: 'nowrap', fontFamily: 'Montserrat, sans-serif' }}>
                  Filtro Avanzado
                </Button>
              </Box>
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <ButtonGroup variant="outlined" aria-label="Filtros de estado" sx={{ display: 'inline-flex' }}>
                  {['Todos', ...Object.keys(statusColors)].map(status => (
                    <Button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      variant={statusFilter === status ? 'contained' : 'outlined'}
                      sx={{
                        fontFamily: 'Montserrat, sans-serif',
                        ...(statusFilter === status
                          ? { backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } }
                          : { color: '#5d4037', borderColor: '#c8b7b5' })
                      }}
                    >
                      {status}
                    </Button>
                  ))}
                </ButtonGroup>
              </Box>
            </Toolbar>
          </>
        ) : (
          <>
            <Toolbar>
              <TextField
                variant="standard"
                placeholder="Buscar por ID, cliente, email..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  sx: {
                    '& input': { fontFamily: 'Montserrat, sans-serif' },
                    '& input::placeholder': { fontFamily: 'Montserrat, sans-serif' }
                  }
                }}
                sx={{ flexGrow: 1, mr: 2 }}
              />
              <Button variant="outlined" sx={{ color: '#5d4037', borderColor: '#5d4037', fontFamily: 'Montserrat, sans-serif' }}>
                Filtro Avanzado
              </Button>
            </Toolbar>
            <Toolbar sx={{ mt: 1 }}>
              <Typography variant="body2" sx={{ mr: 2, color: '#5d4037', fontFamily: 'Montserrat, sans-serif' }}>
                Filtrar por estado:
              </Typography>
              <ButtonGroup variant="outlined" aria-label="Filtros de estado">
                {['Todos', ...Object.keys(statusColors)].map(status => (
                  <Button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    variant={statusFilter === status ? 'contained' : 'outlined'}
                    sx={{
                      fontFamily: 'Montserrat, sans-serif',
                      ...(statusFilter === status
                        ? { backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } }
                        : { color: '#5d4037', borderColor: '#c8b7b5' })
                    }}
                  >
                    {status}
                  </Button>
                ))}
              </ButtonGroup>
            </Toolbar>
          </>
        )}
      </Paper>
 {isMobile ? (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {filteredRows.map(r => (
      <Card key={r.id} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 'bold', color: '#5d4037', fontFamily: 'Montserrat, sans-serif' }}
          >
            Orden #{r.id}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
            Cliente: {r.cliente}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
            Fecha: {r.fecha}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
            Total: {new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
            }).format(r.total)}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip
              label={r.estado}
              size="small"
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            />
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
) : (
      <Paper sx={{ height: 600, width: '100%', backgroundColor: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          sx={{
            border: 'none',
            fontFamily: 'Montserrat, sans-serif',
            '& .MuiDataGrid-cell': { color: '#5d4037', fontFamily: 'Montserrat, sans-serif' },
            '& .MuiDataGrid-columnHeaderTitle': { fontFamily: 'Montserrat, sans-serif' }
          }}
        />
      </Paper>
    )}
    </Box>
  );
};

export default OrdenesPage;
