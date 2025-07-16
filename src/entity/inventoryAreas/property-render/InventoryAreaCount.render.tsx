import { Text } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { MantineComboBox } from "../../../lib/uiComponents/input/MantineComboBox";
import type {
    InventoryArea,
    InventoryAreaCount,
    InventoryItem,
} from "../../entityTypes";

export type InventoryAreaCountRenderContext = {
    setInventoryArea: (area: InventoryArea) => void;
};

export interface InventoryAreaCountDataContext
    extends EntityDataContext<InventoryAreaCount> {
    inventoryAreas?: InventoryArea[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    _context: InventoryAreaCountRenderContext
) => {
    return <Text>{value ?? "  "}</Text>;
};

const renderedCountDate = (
    value: string,
    _statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    _context: InventoryAreaCountRenderContext
) => {
    if (value) {
        return <Text>{value}</Text>;
    }
    return <Text>{new Date().toISOString()}</Text>;
};

const renderedInventoryArea = (
    value: InventoryArea,
    statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    context: InventoryAreaCountRenderContext,
    dataContext?: InventoryAreaCountDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineComboBox<InventoryArea>
                totalOptions={dataContext?.inventoryAreas ?? []}
                selectedOption={value}
                onOptionChange={context.setInventoryArea}
                labelKey="areaName"
            />
        );
    }
    return <Text>{value?.areaName ?? "No area"}</Text>;
};

const renderedCountedItems = (
    value: InventoryItem[],
    _statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    _context: InventoryAreaCountRenderContext
) => {
    return <Text>{`${value?.length || 0} counted items`}</Text>;
};

export const inventoryAreaCountPropertyRenderer: PropertyRendererRecord<InventoryAreaCount> =
    {
        id: renderedId,
        countDate: renderedCountDate,
        inventoryArea: renderedInventoryArea,
        countedItems: renderedCountedItems,
    };

export type InventoryAreaCountRenderProps = {
    entityProp: keyof InventoryAreaCount;
    statefulInstance: GenericStatefulEntity<InventoryAreaCount>;
    context: InventoryAreaCountRenderContext;
    dataContext?: InventoryAreaCountDataContext;
};

export function InventoryAreaCountRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: InventoryAreaCountRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryAreaCountPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
