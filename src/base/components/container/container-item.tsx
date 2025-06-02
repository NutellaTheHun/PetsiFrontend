import './container-item.css';

export type ContainerProps = {
    content: any;
}
export function ContainerItem({ content }: ContainerProps) {
    return (
        <div className="container-item">
            {content}
        </div>
    );
}