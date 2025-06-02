import type React from 'react';
import './base-layer.css';

export type BaseLayerProps = {
    className?: string;
    children?: React.ReactNode;
}

export function BaseLayer({ className = '', children }: BaseLayerProps) {
    return (
        <div className={`${className}`} >
            {children}
        </div >
    )
}