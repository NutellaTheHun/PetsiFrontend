import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
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
    setIngredientInventoryItem: (inventoryItem: InventoryItem | null) => void;
    setIngredientRecipe: (recipe: Recipe | null) => void;
    setQuantity: (quantity: number) => void;
    setQuantityMeasure: (unitOfMeasure: UnitOfMeasure | null) => void;
    inventoryItems?: InventoryItem[];
    recipes?: Recipe[];
    unitsOfMeasure?: UnitOfMeasure[];
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    _context: RecipeIngredientRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentRecipe = (
    _value: Recipe,
    _statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    _context: RecipeIngredientRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
};

// technically optional, either IngredientInventoryItem or ParentRecipe
const renderedIngredientInventoryItem = (
    value: InventoryItem,
    statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    context: RecipeIngredientRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <InventoryItemSearchBarDropdown
                value={value}
                onChange={(inventoryItem) =>
                    context.setIngredientInventoryItem(inventoryItem ?? null)
                }
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
    statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    context: RecipeIngredientRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <RecipeSearchBarDropdown
                value={value}
                onChange={(recipe) =>
                    context.setIngredientRecipe(recipe ?? null)
                }
                recipes={context.recipes ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.recipeName || "No Recipe"} />;
};

const renderedQuantity = (
    value: number,
    statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    context: RecipeIngredientRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    context: RecipeIngredientRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasure={value ?? null}
                onUpdateUnitOfMeasure={context.setQuantityMeasure}
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
    statefulInstance: GenericStatefulEntity<RecipeIngredient>;
    context: RecipeIngredientRenderContext;
};

export function RecipeIngredientRender({
    entityProp,
    statefulInstance,
    context,
}: RecipeIngredientRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={recipeIngredientPropertyRenderer}
        />
    );
}
