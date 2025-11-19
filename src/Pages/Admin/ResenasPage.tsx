import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Toolbar, ButtonGroup, Button, IconButton, Link, Rating, Switch, Tooltip, Collapse, TextField } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReplyIcon from '@mui/icons-material/Reply';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';

// --- Mock Data ---
const mockReviews = [
  { id: 1, productId: 1, producto: 'Sofá de 3 Puestos "Nórdico"', cliente: 'Leonardo Corredor', puntuacion: 5, comentario: '¡Excelente producto! Muy cómodo y el color es exactamente como en la foto. El servicio de entrega fue rápido y profesional. Totalmente recomendado.', fecha: '2024-07-30', publicado: true, respuesta: '' },
  { id: 2, productId: 3, producto: 'Lámpara de Pie "Industrial"', cliente: 'Jane Smith', puntuacion: 2, comentario: 'La lámpara llegó con un rasguño en la base y la luz parpadea a veces. No estoy satisfecha con la calidad por el precio que pagué.', fecha: '2024-07-29', publicado: true, respuesta: '' },
  { id: 3, productId: 2, producto: 'Mesa de Comedor "Roble"', cliente: 'Carlos Rivas', puntuacion: 4, comentario: 'La mesa es robusta y bonita, pero el manual de ensamblaje era un poco confuso. Me tomó más tiempo de lo esperado armarla.', fecha: '2024-07-28', publicado: false, respuesta: '' },
  { id: 4, productId: 1, producto: 'Sofá de 3 Puestos "Nórdico"', cliente: 'Ana Gómez', puntuacion: 5, comentario: 'Simplemente perfecto. Es el centro de atención de mi sala.', fecha: '2024-07-27', publicado: true, respuesta: '¡Muchas gracias Ana! Nos alegra que te encante.' },
];

const averageScore = mockReviews.reduce((acc, r) => acc + r.puntuacion, 0) / mockReviews.length;

const ResenasPage: React.FC = () => {
  const [filter, setFilter] = useState<string | number>('Todas');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleReplyClick = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const columns: GridColDef[] = [
    {
      field: 'puntuacion',
      headerName: 'Puntuación',
      width: 150,
      renderCell: (params: GridRenderCellParams) => <Rating value={params.value} readOnly />,
    },
    {
      field: 'producto',
      headerName: 'Producto',
      width: 220,
      renderCell: (params) => (
        <Link href="#" underline="hover" onClick={(e) => e.preventDefault()}>
          {params.value}
        </Link>
      ),
    },
    { field: 'cliente', headerName: 'Cliente', width: 180 },
    {
      field: 'comentario',
      headerName: 'Comentario',
      width: 350,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={params.value} placement="bottom-start">
          <Typography noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    { field: 'fecha', headerName: 'Fecha', width: 120 },
    {
      field: 'publicado',
      headerName: 'Estado',
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Switch checked={params.value} onChange={() => alert(`Toggling status for review ${params.id}`)} />
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleReplyClick(params.row.id)} color={expandedRow === params.row.id ? "primary" : "default"}>
            <ReplyIcon />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredRows = mockReviews.filter(row => {
    if (filter === 'Todas') return true;
    if (filter === 'Pendientes') return !row.publicado;
    return row.puntuacion === filter;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#5d4037' }}>
        Gestión de Reseñas y Feedback
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>Puntuación Media General</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                <Typography variant="h4" component="div" sx={{ color: '#5d4037', fontWeight: 'bold' }}>
                  {averageScore.toFixed(1)}
                </Typography>
                <StarIcon sx={{ color: '#faaf00', fontSize: '2rem' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#5d4037' }}>Filtros rápidos:</Typography>
                <ButtonGroup variant="outlined" aria-label="Filtros de puntuación">
                    {['Todas', 5, 4, 3, 2, 1, 'Pendientes'].map(item => (
                        <Button 
                            key={item} 
                            onClick={() => setFilter(item)}
                            variant={filter === item ? 'contained' : 'outlined'}
                            sx={filter === item ? { backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } } : { color: '#5d4037', borderColor: '#c8b7b5' }}
                        >
                            {typeof item === 'number' ? <Box sx={{display: 'flex'}}>{item}<StarIcon sx={{fontSize: '1rem', ml: 0.5}} /></Box> : item}
                        </Button>
                    ))}
                </ButtonGroup>
            </Paper>
        </Grid>
      </Grid>

      {isMobile ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredRows.map(r => (
            <Card key={r.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5d4037' }}>{r.producto}</Typography>
                    <Typography variant="body2">Cliente: {r.cliente}</Typography>
                    <Typography variant="body2">Fecha: {r.fecha}</Typography>
                  </Box>
                  <Rating value={r.puntuacion} readOnly />
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>{r.comentario}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button size="small" onClick={() => handleReplyClick(r.id)} variant={expandedRow === r.id ? 'contained' : 'outlined'} sx={expandedRow === r.id ? { backgroundColor: '#5d4037' } : { color: '#5d4037' }}>Responder</Button>
                  <Button size="small" color="error" variant="outlined">Eliminar</Button>
                </Box>
                <Collapse in={expandedRow === r.id} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 1 }}>
                    <TextField fullWidth multiline rows={3} variant="outlined" placeholder="Escribe una respuesta pública..." />
                    <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#5d4037' }}>Publicar Respuesta</Button>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Paper sx={{ height: 'auto', width: '100%', backgroundColor: '#ffffff' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            autoHeight
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 20]}
            sx={{ border: 'none', '& .MuiDataGrid-cell': { color: '#5d4037' } }}
            getRowId={(row) => row.id}
            components={{
              Row: (props) => {
                const { row } = props;
                const isExpanded = expandedRow === row.id;
                return (
                  <>
                    <props.DataGridRow {...props} />
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, backgroundColor: '#fafafa', borderBottom: '1px solid #eee' }}>
                        <Typography variant="subtitle2" gutterBottom>Responder a {row.cliente}:</Typography>
                        {row.respuesta && <Typography variant="body2" sx={{mb: 1, fontStyle: 'italic'}}>Respuesta actual: "{row.respuesta}"</Typography>}
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          variant="outlined"
                          placeholder="Escribe una respuesta pública..."
                          defaultValue={row.respuesta}
                        />
                        <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } }}>Publicar Respuesta</Button>
                      </Box>
                    </Collapse>
                  </>
                );
              },
            }}
          />
        </Paper>
      )}
    </Box>
  );
};

export default ResenasPage;
