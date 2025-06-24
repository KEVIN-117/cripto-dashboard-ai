import { Button as BaseButton, styled, ButtonProps as MUIButtonProps } from '@mui/material';
type ButtonType = 'alert' | 'success' | 'warning' | 'default' | 'gradient';
import React from 'react';
interface ButtonProps extends MUIButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    ButtonType?: ButtonType;
}

const StyledButton = styled(BaseButton)<{ ButtonType?: ButtonType }>(({ theme, ButtonType }) => {
    switch (ButtonType) {
        case 'alert':
            return {
                background: theme.palette.error.dark,
                color: theme.palette.error.contrastText,
                '&:hover': {
                    background: theme.palette.error.main,
                },
            };
        case 'success':
            return {
                background: theme.palette.success.dark,
                color: theme.palette.success.contrastText,
                '&:hover': {
                    background: theme.palette.success.main,
                },
            };
        case 'warning':
            return {
                background: theme.palette.warning.dark,
                color: theme.palette.warning.contrastText,
                '&:hover': {
                    background: theme.palette.warning.main,
                },
            };
        case 'gradient':
            return {
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                color: '#fff',
                '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
                },
            };
        default:
            return {
                background: theme.palette.primary.dark,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                    background: theme.palette.primary.main,
                },
            };
    }
});


export function Button({ children, onClick, ButtonType = 'default' }: ButtonProps) {
    return (
        <StyledButton onClick={onClick} ButtonType={ButtonType} >
            {children}
        </StyledButton>
    )
}