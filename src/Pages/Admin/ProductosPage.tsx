import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Toolbar,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Card,
  CardContent
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReviewsIcon from '@mui/icons-material/Reviews';

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

  return <Chip label={label} color={color} size="small" sx={{ fontFamily: 'Montserrat, sans-serif' }} />;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'sku', headerName: 'SKU', width: 130 },
  {
    field: 'nombre',
    headerName: 'Nombre del Producto',
    width: 300,
    renderCell: (params) => (
      <Typography sx={{ fontFamily: 'Montserrat, sans-serif' }}>{params.value}</Typography>
    )
  },
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
      <Box sx={{ fontFamily: 'Montserrat, sans-serif' }}>
        <IconButton size="small"><EditIcon /></IconButton>
        <IconButton size="small"><DeleteIcon /></IconButton>
        <IconButton size="small"><ReviewsIcon /></IconButton>
      </Box>
    )
  }
];

const ProductosPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [stockFilter, setStockFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [open, setOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormSubmit = () => {
    console.log("Nuevo producto a guardar:", newProduct);
    handleClose();
  };

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
    <Box sx={{ padding: 3, fontFamily: 'Montserrat, sans-serif' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#815041d5', fontFamily: 'Montserrat, sans-serif', textAlign: 'center', mb: 3, fontWeight: 'bold' }}>
        Gestión de Productos
      </Typography>

      <Paper sx={{ mb: 2, p: 2 }}>
        <Toolbar sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
            sx={{
              backgroundColor: '#5d4037',
              width: isMobile ? '100%' : 'auto',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Agregar Producto
          </Button>

          <FormControl variant="standard" sx={{ width: isMobile ? '100%' : 150, fontFamily: 'Montserrat, sans-serif' }}>
            <InputLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Filtrar por Stock</InputLabel>
            <Select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              label="Filtrar por Stock"
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="en-stock">En Stock</MenuItem>
              <MenuItem value="stock-bajo">Stock Bajo</MenuItem>
              <MenuItem value="agotado">Agotado</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ width: isMobile ? '100%' : 180, fontFamily: 'Montserrat, sans-serif' }}>
            <InputLabel sx={{ fontFamily: 'Montserrat, sans-serif' }}>Filtrar por Categoría</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Filtrar por Categoría"
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <MenuItem value=""><em>Todas</em></MenuItem>
              {mockCategories.map(cat => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
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
              sx: {
                '& input': {
                  fontFamily: 'Montserrat, sans-serif'
                },
                '& input::placeholder': {
                  fontFamily: 'Montserrat, sans-serif'
                }
              }
            }}
            sx={{ flexGrow: 1 }}
          />
        </Toolbar>
      </Paper>

{isMobile ? (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {filteredRows.map(p => (
      <Card key={p.id} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5d4037', fontFamily: 'Montserrat, sans-serif' }}>
            {p.nombre}
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif' }}>SKU: {p.sku}</Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif' }}>Categoría: {p.categoria}</Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Montserrat, sans-serif' }}>
            Precio: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p.precio)}
          </Typography>
          <Box sx={{ mt: 1 }}>
            {getStockChip({ value: p.stock } as GridRenderCellParams)}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <IconButton size="small"><EditIcon /></IconButton>
            <IconButton size="small"><DeleteIcon /></IconButton>
            <IconButton size="small"><ReviewsIcon /></IconButton>
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
) : (
    <Paper sx={{
      height: 600,
      width: '100%',
      backgroundColor: '#ffffff',
      fontFamily: 'Montserrat, sans-serif',
      '& .MuiDataGrid-cell': {
        color: '#5d4037',
        fontFamily: 'Montserrat, sans-serif'
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontFamily: 'Montserrat, sans-serif'
      },
      '& .MuiDataGrid-toolbarContainer': {
        fontFamily: 'Montserrat, sans-serif'
      }
    }}>
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
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
          }
        }}
      />
    </Paper>
  )}

  {/* Modal para agregar nuevo producto */}
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle sx={{ color: '#5d4037', fontFamily: 'Montserrat, sans-serif' }}>
      Agregar Nuevo Producto
    </DialogTitle>
    <DialogContent sx={{ fontFamily: 'Montserrat, sans-serif' }}>
      <DialogContentText sx={{ mb: 2, fontFamily: 'Montserrat, sans-serif' }}>
        Completa los siguientes campos para registrar un nuevo producto en el inventario.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        name="titulo"
        label="Título del Producto"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => setNewProduct({ ...newProduct, titulo: e.target.value })}
        InputProps={{
          sx: {
            fontFamily: 'Montserrat, sans-serif',
            '& input::placeholder': {
              fontFamily: 'Montserrat, sans-serif'
            }
          }
        }}
      />
      <TextField
        margin="dense"
        name="descripcion"
        label="Descripción"
        type="text"
        fullWidth
        multiline
        rows={4}
        variant="standard"
        onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
        InputProps={{
          sx: {
            fontFamily: 'Montserrat, sans-serif'
          }
        }}
      />
      <TextField
        margin="dense"
        name="precio"
        label="Precio (COP)"
        type="number"
        fullWidth
        variant="standard"
        onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
        InputProps={{
          sx: {
            fontFamily: 'Montserrat, sans-serif'
          }
        }}
      />
      <TextField
        margin="dense"
        name="stock"
        label="Stock (Cantidad disponible)"
        type="number"
        fullWidth
        variant="standard"
        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        InputProps={{
          sx: {
            fontFamily: 'Montserrat, sans-serif'
          }
        }}
      />
    </DialogContent>
    <DialogActions sx={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Button onClick={handleClose} sx={{ color: '#5d4037', fontFamily: 'Montserrat, sans-serif' }}>Cancelar</Button>
      <Button
        onClick={handleFormSubmit}
        variant="contained"
        sx={{
          backgroundColor: '#5d4037',
          '&:hover': { backgroundColor: '#4e342e' },
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        Guardar
      </Button>
    </DialogActions>
  </Dialog>
    </Box>
  );
};

export default ProductosPage;
