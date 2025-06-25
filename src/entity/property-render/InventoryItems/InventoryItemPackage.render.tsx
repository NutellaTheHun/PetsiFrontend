import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type InventoryItemPackage = components["schemas"]["InventoryItemPackage"];

export type InventoryItemPackageRenderContext = {
    setPackageName: (name: string) => void;
};

export type InventoryItemPackagePropertyRenderer = (
    value: any,
    entity: InventoryItemPackage,
    state: RenderState,
    context: InventoryItemPackageRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: InventoryItemPackage,
    state: RenderState,
    context: InventoryItemPackageRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedPackageName = (
    value: string,
    entity: InventoryItemPackage,
    state: RenderState,
    context: InventoryItemPackageRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setPackageName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

export const inventoryItemPackagePropertyRenderer: Record<
    keyof InventoryItemPackage,
    InventoryItemPackagePropertyRenderer
> = {
    id: renderedId,
    packageName: renderedPackageName,
};

export type InventoryItemPackageRenderProps = {
    entityProp: keyof InventoryItemPackage;
    instance: InventoryItemPackage;
    state: RenderState;
    context: InventoryItemPackageRenderContext;
};

export function InventoryItemPackageRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryItemPackageRenderProps) {
    const renderer = inventoryItemPackagePropertyRenderer[entityProp];
    return renderer(entityInstance[entityProp], entityInstance, state, context);
}
