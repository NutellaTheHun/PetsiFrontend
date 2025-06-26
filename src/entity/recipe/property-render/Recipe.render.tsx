import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericCheckBoxInput } from "../../../lib/generics/table/render-cell-content/GenericCheckBoxInput";
import { GenericInput } from "../../../lib/generics/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../lib/generics/table/render-cell-content/GenericValue";
import { RecipeCategoryDropdown } from "../components/recipeCategory/RecipeCategoryDropdown";

type Recipe = components["schemas"]["Recipe"];

export type RecipeRenderContext = {
    setRecipeName: (name: string) => void;
    setProducedMenuItem: (id: number | null) => void;
    setIsIngredient: (isIngredient: boolean) => void;
    setBatchResultQuantity: (quantity: number) => void;
    setBatchResultMeasurement: (id: number | null) => void;
    setServingSizeQuantity: (quantity: number) => void;
    setServingSizeMeasurement: (id: number | null) => void;
    setSalesPrice: (price: string) => void;
    setCategory: (id: number | null) => void;
    setSubCategory: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: Recipe,
    _state: RenderState,
    _context: RecipeRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedRecipeName = (
    value: string,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setRecipeName(e);
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedProducedMenuItem = (
    value: Recipe["producedMenuItem"],
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        // TODO implement
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setProducedMenuItem(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Menu Item</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName ?? "No Menu Item"} />;
};

const renderedIsIngredient = (
    value: boolean,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericCheckBoxInput
                value={value}
                onChange={(e) => context.setIsIngredient(e)}
            />
        );
    }
    return <GenericValue value={value ? "Yes" : "No"} />;
};

const renderedIngredients = (
    value: Recipe["ingredients"],
    _entity: Recipe,
    _state: RenderState,
    _context: RecipeRenderContext
) => {
    // TODO implement
    return <div>Ingredients ({value?.length || 0})</div>;
};

const renderedBatchResultQuantity = (
    value: number | null | undefined,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value ?? ""}
                type="number"
                onChange={(e) => {
                    context.setBatchResultQuantity(Number(e));
                }}
            />
        );
    }
    return <GenericValue value={value || "No quantity"} />;
};

const renderedBatchResultMeasurement = (
    value: Recipe["batchResultMeasurement"],
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            // Dropdown or searchbar dropdown?
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setBatchResultMeasurement(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Unit of Measure</option>
                {/* TODO: Populate with actual units of measure */}
            </select>
        );
    }
    return <GenericValue value={value?.name ?? "No measurement"} />;
};

const renderedServingSizeQuantity = (
    value: number | null | undefined,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value ?? ""}
                type="number"
                onChange={(e) => {
                    context.setServingSizeQuantity(Number(e));
                }}
            />
        );
    }
    return <GenericValue value={value || "No quantity"} />;
};

const renderedServingSizeMeasurement = (
    value: Recipe["servingSizeMeasurement"],
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            // Dropdown or searchbar dropdown?
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setServingSizeMeasurement(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Unit of Measure</option>
                {/* TODO: Populate with actual units of measure */}
            </select>
        );
    }
    return <GenericValue value={value?.name ?? "No measurement"} />;
};

const renderedSalesPrice = (
    value: number | null | undefined,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            // Currency format?
            <GenericInput
                value={value ?? ""}
                type="text"
                onChange={(e) => {
                    context.setSalesPrice(e);
                }}
            />
        );
    }
    // Currency format?
    return <GenericValue value={value || "No price"} />;
};

const renderedCategory = (
    value: Recipe["category"],
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <RecipeCategoryDropdown
                selectedCategoryId={value?.id ?? null}
                onUpdateCategoryId={context.setCategory}
            />
        );
    }
    return <GenericValue value={value?.categoryName ?? "No category"} />;
};

const renderedSubCategory = (
    value: Recipe["subCategory"],
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            // RecipeSubCategoryDropdown, depends on category
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setSubCategory(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Sub Category</option>
                {/* TODO: Populate with actual recipe sub categories */}
            </select>
        );
    }
    return <GenericValue value={value?.subCategoryName ?? "No sub category"} />;
};

export const recipePropertyRenderer: PropertyRendererRecord<Recipe> = {
    id: renderedId,
    recipeName: renderedRecipeName,
    producedMenuItem: renderedProducedMenuItem,
    isIngredient: renderedIsIngredient,
    ingredients: renderedIngredients,
    batchResultQuantity: renderedBatchResultQuantity,
    batchResultMeasurement: renderedBatchResultMeasurement,
    servingSizeQuantity: renderedServingSizeQuantity,
    servingSizeMeasurement: renderedServingSizeMeasurement,
    salesPrice: renderedSalesPrice,
    category: renderedCategory,
    subCategory: renderedSubCategory,
};

export type RecipeRenderProps = {
    entityProp: keyof Recipe;
    instance: Recipe;
    state: RenderState;
    context: RecipeRenderContext;
};

export function RecipeRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: RecipeRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={recipePropertyRenderer}
        />
    );
}
