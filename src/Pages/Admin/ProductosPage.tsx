import React, { useState, useEffect } from 'react';
import { 
    Box, Typography, Paper, Toolbar, TextField, InputAdornment, Button, 
    Select, MenuItem, FormControl, InputLabel, Chip, IconButton, 
    Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, 
    Card, CardContent, CardMedia, Avatar, Alert 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import axios from 'axios';

// --- Lógica de Chips de Stock ---
const getStockChip = (params: GridRenderCellParams) => {
  const stock = params.value as number;
  let color: 'success' | 'warning' | 'error' = 'success';
  let label = `En Stock (${stock})`;

  if (stock === 0) {
    color = 'error';
    label = 'Agotado';
  } else if (stock <= 3) {
    color = 'warning';
    label = `Últimas ${stock}`;
  }

  return <Chip label={label} color={color} size="small" variant="outlined" />;
};

// --- Columnas adaptadas a TU Base de Datos ---
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'imagen',
    headerName: 'Img',
    width: 80,
    renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
            {params.value ? (
                <Avatar src={params.value} variant="rounded" sx={{ width: 40, height: 40 }} />
            ) : (
                <Inventory2Icon color="disabled" />
            )}
        </Box>
    ),
  },
  { field: 'titulo', headerName: 'Nombre del Producto', width: 250 },
  { field: 'descripcion', headerName: 'Descripción', width: 250 },
  {
    field: 'precio',
    headerName: 'Precio',
    width: 150,
    type: 'number',
    valueFormatter: (value: number) => {
        if(value == null) return "";
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
    }
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
    width: 120,
    sortable: false,
    renderCell: () => (
      <Box>
        <IconButton size="small" color="primary"><EditIcon /></IconButton>
        <IconButton size="small" color="error"><DeleteIcon /></IconButton>
      </Box>
    )
  }
];

const ProductosPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estados para datos reales
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Estados de filtros y UI
  const [stockFilter, setStockFilter] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Estado del formulario
  const [newProduct, setNewProduct] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    stock: '',
  });

  // --- 1. CARGAR PRODUCTOS (GET) ---
  const fetchProductos = async () => {
    setLoading(true);
    try {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const response = await axios.get('http://localhost:8001/productos', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if(response.data.success){
            // Mapeamos los datos tal como vienen de Deno
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const productosAdaptados = response.data.data.map((prod: any) => ({
                id: prod.id,
                titulo: prod.titulo,
                descripcion: prod.descripcion,
                precio: prod.precio,
                stock: prod.stock,
                imagen: prod.imagenes && prod.imagenes.length > 0 ? prod.imagenes[0] : null
            }));
            setRows(productosAdaptados);
        }
    } catch (error) {
        console.error("Error fetching productos", error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
      fetchProductos();
  }, []);

  // --- 2. CREAR PRODUCTO (POST) ---
  const handleFormSubmit = async () => {
    try {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        const usuarioRaw = sessionStorage.getItem('usuario') || localStorage.getItem('usuario');
        const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;

        if (!usuario || !usuario.id) {
            setErrorMsg("Error: No se pudo identificar al usuario administrador.");
            return;
        }

        // Preparamos el objeto tal cual lo pide tu API
        const payload = {
            titulo: newProduct.titulo,
            descripcion: newProduct.descripcion,
            precio: Number(newProduct.precio),
            stock: Number(newProduct.stock),
            usuario_creador_id: usuario.id // ID IMPRESCINDIBLE
        };

        await axios.post('http://localhost:8001/productos', payload, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Si todo sale bien:
        setOpen(false);
        setNewProduct({ titulo: '', descripcion: '', precio: '', stock: '' }); // Limpiar form
        fetchProductos(); // Recargar tabla
        setErrorMsg('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        setErrorMsg(error.response?.data?.error || "Error al guardar producto");
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
      setOpen(false);
      setErrorMsg('');
  };

  // --- Lógica de filtrado en Frontend ---
  const filteredRows = rows.filter(row => {
    // Filtro de texto
    const matchesSearch = row.titulo.toLowerCase().includes(search.toLowerCase()) || 
                          row.descripcion.toLowerCase().includes(search.toLowerCase());
    
    // Filtro de Stock
    let matchesStock = true;
    if (stockFilter === 'en-stock') matchesStock = row.stock > 3;
    if (stockFilter === 'stock-bajo') matchesStock = row.stock > 0 && row.stock <= 3;
    if (stockFilter === 'agotado') matchesStock = row.stock === 0;

    return matchesSearch && matchesStock;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#5d4037' }}>
        Gestión de Productos
      </Typography>
      
      {/* BARRA DE HERRAMIENTAS */}
      <Paper sx={{ mb: 2, p: 2 }}>
        <Toolbar sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, padding: 0 }}>
          
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleClickOpen} 
            sx={{ backgroundColor: '#5d4037', width: isMobile ? '100%' : 'auto', whiteSpace: 'nowrap' }}
          >
            Agregar Producto
          </Button>

          <FormControl variant="standard" sx={{ minWidth: 150, width: isMobile ? '100%' : 'auto' }}>
            <InputLabel>Filtrar por Stock</InputLabel>
            <Select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="en-stock">Normal</MenuItem>
              <MenuItem value="stock-bajo">Stock Bajo</MenuItem>
              <MenuItem value="agotado">Agotado</MenuItem>
            </Select>
          </FormControl>

          {/* NOTA: Quité el filtro de CATEGORÍA porque tu DB no tiene ese campo aún */}

          <TextField
            variant="standard"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
            }}
            sx={{ flexGrow: 1, width: '100%' }}
          />
        </Toolbar>
      </Paper>

      {/* VISTA MÓVIL (CARDS) */}
      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredRows.map(p => (
            <Card key={p.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 1 }}>
              {p.imagen ? (
                 <CardMedia component="img" sx={{ width: 80, height: 80, borderRadius: 1 }} image={p.imagen} alt={p.titulo} />
              ) : (
                 <Avatar variant="rounded" sx={{ width: 80, height: 80 }}><Inventory2Icon /></Avatar>
              )}
              
              <CardContent sx={{ flex: 1, py: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5d4037', lineHeight: 1.2 }}>
                    {p.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {p.descripcion}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '1rem', mt: 0.5 }}>
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p.precio)}
                </Typography>
                <Box sx={{ mt: 1 }}>
                   {/* Reusamos la lógica visual del chip pero manual */}
                   {p.stock === 0 ? 
                      <Chip label="Agotado" color="error" size="small" /> : 
                      <Chip label={`Stock: ${p.stock}`} color={p.stock <= 3 ? "warning" : "success"} size="small" variant="outlined" />
                   }
                </Box>
              </CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <IconButton size="small"><EditIcon /></IconButton>
                  <IconButton size="small" color="error"><DeleteIcon /></IconButton>
              </Box>
            </Card>
          ))}
        </Box>
      ) : (
        /* VISTA PC (TABLA) */
        <Paper sx={{ height: 600, width: '100%', backgroundColor: '#ffffff' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            rowHeight={60}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 20]}
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': { color: '#5d4037' },
              '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' }
            }}
          />
        </Paper>
      )}

      {/* MODAL PARA AGREGAR PRODUCTO */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: '#5d4037' }}>Agregar Nuevo Producto</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Ingresa los datos para registrar un nuevo producto en la base de datos.
          </DialogContentText>
          
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

          <TextField
            autoFocus
            margin="dense"
            label="Título del Producto"
            fullWidth
            variant="outlined"
            value={newProduct.titulo}
            onChange={(e) => setNewProduct({ ...newProduct, titulo: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newProduct.descripcion}
            onChange={(e) => setNewProduct({ ...newProduct, descripcion: e.target.value })}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <TextField
                margin="dense"
                label="Precio (COP)"
                type="number"
                fullWidth
                variant="outlined"
                value={newProduct.precio}
                onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Stock Inicial"
                type="number"
                fullWidth
                variant="outlined"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#5d4037' }}>Cancelar</Button>
          <Button 
            onClick={handleFormSubmit} 
            variant="contained" 
            sx={{ backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } }}
            disabled={!newProduct.titulo || !newProduct.precio}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductosPage;