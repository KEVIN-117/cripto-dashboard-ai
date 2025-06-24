export interface BaseTheme {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        border: string;
    };
    typography: {
        fontFamily: string;
        fontSize: number;
        fontWeightBold: number;
    };
    spacing: (factor: number) => string;
}