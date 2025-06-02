import type React from 'react';
import { GridContainerItem } from './grid-container-item';
import './grid-container.css';

export type IndexedGridContainerItem = {
    index: number;
    item: React.ReactNode;
}

export type GridContainerProps = {
    items: IndexedGridContainerItem[];
    rows: number;
    columns: number;
}

/**
 * Displays an array of content elements with the first element starting in the top left position,
 * and goes left to right, top to bottom, with the last element in the bottom right.
 * 
 * Throws an error if more content elements are supplied than there're rows*columns. OK to supply less than the total amount of grid space
 */
export function GridContainer({ items, rows, columns }: GridContainerProps) {
    if (items.length > rows * columns) {
        throw new Error(`BaseContainer recieved to many items: ${items.length} exceeds ${rows} * ${columns} = ${rows * columns}`);
    }
    const maxSize = rows * columns;

    items.forEach(({ index }) => {
        if (index < 0 || index >= maxSize) {
            throw new Error(`Item index ${index} is out of bounds for grid size ${rows} x ${columns}`);
        }
    })

    const gridItems: (React.ReactNode | null)[] = Array(maxSize).fill(null);

    items.forEach(({ index, item }) => {
        gridItems[index] = item;
    })

    return (
        <div className='grid-container'
            style={
                {
                    display: 'grid', //Needs to be here, cant be in .css file?
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridAutoRows: `minmax(0, 1fr)`,
                    aspectRatio: `${columns} / ${rows}`,
                    width: '100vw',
                    height: '100vh',
                    gap: '1px',
                }
            }>

            {gridItems.map((item) => (
                <GridContainerItem
                    content={item}
                />
            ))}
        </div>
    )
}