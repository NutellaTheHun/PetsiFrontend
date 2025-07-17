import { Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import type { InventoryArea, InventoryAreaCount } from "../../entityTypes";

export type InventoryAreaRenderContext = {
    setAreaName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryArea>,
    _context: InventoryAreaRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedAreaName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryArea>,
    context: InventoryAreaRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setAreaName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedInventoryCounts = (
    value: InventoryAreaCount[],
    _statefulInstance: GenericStatefulEntity<InventoryArea>,
    _context: InventoryAreaRenderContext
) => {
    return <Text>{`${value?.length || 0} counts`}</Text>;
};

export const inventoryAreaPropertyRenderer: PropertyRendererRecord<InventoryArea> =
    {
        id: renderedId,
        areaName: renderedAreaName,
        inventoryCounts: renderedInventoryCounts,
    };

export type InventoryAreaRenderProps = {
    entityProp: keyof InventoryArea;
    statefulInstance: GenericStatefulEntity<InventoryArea>;
    context: InventoryAreaRenderContext;
};

export function InventoryAreaRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryAreaRenderProps) {
    return (
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryAreaPropertyRenderer}
        />
    );
}
