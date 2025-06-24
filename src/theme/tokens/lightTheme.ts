import { BaseTheme } from './baseTheme';

export const lightTheme: BaseTheme = {
    colors: {
        primary: '#6200ea',
        secondary: '#03dac6',
        background: '#ffffff',
        text: '#000000',
        border: '#cccccc',
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightBold: 700,
    },
    spacing: (factor) => `${0.25 * factor}rem`,
}