import { useState } from "react";
import type {
    InventoryArea,
    InventoryAreaCount,
    InventoryAreaItem,
} from "../../../../entity/entityTypes";
import { TestInventoryAreaListGroup } from "../../../../entity/inventoryAreas/components/inventoryArea/TestInvAreaListGroup";
import { InventoryAreaCountTable } from "../../../../entity/inventoryAreas/components/inventoryAreaCount/InventoryAreaCountTable";
import { useInventoryAreaCounts } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaCounts";
import type { InventoryAreaCountSortKey } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaItems";
import { useInventoryAreaMutations } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaMutations";
import { useInventoryAreas } from "../../../../entity/inventoryAreas/hooks/useInventoryAreas";

export function InventoryAreaAdminWindow() {
    const [selectedArea, setSelectedArea] = useState<InventoryArea | null>(
        null
    );
    const [selectedCount, setSelectedCount] =
        useState<InventoryAreaCount | null>(null);
    const [selectedItem, setSelectedItem] = useState<InventoryAreaItem | null>(
        null
    );

    const {
        inventoryAreas,
        sortKey: areasSortKey,
        sortDirection: areasSortDirection,
        setSortKey: areasSetSortKey,
        setSortDirection: areasSetSortDirection,
        isLoading: isLoadingAreas,
        error: areaError,
    } = useInventoryAreas();

    const {
        inventoryAreaCounts,
        isLoading: isLoadingCounts,
        error: countsError,
    } = useInventoryAreaCounts({
        relations: ["inventoryArea"],
        selectedAreaId: selectedArea?.id,
    });

    const inventoryAreaMutations = useInventoryAreaMutations();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {isLoadingAreas ? (
                        <p>Loading areas...</p>
                    ) : areaError ? (
                        <p>Error loading areas: {String(areaError)}</p>
                    ) : (
                        <TestInventoryAreaListGroup
                            data={inventoryAreas}
                            useEntityMutation={inventoryAreaMutations}
                            externalSelectedState={[
                                selectedArea,
                                setSelectedArea,
                            ]}
                        />
                        /*<InventoryAreaListGroup
                            inventoryAreas={inventoryAreas}
                            externalSelectedArea={[
                                selectedArea,
                                setSelectedArea,
                            ]}
                        />*/
                    )}
                </div>
                <div className="col">
                    {isLoadingCounts ? (
                        <p>Loading counts...</p>
                    ) : countsError ? (
                        <p>Error loading counts: {String(countsError)}</p>
                    ) : (
                        <InventoryAreaCountTable
                            inventoryCounts={inventoryAreaCounts}
                            inventoryAreas={inventoryAreas}
                            selectEntityState={[
                                selectedCount,
                                setSelectedCount,
                            ]}
                            sortKey={areasSortKey as InventoryAreaCountSortKey}
                            sortDirection={areasSortDirection}
                            setSortKey={areasSetSortKey}
                            setSortDirection={areasSetSortDirection}
                        />
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {/*isLoadingItems ? (
                        <p>Loading items...</p>
                    ) : itemsError ? (
                        <p>Error loading items: {String(itemsError)}</p>
                    ) : (
                        <InventoryAreaItemTable
                            inventoryAreaItems={inventoryAreaItems}
                            targetId={selectedItemId}
                            setTargetId={setSelectedItemId}
                            sortKey={itemsSortKey}
                            sortDirection={itemsSortDirection}
                            setSortKey={itemsSetSortKey}
                            setSortDirection={itemsSetSortDirection}
                        />
                    )*/}
                </div>
            </div>
        </div>
    );
}
