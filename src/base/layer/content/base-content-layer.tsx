import { BaseLayer, type BaseLayerProps } from '../base-layer';
import './base-content-layer.css';

export function BaseContentLayer(props: BaseLayerProps) {
    return (
        <BaseLayer {...props} className='base-layer base-content-layer' />
    )
}