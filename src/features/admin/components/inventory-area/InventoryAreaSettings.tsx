import type { components } from "../../../../api-types";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";

type InventoryArea = components["schemas"]["InventoryArea"];

type Props = {
    inventoryAreas: InventoryArea[];
    selectedId: number | null;
    setSelectedId: (id: number | null) => void;
    createArea: any;
    updateArea: any;
    deleteArea: any;
};

export function InventoryAreaSettings({
    inventoryAreas,
    selectedId,
    setSelectedId,
    createArea,
    updateArea,
    deleteArea,
}: Props) {
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
