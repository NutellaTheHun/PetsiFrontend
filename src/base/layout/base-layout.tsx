import type React from 'react';
import './base-layout.css';

type BaseLayoutProps = {
    backgroundLayer: React.ReactNode;
    contentLayer: React.ReactNode;
    foregroundLayer: React.ReactNode;
}
export function BaseLayout({ backgroundLayer, contentLayer, foregroundLayer }: BaseLayoutProps) {
    return (
        <div className='base-layout'>
            {backgroundLayer}
            {contentLayer}
            {foregroundLayer}
        </div>
    );
}