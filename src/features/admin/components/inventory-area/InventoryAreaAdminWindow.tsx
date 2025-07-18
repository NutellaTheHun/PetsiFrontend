import { Paper, Title } from "@mantine/core";
import { useState } from "react";
import type {
    InventoryArea,
    InventoryAreaCount,
    InventoryAreaItem,
} from "../../../../entity/entityTypes";
import { InventoryAreaListGroup } from "../../../../entity/inventoryAreas/components/inventoryArea/InventoryAreaListGroup";
import { useInventoryAreaCountMutations } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaCountMutations";
import { useInventoryAreaCounts } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaCounts";
import { useInventoryAreaItemMutations } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaItemMutations";
import { useInventoryAreaItemsFindAll } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaItemsFindAll";
import { useInventoryAreaMutations } from "../../../../entity/inventoryAreas/hooks/useInventoryAreaMutations";
import { useInventoryAreasFindAll } from "../../../../entity/inventoryAreas/hooks/useInventoryAreasFindAll";
import { useInventoryItemsFindAll } from "../../../../entity/inventoryItems/hooks/useInventoryItemsFindAll";
import { InventoryAreaCountTableAdmin } from "./InventoryAreaCountTable.Admin";
import { InventoryAreaItemTableAdmin } from "./InventoryAreaItemTable.Admin";

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

    const {
        inventoryAreaItems,
        isLoading: isLoadingItems,
        error: itemsError,
        sortKey: itemsSortKey,
        sortDirection: itemsSortDirection,
        setSortKey: itemsSetSortKey,
        setSortDirection: itemsSetSortDirection,
    } = useInventoryAreaItemsFindAll({
        selectedCountId: selectedCount?.id,
        relations: ["countedItem", "countedItemSize"],
    });

    const {
        inventoryItems,
        isLoading: isLoadingInventoryItems,
        error: inventoryItemsError,
    } = useInventoryItemsFindAll({
        relations: ["itemSizes"],
    });

    const inventoryAreaMutations = useInventoryAreaMutations();
    const inventoryAreaCountMutations = useInventoryAreaCountMutations();
    const inventoryAreaItemMutations = useInventoryAreaItemMutations();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {isLoadingAreas ? (
                        <p>Loading areas...</p>
                    ) : areaError ? (
                        <p>Error loading areas: {String(areaError)}</p>
                    ) : (
                        <Paper withBorder shadow="sm" p="md" mt="md" w={400}>
                            <Title order={4}>Inventory Areas</Title>
                            <InventoryAreaListGroup
                                data={inventoryAreas}
                                useEntityMutation={inventoryAreaMutations}
                                externalSelectedState={[
                                    selectedArea,
                                    setSelectedArea,
                                ]}
                            />
                        </Paper>
                    )}
                </div>
                <div className="col">
                    {isLoadingCounts ? (
                        <p>Loading counts...</p>
                    ) : countsError ? (
                        <p>Error loading counts: {String(countsError)}</p>
                    ) : (
                        <Paper withBorder shadow="sm" p="md" mt="md" w={850}>
                            <Title order={4}>Inventory Area Counts</Title>
                            <InventoryAreaCountTableAdmin
                                data={inventoryAreaCounts}
                                useEntityMutation={inventoryAreaCountMutations}
                                externalSelectedState={[
                                    selectedCount,
                                    setSelectedCount,
                                ]}
                                sortKeyState={[countsSortKey, countsSetSortKey]}
                                sortDirectionState={[
                                    countsSortDirection,
                                    countsSetSortDirection,
                                ]}
                                inventoryAreas={inventoryAreas}
                            />
                        </Paper>
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
                        <Paper withBorder shadow="sm" p="md" mt="md" w={1000}>
                            <Title order={4}>Inventory Area Items</Title>
                            <InventoryAreaItemTableAdmin
                                data={inventoryAreaItems}
                                useEntityMutation={inventoryAreaItemMutations}
                                externalSelectedState={[
                                    selectedItem,
                                    setSelectedItem,
                                ]}
                                sortKeyState={[itemsSortKey, itemsSetSortKey]}
                                sortDirectionState={[
                                    itemsSortDirection,
                                    itemsSetSortDirection,
                                ]}
                                inventoryItems={inventoryItems}
                            />
                        </Paper>
                    )}
                </div>
            </div>
        </div>
    );
}
