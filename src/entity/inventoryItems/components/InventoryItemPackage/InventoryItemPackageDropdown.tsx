import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItemPackage } from "../../../entityTypes";

type Props = {
    selectedPackageId: number | null;
    onUpdatePackageId: (id: number | null) => void;
    inventoryItemPackages: InventoryItemPackage[];
};

export function InventoryItemPackageDropdown({
    selectedPackageId: selectedId,
    onUpdatePackageId: setPackageId,
    inventoryItemPackages,
}: Props) {
    if (inventoryItemPackages.length === 0) {
        return (
            <GenericValueDisplay value={"No inventory item packages found"} />
        );
    }
    return (
        <GenericDropdownInput
            options={inventoryItemPackages.map((pkg: InventoryItemPackage) => ({
                id: pkg.id,
                label: pkg.packageName,
            }))}
            value={selectedId}
            onChange={(packageId) => setPackageId(Number(packageId))}
        />
    );
}
