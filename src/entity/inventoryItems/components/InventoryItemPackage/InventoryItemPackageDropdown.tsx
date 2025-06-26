import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/table/render-cell-content/GenericDropdownInput";
import { useInventoryItemPackages } from "../../hooks/useInventoryItemPackages";

type InventoryItemPackage = components["schemas"]["InventoryItemPackage"];

type Props = {
    selectedPackageId: number | null;
    onUpdatePackageId: (id: number | null) => void;
};

export function InventoryItemPackageDropdown({
    selectedPackageId: selectedId,
    onUpdatePackageId: setPackageId,
}: Props) {
    const { inventoryItemPackages } = useInventoryItemPackages();

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
