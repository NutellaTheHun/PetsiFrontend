import { InventoryItemCategorySettings } from "./InventoryItemCategorySettings";

export function InventoryItemAdminWindow() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <InventoryItemCategorySettings />
                </div>
            </div>
        </div>
    );
}
