import { InventoryItemTable } from "../../../../entity/inventoryItems/components/inventoryItem/InventoryItemTable";
import { useInventoryItemCategories } from "../../../../entity/inventoryItems/hooks/useInventoryItemCategories";
import { useInventoryItemVendors } from "../../../../entity/inventoryItems/hooks/useInventoryItemVendors";
import { useInventoryItems } from "../../../../entity/inventoryItems/hooks/useInventoryItems";
import { InventoryItemCategorySettings } from "./InventoryItemCategorySettings";
import { InventoryItemPackageSettings } from "./InventoryItemPackageSettings";
import { InventoryItemVendorSettings } from "./InventoryItemVendorSettings";

export function InventoryItemAdminWindow() {
    const {
        inventoryItems,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        targetId,
        setTargetId,
        createInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
    } = useInventoryItems();

    const { inventoryItemCategories } = useInventoryItemCategories();
    const { inventoryItemVendors } = useInventoryItemVendors();
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
                    <InventoryItemTable
                        inventoryItems={inventoryItems}
                        sortKey={sortKey}
                        sortDirection={sortDirection}
                        setSortKey={setSortKey}
                        setSortDirection={setSortDirection}
                        targetId={targetId}
                        setTargetId={setTargetId}
                        createInventoryItem={createInventoryItem}
                        updateInventoryItem={updateInventoryItem}
                        deleteInventoryItem={deleteInventoryItem}
                    />
                </div>
            </div>
        </div>
    );
}
