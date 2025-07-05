import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItemPackage } from "../../entityTypes";

export type InventoryItemPackageRenderContext = {
    setPackageName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryItemPackage>,
    _context: InventoryItemPackageRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedPackageName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItemPackage>,
    context: InventoryItemPackageRenderContext
) => {
    if (statefulInstance.state === "edit") {
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
    statefulInstance: GenericStatefulEntity<InventoryItemPackage>;
    context: InventoryItemPackageRenderContext;
};

export function InventoryItemPackageRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryItemPackageRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemPackagePropertyRenderer}
        />
    );
}
