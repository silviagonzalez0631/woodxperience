import React, { useState } from 'react';
import { Box, Typography, Paper, Toolbar, TextField, InputAdornment, Button, Select, MenuItem, FormControl, InputLabel, Chip, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewsIcon from '@mui/icons-material/Reviews';

// --- Mock Data ---
const mockCategories = ['Muebles de Sala', 'Comedor', 'Decoración', 'Oficina'];

const mockRows = [
  { id: 1, sku: 'MBL-001', nombre: 'Sofá de 3 Puestos "Nórdico"', categoria: 'Muebles de Sala', precio: 1200000, stock: 15 },
  { id: 2, sku: 'CMD-005', nombre: 'Mesa de Comedor "Roble"', categoria: 'Comedor', precio: 850000, stock: 8 },
  { id: 3, sku: 'DEC-012', nombre: 'Lámpara de Pie "Industrial"', categoria: 'Decoración', precio: 250000, stock: 0 },
  { id: 4, sku: 'OFC-002', nombre: 'Escritorio "Minimalista"', categoria: 'Oficina', precio: 450000, stock: 25 },
  { id: 5, sku: 'MBL-002', nombre: 'Silla Auxiliar "Vintage"', categoria: 'Muebles de Sala', precio: 300000, stock: 3 },
];

const getStockChip = (params: GridRenderCellParams) => {
  const stock = params.value as number;
  let color: 'success' | 'warning' | 'error' = 'success';
  let label = `En Stock (${stock})`;

  if (stock === 0) {
    color = 'error';
    label = 'Agotado';
  } else if (stock <= 10) {
    color = 'warning';
    label = `Stock Bajo (${stock})`;
  }

  return <Chip label={label} color={color} size="small" />;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'sku', headerName: 'SKU', width: 130 },
  { field: 'nombre', headerName: 'Nombre del Producto', width: 300 },
  { field: 'categoria', headerName: 'Categoría', width: 180 },
  {
    field: 'precio',
    headerName: 'Precio',
    width: 150,
    type: 'number',
    valueFormatter: (value) =>
      new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value),
  },
  {
    field: 'stock',
    headerName: 'Stock',
    width: 150,
    renderCell: getStockChip,
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 150,
    sortable: false,
    renderCell: () => (
      <Box>
        <IconButton size="small" aria-label="editar">
          <EditIcon />
        </IconButton>
        <IconButton size="small" aria-label="eliminar">
          <DeleteIcon />
        </IconButton>
        <IconButton size="small" aria-label="ver reseñas">
          <ReviewsIcon />
        </IconButton>
      </Box>
    )
  }
];

const ProductosPage: React.FC = () => {
  const [stockFilter, setStockFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Lógica de filtrado (a implementar con datos reales)
  const filteredRows = mockRows.filter(row => {
    const stockCondition =
      stockFilter === '' ||
      (stockFilter === 'en-stock' && row.stock > 10) ||
      (stockFilter === 'stock-bajo' && row.stock > 0 && row.stock <= 10) ||
      (stockFilter === 'agotado' && row.stock === 0);

    const categoryCondition = categoryFilter === '' || row.categoria === categoryFilter;

    return stockCondition && categoryCondition;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#5d4037' }}>
        Gestión de Productos
      </Typography>
      <Paper sx={{ mb: 2, p: 2 }}>
        <Toolbar>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' }, mr: 2 }}
          >
            Agregar Producto
          </Button>
          <FormControl variant="standard" sx={{ minWidth: 150, mr: 2 }}>
            <InputLabel>Filtrar por Stock</InputLabel>
            <Select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)} label="Filtrar por Stock">
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="en-stock">En Stock</MenuItem>
              <MenuItem value="stock-bajo">Stock Bajo</MenuItem>
              <MenuItem value="agotado">Agotado</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ minWidth: 180, mr: 2 }}>
            <InputLabel>Filtrar por Categoría</InputLabel>
            <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} label="Filtrar por Categoría">
              <MenuItem value=""><em>Todas</em></MenuItem>
              {mockCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            variant="standard"
            placeholder="Buscar por nombre, SKU..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
        </Toolbar>
      </Paper>
      <Paper sx={{ height: 600, width: '100%', backgroundColor: '#ffffff' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              color: '#5d4037',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            }
          }}
        />
      </Paper>
    </Box>
  );
};

export default ProductosPage;
