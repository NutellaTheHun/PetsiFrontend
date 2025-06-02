import { BaseLayer, type BaseLayerProps } from "../base-layer";
import './base-foreground-layer.css';

export function BaseForegroundLayer(props: BaseLayerProps) {
    return (
        <BaseLayer {...props} className='base-layer base-foreground-layer' />
    )
}