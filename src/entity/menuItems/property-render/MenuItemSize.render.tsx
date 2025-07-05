import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItemSize } from "../../entityTypes";

export type MenuItemSizeRenderContext = {
    setName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItemSize>,
    _context: MenuItemSizeRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedName = (
    value: string,
    statefulInstance: GenericStatefulEntity<MenuItemSize>,
    context: MenuItemSizeRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(value) => {
                    context.setName(value);
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
    statefulInstance: GenericStatefulEntity<MenuItemSize>;
    context: MenuItemSizeRenderContext;
};

export function MenuItemSizeRender({
    entityProp,
    statefulInstance,
    context,
}: MenuItemSizeRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemSizePropertyRenderer}
        />
    );
}
