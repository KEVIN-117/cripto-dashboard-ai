"use client"

import { IconButton, Tooltip } from "@mui/material"
import { Brightness4, Brightness7, SettingsBrightness } from "@mui/icons-material"
import { useTheme } from "@/theme/ThemeProvider"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const handleToggle = () => {
        if (theme === "light") {
            setTheme("dark")
        } else if (theme === "dark") {
            setTheme("system")
        } else {
            setTheme("light")
        }
    }

    const getIcon = () => {
        switch (theme) {
            case "light":
                return <Brightness7 />
            case "dark":
                return <Brightness4 />
            default:
                return <SettingsBrightness />
        }
    }

    const getTooltip = () => {
        switch (theme) {
            case "light":
                return "Cambiar a modo oscuro"
            case "dark":
                return "Cambiar a modo sistema"
            default:
                return "Cambiar a modo claro"
        }
    }

    return (
        <Tooltip title={getTooltip()}>
            <IconButton onClick={handleToggle} color="inherit">
                {getIcon()}
            </IconButton>
        </Tooltip>
    )
}
