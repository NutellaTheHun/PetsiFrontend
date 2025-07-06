import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    InventoryArea,
    InventoryAreaCount,
    InventoryItem,
} from "../../entityTypes";
import { InventoryAreaDropdown } from "../components/inventoryArea/InventoryAreaDropdown";

export type InventoryAreaCountRenderContext = {
    setInventoryArea: (area: InventoryArea) => void;
    editValues?: { inventoryAreaId?: number | null };
    inventoryAreas?: InventoryArea[];
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    _context: InventoryAreaCountRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCountDate = (
    value: string,
    _statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    _context: InventoryAreaCountRenderContext
) => {
    if (value) {
        return <GenericValueDisplay type="date" value={value} />;
    }
    return <GenericValueDisplay value="No date" />;
};

const renderedInventoryArea = (
    value: InventoryArea,
    statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    context: InventoryAreaCountRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <InventoryAreaDropdown
                selectedArea={value}
                onUpdateArea={context.setInventoryArea}
                inventoryAreas={context.inventoryAreas ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.areaName ?? "No area"} />;
};

const renderedCountedItems = (
    value: InventoryItem[],
    _statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    _context: InventoryAreaCountRenderContext
) => {
    return (
        <GenericValueDisplay value={`${value?.length || 0} counted items`} />
    );
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
};

export function InventoryAreaCountRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryAreaCountRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryAreaCountPropertyRenderer}
        />
    );
}
