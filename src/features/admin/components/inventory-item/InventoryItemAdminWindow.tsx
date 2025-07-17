import { useState } from "react";
import type { InventoryItem } from "../../../../entity/entityTypes";
import { InventoryItemTable } from "../../../../entity/inventoryItems/components/inventoryItem/InventoryItemTable";
import { useInventoryItemCategories } from "../../../../entity/inventoryItems/hooks/useInventoryItemCategories";
import { useInventoryItemMutations } from "../../../../entity/inventoryItems/hooks/useInventoryItemMutations";
import { useInventoryItemVendors } from "../../../../entity/inventoryItems/hooks/useInventoryItemVendors";
import { useInventoryItemsFindAll } from "../../../../entity/inventoryItems/hooks/useInventoryItemsFindAll";
import { InventoryItemCategorySettings } from "./InventoryItemCategoryListGroup";
import { InventoryItemPackageSettings } from "./InventoryItemPackageListGroup";
import { InventoryItemVendorSettings } from "./InventoryItemVendorListGroup";

export function InventoryItemAdminWindow() {
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(
        null
    );

    const {
        inventoryItems,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        isLoading,
        error,
    } = useInventoryItemsFindAll({
        relations: ["category", "vendor"],
    });

    const { inventoryItemCategories } = useInventoryItemCategories();
    const { inventoryItemVendors } = useInventoryItemVendors();
    const inventoryItemMutations = useInventoryItemMutations();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <InventoryItemCategorySettings />
                </div>
                <div className="col">
                    <InventoryItemPackageSettings />
                </div>
                <div className="col">
                    <InventoryItemVendorSettings />
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoading ? (
                        <p>Loading inventory items...</p>
                    ) : error ? (
                        <p>Error loading inventory items: {String(error)}</p>
                    ) : (
                        <InventoryItemTable
                            data={inventoryItems}
                            useEntityMutation={inventoryItemMutations}
                            externalSelectedState={[
                                selectedItem,
                                setSelectedItem,
                            ]}
                            sortKeyState={[sortKey, setSortKey]}
                            sortDirectionState={[
                                sortDirection,
                                setSortDirection,
                            ]}
                            inventoryItemCategories={inventoryItemCategories}
                            inventoryItemVendors={inventoryItemVendors}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
