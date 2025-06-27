import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericCheckBoxInput } from "../../../lib/generics/propertyRenderers/GenericCheckBoxInput";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    MenuItem,
    Recipe,
    RecipeCategory,
    RecipeIngredient,
    RecipeSubCategory,
    UnitOfMeasure,
} from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../../menuItems/components/menuItem/MenuItemSearchBarDropdown";
import { UnitOfMeasureDropdown } from "../../unitOfMeasure/components/unitOfMeasure/UnitOfMeasureDropdown";
import { RecipeCategoryDropdown } from "../components/recipeCategory/RecipeCategoryDropdown";
import { RecipeSubCategoryDropdown } from "../components/recipeSubCategory/RecipeSubCategoryDropdown";

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
    recipeCategories: RecipeCategory[];
    filteredRecipeSubCategories: RecipeSubCategory[];
    menuItems?: MenuItem[];
    unitsOfMeasure?: UnitOfMeasure[];
};

const renderedId = (
    value: number,
    _entity: Recipe,
    _state: RenderState,
    _context: RecipeRenderContext
) => {
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
};

const renderedProducedMenuItem = (
    value: MenuItem,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        // TODO implement
        return (
            <MenuItemSearchBarDropdown
                value={value?.id ?? null}
                onChange={(e) => context.setProducedMenuItem(Number(e))}
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No Menu Item"} />;
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
    return <GenericValueDisplay value={value ? "Yes" : "No"} />;
};

const renderedIngredients = (
    value: RecipeIngredient[],
    _entity: Recipe,
    _state: RenderState,
    _context: RecipeRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} ingredients`} />;
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
    return <GenericValueDisplay value={value || "No quantity"} />;
};

const renderedBatchResultMeasurement = (
    value: UnitOfMeasure,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasureId={value?.id ?? null}
                onUpdateUnitOfMeasureId={context.setBatchResultMeasurement}
                unitsOfMeasure={context.unitsOfMeasure ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name ?? "No measurement"} />;
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
    return <GenericValueDisplay value={value || "No quantity"} />;
};

const renderedServingSizeMeasurement = (
    value: UnitOfMeasure,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasureId={value?.id ?? null}
                onUpdateUnitOfMeasureId={context.setServingSizeMeasurement}
                unitsOfMeasure={context.unitsOfMeasure ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name ?? "No measurement"} />;
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
                type="number"
                onChange={(e) => {
                    context.setSalesPrice(e);
                }}
            />
        );
    }
    // Currency format?
    return <GenericValueDisplay value={value || "No price"} />;
};

const renderedCategory = (
    value: RecipeCategory,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <RecipeCategoryDropdown
                selectedCategoryId={value?.id ?? null}
                onUpdateCategoryId={context.setCategory}
                recipeCategories={context.recipeCategories ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? "No category"} />;
};

const renderedSubCategory = (
    value: RecipeSubCategory,
    _entity: Recipe,
    state: RenderState,
    context: RecipeRenderContext
) => {
    if (state === "edited") {
        return (
            <RecipeSubCategoryDropdown
                selectedSubCategoryId={value?.id ?? null}
                onUpdateSubCategoryId={context.setSubCategory}
                recipeSubCategories={context.filteredRecipeSubCategories ?? []}
            />
        );
    }
    return (
        <GenericValueDisplay
            value={value?.subCategoryName ?? "No sub category"}
        />
    );
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
