import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Toolbar, TextField, InputAdornment, Button, Chip, Select, MenuItem, ButtonGroup, Link, Card, CardContent, Alert } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

// --- Definiciones de Tipos de Estado ---
type OrdenEstadoDB = 'pendiente' | 'en_proceso' | 'enviado' | 'completado' | 'cancelado';

// Mapeo de estado de DB a etiqueta y color de UI
const statusMap: Record<OrdenEstadoDB, { label: string, color: 'default' | 'primary' | 'warning' | 'success' | 'error' }> = {
    'pendiente': { label: 'Pendiente', color: 'warning' },
    'en_proceso': { label: 'En Proceso', color: 'primary' },
    'enviado': { label: 'Enviado', color: 'default' },
    'completado': { label: 'Completado', color: 'success' },
    'cancelado': { label: 'Cancelado', color: 'error' },
};

// Tipo de dato adaptado para la tabla de React
interface OrdenRow {
    id: number;
    usuario_id: number;
    cliente_nombre: string; // Ficticio por ahora, usar ID real
    fecha_orden: string;
    total: number;
    estado: OrdenEstadoDB;
}

const getStatusChip = (params: GridRenderCellParams) => {
    const status = (params.value as OrdenEstadoDB) || 'pendiente';
    const info = statusMap[status] || statusMap['pendiente'];
    return <Chip label={info.label} color={info.color} size="small" />;
};

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID Orden',
        width: 120,
        renderCell: (params) => (
            <Link href="#" underline="always" onClick={(e) => { e.preventDefault(); alert(`Abrir detalle de orden #${params.value}`); }}>
                #{params.value}
            </Link>
        )
    },
    // NOTA: 'cliente_nombre' es un campo temporal, en el futuro deberías hacer un JOIN en Deno
    { field: 'usuario_id', headerName: 'ID Cliente', width: 100 }, 
    { field: 'cliente_nombre', headerName: 'Cliente (Mock)', width: 220 }, // Usamos un mock para llenar el espacio
    { 
        field: 'fecha_orden', 
        headerName: 'Fecha', 
        width: 150, 
        type: 'date', 
        valueFormatter: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
        field: 'total',
        headerName: 'Total',
        width: 150,
        type: 'number',
        valueFormatter: (value: number) =>
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
        renderCell: (params) => {
            const currentStatus = params.row.estado as OrdenEstadoDB;
            return (
                <Select
                    size="small"
                    value={currentStatus}
                    onChange={(e) => alert(`Cambiar estado de orden #${params.row.id} a ${e.target.value}`)}
                    sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                    displayEmpty
                >
                    <MenuItem disabled value={currentStatus}>
                        {statusMap[currentStatus] ? statusMap[currentStatus].label : 'Cambiar Estado'}
                    </MenuItem>
                    {Object.keys(statusMap).map(statusKey => (
                        <MenuItem 
                            key={statusKey} 
                            value={statusKey}
                        >
                            {statusMap[statusKey as OrdenEstadoDB].label}
                        </MenuItem>
                    ))}
                </Select>
            );
        }
    }
];

const OrdenesPage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [rows, setRows] = useState<OrdenRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('Todos');
    const [search, setSearch] = useState('');

    // --- 1. CARGAR ORDENES (GET) ---
    const fetchOrdenes = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token');
            const response = await axios.get('http://localhost:8001/ordenes', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                // Adaptamos los datos de Deno al formato de la tabla
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const ordenesAdaptadas = response.data.data.map((ord: any) => ({
                    id: ord.id,
                    usuario_id: ord.usuario_id,
                    // Temporalmente, usamos el ID del cliente como un nombre simulado
                    cliente_nombre: `Cliente ID: ${ord.usuario_id}`, 
                    fecha_orden: ord.fecha_orden,
                    // El total viene como string desde la DB, lo parseamos a float/number
                    total: parseFloat(ord.total), 
                    estado: ord.estado as OrdenEstadoDB,
                }));
                setRows(ordenesAdaptadas);
            }
        } catch (error) {
            console.error("Error fetching órdenes", error);
            setErrorMsg("No se pudieron cargar las órdenes. ¿Está el servidor Deno corriendo?");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrdenes();
    }, []);

    // --- Lógica de filtrado en Frontend ---
    const filteredRows = rows.filter(row => {
        // Filtro de estado
        const matchesStatus = statusFilter === 'Todos' || row.estado === statusFilter;
        
        // Filtro de búsqueda por ID o nombre (por ahora, solo ID/ID Cliente)
        const searchLower = search.toLowerCase();
        const matchesSearch = row.id.toString().includes(searchLower) ||
                              row.usuario_id.toString().includes(searchLower) ||
                              row.cliente_nombre.toLowerCase().includes(searchLower);

        return matchesStatus && matchesSearch;
    });

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#5d4037' }}>
                Seguimiento de Órdenes
            </Typography>

            {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
            
            {/* BARRA DE HERRAMIENTAS */}
            <Paper sx={{ mb: 2, p: 2 }}>
                {isMobile ? (
                    <>
                        <Toolbar sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 0 }}>
                            <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                                <TextField
                                    variant="standard"
                                    placeholder="Buscar por ID, cliente..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
                                    sx={{ flex: 1 }}
                                />
                                <Button variant="outlined" sx={{ color: '#5d4037', borderColor: '#5d4037', whiteSpace: 'nowrap' }}>Filtro Avanzado</Button>
                            </Box>
                            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                                <ButtonGroup variant="outlined" aria-label="Filtros de estado" sx={{ display: 'inline-flex' }}>
                                    {['Todos', ...Object.keys(statusMap)].map(status => (
                                        <Button
                                            key={status}
                                            onClick={() => setStatusFilter(status)}
                                            variant={statusFilter === status ? 'contained' : 'outlined'}
                                            sx={statusFilter === status ? { backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } } : { color: '#5d4037', borderColor: '#c8b7b5' }}
                                        >
                                            {status === 'Todos' ? 'Todos' : statusMap[status as OrdenEstadoDB].label}
                                        </Button>
                                    ))}
                                </ButtonGroup>
                            </Box>
                        </Toolbar>
                    </>
                ) : (
                    <>
                        <Toolbar sx={{ padding: 0 }}>
                            <TextField
                                variant="standard"
                                placeholder="Buscar por ID, cliente, email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ flexGrow: 1, mr: 2 }}
                            />
                            <Button variant="outlined" sx={{ color: '#5d4037', borderColor: '#5d4037' }}>
                                Filtro Avanzado
                            </Button>
                        </Toolbar>
                        <Toolbar sx={{ mt: 1, padding: 0 }}>
                            <Typography variant="body2" sx={{ mr: 2, color: '#5d4037' }}>Filtrar por estado:</Typography>
                            <ButtonGroup variant="outlined" aria-label="Filtros de estado">
                                {['Todos', ...Object.keys(statusMap)].map(status => (
                                    <Button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        variant={statusFilter === status ? 'contained' : 'outlined'}
                                        sx={statusFilter === status ? { backgroundColor: '#5d4037', '&:hover': { backgroundColor: '#4e342e' } } : { color: '#5d4037', borderColor: '#c8b7b5' }}
                                    >
                                        {status === 'Todos' ? 'Todos' : statusMap[status as OrdenEstadoDB].label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Toolbar>
                    </>
                )}
            </Paper>

            {/* VISTA MÓVIL (CARDS) */}
            {isMobile ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {filteredRows.map(r => (
                        <Card key={r.id}>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5d4037' }}>Orden #{r.id}</Typography>
                                <Typography variant="body2">Cliente: {r.cliente_nombre}</Typography>
                                <Typography variant="body2">Fecha: {new Date(r.fecha_orden).toLocaleDateString()}</Typography>
                                <Typography variant="body2">Total: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(r.total)}</Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Chip label={statusMap[r.estado].label} color={statusMap[r.estado].color} size="small" />
                                </Box>
                            </CardContent>
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
                        initialState={{
                            pagination: { paginationModel: { page: 0, pageSize: 10 } },
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        checkboxSelection
                        sx={{ border: 'none', '& .MuiDataGrid-cell': { color: '#5d4037' } }}
                    />
                </Paper>
            )}
        </Box>
    );
};

export default OrdenesPage;