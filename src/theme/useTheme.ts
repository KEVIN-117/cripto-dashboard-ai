import { createTheme } from "@mui/material/styles"

// Paleta de colores futurista
const futuristicPalette = {
    light: {
        primary: {
            main: "#6366f1", // Indigo vibrante
            light: "#818cf8",
            dark: "#4f46e5",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#06b6d4", // Cyan
            light: "#22d3ee",
            dark: "#0891b2",
            contrastText: "#ffffff",
        },
        background: {
            default: "#f8fafc",
            paper: "#ffffff",
        },
        surface: {
            main: "#f1f5f9",
            dark: "#e2e8f0",
        },
        accent: {
            main: "#8b5cf6", // Purple
            light: "#a78bfa",
            dark: "#7c3aed",
        },
        success: {
            main: "#10b981",
            light: "#34d399",
            dark: "#059669",
        },
        warning: {
            main: "#f59e0b",
            light: "#fbbf24",
            dark: "#d97706",
        },
        error: {
            main: "#ef4444",
            light: "#f87171",
            dark: "#dc2626",
        },
    },
    dark: {
        primary: {
            main: "#818cf8",
            light: "#a5b4fc",
            dark: "#6366f1",
            contrastText: "#000000",
        },
        secondary: {
            main: "#22d3ee",
            light: "#67e8f9",
            dark: "#06b6d4",
            contrastText: "#000000",
        },
        background: {
            default: "#0f172a",
            paper: "#1e293b",
        },
        surface: {
            main: "#334155",
            dark: "#475569",
        },
        accent: {
            main: "#a78bfa",
            light: "#c4b5fd",
            dark: "#8b5cf6",
        },
        success: {
            main: "#34d399",
            light: "#6ee7b7",
            dark: "#10b981",
        },
        warning: {
            main: "#fbbf24",
            light: "#fcd34d",
            dark: "#f59e0b",
        },
        error: {
            main: "#f87171",
            light: "#fca5a5",
            dark: "#ef4444",
        },
    },
}

// Declaración de módulo para extender el tema
declare module "@mui/material/styles" {
    interface Palette {
        surface: {
            main: string
            dark: string
        }
        accent: {
            main: string
            light: string
            dark: string
        }
    }

    interface PaletteOptions {
        surface?: {
            main: string
            dark: string
        }
        accent?: {
            main: string
            light: string
            dark: string
        }
    }
}

const createFuturisticTheme = (mode: "light" | "dark") => {
    const palette = futuristicPalette[mode]

    return createTheme({
        palette: {
            mode,
            ...palette,
            text: {
                primary: mode === "light" ? "#1e293b" : "#f1f5f9",
                secondary: mode === "light" ? "#64748b" : "#94a3b8",
            },
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h3: {
                fontWeight: 700,
                fontSize: "1.875rem",
                lineHeight: 1.2,
                background:
                    mode === "light"
                        ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                        : "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
            },
            body1: {
                fontSize: "1rem",
                lineHeight: 1.6,
            },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 12,
                        padding: "12px 24px",
                        boxShadow: "none",
                        background:
                            mode === "light"
                                ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                                : "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
                        "&:hover": {
                            boxShadow:
                                mode === "light" ? "0 8px 25px rgba(99, 102, 241, 0.3)" : "0 8px 25px rgba(129, 140, 248, 0.3)",
                            transform: "translateY(-2px)",
                            transition: "all 0.3s ease",
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 12,
                            backgroundColor: mode === "light" ? "#f8fafc" : "#334155",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                backgroundColor: mode === "light" ? "#f1f5f9" : "#475569",
                            },
                            "&.Mui-focused": {
                                backgroundColor: mode === "light" ? "#ffffff" : "#1e293b",
                                boxShadow:
                                    mode === "light" ? "0 0 0 3px rgba(99, 102, 241, 0.1)" : "0 0 0 3px rgba(129, 140, 248, 0.1)",
                            },
                        },
                    },
                },
            },
            MuiModal: {
                styleOverrides: {
                    backdrop: {
                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                        backdropFilter: "blur(8px)",
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                        boxShadow:
                            mode === "light" ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        },
        
    })
}

export { createFuturisticTheme }
