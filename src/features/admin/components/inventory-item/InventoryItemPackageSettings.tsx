import { useState } from "react";
import type { components } from "../../../../api-types";
import { useInventoryItemPackages } from "../../../../entity/inventoryItems/hooks/useInventoryItemPackages";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

type InventoryItemPackage = components["schemas"]["InventoryItemPackage"];

export function InventoryItemPackageSettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

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
        <GenericListGroup<InventoryItemPackage, "packageName">
            title="Packages"
            items={inventoryItemPackages}
            targetProp="packageName"
            selectedId={selectedId}
            onSetSelectId={setSelectedId}
            onAdd={(name) =>
                createPackage.mutate({ body: { packageName: name } })
            }
            onDelete={(id) =>
                deletePackage.mutate({ params: { path: { id } } })
            }
            onUpdate={(id, name) =>
                updatePackage.mutate({
                    params: { path: { id } },
                    body: { packageName: name },
                })
            }
        />
    );
}
