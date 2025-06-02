import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import type { IndexedGridContainerItem } from './base/components/container/grid/grid-container.tsx';
import { GridContainer } from './base/components/container/grid/grid-container.tsx';
import { BaseBackgroundLayer } from './base/layer/background/base-background-layer.tsx';
import { BaseContentLayer } from './base/layer/content/base-content-layer.tsx';
import { BaseForegroundLayer } from './base/layer/foreground/base-foreground-layer.tsx';
import { BaseLayout } from './base/layout/base-layout.tsx';
import { LoginComponent } from './features/login/components/login-component.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BaseLayout
            backgroundLayer={<BaseBackgroundLayer />}
            contentLayer={
                <BaseContentLayer
                    children={
                        <GridContainer
                            rows={3}
                            columns={3}
                            items={[
                                {
                                    index: 3,
                                    item: <div style={{
                                        position: 'absolute',
                                        height: '800px',
                                        width: '200px',
                                        left: 0,
                                        border: '2px solid black',
                                        backgroundColor: 'white',
                                        borderRadius: '5%',
                                    }}></div>
                                } as IndexedGridContainerItem,
                                {
                                    index: 4,
                                    item: <LoginComponent />
                                } as IndexedGridContainerItem,
                                {
                                    index: 5,
                                    item: <div style={{
                                        position: 'absolute',
                                        height: '800px',
                                        width: '200px',
                                        right: 0,
                                        border: '2px solid black',
                                        backgroundColor: 'white',
                                        borderRadius: '5%',
                                    }}></div>
                                } as IndexedGridContainerItem,
                            ]}
                        />}
                />}
            foregroundLayer={
                <BaseForegroundLayer
                    children={
                        <GridContainer
                            rows={3}
                            columns={3}
                            items={[
                                {
                                    index: 7,
                                    item: <div style={{
                                        position: 'absolute',
                                        height: '100px',
                                        width: '600px',
                                        bottom: 1,
                                        border: '2px solid black',
                                        backgroundColor: 'blue',
                                        borderRadius: '5%',
                                    }}></div>
                                } as IndexedGridContainerItem
                            ]}
                        />
                    }
                />}
        />
    </StrictMode >,
);
