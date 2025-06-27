import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItemSize } from "../../entityTypes";

export type MenuItemSizeRenderContext = {
    setName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: MenuItemSize,
    _state: RenderState,
    _context: MenuItemSizeRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedName = (
    value: string,
    _entity: MenuItemSize,
    state: RenderState,
    context: MenuItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setName(e);
                }}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

export const menuItemSizePropertyRenderer: PropertyRendererRecord<MenuItemSize> =
    {
        id: renderedId,
        name: renderedName,
    };

export type MenuItemSizeRenderProps = {
    entityProp: keyof MenuItemSize;
    instance: MenuItemSize;
    state: RenderState;
    context: MenuItemSizeRenderContext;
};

export function MenuItemSizeRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemSizeRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={menuItemSizePropertyRenderer}
        />
    );
}
