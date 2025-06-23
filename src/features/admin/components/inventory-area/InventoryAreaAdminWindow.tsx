import { useState } from "react";
import { useInventoryAreaCounts } from "../../../../entity-hooks/useInventoryAreaCounts";
import { useInventoryAreas } from "../../../../entity-hooks/useInventoryAreas";
import { InventoryAreaCountSettings } from "./InventoryAreaCountSettings";
import { InventoryAreaSettings } from "./InventoryAreaSettings";

export function InventoryAreaAdminWindow() {
    const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
    const [selectedCountId, setSelectedCountId] = useState<number | null>(null);

    const {
        inventoryAreas,
        isLoading: isLoadingAreas,
        error: areaError,
        sortKey: areaSortKey,
        sortDirection: areaSortDirection,
        setSortKey: areaSetSortKey,
        setSortDirection: areaSetSortDirection,
    } = useInventoryAreas();

    const {
        inventoryAreaCounts,
        isLoading: isLoadingCounts,
        error: countsError,
        sortKey: countsSortKey,
        sortDirection: countsSortDirection,
        setSortKey: countsSetSortKey,
        setSortDirection: countsSetSortDirection,
    } = useInventoryAreaCounts({
        selectedAreaId,
        relations: ["inventoryArea", "countedItems"],
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
                        <InventoryAreaSettings
                            inventoryAreas={inventoryAreas}
                            selectedId={selectedAreaId}
                            setSelectedId={setSelectedAreaId}
                        />
                    )}
                </div>
                <div className="col">
                    {isLoadingCounts ? (
                        <p>Loading counts...</p>
                    ) : countsError ? (
                        <p>Error loading counts: {String(countsError)}</p>
                    ) : (
                        <InventoryAreaCountSettings
                            inventoryAreaCounts={inventoryAreaCounts}
                            inventoryAreas={inventoryAreas}
                            targetId={selectedCountId}
                            setTargetId={setSelectedCountId}
                            sortKey={countsSortKey}
                            sortDirection={countsSortDirection}
                            setSortKey={countsSetSortKey}
                            setSortDirection={countsSetSortDirection}
                            selectedAreaId={selectedAreaId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
