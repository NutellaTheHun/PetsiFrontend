import { Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import type { InventoryItemPackage } from "../../entityTypes";

export type InventoryItemPackageRenderContext = {
    setPackageName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryItemPackage>,
    _context: InventoryItemPackageRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedPackageName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItemPackage>,
    context: InventoryItemPackageRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setPackageName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemPackagePropertyRenderer}
        />
    );
}
