import type { components } from "../../../../api-types";
import { useInventoryAreas } from "../../../../entity-hooks/useInventoryAreas";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";

type InventoryArea = components["schemas"]["InventoryArea"];

type Props = {
    inventoryAreas: InventoryArea[];
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
};

export function InventoryAreaSettings({
    inventoryAreas,
    selectedId,
    setSelectedId,
}: Props) {
    const { createArea, updateArea, deleteArea } = useInventoryAreas();

    return (
        <GenericListGroup<InventoryArea, "areaName">
            title="Areas"
            items={inventoryAreas}
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
