import { useState } from "react";
import type { components } from "../../../../api-types";
import type { UpdateInventoryItemPackageDto } from "../../../../entity/entityTypes";
import { useInventoryItemPackages } from "../../../../entity/inventoryItems/hooks/useInventoryItemPackages";
import { InventoryItemPackageRender } from "../../../../entity/inventoryItems/property-render/InventoryItemPackage.render";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

type InventoryItemPackage = components["schemas"]["InventoryItemPackage"];

export function InventoryItemPackageSettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] =
        useState<UpdateInventoryItemPackageDto | null>(null);
    const {
        inventoryItemPackages,
        isLoading,
        error,
        createPackage,
        updatePackage,
        deletePackage,
    } = useInventoryItemPackages();

    if (isLoading) return <p>Loading packages...</p>;
    if (error) return <p>Error loading packages: {String(error)}</p>;

    return (
        <GenericListGroup<InventoryItemPackage>
            items={inventoryItemPackages}
            targetId={selectedId}
            editingId={editingId}
            onToggleEditId={setEditingId}
            onSetSelectId={setSelectedId}
            onAdd={(name) =>
                createPackage.mutate({ body: { packageName: name } })
            }
            onDelete={(id) =>
                deletePackage.mutate({ params: { path: { id } } })
            }
            onUpdate={(id) =>
                updatePackage.mutate({
                    params: { path: { id } },
                    body: { packageName: name },
                })
            }
            renderItem={(pkg) => (
                <InventoryItemPackageRender
                    entityProp="packageName"
                    instance={pkg}
                    state={selectedId === pkg.id ? "edited" : "normal"}
                    context={{
                        setPackageName: (name) => {
                            setEditValues({ ...editValues, packageName: name });
                        },
                    }}
                />
            )}
        />
    );
}
