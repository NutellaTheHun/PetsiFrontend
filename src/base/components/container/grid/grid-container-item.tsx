import './grid-container-item.css';

type GridContainerItemProps = {
    content: any;
}

export function GridContainerItem({ content }: GridContainerItemProps) {
    return (
        <div className='container-item grid-container-item'>
            {content}
        </div>
    )
}