import type React from "react";
import './base-window.css';

export type WindowProps = {
    children: React.ReactNode;
}

export function BaseWindow({ children }: WindowProps) {
    return (
        <div className="base-window">
            {children}
        </div>
    )
}