import { Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import type { MenuItemSize } from "../../entityTypes";

export type MenuItemSizeRenderContext = {
    setName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItemSize>,
    _context: MenuItemSizeRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedName = (
    value: string,
    statefulInstance: GenericStatefulEntity<MenuItemSize>,
    context: MenuItemSizeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemSizePropertyRenderer}
        />
    );
}
