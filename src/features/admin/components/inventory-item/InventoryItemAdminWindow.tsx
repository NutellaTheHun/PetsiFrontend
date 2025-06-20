import { InventoryItemCategorySettings } from "./InventoryItemCategorySettings";
import { InventoryItemPackageSettings } from "./InventoryItemPackageSettings";
import { InventoryItemVendorSettings } from "./InventoryItemVendorSettings";

export function InventoryItemAdminWindow() {
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
        </div>
    );
}
