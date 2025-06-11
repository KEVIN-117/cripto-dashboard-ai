import type { BaseTheme } from './baseTheme'

export const darkTheme: BaseTheme = {
    colors: {
        primary: '#bb86fc',
        secondary: '#03dac6',
        background: '#121212',
        text: '#ffffff',
        border: '#333333',
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightBold: 700,
    },
    spacing: (factor) => `${0.25 * factor}rem`,
}

