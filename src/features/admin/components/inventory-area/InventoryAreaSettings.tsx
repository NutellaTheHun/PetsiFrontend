import { useState } from "react";
import type { components } from "../../../../api-types";
import { useInventoryAreas } from "../../../../entity-hooks/useInventoryAreas";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";

type InventoryArea = components["schemas"]["InventoryArea"];

export function InventoryAreaSettings() {
    const { areas, isLoading, error, createArea, updateArea, deleteArea } =
        useInventoryAreas();

    const [selectedId, setSelectedId] = useState<number | null>(null);

    if (isLoading) return <p>Loading areas...</p>;
    if (error) return <p>Error loading areas: {String(error)}</p>;

    return (
        <GenericListGroup<InventoryArea, "areaName">
            title="Areas"
            items={areas}
            targetProp="areaName"
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAdd={(name) => createArea.mutate({ body: { areaName: name } })}
            onDelete={(id) => deleteArea.mutate({ params: { path: { id } } })}
            onUpdate={(id, name) => {
                updateArea.mutate({
                    params: { path: { id } },
                    body: { areaName: name },
                });
            }}
        />
    );
}
