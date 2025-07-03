import { useState } from "react";
import type { components } from "../../../../api-types";
import type { UpdateInventoryItemVendorDto } from "../../../../entity/entityTypes";
import { useInventoryItemVendors } from "../../../../entity/inventoryItems/hooks/useInventoryItemVendors";
import { InventoryItemVendorRender } from "../../../../entity/inventoryItems/property-render/InventoryItemVendor.render";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

type InventoryItemVendor = components["schemas"]["InventoryItemVendor"];

export function InventoryItemVendorSettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] =
        useState<UpdateInventoryItemVendorDto | null>(null);
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
        <GenericListGroup<InventoryItemVendor>
            items={inventoryItemVendors}
            targetId={selectedId}
            editingId={editingId}
            onToggleEditId={setEditingId}
            onSetSelectId={setSelectedId}
            onAdd={(name) =>
                createVendor.mutate({ body: { vendorName: name } })
            }
            onDelete={(id) => deleteVendor.mutate({ params: { path: { id } } })}
            onUpdate={(id) =>
                updateVendor.mutate({
                    params: { path: { id } },
                    body: { vendorName: name },
                })
            }
            renderItem={(vendor) => (
                <InventoryItemVendorRender
                    entityProp="vendorName"
                    instance={vendor}
                    state={selectedId === vendor.id ? "edited" : "normal"}
                    context={{
                        setVendorName: (name) => {
                            setEditValues({ ...editValues, vendorName: name });
                        },
                    }}
                />
            )}
        />
    );
}
