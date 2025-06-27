import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    InventoryItem,
    Recipe,
    RecipeIngredient,
    UnitOfMeasure,
} from "../../entityTypes";
import { InventoryItemSearchBarDropdown } from "../../inventoryItems/components/inventoryItem/InventoryItemSearchBarDropdown";
import { UnitOfMeasureDropdown } from "../../unitOfMeasure/components/unitOfMeasure/UnitOfMeasureDropdown";
import { RecipeSearchBarDropdown } from "../components/recipe/RecipeSearchBarDropdown";

export type RecipeIngredientRenderContext = {
    setIngredientInventoryItem: (id: number | null) => void;
    setIngredientRecipe: (id: number | null) => void;
    setQuantity: (quantity: number) => void;
    setQuantityMeasure: (id: number | null) => void;
    inventoryItems?: InventoryItem[];
    recipes?: Recipe[];
    unitsOfMeasure?: UnitOfMeasure[];
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
    _value: Recipe,
    _entity: RecipeIngredient,
    _state: RenderState,
    _context: RecipeIngredientRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
};

// technically optional, either IngredientInventoryItem or ParentRecipe
const renderedIngredientInventoryItem = (
    value: InventoryItem,
    _entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    // TODO implement, inventory item search dropdown?
    if (state === "edited") {
        return (
            <InventoryItemSearchBarDropdown
                value={value?.id ?? null}
                onChange={(e) => context.setIngredientInventoryItem(Number(e))}
                inventoryItems={context.inventoryItems ?? []}
            />
        );
    }
    return (
        <GenericValueDisplay value={value?.itemName || "No Inventory Item"} />
    );
};

// technically optional, either IngredientRecipe or IngredientInventoryItem
const renderedIngredientRecipe = (
    value: Recipe,
    _entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    if (state === "edited") {
        return (
            <RecipeSearchBarDropdown
                value={value?.id ?? null}
                onChange={(e: number | string) =>
                    context.setIngredientRecipe(Number(e))
                }
                recipes={context.recipes ?? []}
            />
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
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedQuantityMeasure = (
    value: UnitOfMeasure,
    _entity: RecipeIngredient,
    state: RenderState,
    context: RecipeIngredientRenderContext
) => {
    if (state === "edited") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasureId={value?.id ?? null}
                onUpdateUnitOfMeasureId={context.setQuantityMeasure}
                unitsOfMeasure={context.unitsOfMeasure ?? []}
            />
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
