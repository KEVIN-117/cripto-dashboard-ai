"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import {
    Box,
    Typography,
    Modal,
    TextField,
    Fade,
    Backdrop,
    Alert,
    CircularProgress,
    IconButton,
    Stack,
    Select,
    MenuItem,
} from "@mui/material"
import { Add, Close, CheckCircle } from "@mui/icons-material"
import { useTheme as useMuiTheme } from "@mui/material/styles"
import { createTodo } from "@/actions/getAllTodo"
import { Button } from "./button/Button"
interface FormErrors {
    title?: string
    description?: string
    priority?: string

}

export function CreateTodoForm() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
    })

    const theme = useMuiTheme()

    const handleOpen = () => setOpen(true)

    const handleClose = () => {
        if (!loading) {
            setOpen(false)
            setSuccess(false)
            setErrors({})
            setFormData({ title: "", description: "", priority: "medium" })
        }
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.title.trim()) {
            newErrors.title = "El título es requerido"
        } else if (formData.title.length < 3) {
            newErrors.title = "El título debe tener al menos 3 caracteres"
        }

        if (!formData.description.trim()) {
            newErrors.description = "La descripción es requerida"
        } else if (formData.description.length < 10) {
            newErrors.description = "La descripción debe tener al menos 10 caracteres"
        }
        if (!["low", "medium", "high"].includes(formData.priority)) {
            newErrors.priority = "Prioridad inválida"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setErrors({})
        console.log(formData);


        try {
            const submitFormData = new FormData()
            submitFormData.append("title", formData.title)
            submitFormData.append("description", formData.description)
            submitFormData.append("priority", formData.priority)

            await createTodo(submitFormData)
            setSuccess(true)

            // Auto close after success
            setTimeout(() => {
                handleClose()
            }, 2000)
        } catch (error) {
            console.error("Error creating todo:", error)
            setErrors({ title: "Error al crear el todo. Inténtalo de nuevo." })
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }))

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: undefined,
            }))
        }
    }

    return (
        <>
            <Button
                ButtonType="gradient"
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpen}
                sx={{
                    borderRadius: 3,
                    px: 3,
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                }}
            >
                Crear Todo
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    sx: {
                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                        backdropFilter: "blur(12px)",
                    },
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: { xs: "90%", sm: 500 },
                            maxWidth: 500,
                            bgcolor: "background.paper",
                            borderRadius: 4,
                            boxShadow:
                                theme.palette.mode === "light"
                                    ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    : "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                            p: 0,
                            overflow: "hidden",
                            border: `1px solid ${theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800]}`,
                        }}
                    >
                        {/* Header with gradient */}
                        <Box
                            sx={{
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                p: 3,
                                position: "relative",
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    color: "white",
                                    mb: 1,
                                    background: "none",
                                    WebkitTextFillColor: "white",
                                }}
                            >
                                ✨ Crear Todo
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "rgba(255, 255, 255, 0.9)",
                                    fontSize: "0.95rem",
                                }}
                            >
                                Organiza tus ideas y tareas de manera futurista
                            </Typography>

                            <IconButton
                                onClick={handleClose}
                                disabled={loading}
                                sx={{
                                    position: "absolute",
                                    right: 16,
                                    top: 16,
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    },
                                }}
                            >
                                <Close />
                            </IconButton>
                        </Box>

                        {/* Form Content */}
                        <Box sx={{ p: 4 }}>
                            {success ? (
                                <Stack spacing={3} alignItems="center" sx={{ py: 2 }}>
                                    <CheckCircle
                                        sx={{
                                            fontSize: 64,
                                            color: "success.main",
                                            animation: "pulse 2s infinite",
                                        }}
                                    />
                                    <Typography variant="h6" color="success.main" textAlign="center">
                                        ¡Todo creado exitosamente!
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" textAlign="center">
                                        Cerrando automáticamente...
                                    </Typography>
                                </Stack>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <Stack spacing={3}>
                                        {errors.title && !errors.description && (
                                            <Alert severity="error" sx={{ borderRadius: 2 }}>
                                                {errors.title}
                                            </Alert>
                                        )}

                                        <TextField
                                            fullWidth
                                            label="Título"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange("title")}
                                            error={!!errors.title}
                                            helperText={errors.title || "Ingresa un título descriptivo para tu todo"}
                                            disabled={loading}
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputLabel-root": {
                                                    fontWeight: 600,
                                                },
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Descripción"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange("description")}
                                            error={!!errors.description}
                                            helperText={errors.description || "Describe los detalles de tu tarea"}
                                            disabled={loading}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputLabel-root": {
                                                    fontWeight: 600,
                                                },
                                            }}
                                        />
                                        <Select
                                            fullWidth
                                            label="Prioridad"
                                            name="priority"
                                            disabled={loading}
                                            value={formData.priority}
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    priority: e.target.value as "low" | "medium" | "high",
                                                }))
                                            }}
                                            variant="outlined"
                                            sx={{
                                                "& .MuiInputLabel-root": {
                                                    fontWeight: 600,
                                                },
                                            }}
                                        >
                                            <MenuItem value="low">Baja</MenuItem>
                                            <MenuItem value="medium">Media</MenuItem>
                                            <MenuItem value="high">Alta</MenuItem>
                                        </Select>

                                        <Button
                                            ButtonType="gradient"
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={loading || !formData.title.trim() || !formData.description.trim()}
                                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Add />}
                                            sx={{
                                                mt: 2,
                                                py: 1.5,
                                                fontSize: "1.1rem",
                                                fontWeight: 600,
                                                borderRadius: 3,
                                                background: loading
                                                    ? theme.palette.grey[400]
                                                    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                                "&:hover": {
                                                    transform: loading ? "none" : "translateY(-2px)",
                                                    boxShadow: loading ? "none" : `0 12px 35px ${theme.palette.primary.main}50`,
                                                },
                                                transition: "all 0.3s ease",

                                            }}
                                        >
                                            <Typography color="textPrimary">
                                                {loading ? "Creando..." : "Crear Todo"}
                                            </Typography>
                                        </Button>
                                    </Stack>
                                </form>
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}
