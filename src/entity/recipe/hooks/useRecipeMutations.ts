import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeDto,
    MenuItem,
    Recipe,
    RecipeCategory,
    RecipeSubCategory,
    UnitOfMeasure,
    UpdateRecipeDto,
} from "../../entityTypes";
import type { RecipeRenderContext } from "../property-render/Recipe.render";

export type RecipeEditContext = Pick<
    RecipeRenderContext,
    | "setRecipeName"
    | "setProducedMenuItem"
    | "setIsIngredient"
    | "setBatchResultQuantity"
    | "setBatchResultMeasurement"
    | "setServingSizeQuantity"
    | "setServingSizeMeasurement"
    | "setSalesPrice"
    | "setCategory"
    | "setSubCategory"
>;

export type RecipeCreateContext = Pick<
    RecipeRenderContext,
    | "setRecipeName"
    | "setProducedMenuItem"
    | "setIsIngredient"
    | "setBatchResultQuantity"
    | "setBatchResultMeasurement"
    | "setServingSizeQuantity"
    | "setServingSizeMeasurement"
    | "setSalesPrice"
    | "setCategory"
    | "setSubCategory"
>;

// DTO converter for Recipe
const recipeDtoConverter = {
    toCreateDto: (entity: Partial<Recipe>): CreateRecipeDto => ({
        recipeName: entity.recipeName || "",
        producedMenuItemId: entity.producedMenuItem?.id,
        isIngredient: entity.isIngredient || false,
        batchResultQuantity: entity.batchResultQuantity || 0,
        batchResultMeasurementId: entity.batchResultMeasurement?.id || 0,
        servingSizeQuantity: entity.servingSizeQuantity || 0,
        servingSizeMeasurementId: entity.servingSizeMeasurement?.id || 0,
        salesPrice: entity.salesPrice || 0,
        categoryId: entity.category?.id,
        subCategoryId: entity.subCategory?.id,
    }),
    toUpdateDto: (entity: Partial<Recipe>): UpdateRecipeDto => ({
        recipeName: entity.recipeName || "",
        producedMenuItemId: entity.producedMenuItem?.id ? {} : undefined,
        isIngredient: entity.isIngredient || false,
        batchResultQuantity: entity.batchResultQuantity ? {} : undefined,
        batchResultMeasurementId: entity.batchResultMeasurement?.id
            ? {}
            : undefined,
        servingSizeQuantity: entity.servingSizeQuantity ? {} : undefined,
        servingSizeMeasurementId: entity.servingSizeMeasurement?.id
            ? {}
            : undefined,
        salesPrice: entity.salesPrice ? {} : undefined,
        categoryId: entity.category?.id ? {} : undefined,
        subCategoryId: entity.subCategory?.id ? {} : undefined,
    }),
};

// Context factory functions
const createRecipeEditContext = (
    editInstance: Partial<Recipe> | null,
    setEditInstance: (instance: Partial<Recipe> | null) => void
): RecipeEditContext => ({
    setRecipeName: (name: string) => {
        setEditInstance({ ...editInstance, recipeName: name });
    },
    setProducedMenuItem: (menuItem: MenuItem | null) => {
        setEditInstance({ ...editInstance, producedMenuItem: menuItem });
    },
    setIsIngredient: (isIngredient: boolean) => {
        setEditInstance({ ...editInstance, isIngredient });
    },
    setBatchResultQuantity: (quantity: number) => {
        setEditInstance({ ...editInstance, batchResultQuantity: quantity });
    },
    setBatchResultMeasurement: (unitOfMeasure: UnitOfMeasure | null) => {
        setEditInstance({
            ...editInstance,
            batchResultMeasurement: unitOfMeasure,
        });
    },
    setServingSizeQuantity: (quantity: number) => {
        setEditInstance({ ...editInstance, servingSizeQuantity: quantity });
    },
    setServingSizeMeasurement: (unitOfMeasure: UnitOfMeasure | null) => {
        setEditInstance({
            ...editInstance,
            servingSizeMeasurement: unitOfMeasure,
        });
    },
    setSalesPrice: (price: string) => {
        setEditInstance({ ...editInstance, salesPrice: Number(price) });
    },
    setCategory: (category: RecipeCategory | null) => {
        setEditInstance({ ...editInstance, category });
    },
    setSubCategory: (subCategory: RecipeSubCategory | null) => {
        setEditInstance({ ...editInstance, subCategory });
    },
});

const createRecipeCreateContext = (
    createInstance: Partial<Recipe>,
    setCreateInstance: (instance: Partial<Recipe>) => void
): RecipeCreateContext => ({
    setRecipeName: (name: string) => {
        setCreateInstance({ ...createInstance, recipeName: name });
    },
    setProducedMenuItem: (menuItem: MenuItem | null) => {
        setCreateInstance({ ...createInstance, producedMenuItem: menuItem });
    },
    setIsIngredient: (isIngredient: boolean) => {
        setCreateInstance({ ...createInstance, isIngredient });
    },
    setBatchResultQuantity: (quantity: number) => {
        setCreateInstance({ ...createInstance, batchResultQuantity: quantity });
    },
    setBatchResultMeasurement: (unitOfMeasure: UnitOfMeasure | null) => {
        setCreateInstance({
            ...createInstance,
            batchResultMeasurement: unitOfMeasure,
        });
    },
    setServingSizeQuantity: (quantity: number) => {
        setCreateInstance({ ...createInstance, servingSizeQuantity: quantity });
    },
    setServingSizeMeasurement: (unitOfMeasure: UnitOfMeasure | null) => {
        setCreateInstance({
            ...createInstance,
            servingSizeMeasurement: unitOfMeasure,
        });
    },
    setSalesPrice: (price: string) => {
        setCreateInstance({ ...createInstance, salesPrice: Number(price) });
    },
    setCategory: (category: RecipeCategory | null) => {
        setCreateInstance({ ...createInstance, category });
    },
    setSubCategory: (subCategory: RecipeSubCategory | null) => {
        setCreateInstance({ ...createInstance, subCategory });
    },
});

// Entity-specific mutations hook
export function useRecipeMutations() {
    return useEntityMutations<
        Recipe,
        CreateRecipeDto,
        UpdateRecipeDto,
        RecipeEditContext,
        RecipeCreateContext
    >({
        endpoint: "/recipes",
        dtoConverter: recipeDtoConverter,
        createEditContext: createRecipeEditContext,
        createCreateContext: createRecipeCreateContext,
    });
}
