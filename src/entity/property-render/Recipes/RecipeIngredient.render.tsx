import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type RecipeIngredient = components["schemas"]["RecipeIngredient"];

export type RecipeIngredientRenderContext = {
    setIngredientInventoryItem: (id: number | null) => void;
    setIngredientRecipe: (id: number | null) => void;
    setQuantity: (quantity: number) => void;
    setQuantityMeasure: (id: number | null) => void;
};

export type RecipeIngredientPropertyRenderer = (
    value: any,
    entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedParentRecipe = (
    value: RecipeIngredient["parentRecipe"],
    entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    return <GenericValue value={value?.recipeName || "No Recipe"} />;
};

const renderedIngredientInventoryItem = (
    value: RecipeIngredient["ingredientInventoryItem"],
    entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setIngredientInventoryItem(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Inventory Item</option>
                {/* TODO: Populate with actual inventory items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName || "No Inventory Item"} />;
};

const renderedIngredientRecipe = (
    value: RecipeIngredient["ingredientRecipe"],
    entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setIngredientRecipe(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Recipe</option>
                {/* TODO: Populate with actual recipes */}
            </select>
        );
    }
    return <GenericValue value={value?.recipeName || "No Recipe"} />;
};

const renderedQuantity = (
    value: number,
    entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="number"
                value={value || ""}
                onChange={(e) => context.setQuantity(Number(e.target.value))}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedQuantityMeasure = (
    value: RecipeIngredient["quantityMeasure"],
    entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setQuantityMeasure(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Unit</option>
                {/* TODO: Populate with actual units of measure */}
            </select>
        );
    }
    return <GenericValue value={value?.abbreviation || "No Unit"} />;
};

export const recipeIngredientPropertyRenderer: PropertyRendererRecord<RecipeIngredient> =
    {
        id: renderedId,
        parentRecipe: renderedParentRecipe,
        ingredientInventoryItem: renderedIngredientInventoryItem,
        ingredientRecipe: renderedIngredientRecipe,
        quantity: renderedQuantity,
        quantityMeasure: renderedQuantityMeasure,
    };

export type RecipeIngredientRenderProps = {
    entityProp: keyof RecipeIngredient;
    instance: RecipeIngredient;
    state: RenderState;
    context: RecipeIngredientRenderContext;
};

export function RecipeIngredientRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: RecipeIngredientRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={recipeIngredientPropertyRenderer}
        />
    );
}
