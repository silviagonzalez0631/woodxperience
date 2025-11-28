import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Toolbar, TextField, InputAdornment, Button, Card, CardContent } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'; // ¡No olvides importar axios!

// Las columnas pueden estar afuera, eso está bien porque son constantes estáticas
const columns: GridColDef[] = [
  { field: 'id', headerName: 'No.', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 250,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ ml: 1 }}>{params.value}</Typography>
      </Box>
    ),
  },
  { field: 'rol', headerName: 'Rol', width: 150 },
  { field: 'telefono', headerName: 'Teléfono', width: 150 },
  { field: 'fechaCreacion', headerName: 'Fecha Creación', width: 180 },
  { field: 'email', headerName: 'Email', width: 250 },
  {
    field: 'acciones',
    headerName: 'Acciones',
    width: 150,
    sortable: false,
    renderCell: () => "..." 
  }
];

const UsuariosPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 1. ESTADO: Aquí guardamos los datos. Ya no usamos el "const rows" fijo de afuera.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows, setRows] = useState<any[]>([]);
  const [busqueda, setBusqueda] = useState("");

  // 2. FUNCIÓN FETCH: Ahora vive ADENTRO del componente para poder usar setRows
  const fetchUsuarios = async () => {
    try {
      const token = sessionStorage.getItem('token') || localStorage.getItem('token');

      const response = await axios.get('http://localhost:8001/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        // Filtramos para quitar al admin
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const soloClientes = response.data.data.filter((user: any) => user.rol !== 'admin');

        // Mapeamos los datos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const usuariosAdaptados = soloClientes.map((u: any) => ({
          id: u.id,
          nombre: u.nombre,
          email: u.email,
          rol: u.rol,
          telefono: u.telefono || 'N/A',
          fechaCreacion: u.fecha_creacion ? new Date(u.fecha_creacion).toLocaleDateString() : 'N/A'
        }));
        
        // AQUI ESTA LA CLAVE: Ahora sí podemos usar setRows
        setRows(usuariosAdaptados);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  // 3. USE EFFECT: Esto hace que la función se ejecute apenas entras a la página
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Lógica del buscador
  const usuariosFiltrados = rows.filter(row => 
    row.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    row.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3, fontFamily: 'Montserrat, sans-serif' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: '#815041d5', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold', mb: 2 , textAlign: 'center' }}
      >
        Usuarios Registrados
      </Typography>

      <Paper sx={{ mb: 2, p: 2 }}>
        <Toolbar sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
          <TextField
            variant="standard"
            placeholder="Buscar por nombre, email..."
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)} // Conectamos el buscador
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
            sx={{
              flexGrow: 1,
              width: { xs: '100%', sm: 'auto' }
            }}
          />
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            size="small"
            sx={{
              ml: { sm: 2 },
              mt: { xs: 1, sm: 0 },
              backgroundColor: '#5d4037',
              width: { xs: '100%', sm: 'auto' },
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Agregar
          </Button>
        </Toolbar>
      </Paper>

      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* OJO: Aquí cambié "rows.map" por "usuariosFiltrados.map" */}
          {usuariosFiltrados.map(row => (
            <Card key={row.id}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#53271aff' }}>
                  {row.nombre}
                </Typography>
                <Typography variant="body2">Rol: {row.rol}</Typography>
                <Typography variant="body2">Teléfono: {row.telefono}</Typography>
                <Typography variant="body2">Email: {row.email}</Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                  Creado: {row.fechaCreacion}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Paper sx={{ height: 600, width: '100%', backgroundColor: '#ffffff' }}>
          <DataGrid
            // OJO: Aquí también cambié rows por usuariosFiltrados
            rows={usuariosFiltrados} 
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 }
              }
            }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            slots={{ toolbar: GridToolbar }}
            sx={{
              border: 'none',
              fontFamily: 'Montserrat, sans-serif',
              '& .MuiDataGrid-cell': {
                color: '#68493fff',
                fontFamily: 'Montserrat, sans-serif'
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontFamily: 'Montserrat, sans-serif'
              },
              '& .MuiDataGrid-toolbarContainer': {
                fontFamily: 'Montserrat, sans-serif'
              }
            }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default UsuariosPage;