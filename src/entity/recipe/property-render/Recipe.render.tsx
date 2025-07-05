import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
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
    setProducedMenuItem: (menuItem: MenuItem | null) => void;
    setIsIngredient: (isIngredient: boolean) => void;
    setBatchResultQuantity: (quantity: number) => void;
    setBatchResultMeasurement: (unitOfMeasure: UnitOfMeasure | null) => void;
    setServingSizeQuantity: (quantity: number) => void;
    setServingSizeMeasurement: (unitOfMeasure: UnitOfMeasure | null) => void;
    setSalesPrice: (price: string) => void;
    setCategory: (category: RecipeCategory | null) => void;
    setSubCategory: (subCategory: RecipeSubCategory | null) => void;
    recipeCategories: RecipeCategory[];
    filteredRecipeSubCategories: RecipeSubCategory[];
    menuItems?: MenuItem[];
    unitsOfMeasure?: UnitOfMeasure[];
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<Recipe>,
    _context: RecipeRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedRecipeName = (
    value: string,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) =>
                    context.setProducedMenuItem(menuItem ?? null)
                }
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No Menu Item"} />;
};

const renderedIsIngredient = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    _statefulInstance: GenericStatefulEntity<Recipe>,
    _context: RecipeRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} ingredients`} />;
};

const renderedBatchResultQuantity = (
    value: number | null | undefined,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasure={value ?? null}
                onUpdateUnitOfMeasure={context.setBatchResultMeasurement}
                unitsOfMeasure={context.unitsOfMeasure ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name ?? "No measurement"} />;
};

const renderedServingSizeQuantity = (
    value: number | null | undefined,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (statefulInstance.state === "edited") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasure={value ?? null}
                onUpdateUnitOfMeasure={context.setServingSizeMeasurement}
                unitsOfMeasure={context.unitsOfMeasure ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name ?? "No measurement"} />;
};

const renderedSalesPrice = (
    value: number | null | undefined,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    return <GenericValueDisplay value={`$${value || "0.00"}`} />;
};

const renderedCategory = (
    value: RecipeCategory,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <RecipeCategoryDropdown
                selectedCategory={value ?? null}
                onUpdateCategory={context.setCategory}
                recipeCategories={context.recipeCategories}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? "No Category"} />;
};

const renderedSubCategory = (
    value: RecipeSubCategory,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <RecipeSubCategoryDropdown
                selectedSubCategory={value ?? null}
                onUpdateSubCategory={context.setSubCategory}
                recipeSubCategories={context.filteredRecipeSubCategories}
            />
        );
    }
    return (
        <GenericValueDisplay
            value={value?.subCategoryName ?? "No Sub Category"}
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
    statefulInstance: GenericStatefulEntity<Recipe>;
    context: RecipeRenderContext;
};

export function RecipeRender({
    entityProp,
    statefulInstance,
    context,
}: RecipeRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={recipePropertyRenderer}
        />
    );
}
