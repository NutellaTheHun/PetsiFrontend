import { RecipeCategorySettings } from "./RecipeCategorySettings";

export function RecipeAdminWindow() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <RecipeCategorySettings />
                </div>
                <div className="col"></div>
            </div>
        </div>
    );
}
