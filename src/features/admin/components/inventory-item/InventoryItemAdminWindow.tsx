import { useInventoryItems } from "../../../../entity/hooks/useInventoryItems";
import { InventoryItemCategorySettings } from "./InventoryItemCategorySettings";
import { InventoryItemNewForm } from "./InventoryItemNewForm";
import { InventoryItemPackageSettings } from "./InventoryItemPackageSettings";
import { InventoryItemTable } from "./InventoryItemTable";
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
                <div className="col">
                    <InventoryItemNewForm onSubmit={createInventoryItem} />
                </div>
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
