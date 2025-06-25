import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type Recipe = components["schemas"]["Recipe"];

export type RecipeRenderContext = {
    setRecipeName: (name: string) => void;
    setProducedMenuItem: (id: number | null) => void;
    setIsIngredient: (isIngredient: boolean) => void;
    setBatchResultQuantity: (quantity: string) => void;
    setBatchResultMeasurement: (id: number | null) => void;
    setServingSizeQuantity: (quantity: string) => void;
    setServingSizeMeasurement: (id: number | null) => void;
    setSalesPrice: (price: string) => void;
    setCategory: (id: number | null) => void;
    setSubCategory: (id: number | null) => void;
};

export type RecipePropertyRenderer = (
    value: any,
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => ReactNode;

export const recipePropertyRenderer: Record<
    keyof Recipe,
    RecipePropertyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    recipeName: (value, entity, state, context) =>
        renderedRecipeName(value, entity, state, context),
    producedMenuItem: (value, entity, state, context) =>
        renderedProducedMenuItem(value, entity, state, context),
    isIngredient: (value, entity, state, context) =>
        renderedIsIngredient(value, entity, state, context),
    ingredients: (value, entity, state, context) =>
        renderedIngredients(value, entity, state, context),
    batchResultQuantity: (value, entity, state, context) =>
        renderedBatchResultQuantity(value, entity, state, context),
    batchResultMeasurement: (value, entity, state, context) =>
        renderedBatchResultMeasurement(value, entity, state, context),
    servingSizeQuantity: (value, entity, state, context) =>
        renderedServingSizeQuantity(value, entity, state, context),
    servingSizeMeasurement: (value, entity, state, context) =>
        renderedServingSizeMeasurement(value, entity, state, context),
    salesPrice: (value, entity, state, context) =>
        renderedSalesPrice(value, entity, state, context),
    category: (value, entity, state, context) =>
        renderedCategory(value, entity, state, context),
    subCategory: (value, entity, state, context) =>
        renderedSubCategory(value, entity, state, context),
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
    const value = entityInstance[entityProp];
    const renderer = recipePropertyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedRecipeName = (
    value: string,
    entity: Recipe,
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
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
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
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => context.setIsIngredient(e.target.checked)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value ? "Yes" : "No"} />;
};

const renderedIngredients = (
    value: Recipe["ingredients"],
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    return <div>Ingredients ({value?.length || 0})</div>;
};

const renderedBatchResultQuantity = (
    value: string,
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setBatchResultQuantity(e);
                }}
            />
        );
    }
    return <GenericValue value={value || "No quantity"} />;
};

const renderedBatchResultMeasurement = (
    value: Recipe["batchResultMeasurement"],
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
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
    value: string,
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setServingSizeQuantity(e);
                }}
            />
        );
    }
    return <GenericValue value={value || "No quantity"} />;
};

const renderedServingSizeMeasurement = (
    value: Recipe["servingSizeMeasurement"],
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
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
    value: string,
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setSalesPrice(e);
                }}
            />
        );
    }
    return <GenericValue value={value || "No price"} />;
};

const renderedCategory = (
    value: Recipe["category"],
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setCategory(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Category</option>
                {/* TODO: Populate with actual recipe categories */}
            </select>
        );
    }
    return <GenericValue value={value?.categoryName ?? "No category"} />;
};

const renderedSubCategory = (
    value: Recipe["subCategory"],
    entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
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
