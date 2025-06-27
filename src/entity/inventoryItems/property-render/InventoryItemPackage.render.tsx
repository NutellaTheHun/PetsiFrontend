import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItemPackage } from "../../entityTypes";

export type InventoryItemPackageRenderContext = {
    setPackageName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: InventoryItemPackage,
    _state: RenderState,
    _context: InventoryItemPackageRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedPackageName = (
    value: string,
    _entity: InventoryItemPackage,
    state: RenderState,
    context: InventoryItemPackageRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                type="text"
                value={value}
                onChange={(e) => context.setPackageName(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

export const inventoryItemPackagePropertyRenderer: PropertyRendererRecord<InventoryItemPackage> =
    {
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
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryItemPackagePropertyRenderer}
        />
    );
}
