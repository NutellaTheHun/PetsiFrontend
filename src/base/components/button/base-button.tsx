import type React from 'react';
import './base-button.css';

type BaseButtonProps = {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export function BaseButton({
    text,
    onClick,
    type = 'button',
    disabled = false,
    style,
    className
}: BaseButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={className}
            style={style}
        >
            {text}
        </button>
    );
}