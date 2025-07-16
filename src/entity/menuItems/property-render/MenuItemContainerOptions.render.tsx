import { NumberInput, Text } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import type {
    MenuItem,
    MenuItemContainerOptions,
    MenuItemContainerRule,
} from "../../entityTypes";

export type MenuItemContainerOptionsRenderContext = {
    setValidQuantity: (quantity: number) => void;
    setParentContainer: (menuItem: MenuItem) => void;
};

export interface MenuItemContainerOptionsDataContext
    extends EntityDataContext<MenuItemContainerOptions> {
    menuItems?: MenuItem[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>,
    _context: MenuItemContainerOptionsRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedParentContainer = (
    _value: MenuItem,
    _statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>,
    _context: MenuItemContainerOptionsRenderContext,
    _dataContext?: MenuItemContainerOptionsDataContext
) => {
    return <Text>"Nothing to show here"</Text>;
};

const renderedContainerRules = (
    value: MenuItemContainerRule[],
    _statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>,
    _context: MenuItemContainerOptionsRenderContext
) => {
    return <Text>{`${value?.length ?? 0} Container Rules`}</Text>;
};

const renderedValidQuantity = (
    value: number,
    statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) => {
                    context.setValidQuantity(Number(e));
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

export const menuItemContainerOptionsPropertyRenderer: PropertyRendererRecord<MenuItemContainerOptions> =
    {
        id: renderedId,
        parentContainer: renderedParentContainer,
        containerRules: renderedContainerRules,
        validQuantity: renderedValidQuantity,
    };

export type MenuItemContainerOptionsRenderProps = {
    entityProp: keyof MenuItemContainerOptions;
    statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>;
    context: MenuItemContainerOptionsRenderContext;
    dataContext?: MenuItemContainerOptionsDataContext;
};

export function MenuItemContainerOptionsRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: MenuItemContainerOptionsRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemContainerOptionsPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
