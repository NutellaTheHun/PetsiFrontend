import { BaseLayer, type BaseLayerProps } from '../base-layer';
import './base-background-layer.css';

export function BaseBackgroundLayer(props: BaseLayerProps) {
    return (
        <BaseLayer {...props} className='base-layer base-background-layer' />
    )
}