import { useState } from "react";
import { InventoryAreaItemTable } from "../../../../entity/inventoryAreas/components/inventoryArea/InventoryAreaItemTable";
import { InventoryAreaListGroup } from "../../../../entity/inventoryAreas/components/inventoryArea/InventoryAreaListGroup";
import { InventoryAreaCountListGroup } from "../../../../entity/inventoryAreas/components/inventoryAreaCount/InventoryAreaCountListGroup";
import { useInventoryAreaCounts } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaCounts";
import { useInventoryAreaItems } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaItems";
import { useInventoryAreas } from "../../../../entity/inventoryAreas/hooks/useInventoryAreas";

export function InventoryAreaAdminWindow() {
    const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
    const [selectedCountId, setSelectedCountId] = useState<number | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const {
        inventoryAreas,
        isLoading: isLoadingAreas,
        error: areaError,
    } = useInventoryAreas();

    const {
        inventoryAreaCounts,
        isLoading: isLoadingCounts,
        error: countsError,
        sortKey: countsSortKey,
        sortDirection: countsSortDirection,
        setSortKey: countsSetSortKey,
        setSortDirection: countsSetSortDirection,
        createInventoryAreaCount,
        updateInventoryAreaCount,
        deleteInventoryAreaCount,
    } = useInventoryAreaCounts({
        selectedAreaId,
        relations: ["inventoryArea", "countedItems"],
    });

    const {
        inventoryAreaItems,
        isLoading: isLoadingItems,
        error: itemsError,
        sortKey: itemsSortKey,
        sortDirection: itemsSortDirection,
        setSortKey: itemsSetSortKey,
        setSortDirection: itemsSetSortDirection,
        createInventoryAreaItem,
        updateInventoryAreaItem,
        deleteInventoryAreaItem,
    } = useInventoryAreaItems({
        selectedCountId,
        relations: ["countedItemSize", "countedItem"],
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {isLoadingAreas ? (
                        <p>Loading areas...</p>
                    ) : areaError ? (
                        <p>Error loading areas: {String(areaError)}</p>
                    ) : (
                        /*<InventoryAreaSettings
                            inventoryAreas={inventoryAreas}
                            targetId={selectedAreaId}
                            setTargetId={setSelectedAreaId}
                        />*/
                        <InventoryAreaListGroup
                            inventoryAreas={inventoryAreas}
                            targetId={selectedAreaId}
                            onSetSelectId={setSelectedAreaId}
                        />
                    )}
                </div>
                <div className="col">
                    {isLoadingCounts ? (
                        <p>Loading counts...</p>
                    ) : countsError ? (
                        <p>Error loading counts: {String(countsError)}</p>
                    ) : (
                        <InventoryAreaCountListGroup
                            inventoryAreaCounts={inventoryAreaCounts}
                            targetId={selectedCountId}
                            onSetSelectId={setSelectedCountId}
                        />
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoadingItems ? (
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
                            createInventoryAreaItem={createInventoryAreaItem}
                            updateInventoryAreaItem={updateInventoryAreaItem}
                            deleteInventoryAreaItem={deleteInventoryAreaItem}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
