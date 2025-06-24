"use client"

import { useState, useMemo } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    Switch,
    IconButton,
    Chip,
    Typography,
    Box,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Tooltip,
    Fade,
    Collapse,
    CircularProgress,
    TablePagination,
    useMediaQuery,
} from "@mui/material"
import {
    Search,
    Edit,
    Delete,
    FilterList,
    KeyboardArrowDown,
    KeyboardArrowUp,
    CalendarToday,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { updateStateTodo } from '@/actions/getAllTodo';
import type { TodoFilters } from "@/types/todo"
import type { Todo } from "@/page/TodoPage"

interface TodoTableProps {
    todos: Todo[]
    loading?: boolean
}

export function TodoTable({ todos, loading = false }: TodoTableProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    const [filters, setFilters] = useState<TodoFilters>({
        search: "",
        status: "all",
        priority: "all",
        sortBy: "createdAt",
        sortOrder: "desc",
    })

    const [showFilters, setShowFilters] = useState(false)
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    // Filter and sort todos
    const filteredTodos = useMemo(() => {
        const filtered = todos.filter((todo) => {
            const matchesSearch =
                todo.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                todo.description.toLowerCase().includes(filters.search.toLowerCase())

            const matchesStatus =
                filters.status === "all" ||
                (filters.status === "completed" && todo.completed) ||
                (filters.status === "pending" && !todo.completed)

            const matchesPriority = filters.priority === "all" || todo.priority === filters.priority

            return matchesSearch && matchesStatus && matchesPriority
        })


        return filtered
    }, [todos, filters])

    const paginatedTodos = useMemo(() => {
        const startIndex = page * rowsPerPage
        return filteredTodos.slice(startIndex, startIndex + rowsPerPage)
    }, [filteredTodos, page, rowsPerPage])

    const handleToggleComplete = async (todo: Todo) => {
        setLoadingStates((prev) => ({ ...prev, [todo.id]: true }))
        try {
            await updateStateTodo(todo.id)
            console.log("Updating todo state:", todo.id);

        } catch (error) {
            console.error("Error updating todo:", error)
        } finally {
            setLoadingStates((prev) => ({ ...prev, [todo.id]: false }))
        }
    }


    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case "high":
                return "error"
            case "medium":
                return "warning"
            case "low":
                return "success"
            default:
                return "default"
        }
    }

    const getPriorityIcon = (priority?: string) => {
        switch (priority) {
            case "high":
                return "🔴"
            case "medium":
                return "🟡"
            case "low":
                return "🟢"
            default:
                return "⚪"
        }
    }

    const handleEdit = (todo: Todo) => {
        console.log("Edit todo:", todo)
        // Implement edit functionality
    }

    const handleDelete = (id: number) => {
        console.log("Delete todo:", id)
    }

    if (loading) {
        return (
            <Card
                sx={{
                    p: 8,
                    textAlign: "center",
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                }}
            >
                <CircularProgress size={48} />
                <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
                    Cargando todos...
                </Typography>
            </Card>
        )
    }

    return (
        <Card
            sx={{
                overflow: "hidden",
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.palette.mode === "light" ? "0 20px 40px rgba(0, 0, 0, 0.1)" : "0 20px 40px rgba(0, 0, 0, 0.3)",
            }}
        >
            {/* Header with filters */}
            <Box
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    p: 3,
                    color: "white",
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                            📋 Mis Todos
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {filteredTodos.length} de {todos.length} tareas
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {filteredTodos.length} tareas completadas de {todos.length} totales
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1}>
                        <Tooltip title="Filtros">
                            <IconButton onClick={() => setShowFilters(!showFilters)} sx={{ color: "white" }}>
                                <FilterList />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Box>

            {/* Filters Section */}
            <Collapse in={showFilters}>
                <Box sx={{ p: 3, bgcolor: "background.default", borderBottom: `1px solid ${theme.palette.divider}` }}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            placeholder="Buscar todos..."
                            value={filters.search}
                            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search color="action" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ maxWidth: 400 }}
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    value={filters.status}
                                    label="Estado"
                                    onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
                                >
                                    <MenuItem value="all">Todos</MenuItem>
                                    <MenuItem value="pending">Pendientes</MenuItem>
                                    <MenuItem value="completed">Completados</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Prioridad</InputLabel>
                                <Select
                                    value={filters.priority}
                                    label="Prioridad"
                                    onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
                                >
                                    <MenuItem value="all">Todas</MenuItem>
                                    <MenuItem value="high">Alta</MenuItem>
                                    <MenuItem value="medium">Media</MenuItem>
                                    <MenuItem value="low">Baja</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ minWidth: 140 }}>
                                <InputLabel>Ordenar por</InputLabel>
                                <Select
                                    value={filters.sortBy}
                                    label="Ordenar por"
                                    onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
                                >
                                    <MenuItem value="createdAt">Fecha creación</MenuItem>
                                    <MenuItem value="updatedAt">Última actualización</MenuItem>
                                    <MenuItem value="title">Título</MenuItem>
                                    <MenuItem value="priority">Prioridad</MenuItem>
                                </Select>
                            </FormControl>

                            <Tooltip title={`Orden ${filters.sortOrder === "asc" ? "ascendente" : "descendente"}`}>
                                <IconButton
                                    onClick={() =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
                                        }))
                                    }
                                    sx={{
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 2,
                                    }}
                                >
                                    {filters.sortOrder === "asc" ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Box>
            </Collapse>

            {/* Table */}
            {filteredTodos.length === 0 ? (
                <Box sx={{ p: 8, textAlign: "center" }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        No se encontraron todos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {filters.search || filters.status !== "all" || filters.priority !== "all"
                            ? "Intenta ajustar los filtros"
                            : "¡Crea tu primer todo!"}
                    </Typography>
                </Box>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ bgcolor: "background.default" }}>
                                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Estado</TableCell>
                                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Título</TableCell>
                                    {!isMobile && <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Descripción</TableCell>}
                                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Prioridad</TableCell>
                                    {!isMobile && (
                                        <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <CalendarToday fontSize="small" />
                                                <span>Creado</span>
                                            </Stack>
                                        </TableCell>
                                    )}
                                    <TableCell sx={{ fontWeight: 700, color: "text.primary" }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedTodos.map((todo, index) => (
                                    <Fade in key={todo.id} timeout={300 + index * 100}>
                                        <TableRow
                                            sx={{
                                                "&:hover": {
                                                    bgcolor:
                                                        theme.palette.mode === "light" ? "rgba(99, 102, 241, 0.04)" : "rgba(129, 140, 248, 0.08)",
                                                    transition: "all 0.2s ease",
                                                },
                                                borderLeft: `4px solid ${todo.completed ? theme.palette.success.main : theme.palette.warning.main}`,
                                                // bg opacity based on completion status
                                                background: `linear-gradient(-135deg, ${todo.completed ? theme.palette.success.light : theme.palette.warning.light} 0%, ${theme.palette.background.default} 100%)`,

                                            }}
                                        >
                                            {/* Status */}
                                            <TableCell>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    {loadingStates[todo.id] ? (
                                                        <CircularProgress size={20} />
                                                    ) : (
                                                        <Switch
                                                            checked={todo.completed}
                                                            onChange={() => handleToggleComplete(todo)}
                                                            color="success"
                                                            size="small"
                                                        />
                                                    )}
                                                </Box>
                                            </TableCell>

                                            {/* Title */}
                                            <TableCell>
                                                <Box>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            textDecoration: todo.completed ? "line-through" : "none",
                                                            opacity: todo.completed ? 0.7 : 1,
                                                            mb: isMobile ? 0.5 : 0,
                                                        }}
                                                    >
                                                        {todo.title}
                                                    </Typography>
                                                    {isMobile && (
                                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                                                            {todo.description.length > 50
                                                                ? `${todo.description.substring(0, 50)}...`
                                                                : todo.description}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </TableCell>

                                            {/* Description (Desktop only) */}
                                            {!isMobile && (
                                                <TableCell>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            maxWidth: 200,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {todo.description}
                                                    </Typography>
                                                </TableCell>
                                            )}

                                            {/* Priority */}
                                            <TableCell>
                                                <Chip
                                                    label={todo.priority || "baja"}
                                                    color={getPriorityColor(todo.priority)}
                                                    size="small"
                                                    icon={<span>{getPriorityIcon(todo.priority)}</span>}
                                                    sx={{
                                                        fontWeight: 600,
                                                        textTransform: "capitalize",
                                                    }}
                                                />
                                            </TableCell>

                                            {/* Created Date (Desktop only) */}
                                            {!isMobile && (
                                                <TableCell>
                                                    <Typography variant="caption" color="textPrimary">
                                                        {formatDate(todo.createdAt)}
                                                    </Typography>
                                                </TableCell>
                                            )}

                                            {/* Actions */}
                                            <TableCell>
                                                <Stack direction="row" spacing={0.5}>
                                                    <Tooltip title="Editar">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleEdit(todo)}
                                                            sx={{
                                                                color: "primary.main",
                                                                "&:hover": {
                                                                    bgcolor: "primary.main",
                                                                    color: "white",
                                                                },
                                                            }}
                                                        >
                                                            <Edit fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>

                                                    <Tooltip title="Eliminar">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDelete(todo.id)}
                                                            disabled={loadingStates[todo.id]}
                                                            sx={{
                                                                color: "error.main",
                                                                "&:hover": {
                                                                    bgcolor: "error.main",
                                                                    color: "white",
                                                                },
                                                            }}
                                                        >
                                                            {loadingStates[todo.id] ? <CircularProgress size={16} /> : <Delete fontSize="small" />}
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    </Fade>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <TablePagination
                        component="div"
                        count={filteredTodos.length}
                        page={page}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(Number.parseInt(e.target.value, 10))
                            setPage(0)
                        }}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        labelRowsPerPage="Filas por página:"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
                        sx={{
                            borderTop: `1px solid ${theme.palette.divider}`,
                            bgcolor: "background.default",
                        }}
                    />
                </>
            )}
        </Card>
    )
}
