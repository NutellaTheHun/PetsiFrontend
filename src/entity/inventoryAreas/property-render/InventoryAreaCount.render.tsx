import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
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
    return <GenericValueDisplay value={value ?? "  "} />;
};

const renderedCountDate = (
    value: string,
    _statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    _context: InventoryAreaCountRenderContext
) => {
    if (value) {
        return <GenericValueDisplay type="date" value={value} />;
    }
    return <GenericValueDisplay type="date" value={new Date().toISOString()} />;
};

const renderedInventoryArea = (
    value: InventoryArea,
    statefulInstance: GenericStatefulEntity<InventoryAreaCount>,
    context: InventoryAreaCountRenderContext,
    dataContext?: InventoryAreaCountDataContext
) => {
    if (
        statefulInstance.state === "edit" ||
        statefulInstance.state === "create"
    ) {
        return (
            <InventoryAreaDropdown
                selectedArea={value}
                onUpdateArea={context.setInventoryArea}
                inventoryAreas={dataContext?.inventoryAreas ?? []}
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
