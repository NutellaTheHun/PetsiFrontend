import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericValue } from "../../../lib/generics/table/render-cell-content/GenericValue";
import { InventoryAreaDropdown } from "../components/inventoryArea/InventoryAreaDropdown";

type InventoryAreaCount = components["schemas"]["InventoryAreaCount"];

export type InventoryAreaCountRenderContext = {
    setAreaId: (id: number | null) => void;
    editValues?: { inventoryAreaId?: number | null };
};

const renderedId = (
    value: any,
    _entity: InventoryAreaCount,
    _state: RenderState,
    _context: InventoryAreaCountRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCountDate = (
    value: any,
    _entity: InventoryAreaCount,
    _state: RenderState,
    _context: InventoryAreaCountRenderContext
) => {
    if (value) {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
        return <GenericValue value={formattedDate} />;
    }
    return <GenericValue value="No date" />;
};

const renderedInventoryArea = (
    _value: any,
    entity: InventoryAreaCount,
    state: RenderState,
    context: InventoryAreaCountRenderContext
) => {
    if (state === "edited") {
        // Use editValues if available, otherwise fall back to entity value
        const selectedAreaId =
            context.editValues?.inventoryAreaId ??
            entity.inventoryArea?.id ??
            null;

        return (
            <InventoryAreaDropdown
                selectedAreaId={selectedAreaId}
                onUpdateAreaId={context.setAreaId}
            />
        );
    }
    return <GenericValue value={entity.inventoryArea?.areaName ?? "No area"} />;
};

const renderedCountedItems = (
    _value: any,
    _entity: InventoryAreaCount,
    _state: RenderState,
    _context: InventoryAreaCountRenderContext
) => {
    // TODO: Implement this
    return <div>countedItems</div>;
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
    instance: InventoryAreaCount;
    state: RenderState;
    context: InventoryAreaCountRenderContext;
};

export function InventoryAreaCountRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryAreaCountRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryAreaCountPropertyRenderer}
        />
    );
}
