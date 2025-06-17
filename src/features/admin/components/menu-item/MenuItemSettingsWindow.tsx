import { MenuItemCategorySettings } from "./category/MenuItemCategorySettings";
import { MenuItemSizeSettings } from "./size/MenuItemSizeSettings";

export function MenuItemSettingsWindow() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <MenuItemSizeSettings />
                </div>
                <div className="col">
                    <MenuItemCategorySettings />
                </div>
            </div>
        </div>
    );
}
