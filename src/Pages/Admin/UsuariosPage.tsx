import React from 'react';
import { Box, Typography, Paper, Toolbar, TextField, InputAdornment, Button } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'No.', width: 90 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 250,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Aquí iría el Avatar con la foto */}
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
    renderCell: () => "..." // Placeholder for action buttons
  }
];

const rows = [
  { id: 1, nombre: 'Leonardo Corredor', rol: 'Admin', telefono: '3001234567', fechaCreacion: '2024-07-29', email: 'leo@example.com' },
  { id: 2, nombre: 'Jane Smith', rol: 'Cliente', telefono: '3017654321', fechaCreacion: '2024-07-28', email: 'jane@example.com' },
  // ... más datos de ejemplo
];

const UsuariosPage: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#5d4037' }}>
        Usuarios Registrados
      </Typography>
      <Paper sx={{ mb: 2, p: 2 }}>
        <Toolbar>
            <TextField
                variant="standard"
                placeholder="Buscar por nombre, email..."
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
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell': {
              color: '#5d4037',
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default UsuariosPage;
