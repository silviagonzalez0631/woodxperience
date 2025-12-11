import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    // Aseguramos la importación correcta del componente Grid de MUI
    Grid, 
    Card,
    CardContent,
    Paper,
    ButtonGroup,
    Button,
    IconButton,
    Link,
    Rating,
    Switch,
    Tooltip,
    TextField,
    Alert,
    Toolbar,
    InputAdornment
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
// CORRECCIÓN #2: Unificación de la importación de tipos.
import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'; 
import StarIcon from '@mui/icons-material/Star';
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteIcon from '@mui/icons-material/Delete';
// CORRECCIÓN #1: Se elimina la importación de CloseIcon, ya que no se usa.
// import CloseIcon from '@mui/icons-material/Close'; 
import SearchIcon from '@mui/icons-material/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

// --- Definiciones de Tipos de Estado ---

// Tipo de dato adaptado para la tabla de React (UI)
interface ReseñaRow {
    id: number;
    producto_id: number;
    usuario_id: number;
    puntuacion: number;
    comentario: string;
    fecha: string;
    publicado: boolean;
    cliente: string; 
    producto: string; 
    respuesta: string;
}

// Tipo para la fila que viene directamente de la API de Deno (para evitar 'any')
interface ReseñaApiRow {
    id: number;
    producto_id: number;
    usuario_id: number;
    puntuacion: number;
    comentario: string;
    // Asumiendo que la respuesta es un campo opcional o se mapea
    respuesta?: string | null; 
    // Añade aquí el resto de campos de la API
}


// --- Componente de Rating para la Puntuación ---
// Tipado correcto para la función de renderizado de celda
const getRatingCell = (params: GridRenderCellParams<ReseñaRow, number>) => (
    <Rating value={params.value} readOnly />
);


const ResenasPage: React.FC = () => {
    const [reviews, setReviews] = useState<ReseñaRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [filter, setFilter] = useState<string | number>('Todas');
    const [replyRowId, setReplyRowId] = useState<number | null>(null); 
    const [search, setSearch] = useState('');
    const [replyText, setReplyText] = useState('');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleReplyToggle = useCallback((id: number, currentReply: string) => {
        setReplyRowId(replyRowId === id ? null : id);
        setReplyText(replyRowId === id ? '' : currentReply);
    }, [replyRowId]);
    
    const handleReplySubmit = (id: number) => {
        // Lógica de API (PUT/PATCH) para guardar la respuesta
        alert(`Enviando respuesta a reseña ${id}: ${replyText}`);
        
        // Actualizar estado local
        setReviews(prevReviews => prevReviews.map(rev => 
            rev.id === id ? { ...rev, respuesta: replyText } : rev
        ));

        setReplyRowId(null);
        setReplyText('');
    };

    // --- 1. CARGAR RESEÑAS (GET) ---
    const fetchReseñas = useCallback(async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const response = await axios.get('http://localhost:8001/reseñas', {
                headers: { Authorization: `Bearer ${token}` } 
            }); 

            if (response.data.success && Array.isArray(response.data.data)) {
                // CORRECCIÓN #2: Usamos ReseñaApiRow para el mapeo
                const adaptedReviews: ReseñaRow[] = response.data.data.map((rev: ReseñaApiRow) => ({ 
                    id: rev.id,
                    producto_id: rev.producto_id,
                    usuario_id: rev.usuario_id,
                    puntuacion: rev.puntuacion,
                    comentario: rev.comentario,
                    fecha: new Date().toISOString(), // Usar la fecha real de la API si existe
                    publicado: true,
                    cliente: `Cliente ID: ${rev.usuario_id}`, 
                    producto: `Producto ID: ${rev.producto_id}`, 
                    respuesta: rev.respuesta || "", 
                }));
                setReviews(adaptedReviews);
            } else {
                setErrorMsg("Formato de datos de reseña inesperado.");
            }
        } catch (error) {
            console.error("Error fetching reseñas", error);
            setErrorMsg("No se pudieron cargar las reseñas. ¿Está el servidor Deno corriendo y se está enviando el token?");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReseñas();
    }, [fetchReseñas]);


    // --- Definición de Columnas para DataGrid ---
    // Agregamos el tipado para GridColDef<ReseñaRow> para mayor seguridad
    const columns: GridColDef<ReseñaRow>[] = [
        {
            field: 'puntuacion',
            headerName: 'Puntuación',
            width: 130,
            renderCell: getRatingCell,
        },
        {
            field: 'producto',
            headerName: 'Producto (Mock)',
            width: 200,
            renderCell: (params) => (
                <Link href="#" underline="hover" onClick={(e) => e.preventDefault()} sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {params.value}
                </Link>
            ),
        },
        { 
            field: 'cliente', 
            headerName: 'Cliente (Mock)',
            width: 180 
        },
        {
            field: 'comentario',
            headerName: 'Comentario',
            width: 300,
            renderCell: (params: GridRenderCellParams<ReseñaRow, string>) => (
                <Tooltip title={params.value} placement="bottom-start">
                    <Typography noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Montserrat, sans-serif' }}>
                        {params.value}
                    </Typography>
                </Tooltip>
            ),
        },
        { 
            field: 'fecha', 
            headerName: 'Fecha', 
            width: 100,
            type: 'date',
            valueFormatter: (value: string) => new Date(value).toLocaleDateString(),
        },
        {
            field: 'publicado',
            headerName: 'Publicado',
            width: 120,
            renderCell: (params: GridRenderCellParams<ReseñaRow, boolean>) => (
                <Switch 
                    checked={params.value} 
                    onChange={() => alert(`Toggling status for review ${params.id}`)} 
                    color="success"
                />
            ),
        },
        {
            field: 'acciones',
            headerName: 'Acciones / Respuesta',
            width: 250, 
            sortable: false,
            // Agregamos tipado explícito aquí para prevenir errores de inferencia
            renderCell: (params: GridRenderCellParams<ReseñaRow>) => { 
                const rowId = params.row.id;
                
                if (rowId === replyRowId) {
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, width: '100%' }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Escribe la respuesta"
                                value={replyText} 
                                onChange={(e) => setReplyText(e.target.value)}
                                sx={{ mb: 0.5 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button 
                                    size="small" 
                                    variant="contained" 
                                    onClick={() => handleReplySubmit(rowId)}
                                    sx={{ backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' }, fontFamily: 'Montserrat, sans-serif' }}
                                    disabled={replyText.trim() === ''}
                                >
                                    Enviar
                                </Button>
                                <Button 
                                    size="small" 
                                    variant="outlined" 
                                    onClick={() => handleReplyToggle(rowId, params.row.respuesta)}
                                    sx={{ color: '#5d4037', borderColor: '#c8b7b5', fontFamily: 'Montserrat, sans-serif' }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>
                    );
                } else {
                    return (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                                size="small" 
                                onClick={() => handleReplyToggle(rowId, params.row.respuesta)} 
                                color={params.row.respuesta ? "primary" : "default"}
                            >
                                <Tooltip title={params.row.respuesta ? "Editar Respuesta" : "Responder"}>
                                    <ReplyIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton size="small" onClick={() => alert(`Eliminar reseña ${rowId}`)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    );
                }
            }
        },
    ];

    // --- Lógica de filtrado en Frontend ---
    const filteredRows: ReseñaRow[] = reviews 
        .filter(row => {
            let matchesFilter = true;
            if (filter === 'Pendientes') {
                matchesFilter = row.respuesta.trim() === ''; 
            } else if (typeof filter === 'number') {
                matchesFilter = row.puntuacion === filter;
            }

            const searchLower = search.toLowerCase();
            const matchesSearch = row.comentario.toLowerCase().includes(searchLower) ||
                                  row.cliente.toLowerCase().includes(searchLower) ||
                                  row.producto.toLowerCase().includes(searchLower);

            return matchesFilter && matchesSearch;
        });

    // Cálculo de Puntuación Media
    const totalReviews = reviews.length;
    const averageScore = totalReviews > 0 
        ? reviews.reduce((acc, r) => acc + r.puntuacion, 0) / totalReviews 
        : 0;

    return (
        <Box sx={{ padding: 3, fontFamily: 'Montserrat, sans-serif' }}>
            
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    color: '#815041d5',
                    fontFamily: 'Montserrat, sans-serif',
                    textAlign: 'center',
                    mb: 3,
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                }}
            >
                <FontAwesomeIcon icon={faStar} style={{ fontSize: '1.6rem', color: '#4f3027d5' }} />
                Gestión de Reseñas y Feedback
            </Typography>

            {errorMsg && (
                <Alert severity="error" sx={{ mb: 2, fontFamily: 'Montserrat, sans-serif' }}>
                    {errorMsg}
                </Alert>
            )}
            
            {/* BARRA DE HERRAMIENTAS Y ESTADÍSTICAS */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* CORRECCIÓN #4: Grid Item 1 (Asegurar prop item) */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontFamily: 'Montserrat, sans-serif' }}>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography color="textSecondary" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                                Puntuación Media General
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <Typography variant="h4" component="div" sx={{ color: '#5d4037', fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>
                                    {averageScore.toFixed(1)}
                                </Typography>
                                <StarIcon sx={{ color: '#faaf00', fontSize: '2rem' }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                {/* CORRECCIÓN #4: Grid Item 2 (Asegurar prop item) */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', fontFamily: 'Montserrat, sans-serif' }}>
                        {/* Campo de búsqueda */}
                        <Toolbar sx={{ padding: '0 !important', mb: isMobile ? 1 : 0 }}>
                            <TextField
                                variant="standard"
                                placeholder="Buscar por comentario, cliente, producto..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                    ),
                                    sx: { '& input': { fontFamily: 'Montserrat, sans-serif' } }
                                }}
                                sx={{ flexGrow: 1, mr: 2 }}
                            />
                        </Toolbar>
                        
                        {/* Filtros rápidos */}
                        <Typography variant="body2" sx={{ mb: 1, color: '#5d4037', fontFamily: 'Montserrat, sans-serif' }}>
                            Filtros rápidos:
                        </Typography>
                        <ButtonGroup variant="outlined" aria-label="Filtros de puntuación" sx={{ flexWrap: 'wrap' }}>
                            {['Todas', 5, 4, 3, 2, 1, 'Pendientes'].map(item => (
                                <Button
                                    key={item}
                                    onClick={() => setFilter(item)}
                                    variant={filter === item ? 'contained' : 'outlined'}
                                    sx={{
                                        fontFamily: 'Montserrat, sans-serif',
                                        minWidth: 'auto', 
                                        ...(filter === item
                                            ? { backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } }
                                            : { color: '#5d4037', borderColor: '#c8b7b5' })
                                    }}
                                >
                                    {typeof item === 'number' ? (
                                        <Box sx={{ display: 'flex', fontFamily: 'Montserrat, sans-serif' }}>
                                            {item}
                                            <StarIcon sx={{ fontSize: '1rem', ml: 0.5 }} />
                                        </Box>
                                    ) : (
                                        item
                                    )}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Paper>
                </Grid>
            </Grid>
            
            {/* VISTA MÓVIL (CARDS) */}
            {isMobile ? (
                // ... (El resto de la vista móvil)
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredRows.map(r => (
                    <Card key={r.id}>
                        <CardContent sx={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5d4037' }}>
                            Reseña #{r.id} ({r.producto})
                        </Typography>
                        <Typography variant="body2">Cliente: {r.cliente}</Typography>
                        <Box sx={{ mt: 0.5, mb: 1 }}>
                            <Rating value={r.puntuacion} readOnly size="small" />
                        </Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>Comentario: {r.comentario}</Typography>
                        <Typography variant="caption" color="textSecondary">Fecha: {new Date(r.fecha).toLocaleDateString()}</Typography>

                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                              <Typography variant="body2" component="span">Publicado:</Typography>
                              <Switch checked={r.publicado} onChange={() => alert(`Toggling status for review ${r.id}`)} size="small" color="success" />
                            </Box>
                            <IconButton size="small" onClick={() => handleReplyToggle(r.id, r.respuesta)} color={r.respuesta ? "primary" : "default"}>
                                <ReplyIcon />
                            </IconButton>
                            <IconButton size="small" onClick={() => alert(`Eliminar reseña ${r.id}`)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                        {/* Lógica de respuesta en la vista móvil */}
                        {(r.id === replyRowId) && (
                          <Box sx={{ mt: 2 }}>
                            <TextField
                              fullWidth
                              label="Responder a la Reseña"
                              multiline
                              rows={3}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              variant="outlined"
                              size="small"
                              sx={{ mb: 1 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                <Button variant="contained" size="small" onClick={() => handleReplySubmit(r.id)} sx={{ backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } }} disabled={replyText.trim() === ''}>
                                    Enviar Respuesta
                                </Button>
                                <Button variant="outlined" size="small" onClick={() => handleReplyToggle(r.id, r.respuesta)}>
                                    Cancelar
                                </Button>
                            </Box>
                          </Box>
                        )}
                        </CardContent>
                    </Card>
                    ))}
                </Box>
            ) : (
            /* VISTA PC (TABLA) */
            <Paper sx={{ width: '100%', backgroundColor: '#ffffff', minHeight: 400, height: 600 }}>
                {/* CORRECCIÓN #3: Tipado de getRowHeight (removido getDetailPanelHeight) */}
                <DataGrid<ReseñaRow>
                    rows={filteredRows}
                    columns={columns}
                    loading={loading}
                    // getRowHeight recibe un objeto de tipo GridRowHeightParams (con model)
                    // La tipamos correctamente aquí y aseguramos que la lógica funcione.
                    getRowHeight={({ model }) => model.id === replyRowId ? 100 : 52} 
                    initialState={{
                        pagination: { paginationModel: { page: 0, pageSize: 10 } }
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    disableRowSelectionOnClick
                    sx={{
                        border: 'none',
                        fontFamily: 'Montserrat, sans-serif',
                        '& .MuiDataGrid-cell': {
                            color: '#5d4037',
                            fontFamily: 'Montserrat, sans-serif',
                            py: '8px', 
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontFamily: 'Montserrat, sans-serif',
                        },
                    }}
                />
            </Paper>
            )}
        </Box>
    );
};

export default ResenasPage;