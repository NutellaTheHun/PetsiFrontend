import { InventoryAreaSettings } from "./InventoryAreaSettings";

export function InventoryAreaAdminWindow() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <InventoryAreaSettings />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}
