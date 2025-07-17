import { Checkbox, NumberInput, Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import { DropdownSelection } from "../../../lib/uiComponents/input/DropdownSelection";
import { SearchbarDropdownSelection } from "../../../lib/uiComponents/input/SearchbarDropdownSelection";
import type {
    MenuItem,
    Recipe,
    RecipeCategory,
    RecipeIngredient,
    RecipeSubCategory,
    UnitOfMeasure,
} from "../../entityTypes";

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
};

export interface RecipeDataContext extends EntityDataContext<Recipe> {
    recipeCategories?: RecipeCategory[];
    filteredRecipeSubCategories?: RecipeSubCategory[];
    menuItems?: MenuItem[];
    unitsOfMeasure?: UnitOfMeasure[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<Recipe>,
    _context: RecipeRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedRecipeName = (
    value: string,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setRecipeName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedProducedMenuItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext,
    dataContext?: RecipeDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <SearchbarDropdownSelection<MenuItem>
                selectedOption={value}
                onOptionChange={(menuItem) =>
                    context.setProducedMenuItem(menuItem ?? null)
                }
                totalOptions={dataContext?.menuItems ?? []}
                searchProperty={"itemName"}
            />
        );
    }
    return <Text>{value?.itemName ?? "No Menu Item"}</Text>;
};

const renderedIsIngredient = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <Checkbox
                checked={value}
                onChange={(e) => context.setIsIngredient(e.target.checked)}
            />
        );
    }
    return <Checkbox checked={value} />;
};

const renderedIngredients = (
    value: RecipeIngredient[],
    _statefulInstance: GenericStatefulEntity<Recipe>,
    _context: RecipeRenderContext,
    dataContext?: RecipeDataContext
) => {
    return <Text>{`${value?.length || 0} ingredients`}</Text>;
};

const renderedBatchResultQuantity = (
    value: number | null | undefined,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value ?? ""}
                onChange={(e) => {
                    context.setBatchResultQuantity(Number(e));
                }}
            />
        );
    }
    return <Text>{value || "No quantity"}</Text>;
};

const renderedBatchResultMeasurement = (
    value: UnitOfMeasure,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext,
    dataContext?: RecipeDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<UnitOfMeasure>
                selectedOption={value}
                onOptionChange={context.setBatchResultMeasurement}
                totalOptions={dataContext?.unitsOfMeasure ?? []}
                labelKey={"name"}
            />
        );
    }
    return <Text>{value?.name ?? "No measurement"}</Text>;
};

const renderedServingSizeQuantity = (
    value: number | null | undefined,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value ?? ""}
                onChange={(e) => {
                    context.setServingSizeQuantity(Number(e));
                }}
            />
        );
    }
    return <Text>{value || "No quantity"}</Text>;
};

const renderedServingSizeMeasurement = (
    value: UnitOfMeasure,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext,
    dataContext?: RecipeDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<UnitOfMeasure>
                selectedOption={value}
                onOptionChange={context.setServingSizeMeasurement}
                totalOptions={dataContext?.unitsOfMeasure ?? []}
                labelKey={"name"}
            />
        );
    }
    return <Text>{value?.name ?? "No measurement"}</Text>;
};

const renderedSalesPrice = (
    value: number | null | undefined,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            // Currency format?
            <NumberInput
                value={value ?? ""}
                onChange={(e) => {
                    context.setSalesPrice(e.toString());
                }}
            />
        );
    }
    return <Text>{`$${value || "0.00"}`}</Text>;
};

const renderedCategory = (
    value: RecipeCategory,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext,
    dataContext?: RecipeDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<RecipeCategory>
                selectedOption={value}
                onOptionChange={context.setCategory}
                totalOptions={dataContext?.recipeCategories ?? []}
                labelKey={"categoryName"}
            />
        );
    }
    return <Text>{value?.categoryName ?? "No Category"}</Text>;
};

const renderedSubCategory = (
    value: RecipeSubCategory,
    statefulInstance: GenericStatefulEntity<Recipe>,
    context: RecipeRenderContext,
    dataContext?: RecipeDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<RecipeSubCategory>
                selectedOption={value}
                onOptionChange={context.setSubCategory}
                totalOptions={dataContext?.filteredRecipeSubCategories ?? []}
                labelKey={"subCategoryName"}
            />
        );
    }
    return <Text>{value?.subCategoryName ?? "No Sub Category"}</Text>;
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
    dataContext?: RecipeDataContext;
};

export function RecipeRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: RecipeRenderProps) {
    return (
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={recipePropertyRenderer}
            dataContext={dataContext}
        />
    );
}
