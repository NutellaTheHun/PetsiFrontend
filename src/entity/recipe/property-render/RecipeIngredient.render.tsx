import { NumberInput, Text } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { MantineAutoComplete } from "../../../lib/uiComponents/input/MantineAutoComplete";
import { MantineComboBox } from "../../../lib/uiComponents/input/MantineComboBox";
import type {
    InventoryItem,
    Recipe,
    RecipeIngredient,
    UnitOfMeasure,
} from "../../entityTypes";

export type RecipeIngredientRenderContext = {
    setIngredientInventoryItem: (inventoryItem: InventoryItem | null) => void;
    setIngredientRecipe: (recipe: Recipe | null) => void;
    setQuantity: (quantity: number) => void;
    setQuantityMeasure: (unitOfMeasure: UnitOfMeasure) => void;
    setParentRecipe?: (recipe: Recipe) => void; // Only for create context, not edit
};

export interface RecipeIngredientDataContext
    extends EntityDataContext<RecipeIngredient> {
    inventoryItems?: InventoryItem[];
    recipes?: Recipe[];
    unitsOfMeasure?: UnitOfMeasure[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    _context: RecipeIngredientRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedParentRecipe = (
    _value: Recipe,
    _statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    _context: RecipeIngredientRenderContext
) => {
    return <Text>{"Nothing to display"}</Text>;
};

// technically optional, either IngredientInventoryItem or ParentRecipe
const renderedIngredientInventoryItem = (
    value: InventoryItem,
    statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    context: RecipeIngredientRenderContext,
    dataContext?: RecipeIngredientDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<InventoryItem>
                selectedOption={value}
                onOptionChange={(inventoryItem) =>
                    context.setIngredientInventoryItem(inventoryItem ?? null)
                }
                totalOptions={dataContext?.inventoryItems ?? []}
                searchProperty={"itemName"}
            />
        );
    }
    return <Text>{value?.itemName || "No Inventory Item"}</Text>;
};

// technically optional, either IngredientRecipe or IngredientInventoryItem
const renderedIngredientRecipe = (
    value: Recipe,
    statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    context: RecipeIngredientRenderContext,
    dataContext?: RecipeIngredientDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<Recipe>
                selectedOption={value}
                onOptionChange={(recipe) =>
                    context.setIngredientRecipe(recipe ?? null)
                }
                totalOptions={dataContext?.recipes ?? []}
                searchProperty={"recipeName"}
            />
        );
    }
    return <Text>{value?.recipeName || "No Recipe"}</Text>;
};

const renderedQuantity = (
    value: number,
    statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    context: RecipeIngredientRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) => context.setQuantity(Number(e))}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedQuantityMeasure = (
    value: UnitOfMeasure,
    statefulInstance: GenericStatefulEntity<RecipeIngredient>,
    context: RecipeIngredientRenderContext,
    dataContext?: RecipeIngredientDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineComboBox<UnitOfMeasure>
                selectedOption={value}
                onOptionChange={context.setQuantityMeasure}
                totalOptions={dataContext?.unitsOfMeasure ?? []}
                labelKey={"abbreviation"}
            />
        );
    }
    return <Text>{value?.abbreviation || "No Unit"}</Text>;
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
    dataContext?: RecipeIngredientDataContext;
};

export function RecipeIngredientRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: RecipeIngredientRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={recipeIngredientPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
