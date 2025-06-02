import type React from "react";

export type FlexBoxProps = {
    children: React.ReactNode;
    direction: 'column' | 'row';
    gap: string;
}

export function FlexBox({ children, direction, gap }: FlexBoxProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: direction,
            alignItems: 'center',
            gap: gap,
        }}>
            {children}
        </div>
    )
}