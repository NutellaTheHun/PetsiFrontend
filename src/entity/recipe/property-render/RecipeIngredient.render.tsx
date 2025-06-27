import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";

type RecipeIngredient = components["schemas"]["RecipeIngredient"];

export type RecipeIngredientRenderContext = {
    setIngredientInventoryItem: (id: number | null) => void;
    setIngredientRecipe: (id: number | null) => void;
    setQuantity: (quantity: number) => void;
    setQuantityMeasure: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: RecipeIngredient,
    _state: RenderState,
    _context: RecipeIngredientRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentRecipe = (
    value: RecipeIngredient["parentRecipe"],
    _entity: RecipeIngredient,
    _state: RenderState,
    _context: RecipeIngredientRenderContext
) => {
    // TODO implement
    return <GenericValueDisplay value={value?.recipeName || "No Recipe"} />;
};

const renderedIngredientInventoryItem = (
    value: RecipeIngredient["ingredientInventoryItem"],
    _entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    // TODO implement, inventory item search dropdown?
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
    return (
        <GenericValueDisplay value={value?.itemName || "No Inventory Item"} />
    );
};

const renderedIngredientRecipe = (
    value: RecipeIngredient["ingredientRecipe"],
    _entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    // TODO implement, recipe search dropdown?
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
    return <GenericValueDisplay value={value?.recipeName || "No Recipe"} />;
};

const renderedQuantity = (
    value: number,
    _entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => context.setQuantity(Number(e))}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedQuantityMeasure = (
    value: RecipeIngredient["quantityMeasure"],
    _entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    // TODO implement, unit of measure search dropdown?
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
    return <GenericValueDisplay value={value?.abbreviation || "No Unit"} />;
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
