import { useState } from "react";
import type {
    InventoryArea,
    InventoryAreaCount,
    InventoryAreaItem,
} from "../../../../entity/entityTypes";
import { InventoryAreaListGroup } from "../../../../entity/inventoryAreas/components/inventoryArea/InventoryAreaListGroup";
import { InventoryAreaCountTable } from "../../../../entity/inventoryAreas/components/inventoryAreaCount/InventoryAreaCountTable";
import { useInventoryAreaCountMutations } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaCountMutations";
import { useInventoryAreaCounts } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaCounts";
import type { InventoryAreaCountSortKey } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaItems";
import { useInventoryAreaMutations } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaMutations";
import { useInventoryAreasFindAll } from "../../../../entity/inventoryAreas/hooks/useInventoryAreasFindAll";
import { InventoryAreaRender } from "../../../../entity/inventoryAreas/property-render/InventoryArea.render";

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
        isLoading: isLoadingAreas,
        error: areaError,
    } = useInventoryAreasFindAll();

    const {
        inventoryAreaCounts,
        sortKey: countsSortKey,
        sortDirection: countsSortDirection,
        setSortKey: countsSetSortKey,
        setSortDirection: countsSetSortDirection,
        isLoading: isLoadingCounts,
        error: countsError,
    } = useInventoryAreaCounts({
        relations: ["inventoryArea"],
        selectedAreaId: selectedArea?.id,
    });

    const inventoryAreaMutations = useInventoryAreaMutations();
    const inventoryAreaCountMutations = useInventoryAreaCountMutations();

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
                            data={inventoryAreas}
                            useEntityMutation={inventoryAreaMutations}
                            externalSelectedState={[
                                selectedArea,
                                setSelectedArea,
                            ]}
                            renderItem={(item, context) => {
                                return (
                                    <InventoryAreaRender
                                        entityProp="areaName"
                                        statefulInstance={item}
                                        context={
                                            item.state === "create"
                                                ? context.createContext
                                                : context.editContext
                                        }
                                    />
                                );
                            }}
                        />
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
                            sortKey={countsSortKey as InventoryAreaCountSortKey}
                            sortDirection={countsSortDirection}
                            setSortKey={countsSetSortKey}
                            setSortDirection={countsSetSortDirection}
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
