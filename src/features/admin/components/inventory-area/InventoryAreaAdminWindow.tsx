import { useState } from "react";
import type { InventoryArea } from "../../../../entity/entityTypes";
import { InventoryAreaListGroup } from "../../../../entity/inventoryAreas/components/inventoryArea/InventoryAreaListGroup";
import { useInventoryAreas } from "../../../../entity/inventoryAreas/hooks/useInventoryAreas";

export function InventoryAreaAdminWindow() {
    const [selectedArea, setSelectedArea] = useState<InventoryArea | null>(
        null
    );
    const [selectedCountId, setSelectedCountId] = useState<number | null>(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const {
        inventoryAreas,
        isLoading: isLoadingAreas,
        error: areaError,
    } = useInventoryAreas();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {isLoadingAreas ? (
                        <p>Loading areas...</p>
                    ) : areaError ? (
                        <p>Error loading areas: {String(areaError)}</p>
                    ) : (
                        <InventoryAreaListGroup
                            inventoryAreas={inventoryAreas}
                            externalSelectedArea={[
                                selectedArea,
                                setSelectedArea,
                            ]}
                        />
                    )}
                </div>
                <div className="col">
                    {/*isLoadingCounts ? (
                        <p>Loading counts...</p>
                    ) : countsError ? (
                        <p>Error loading counts: {String(countsError)}</p>
                    ) : (
                        <InventoryAreaCountTable
                            inventoryAreaCounts={inventoryAreaCounts}
                            targetId={selectedCountId}
                            setTargetId={setSelectedCountId}
                            sortKey={countsSortKey}
                            sortDirection={countsSortDirection}
                            setSortKey={countsSetSortKey}
                            setSortDirection={countsSetSortDirection}
                            createInventoryAreaCount={createInventoryAreaCount}
                            updateInventoryAreaCount={updateInventoryAreaCount}
                            deleteInventoryAreaCount={deleteInventoryAreaCount}
                        />
                    )*/}
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
                            createInventoryAreaItem={createInventoryAreaItem}
                            updateInventoryAreaItem={updateInventoryAreaItem}
                            deleteInventoryAreaItem={deleteInventoryAreaItem}
                        />
                    )*/}
                </div>
            </div>
        </div>
    );
}
