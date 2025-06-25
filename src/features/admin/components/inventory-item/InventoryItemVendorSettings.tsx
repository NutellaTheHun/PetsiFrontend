import { useState } from "react";
import type { components } from "../../../../api-types";
import { useInventoryItemVendors } from "../../../../entity/hooks/InventoryItems/useInventoryItemVendors";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";

type InventoryItemVendor = components["schemas"]["InventoryItemVendor"];

export function InventoryItemVendorSettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const {
        inventoryItemVendors,
        isLoading,
        error,
        createVendor,
        updateVendor,
        deleteVendor,
    } = useInventoryItemVendors();

    if (isLoading) return <p>Loading vendors...</p>;
    if (error) return <p>Error loading vendors: {String(error)}</p>;

    return (
        <GenericListGroup<InventoryItemVendor, "vendorName">
            title="Vendors"
            items={inventoryItemVendors}
            targetProp="vendorName"
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAdd={(name) =>
                createVendor.mutate({ body: { vendorName: name } })
            }
            onDelete={(id) => deleteVendor.mutate({ params: { path: { id } } })}
            onUpdate={(id, name) =>
                updateVendor.mutate({
                    params: { path: { id } },
                    body: { vendorName: name },
                })
            }
        />
    );
}
